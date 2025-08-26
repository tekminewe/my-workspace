import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { Role, Permission, PermissionEnum } from '@prisma/client';

@Exclude()
export class PermissionDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({
    enum: PermissionEnum,
  })
  @Expose()
  name: PermissionEnum;

  constructor(partial: Partial<Permission>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UserRoleDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: [PermissionDto] })
  @Expose()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];

  constructor(partial: Partial<Role & { permissions: Permission[] }>) {
    Object.assign(this, partial);
    this.permissions = partial.permissions.map(
      (permission) => new PermissionDto(permission),
    );
  }
}
