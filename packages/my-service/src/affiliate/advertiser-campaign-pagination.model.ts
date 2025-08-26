import { ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/pagination/pagination.model';

@ObjectType()
export class AdvertiserCampaignPagination extends Pagination {}
