import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Carousel, CarouselMetada } from './carousel.model';
import { CarouselService } from './carousel.service';
import { Media } from 'src/media/media.model';
import { Public } from 'src/auth/auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { GetCarouselsArgs } from './carousel.args';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';
import { CreateCarouselInput, UpdateCarouselInput } from './carousel.input';

@Resolver(() => Carousel)
export class CarouselResolver {
  constructor(
    private readonly carouselService: CarouselService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => Carousel)
  async carousel(@Args('id', { type: () => String }) id: string) {
    const language = await this.authService.getAcceptLanguage();
    return this.carouselService.getCarousel(id, language);
  }

  @Query(() => [Carousel])
  @Public()
  async carousels(@Args() args: GetCarouselsArgs) {
    const language = await this.authService.getAcceptLanguage();
    const data = await this.carouselService.getCarousels({
      page: args.page,
      pageSize: args.pageSize,
      status: args.status,
      startDate: args.startDate,
      endDate: args.endDate,
      language,
    });

    return data;
  }

  @Mutation(() => Carousel)
  @Permissions(PermissionEnum.ManageCarousel)
  async createCarousel(@Args('data') data: CreateCarouselInput) {
    const carousel = await this.carouselService.createCarousel(data);
    return carousel;
  }

  @Mutation(() => Carousel)
  @Permissions(PermissionEnum.ManageCarousel)
  async updateCarousel(
    @Args('id') id: string,
    @Args('data') data: UpdateCarouselInput,
  ) {
    const carousel = await this.carouselService.updateCarousel(id, data);
    return carousel;
  }

  @ResolveField('image', () => [CarouselMetada])
  async metadatas(@Parent() carousel: Carousel) {
    const { id } = carousel;
    const languageId = await this.authService.getAcceptLanguage();
    const image = await this.carouselService.getCarouselImage({
      languageId,
      carouselId: id,
    });

    return {
      ...image,
      url: `${process.env.MEDIA_URL}/${image.filePath}`,
    };
  }

  @ResolveField('metadatas', () => Media)
  async image(@Parent() carousel: Carousel) {
    const { id } = carousel;
    const metadatas = await this.carouselService.getCarouselMetadatas({
      carouselId: id,
    });

    return metadatas.map((metadata) => ({
      ...metadata,
      image: {
        ...metadata.image,
        url: `${process.env.MEDIA_URL}/${metadata.image.filePath}`,
      },
    }));
  }
}
