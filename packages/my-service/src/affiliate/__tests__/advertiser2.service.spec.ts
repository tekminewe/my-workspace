import { Test, TestingModule } from '@nestjs/testing';
import { AdvertiserService2 } from '../advertiser2.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { AdvertiserStatusEnum } from '@prisma/client';
import { SearchService } from 'src/search/search.service';

describe('AdvertiserService2', () => {
  let service: AdvertiserService2;

  // Mock services
  const mockPrismaService = {
    advertiser: {
      findMany: jest.fn(),
      findFirstOrThrow: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    advertiserCommission: {
      findFirst: jest.fn(),
    },
  };

  const mockPaginationService = {
    getPaginationCriteria: jest.fn(),
  };

  const mockSearchService = {
    indexObjects: jest.fn(),
    removeObject: jest.fn(),
    clearIndex: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvertiserService2,
        {
          provide: ENHANCED_PRISMA,
          useValue: mockPrismaService,
        },
        {
          provide: PaginationService,
          useValue: mockPaginationService,
        },
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    service = module.get<AdvertiserService2>(AdvertiserService2);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('indexAdvertiser', () => {
    it('should index an advertiser', async () => {
      // Arrange
      const advertiserId = 'test-advertiser-id';
      const mockAdvertiser = {
        id: advertiserId,
        slug: 'test-slug',
        metadatas: [{ languageId: 'en_US', name: 'Test Name' }],
        categories: [
          {
            id: 'category-id',
            metadatas: [{ languageId: 'en_US', name: 'Category Name' }],
          },
        ],
        commissions: [
          {
            commissionShare: 10,
            commissionRows: [
              { commission: 10, metadatas: [{ name: 'Commission Type' }] },
            ],
          },
        ],
        logo: { id: 'logo-id', filePath: 'path/to/logo.jpg' },
      };

      mockPrismaService.advertiser.findMany.mockResolvedValue([mockAdvertiser]);

      // Act
      await service.indexAdvertiser({ advertiserId });

      // Assert
      expect(mockPrismaService.advertiser.findMany).toHaveBeenCalledWith({
        where: { id: advertiserId },
        include: expect.any(Object),
      });
      expect(mockSearchService.indexObjects).toHaveBeenCalledWith({
        indexName: expect.any(String),
        objects: [expect.objectContaining({ objectID: advertiserId })],
      });
    });
  });

  describe('removeAdvertiserIndex', () => {
    it('should remove an advertiser from the search index', async () => {
      // Arrange
      const advertiserId = 'test-advertiser-id';

      // Act
      await service.removeAdvertiserIndex({ advertiserId });

      // Assert
      expect(mockSearchService.removeObject).toHaveBeenCalledWith({
        objectKey: advertiserId,
        indexName: expect.any(String),
      });
    });
  });

  describe('refreshAdvertiserSearchIndex', () => {
    it('should refresh a specific advertiser when advertiserId is provided', async () => {
      // Arrange
      const advertiserId = 'test-advertiser-id';
      const mockRemoveAdvertiserIndex = jest
        .spyOn(service, 'removeAdvertiserIndex')
        .mockResolvedValue();
      const mockIndexAdvertiser = jest
        .spyOn(service, 'indexAdvertiser')
        .mockResolvedValue();

      // Act
      const result = await service.refreshAdvertiserSearchIndex({
        advertiserId,
      });

      // Assert
      expect(mockRemoveAdvertiserIndex).toHaveBeenCalledWith({ advertiserId });
      expect(mockIndexAdvertiser).toHaveBeenCalledWith({ advertiserId });
      expect(result).toEqual({ success: true });
    });

    it('should refresh all active advertisers when advertiserId is not provided', async () => {
      // Arrange
      const mockAdvertisers = [
        { id: 'advertiser-1' },
        { id: 'advertiser-2' },
        { id: 'advertiser-3' },
      ];
      mockPrismaService.advertiser.findMany.mockResolvedValue(mockAdvertisers);
      const mockIndexAdvertiser = jest
        .spyOn(service, 'indexAdvertiser')
        .mockResolvedValue();

      // Act
      const result = await service.refreshAdvertiserSearchIndex({});

      // Assert
      expect(mockSearchService.clearIndex).toHaveBeenCalledWith({
        indexName: expect.any(String),
      });
      expect(mockPrismaService.advertiser.findMany).toHaveBeenCalledWith({
        where: {
          statusId: AdvertiserStatusEnum.Active,
        },
        select: {
          id: true,
        },
      });
      expect(mockIndexAdvertiser).toHaveBeenCalledTimes(3);
      expect(mockIndexAdvertiser).toHaveBeenCalledWith({
        advertiserId: 'advertiser-1',
      });
      expect(mockIndexAdvertiser).toHaveBeenCalledWith({
        advertiserId: 'advertiser-2',
      });
      expect(mockIndexAdvertiser).toHaveBeenCalledWith({
        advertiserId: 'advertiser-3',
      });
      expect(result).toEqual({ success: true });
    });
  });
});
