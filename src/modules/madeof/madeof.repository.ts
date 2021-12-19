import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Madeof } from "./madeof.entity";

@Injectable()
@EntityRepository(Madeof)
export class MadeofRepository extends Repository<Madeof> {}