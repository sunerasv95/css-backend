import { Injectable } from '@nestjs/common';
import { hashSync, compareSync} from 'bcrypt';


@Injectable()
export class EncryptionService {
    async hashPassword(plainText): Promise<string> {
		return hashSync(plainText, 12);
	}

	async comparePassword(plainText: string, hashPassword: string): Promise<boolean> {
		return compareSync(plainText, hashPassword);
	}
}
