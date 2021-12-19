import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Wave } from "./wave.entity";

@Injectable()
@EntityRepository(Wave)
export class WaveRepository extends Repository<Wave> {}