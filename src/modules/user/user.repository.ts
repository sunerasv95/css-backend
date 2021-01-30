import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import User from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createNewUser(userData: CreateUserDto): Promise<any> {
		const user = await this.findOne({ email: userData.email });
		if (user) {
			throw new HttpException("Email address is already exists", HttpStatus.BAD_REQUEST);
		}

		const entity = new User();

		entity.email = userData.email;
		entity.phone = userData.phone;
		entity.username = userData.username;
		entity.password = userData.password;
		entity.isActive = 1;

		await this.save(entity);
		const { password, ...result } = entity;
		return result;
	}
}
