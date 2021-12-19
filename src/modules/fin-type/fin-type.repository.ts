import { EntityRepository, Repository } from "typeorm";
import { FinType } from "./fin-type.entity";

@EntityRepository(FinType)
export class FinTypeRepository extends Repository<FinType> {}