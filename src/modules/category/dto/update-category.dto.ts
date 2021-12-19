import { PartialType } from "@nestjs/mapped-types";
import { IsEmpty, IsInt, IsNumber, IsString } from "class-validator";
import { Category } from "../category.entity";
import { CreateCatDto } from "./create-category.dto";

export class UpdateCatDto extends PartialType(CreateCatDto){}