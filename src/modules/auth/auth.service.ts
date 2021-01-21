import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly encrptionService: EncryptionService
	) {}

	async validateUser(username: string, pass: string) {
		let user = await this.userService.findUserByUsername(username);
		if (!user)
			return new HttpException("User not found", HttpStatus.UNAUTHORIZED);

		let passwordsMatched = await this.encrptionService.comparePassword(pass, user.password);
		if (!passwordsMatched) {
			return new HttpException(
				"Passwords are not matched",
				HttpStatus.UNAUTHORIZED
			);
		}
		const { password, ...result } = user;
		return result;
	}

	async generateToken(user: any) {
		//generateJWT
		const payload = { username: user.username, sub: user.user };
		return {
			access_token: this.jwtService.signAsync(payload),
		};
	}

	
}
