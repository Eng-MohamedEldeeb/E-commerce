import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { IsAuthenticated } from 'src/common/guards/IsAuthenticated.guard';
import { IsAuthorized } from 'src/common/guards/IsAuthorized.guard';
import { UserRoles } from 'src/db/Models/User/Types/User.type';

export const roles = 'roles';
export const Auth = (...allowedRoles: UserRoles[]) => {
  return applyDecorators(
    SetMetadata(roles, allowedRoles),
    UseGuards(IsAuthenticated, IsAuthorized),
  );
};
