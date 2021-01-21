import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || config.get<string>('JWT_SECRET')//jwtConfig.secret,
          });
	}

	// async validate(username:string, password: string) {
    //     const user = this.authService.validateUser(username, password);
    //     if(!user){
    //         throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    //     }

    //     return user;
	// 	// return { userId: payload.sub, username: payload.username };
    // }
    
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
      }
}
