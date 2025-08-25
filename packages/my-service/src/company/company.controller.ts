import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { OkResponseDto } from 'src/app.dto';
import { AuthService } from 'src/auth/auth.service';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CompanyEntity } from './company.entity';

@ApiBearerAuth()
@ApiTags('Company')
@ApiExtraModels(OkResponseDto)
@ApiExtraModels(CompanyEntity)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Get company details of the current user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(CompanyEntity),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getMyCompany' })
  @Get('me')
  async getMe() {
    const user = await this.authService.getCurrentUser();
    const result = await this.companyService.getCompany({ userId: user.id });
    if (!result) {
      return null;
    }

    return new CompanyEntity(result);
  }
}
