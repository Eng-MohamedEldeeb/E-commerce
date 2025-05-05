import { PartialType } from '@nestjs/mapped-types';
import { AddBrandDTO } from './addBrand.dto';

export class UpdateBrandDTO extends PartialType(AddBrandDTO) {}
