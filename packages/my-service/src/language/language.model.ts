import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';

@ObjectType()
export class Language {
  @Field(() => LanguageEnum)
  id: LanguageEnum;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  shortName: string;

  @Field(() => Boolean)
  isSupported: boolean;

  @Field(() => Boolean)
  isDefault: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
