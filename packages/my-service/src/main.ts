import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import * as AWSXRay from 'aws-xray-sdk';
import { ResponseInterceptor } from './response.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV === 'production') {
    // Configure X-Ray
    AWSXRay.config([AWSXRay.plugins.EC2Plugin, AWSXRay.plugins.ECSPlugin]);
    AWSXRay.middleware.setSamplingRules({
      version: 2,
      rules: [
        {
          description: 'Default',
          host: '*',
          http_method: '*',
          url_path: '*',
          fixed_target: 1,
          rate: 1,
        },
      ],
      default: {
        fixed_target: 1,
        rate: 1,
      },
    });
    app.use(AWSXRay.express.openSegment('ApiService'));
  }
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('API Services')
    .setDescription('The API Services')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  if (process.env.NODE_ENV === 'production') {
    app.use(AWSXRay.express.closeSegment());
  }

  await app.listen(3020);
}
bootstrap();
