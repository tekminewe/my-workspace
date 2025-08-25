import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRolesAndPermissions(userId: string): Promise<UserRoleDto[]> {
    const userRoles = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return userRoles.roles.map((role) => new UserRoleDto(role));
  }

  async getAllRoles(): Promise<UserRoleDto[]> {
    const roles = await this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });

    return roles.map((role) => new UserRoleDto(role));
  }

  async getRoleByName(name: string): Promise<UserRoleDto | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
      include: {
        permissions: true,
      },
    });

    return role ? new UserRoleDto(role) : null;
  }
}
