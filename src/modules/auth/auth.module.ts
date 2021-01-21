import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // property: 'user',
      // session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET || configService.get<string>('JWT_SECRET'),//jwtConfig.secret,
        signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || configService.get<string>('JWT_EXPIRES_IN') //jwtConfig.expiresIn
      }
      })
      
    })
  ],
  providers: [
    JwtStrategy, 
    AuthService
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    PassportModule
  ]
})
export class AuthModule {}
