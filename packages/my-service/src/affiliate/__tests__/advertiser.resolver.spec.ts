import { Test, TestingModule } from '@nestjs/testing';
import { AdvertiserResolver } from '../advertiser.resolver';
import { AdvertiserService2 } from '../advertiser2.service';
import { AuthService } from '../../auth/auth.service';
import { MediaService } from '../../media/media.service';
import { SearchService } from '../../search/search.service';
import { AdvertiserLambdaService } from '../advertiser-lambda.service';
import { GetAdvertiserArgs } from '../advertiser.args';
import { LanguageEnum, AdvertiserStatusEnum } from '@prisma/client';

describe('AdvertiserResolver', () => {
  let resolver: AdvertiserResolver;
  let advertiserService: jest.Mocked<AdvertiserService2>;

  const mockAdvertiser = {
    id: 'adv-1',
    name: 'Test Advertiser',
    slug: 'test-advertiser',
    logoId: 'logo-1',
    description: 'Test Description',
    statusId: AdvertiserStatusEnum.Active,
    logo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const advertiserServiceMock = {
      getAdvertiser: jest.fn(),
      getAdvertisers: jest.fn(),
      updateAdvertiser: jest.fn(),
      getAdvertiserCommission: jest.fn(),
    };

    const authServiceMock = {
      getAcceptLanguage: jest.fn().mockResolvedValue(LanguageEnum.EN_US),
    };

    const mediaServiceMock = {
      getMediaById: jest.fn(),
    };

    const searchServiceMock = {
      searchObjects: jest.fn(),
    };

    const advertiserLambdaServiceMock = {
      triggerFetchAdvertiser: jest.fn(),
      processAdvertiser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvertiserResolver,
        { provide: AdvertiserService2, useValue: advertiserServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MediaService, useValue: mediaServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
        {
          provide: AdvertiserLambdaService,
          useValue: advertiserLambdaServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<AdvertiserResolver>(AdvertiserResolver);
    advertiserService = module.get(AdvertiserService2);
  });

  describe('advertiser', () => {
    it('should throw an error when neither advertiserId nor slug is provided', async () => {
      const args = new GetAdvertiserArgs();
      await expect(resolver.advertiser(args)).rejects.toThrow(
        'Either advertiserId or slug must be provided',
      );
    });

    it('should get advertiser by id when advertiserId is provided', async () => {
      advertiserService.getAdvertiser.mockResolvedValue(mockAdvertiser);

      const args = new GetAdvertiserArgs();
      args.advertiserId = 'adv-1';

      const result = await resolver.advertiser(args);

      expect(advertiserService.getAdvertiser).toHaveBeenCalledWith({
        advertiserId: 'adv-1',
        slug: undefined,
        language: LanguageEnum.EN_US,
      });
      expect(result).toEqual(mockAdvertiser);
    });

    it('should get advertiser by slug when slug is provided', async () => {
      advertiserService.getAdvertiser.mockResolvedValue(mockAdvertiser);

      const args = new GetAdvertiserArgs();
      args.slug = 'test-advertiser';

      const result = await resolver.advertiser(args);

      expect(advertiserService.getAdvertiser).toHaveBeenCalledWith({
        advertiserId: undefined,
        slug: 'test-advertiser',
        language: LanguageEnum.EN_US,
      });
      expect(result).toEqual(mockAdvertiser);
    });

    it('should prioritize advertiserId when both advertiserId and slug are provided', async () => {
      advertiserService.getAdvertiser.mockResolvedValue(mockAdvertiser);

      const args = new GetAdvertiserArgs();
      args.advertiserId = 'adv-1';
      args.slug = 'test-advertiser';

      const result = await resolver.advertiser(args);

      expect(advertiserService.getAdvertiser).toHaveBeenCalledWith({
        advertiserId: 'adv-1',
        slug: 'test-advertiser',
        language: LanguageEnum.EN_US,
      });
      expect(result).toEqual(mockAdvertiser);
    });
  });
});
