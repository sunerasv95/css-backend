import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { EncryptionService } from "../encryption/encryption.service";
import { CreateUserDto } from "./dto/create-user.dto";

import User from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createNewUser(userData: CreateUserDto): Promise<any> {
		const user = await this.findOne({ username: userData.username });
		if (user) {
			throw new HttpException("Username is exists", HttpStatus.BAD_REQUEST);
		}

		const entity = new User();

		entity.firstName = userData.firstName;
		entity.lastName = userData.lastName;
		entity.email = userData.email;
		entity.username = userData.username;
		entity.password = userData.password;
		entity.isActive = 1;

		await this.save(entity);
		const { password, ...result } = entity;
		return result;
	}
}
