import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Accessory } from "./accessory.entity";

@Injectable()
@EntityRepository(Accessory)
export class AccessoryRepository extends Repository<Accessory> {}