import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { CompanyUserModule } from './company-user/company-user.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { MediaModule } from './media/media.module';
import { XRayMiddleware } from './tracing/xray.middleware';
import { PageModule } from './page/page.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { BonusModule } from './bonus/bonus.module';
import { SiteModule } from './site/site.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentChannelModule } from './payment-channel/payment-channel.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { EmailModule } from './email/email.module';
import { RoleModule } from './role/role.module';
import { CarouselModule } from './carousel/carousel.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PaginationModule } from './pagination/pagination.module';
import { LanguageModule } from './language/language.module';
import { NotificationModule } from './notification/notification.module';
import { ImageGenerationModule } from './image-generation/image-generation.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [
        AffiliateModule,
        BonusModule,
        CarouselModule,
        MediaModule,
        PaginationModule,
        PostModule,
        LanguageModule,
        SiteModule,
        ImageGenerationModule,
      ],
    }),
    ConfigModule.forRoot(),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    RoleModule,
    UserModule,
    AuthModule,
    PrismaModule,
    ProfileModule,
    CompanyUserModule,
    CompanyModule,
    PostModule,
    MediaModule,
    PageModule,
    AffiliateModule,
    BonusModule,
    SiteModule,
    WalletModule,
    PaymentMethodModule,
    PaymentChannelModule,
    WithdrawalModule,
    EmailModule,
    CarouselModule,
    LanguageModule,
    NotificationModule,
    ImageGenerationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XRayMiddleware).forRoutes('*');
  }
}
