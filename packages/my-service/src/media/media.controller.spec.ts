import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { AuthService } from 'src/auth/auth.service';

describe('MediaController', () => {
  let controller: MediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: {
            // Add mock methods as needed
            uploadMedia: jest.fn(),
            getMediaById: jest.fn(),
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

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
