import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';

@ObjectType({
  description: 'Advertiser metadata in a specific language',
})
export class AdvertiserMetadata {
  @Field({
    description: 'ID of the advertiser this metadata belongs to',
  })
  advertiserId: string;

  @Field(() => LanguageEnum, {
    description: 'Language of this metadata',
  })
  languageId: LanguageEnum;

  @Field({
    description: 'Name of the advertiser in this language',
  })
  name: string;

  @Field({
    description: 'Description of the advertiser in this language',
  })
  description: string;
}
