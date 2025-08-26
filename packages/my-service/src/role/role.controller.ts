import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ApiDefinition } from 'src/api-definition.decorator';
import { UserRoleDto } from './role.dto';

@ApiBearerAuth()
@ApiTags('Role')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get roles and permissions of the current user',
    operationId: 'getUserRolesAndPermissions',
    responseType: UserRoleDto,
    dataType: 'array',
  })
  @Get('me')
  async getUserRolesAndPermissions() {
    const currentUser = this.authService.getCurrentUser();
    return this.roleService.getUserRolesAndPermissions(currentUser.id);
  }
}
