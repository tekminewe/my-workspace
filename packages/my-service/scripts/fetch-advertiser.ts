#!/usr/bin/env tsx
import { InvolveAsiaProvider } from './providers/involveasia-provider';
// Ensure mkdirSync is imported
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { createId } from '@paralleldrive/cuid2';

dotenv.config();

const apiKey = process.env.INVOLVE_ASIA_API_KEY;
const apiSecret = process.env.INVOLVE_ASIA_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error(
    'Missing API key or secret. Set INVOLVE_ASIA_API_KEY and INVOLVE_ASIA_API_SECRET in .env file.',
  );
  process.exit(1);
}

/**
 * Properly escapes HTML content for use in JSON string values
 * This handles HTML tags, special characters, and ensures proper escaping
 * for seed files in a format compatible with Prisma insertions
 */
function escapeHtmlForJson(html: string): string {
  return html
    .replace(/\\/g, '\\\\') // Backslash
    .replace(/'/g, "\\'") // Single quote
    .replace(/"/g, '\\"') // Double quote
    .replace(/\n/g, '\\n') // Newline
    .replace(/\r/g, '\\r') // Carriage return
    .replace(/\t/g, '\\t') // Tab
    .replace(/\u2018/g, "'") // Left single quote
    .replace(/\u2019/g, "'") // Right single quote
    .replace(/\u201C/g, '\\"') // Left double quote
    .replace(/\u201D/g, '\\"') // Right double quote
    .replace(/\u2013/g, '-') // En dash
    .replace(/\u2014/g, '--') // Em dash
    .replace(/\u2026/g, '...'); // Ellipsis
}

// Helper function to convert kebab-case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

async function fetchAdvertiser() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: npm run fetch-advertiser <advertiserName>');
    process.exit(1);
  }

  const advertiserName = args.join(' ');

  try {
    const provider = new InvolveAsiaProvider(apiKey, apiSecret);
    const advertiser = await provider.getAdvertiser({
      advertiserName: advertiserName,
    });

    if (!advertiser) {
      console.error(`Advertiser with name '${advertiserName}' not found`);
      process.exit(1);
    }

    console.log(`Found advertiser: ${advertiser.offer_name}`);

    // Generate slug from offer name
    const slug = advertiser.offer_name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');

    // Generate CUIDs
    const advertiserId = createId();
    const logoId = createId();
    const commissionId = createId(); // ID for the main commission object

    // Create logo path
    const logoPath = `advertisers/${slug}.webp`;

    // Get English description
    const description = advertiser.description || '';

    // Create Chinese placeholder description (simplified version of English description)
    const chineseDescription = `<p>${advertiser.offer_name} - ${advertiser.categories}</p>`;

    // Escape offer name and descriptions for TypeScript string literals
    const escapedOfferName = escapeHtmlForJson(advertiser.offer_name);
    const escapedDescription = escapeHtmlForJson(description);
    const escapedChineseDescription = escapeHtmlForJson(chineseDescription);

    const camelSlug = toCamelCase(slug);
    // Ensure constant name is a valid JS identifier (e.g. prefix with underscore if starts with digit)
    const advertiserDataConstantName = /^\d/.test(camelSlug)
      ? `_${camelSlug}`
      : camelSlug;

    // Prepare commission rows
    const rawCommissionRules = advertiser.commissions || [];
    const commissionRows = rawCommissionRules.map(
      (rule: { [key: string]: string }) => {
        const commissionRowId = createId();
        const key = Object.keys(rule)[0];
        const value = rule[key];
        const isPercentage = value.includes('%');
        const commissionValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;

        return `{
        id: '${commissionRowId}',
        name: '${escapeHtmlForJson(key)}',
        typeId: '${isPercentage ? 'Percentage' : 'Fixed'}',
        commission: ${commissionValue},
        metadatas: [
          { languageId: 'EN_MY', name: '${escapeHtmlForJson(key)}' },
          { languageId: 'ZH_MY', name: '${escapeHtmlForJson(key)} (@TODO: Translate)' },
        ],
      }`;
      },
    );

    // Create content for the new advertiser data file
    const advertiserDataFileContent = `import { AdvertiserData } from '../advertiser.types';

export const ${advertiserDataConstantName}: AdvertiserData = {
  id: '${advertiserId}',
  slug: '${slug}',
  statusId: 'Active',
  logo: {
    id: '${logoId}',
    filePath: '${logoPath}',
    mimeType: 'image/webp',
  },
  categories: [], // @TODO: Manually connect to existing category IDs if needed
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '${advertiser.offer_id}',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: '${escapedOfferName}',
      description: '${escapedDescription}',
    },
    {
      languageId: 'ZH_MY',
      name: '${escapedOfferName}', // @TODO: Update this to the correct Chinese name if available
      description: '${escapedChineseDescription}',
    },
  ],
  commissions: [
    {
      id: '${commissionId}',
      providerReferenceId: '${advertiser.offer_id}',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage', // @TODO: Confirm if this is always Percentage or fetch from API
      commissionShare: 10, // @TODO: Update with actual share value if available from API. Defaulting to 10 as per alibaba.ts example.
      dayToPayout: ${advertiser.payment_terms ? +advertiser.payment_terms : 30},
      dayToValidate: ${advertiser.validation_terms ? +advertiser.validation_terms : 30},
      url: '${advertiser.tracking_link || ''}',
      statusId: 'Active', // Default status
      commissionRows: [
        ${commissionRows.join(',\n        ')}
      ],
    }
  ],
};
`;

    // Write the new advertiser data file
    const advertiserDataDir = resolve(
      __dirname,
      '../src/seed/data/advertisers',
    );
    if (!existsSync(advertiserDataDir)) {
      mkdirSync(advertiserDataDir, { recursive: true });
    }
    const newAdvertiserFilePath = resolve(advertiserDataDir, `${slug}.ts`);
    writeFileSync(newAdvertiserFilePath, advertiserDataFileContent);
    console.log(
      `Advertiser data file created: src/seed/data/advertisers/${slug}.ts`,
    );

    // Update src/seed/data/advertisers/index.ts
    const advertisersIndexFilePath = resolve(advertiserDataDir, 'index.ts');
    if (!existsSync(advertisersIndexFilePath)) {
      console.warn(
        `Advertisers index file not found: ${advertisersIndexFilePath}. Creating a new one.`,
      );
      writeFileSync(advertisersIndexFilePath, `export * from './${slug}';\n`);
    } else {
      let indexFileContent = readFileSync(advertisersIndexFilePath, 'utf-8');
      const newExportLine = `export * from './${slug}';`;
      if (!indexFileContent.includes(newExportLine)) {
        // Add the new export line, ensuring a newline if the file isn't empty
        if (
          indexFileContent.trim() !== '' &&
          !indexFileContent.endsWith('\n')
        ) {
          indexFileContent += '\n';
        }
        indexFileContent += `${newExportLine}\n`;
        writeFileSync(advertisersIndexFilePath, indexFileContent);
        console.log(
          `Updated advertisers index file: ${advertisersIndexFilePath}`,
        );
      } else {
        console.log(
          `Export for '${slug}' already exists in advertisers index file.`,
        );
      }
    }

    console.log(`Advertiser ${advertiser.offer_name} processed successfully.`);
    console.log(`Logo will be expected at path: ${logoPath}`);
    console.log(
      'Note: You may need to download the logo manually and place it in the s3/ directory (or your configured assets path).',
    );
    console.log(
      `Ensure 'src/seed/data/advertiser.ts' imports and processes advertisers from 'src/seed/data/advertisers/index.ts'.`,
    );
  } catch (error) {
    console.error('Error fetching advertiser:', error);
    process.exit(1);
  }
}

fetchAdvertiser();
