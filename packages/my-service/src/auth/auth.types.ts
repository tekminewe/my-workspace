import { Permission, PermissionEnum, Role } from '@prisma/client';

export interface ISessionUser {
  id: string;
  ipAddress: string;
  userAgent: string;
  referrer: string;
  company?: {
    id: string;
  };
  roles: (Role & { permissions: Permission[] })[];
  permissions: PermissionEnum[];
}
