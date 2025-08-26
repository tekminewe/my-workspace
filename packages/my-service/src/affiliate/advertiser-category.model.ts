import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AdvertiserCategoryEnum } from '@prisma/client';

registerEnumType(AdvertiserCategoryEnum, {
  name: 'AdvertiserCategoryEnum',
});

@ObjectType({
  description: 'Advertiser category entity',
})
export class AdvertiserCategory {
  @Field(() => AdvertiserCategoryEnum, {
    description: 'Unique identifier for the category',
  })
  id: AdvertiserCategoryEnum;

  @Field({
    nullable: true,
    description: 'Description of the category',
  })
  description?: string;

  @Field({
    description: 'Localized name of the category',
  })
  name: string;
}

@ObjectType({
  description: 'Advertiser category with active advertiser count',
})
export class AdvertiserCategoryWithCount extends AdvertiserCategory {
  @Field(() => Int, {
    description: 'Number of active advertisers in this category',
  })
  count: number;
}
