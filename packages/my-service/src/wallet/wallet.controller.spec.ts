import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { AuthService } from 'src/auth/auth.service';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: {
            // Add mock methods as needed
            getWallets: jest.fn(),
            getWalletById: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: jest.fn(),
            getAcceptLanguage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
