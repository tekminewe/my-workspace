import { Test, TestingModule } from '@nestjs/testing';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';
import { AuthService } from 'src/auth/auth.service';

describe('CompanyUserController', () => {
  let controller: CompanyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyUserController],
      providers: [
        {
          provide: CompanyUserService,
          useValue: {
            // Add mock methods as needed
            getCompanyUsers: jest.fn(),
            getCompanyUserById: jest.fn(),
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

    controller = module.get<CompanyUserController>(CompanyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
