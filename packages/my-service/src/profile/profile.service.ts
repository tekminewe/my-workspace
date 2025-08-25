import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto, ProfileDto, UpdateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async createProfile({
    userId,
    companyName,
    ...data
  }: CreateProfileDto & {
    userId: string;
  }) {
    return this.db.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      const profile = await tx.profile.create({
        data: {
          ...data,
          userId,
        },
      });

      return { company, profile };
    });
  }

  async getProfile({ userId }: { userId: string }) {
    return this.db.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async updateProfile({
    userId,
    ...data
  }: UpdateProfileDto & {
    userId: string;
  }) {
    const profile = await this.db.profile.findUnique({ where: { userId } });
    if (!profile) {
      const profile = await this.db.profile.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          languageId: data.languageId,
          userId,
        },
      });

      return new ProfileDto(profile);
    }

    const newProfile = await this.db.profile.update({
      data,
      where: {
        userId: userId,
      },
    });

    return new ProfileDto(newProfile);
  }
}
