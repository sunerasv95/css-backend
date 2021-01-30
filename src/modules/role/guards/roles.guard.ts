import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorators";
import { Role } from "../types/roles.enums";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
        ]);
        console.log("Can act", requiredRoles);
		if (!requiredRoles) {
			return true;
		}
        const req = context.switchToHttp().getRequest();
        //const { user } = req;
        console.log("USER", req);
        return true;
		//return requiredRoles.some((role) => user.roles?.includes(role));
	}
}
