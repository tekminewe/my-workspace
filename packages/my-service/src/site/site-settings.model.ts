import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Site settings for theme-specific and general configurations',
})
export class SiteSettings {
  @Field(() => String, {
    description: 'The unique identifier of the site settings',
  })
  id: string;

  @Field(() => Date, { description: 'The creation date of the site settings' })
  createdAt: Date;

  @Field(() => Date, {
    description: 'The last update date of the site settings',
  })
  updatedAt: Date;

  @Field(() => String, { description: 'The site ID these settings belong to' })
  siteId: string;

  // Analytics & Tracking
  @Field(() => String, {
    description: 'Google Analytics tracking ID',
    nullable: true,
  })
  googleAnalyticsId?: string;

  @Field(() => String, {
    description: 'Google Tag Manager ID',
    nullable: true,
  })
  googleTagManagerId?: string;

  @Field(() => String, {
    description: 'Facebook Pixel ID',
    nullable: true,
  })
  facebookPixelId?: string;

  // SEO Settings
  @Field(() => String, {
    description: 'Default meta title for pages',
    nullable: true,
  })
  defaultMetaTitle?: string;

  @Field(() => String, {
    description: 'Default meta description for pages',
    nullable: true,
  })
  defaultMetaDescription?: string;

  @Field(() => String, {
    description: 'Sitemap URL',
    nullable: true,
  })
  sitemapUrl?: string;

  @Field(() => String, {
    description: 'Robots.txt content',
    nullable: true,
  })
  robotsTxt?: string;

  // Social Media
  @Field(() => String, {
    description: 'Facebook page URL',
    nullable: true,
  })
  facebookUrl?: string;

  @Field(() => String, {
    description: 'Twitter/X profile URL',
    nullable: true,
  })
  twitterUrl?: string;

  @Field(() => String, {
    description: 'Instagram profile URL',
    nullable: true,
  })
  instagramUrl?: string;

  @Field(() => String, {
    description: 'LinkedIn profile URL',
    nullable: true,
  })
  linkedinUrl?: string;

  // Contact Information
  @Field(() => String, {
    description: 'Contact email address',
    nullable: true,
  })
  contactEmail?: string;

  @Field(() => String, {
    description: 'Support email address',
    nullable: true,
  })
  supportEmail?: string;

  @Field(() => String, {
    description: 'Phone number',
    nullable: true,
  })
  phoneNumber?: string;

  @Field(() => String, {
    description: 'Physical address',
    nullable: true,
  })
  address?: string;

  // Feature Flags
  @Field(() => Boolean, {
    description: 'Whether the site is in maintenance mode',
  })
  maintenanceMode: boolean;

  @Field(() => Boolean, {
    description: 'Whether user registration is allowed',
  })
  allowUserRegistration: boolean;

  @Field(() => Boolean, {
    description: 'Whether comments are enabled',
  })
  enableComments: boolean;

  @Field(() => Boolean, {
    description: 'Whether newsletter signup is enabled',
  })
  enableNewsletter: boolean;
}
