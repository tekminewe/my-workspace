import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { Media } from 'src/media/media.model';

@ObjectType({ description: 'Site metadata for a specific language' })
export class SiteMetadata {
  @Field(() => String, {
    description: 'The name of the site in the specific language',
  })
  name: string;

  @Field(() => String, {
    description: 'The description of the site in the specific language',
    nullable: true,
  })
  description?: string;

  @Field(() => Media, {
    description: 'The logo of the site for the specific language',
    nullable: true,
  })
  logo?: Media;

  @Field(() => Media, {
    description: 'The dark theme logo of the site for the specific language',
    nullable: true,
  })
  darkLogo?: Media;

  @Field(() => LanguageEnum, {
    description: 'The language identifier for this metadata',
  })
  languageId: LanguageEnum;
}

@ObjectType({ description: 'Site information' })
export class Site {
  @Field(() => String, { description: 'The unique identifier of the site' })
  id: string;

  @Field(() => String, { description: 'The name of the site' })
  name: string;

  @Field(() => String, {
    description: 'The domain of the site',
    nullable: true,
  })
  domain: string;

  @Field(() => String, {
    description: 'The description of the site',
    nullable: true,
  })
  description?: string;

  @Field(() => Media, {
    description: 'The logo of the site',
    nullable: true,
  })
  logo?: Media;

  @Field(() => Date, { description: 'The creation date of the site' })
  createdAt: Date;

  @Field(() => Date, { description: 'The last update date of the site' })
  updatedAt: Date;

  @Field(() => [SiteMetadata], {
    description: 'The metadata for different languages',
  })
  metadatas: SiteMetadata[];
}
