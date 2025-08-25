import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailS2SController } from './email.s2s.controller';
import { EmailS2SService } from './email.s2s.service';
import { EmailClient } from './base.client';
import { MailgunClient } from './mailgun.client';

const emailClientProvider = {
  provide: EmailClient,
  useClass: MailgunClient,
};

@Module({
  imports: [AuthModule, PrismaModule],
  exports: [EmailS2SService, emailClientProvider],
  controllers: [EmailS2SController],
  providers: [EmailS2SService, emailClientProvider],
})
export class EmailModule {}
