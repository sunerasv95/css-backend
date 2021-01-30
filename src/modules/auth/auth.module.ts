import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigService } from "@nestjs/config";
import { EncryptionModule } from "../encryption/encryption.module";
import { RolesGuard } from "../role/guards/roles.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Module({
	imports: [
		EncryptionModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: "jwt",
			property: 'user',
			session: false
		}),
		JwtModule.registerAsync({
			imports: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret:
					process.env.JWT_SECRET || configService.get<string>("JWT_SECRET"),
				signOptions: {
					expiresIn:
						process.env.JWT_EXPIRES_IN ||
						configService.get<string>("JWT_EXPIRES_IN"),
				},
			}),
		}),
	],
	providers: [
		JwtStrategy, 
		AuthService,
		// RolesGuard,
		// JwtAuthGuard
	],
	controllers: [AuthController],
	exports: [AuthService, PassportModule],
})
export class AuthModule {}
