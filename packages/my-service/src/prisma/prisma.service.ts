import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // log: [
      //   {
      //     emit: 'stdout',
      //     level: 'query',
      //   },
      //   {
      //     emit: 'stdout',
      //     level: 'error',
      //   },
      //   {
      //     emit: 'stdout',
      //     level: 'info',
      //   },
      //   {
      //     emit: 'stdout',
      //     level: 'warn',
      //   },
      // ],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
