import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class GetLanguagesArgs {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Filter languages by supported status',
  })
  @IsOptional()
  @IsBoolean()
  isSupported?: boolean;
}
