import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";
import { EncryptionService } from "../encryption/encryption.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { throwError } from "rxjs";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly encrptionService: EncryptionService
	) {}

	async loginUser(payload: UserLoginDto) {
			const user = await this.validateUser(payload.username, payload.password);
			return await this.generateToken(user);
	}

	async validateUser(username: string, pass: string) {
		const user = await this.userService.findUserByUsername(username);
		if (!user ) throw new UnauthorizedException();

		let passwordsMatched = await this.encrptionService.comparePassword(
			pass,
			user.password
		);
		if (!passwordsMatched) {
			throw new HttpException(
				"Passwords are not matched",
				HttpStatus.UNAUTHORIZED
			);
		}
		const { password, ...result } = user;
		return result;
	}

	async generateToken(user: any) {
		const payload = { username: user.username, sub: user.user };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
