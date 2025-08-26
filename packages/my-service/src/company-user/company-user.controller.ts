import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyUserService } from './company-user.service';
import { AuthService } from 'src/auth/auth.service';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { PaginatedOkResponse } from 'src/app.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

@ApiBearerAuth()
@ApiTags('Company User')
@ApiExtraModels(PaginatedOkResponse)
@ApiExtraModels(UserEntity)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('companies')
export class CompanyUserController {
  constructor(
    private readonly companyUserService: CompanyUserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Get all company users with pagination',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedOkResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserEntity) },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getMyCompanyUsers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @Get('me/users')
  async getMyCompanyUsers(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const result = await this.companyUserService.getCompanyUsers({
      companyId: currentUser.company.id,
      page,
      pageSize,
    });

    return {
      data: result.users.map((user) => new UserEntity(user)),
      pagination: new PaginationDto(result.total, page, pageSize),
    };
  }
}
