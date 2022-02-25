import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	
	createTypeOrmOptions(): TypeOrmModuleOptions {	
		return {
			namingStrategy: new SnakeNamingStrategy(),
			type: this.configService.get<string>("DATABASE_TYPE") as "mysql",
			host: this.configService.get<string>("DATABASE_HOST"),
			port: Number(this.configService.get<string>("DATABASE_PORT")),
			username: this.configService.get<string>("DATABASE_USERNAME"),
			password: this.configService.get<string>("DATABASE_PASSWORD"),
			database: this.configService.get<string>("DATABASE_NAME"),
			entities: [__dirname + "/../**/*.entity{.ts,.js}"],
			migrations: [ "migration/*.js" ],
    		cli: {
        		"migrationsDir": "migration"
			},
			synchronize: true
			//autoLoadEntities: true
		};
	}
}
