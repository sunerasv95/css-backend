import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async loginUser(@Body() loginData: UserLoginDto): Promise<any> {
        return this.authService.loginUser(loginData);
    }   
}
