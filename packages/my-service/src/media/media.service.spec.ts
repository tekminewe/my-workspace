import { Test, TestingModule } from '@nestjs/testing';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { MediaService } from './media.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(async () => {
    const mockPrismaService = {
      media: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
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

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
