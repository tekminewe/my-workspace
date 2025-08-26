import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AffiliateProviderDto,
  CreateAffiliateProviderDto,
  UpdateAffiliateProviderDto,
} from './provider.dto';
import { AffiliateProviderEnum } from '@prisma/client';

@Injectable()
export class ProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async createProvider(
    data: CreateAffiliateProviderDto & { companyId: string },
  ): Promise<AffiliateProviderDto> {
    const provider = await this.prisma.affiliateProvider.create({
      data,
    });
    return new AffiliateProviderDto(provider);
  }

  async getProviderById(
    id: AffiliateProviderEnum,
  ): Promise<AffiliateProviderDto> {
    const provider = await this.prisma.affiliateProvider.findUnique({
      where: { id },
    });
    return provider === null ? null : new AffiliateProviderDto(provider);
  }

  async updateProvider(
    id: AffiliateProviderEnum,
    data: UpdateAffiliateProviderDto,
  ): Promise<AffiliateProviderDto> {
    const provider = await this.prisma.affiliateProvider.update({
      where: { id },
      data,
    });
    return new AffiliateProviderDto(provider);
  }

  async deleteProvider(
    id: AffiliateProviderEnum,
  ): Promise<AffiliateProviderDto> {
    const provider = await this.prisma.affiliateProvider.delete({
      where: { id },
    });
    return new AffiliateProviderDto(provider);
  }

  async getAllProviders(): Promise<AffiliateProviderDto[]> {
    const providers = await this.prisma.affiliateProvider.findMany();
    return providers.map((provider) => new AffiliateProviderDto(provider));
  }
}
