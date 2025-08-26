import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import {
  AffiliateProviderDto,
  CreateAffiliateProviderDto,
  UpdateAffiliateProviderDto,
} from './provider.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { PaginatedOkResponse, OkResponseDto } from 'src/app.dto';
import { AuthService } from 'src/auth/auth.service';
import { AffiliateProviderEnum } from '@prisma/client';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Affiliate')
@ApiExtraModels(OkResponseDto, PaginatedOkResponse, AffiliateProviderDto)
@Controller('affiliate/providers')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'Create a provider',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(AffiliateProviderDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'createProvider' })
  async createProvider(@Body() data: CreateAffiliateProviderDto) {
    const user = await this.authService.getCurrentUser();
    const provider = await this.providerService.createProvider({
      ...data,
      companyId: user.company.id,
    });
    return provider;
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({
    description: 'Get a provider',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(AffiliateProviderDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getProvider' })
  async getProviderById(@Param('id') id: AffiliateProviderEnum) {
    return this.providerService.getProviderById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a provider',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(AffiliateProviderDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'updateProvider' })
  async updateProvider(
    @Param('id') id: AffiliateProviderEnum,
    @Body() data: UpdateAffiliateProviderDto,
  ) {
    return this.providerService.updateProvider(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a provider',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(AffiliateProviderDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'deleteProvider' })
  async deleteProvider(@Param('id') id: AffiliateProviderEnum) {
    return this.providerService.deleteProvider(id);
  }

  @Public()
  @Get()
  @ApiOkResponse({
    description: 'Get all providers',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(AffiliateProviderDto),
              },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getAllProviders' })
  async getAllProviders() {
    return this.providerService.getAllProviders();
  }
}
