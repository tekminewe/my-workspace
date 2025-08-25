import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthService } from 'src/auth/auth.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            // Add mock methods as needed
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
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

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
