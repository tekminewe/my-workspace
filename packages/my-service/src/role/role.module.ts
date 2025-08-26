import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  exports: [RoleService],
  imports: [forwardRef(() => AuthModule), PrismaModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
