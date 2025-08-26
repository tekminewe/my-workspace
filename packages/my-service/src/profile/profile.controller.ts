import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto, ProfileDto } from './profile.dto';
import { AuthService } from 'src/auth/auth.service';
import { OkResponseDto } from 'src/app.dto';
import { CompanyEntity } from 'src/company/company.entity';
import { ApiDefinition } from 'src/api-definition.decorator';

@ApiBearerAuth()
@ApiExtraModels(OkResponseDto)
@ApiExtraModels(ProfileDto)
@ApiTags('Profile')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({
    description: 'Returns the profile and company of the user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              required: ['company', 'profile'],
              properties: {
                company: {
                  type: 'object',
                  $ref: getSchemaPath(CompanyEntity),
                },
                profile: {
                  type: 'object',
                  $ref: getSchemaPath(ProfileDto),
                },
              },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'createProfile' })
  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    const currentUser = this.authService.getCurrentUser();
    const result = await this.profileService.createProfile({
      userId: currentUser.id,
      ...createProfileDto,
    });
    return {
      company: new CompanyEntity(result.company),
      profile: new ProfileDto(result.profile),
    };
  }

  @ApiOkResponse({
    description: 'Returns the profile of the user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(ProfileDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getMyProfile' })
  @Get('me')
  async getProfile() {
    const currentUser = this.authService.getCurrentUser();
    const result = await this.profileService.getProfile({
      userId: currentUser.id,
    });
    return new ProfileDto(result);
  }

  @ApiDefinition({
    description: 'Returns the updated profile of the user',
    responseType: ProfileDto,
    operationId: 'updateMyProfile',
  })
  @Patch('me')
  async updateProfile(@Body() data: UpdateProfileDto) {
    const currentUser = this.authService.getCurrentUser();
    return this.profileService.updateProfile({
      userId: currentUser.id,
      ...data,
    });
  }
}
