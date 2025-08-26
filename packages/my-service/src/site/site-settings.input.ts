import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  IsUrl,
} from 'class-validator';

@InputType({ description: 'Input for updating site settings' })
export class UpdateSiteSettingsInput {
  // Analytics & Tracking
  @Field(() => String, {
    description: 'Google Analytics tracking ID',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  googleAnalyticsId?: string;

  @Field(() => String, {
    description: 'Google Tag Manager ID',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  googleTagManagerId?: string;

  @Field(() => String, {
    description: 'Facebook Pixel ID',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  facebookPixelId?: string;

  // SEO Settings
  @Field(() => String, {
    description: 'Default meta title for pages',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  defaultMetaTitle?: string;

  @Field(() => String, {
    description: 'Default meta description for pages',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  defaultMetaDescription?: string;

  @Field(() => String, {
    description: 'Sitemap URL',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  sitemapUrl?: string;

  @Field(() => String, {
    description: 'Robots.txt content',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  robotsTxt?: string;

  // Social Media
  @Field(() => String, {
    description: 'Facebook page URL',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  facebookUrl?: string;

  @Field(() => String, {
    description: 'Twitter/X profile URL',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  twitterUrl?: string;

  @Field(() => String, {
    description: 'Instagram profile URL',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @Field(() => String, {
    description: 'LinkedIn profile URL',
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  // Contact Information
  @Field(() => String, {
    description: 'Contact email address',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @Field(() => String, {
    description: 'Support email address',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  supportEmail?: string;

  @Field(() => String, {
    description: 'Phone number',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @Field(() => String, {
    description: 'Physical address',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  address?: string;

  // Feature Flags
  @Field(() => Boolean, {
    description: 'Whether the site is in maintenance mode',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  maintenanceMode?: boolean;

  @Field(() => Boolean, {
    description: 'Whether user registration is allowed',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  allowUserRegistration?: boolean;

  @Field(() => Boolean, {
    description: 'Whether comments are enabled',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  enableComments?: boolean;

  @Field(() => Boolean, {
    description: 'Whether newsletter signup is enabled',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  enableNewsletter?: boolean;
}
