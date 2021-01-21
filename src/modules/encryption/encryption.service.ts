import { Injectable } from '@nestjs/common';
import { hashSync, compareSync} from 'bcrypt';
import * as config from 'config';


@Injectable()
export class EncryptionService {
    async hashPassword(plainText): Promise<string> {
		return await hashSync(plainText, 12);
	}

	async comparePassword(plainText: string, hashPassword: string): Promise<boolean> {
		return await compareSync(plainText, hashPassword);
	}
}
