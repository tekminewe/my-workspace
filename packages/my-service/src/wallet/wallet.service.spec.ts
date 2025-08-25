import { Test, TestingModule } from '@nestjs/testing';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { WalletService } from './wallet.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailS2SService } from 'src/email/email.s2s.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const mockPrismaService = {
      userWallet: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      userWalletTransaction: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: ENHANCED_PRISMA,
          useValue: mockPrismaService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: EmailS2SService,
          useValue: {
            sendEmail: jest.fn(),
            getEmailTemplate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
