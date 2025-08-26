import { Test, TestingModule } from '@nestjs/testing';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { CompanyUserService } from './company-user.service';

describe('CompanyUserService', () => {
  let service: CompanyUserService;

  beforeEach(async () => {
    const mockPrismaService = {
      companyUser: {
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
        CompanyUserService,
        {
          provide: ENHANCED_PRISMA,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CompanyUserService>(CompanyUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
