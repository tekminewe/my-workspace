import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { Public } from './auth.decorator';
import { ApiDefinition } from 'src/api-definition.decorator';
import { CreateUserDto, VerifyEmailDto } from './auth.s2s.dto';
import { AuthS2SService } from './auth.s2s.service';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('AuthS2S')
@Controller('s2s/auth')
export class AuthS2SController {
  constructor(private readonly authService: AuthS2SService) {}

  @Public()
  @ApiDefinition({
    description: 'Create new user',
    operationId: 'createUser',
    responseType: UserEntity,
  })
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @Public()
  @ApiDefinition({
    description: 'Verify email',
    operationId: 'verifyEmail',
    responseType: UserEntity,
  })
  @Post('verifyEmail')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyUserEmail(body);
  }
}
