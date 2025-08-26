import { Test, TestingModule } from '@nestjs/testing';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PageService } from './page.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PageService', () => {
  let service: PageService;

  beforeEach(async () => {
    const mockPrismaService = {
      page: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      pageMetadata: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PageService,
        {
          provide: ENHANCED_PRISMA,
          useValue: mockPrismaService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PageService>(PageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
