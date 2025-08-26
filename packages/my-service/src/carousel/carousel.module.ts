import { Module } from '@nestjs/common';
import { CarouselService } from './carousel.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { Carousel, CarouselsPagination } from './carousel.model';
import { CarouselResolver } from './carousel.resolver';
import { CarouselsPaginationResolver } from './carousel-pagination.resolver';
import { AffiliateModule } from 'src/affiliate/affiliate.module';

@Module({
  imports: [AuthModule, PrismaModule, PaginationModule, AffiliateModule],
  providers: [
    CarouselService,
    Carousel,
    CarouselsPagination,
    CarouselResolver,
    CarouselsPaginationResolver,
  ],
})
export class CarouselModule {}
