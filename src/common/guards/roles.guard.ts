import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { AppMessages } from "@/common/AppMessages/app.messages";
import { AuthUser } from "@/common/interfaces/auth-user.interface";
import { Role } from "@/common/enums";
import { ROLES_KEY } from "@/common/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles?.length) {
			return true;
		}

		const request = context.switchToHttp().getRequest<Request>();

		const user = request.user as AuthUser;

		if (!user) {
			throw new UnauthorizedException(AppMessages.auth.unauthorized);
		}

		// OWNER bypass
		if (user.role === Role.OWNER) {
			return true;
		}

		if (!requiredRoles.includes(user.role)) {
			throw new ForbiddenException(AppMessages.general.forbidden);
		}

		return true;
	}
}
