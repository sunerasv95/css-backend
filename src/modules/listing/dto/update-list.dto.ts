import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNumber, IsString } from 'class-validator';
import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(CreateListDto){}