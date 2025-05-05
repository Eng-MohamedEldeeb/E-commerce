import { Injectable } from '@nestjs/common';
import { BrandQueryDTO } from './dto/getBrand.dto';
import { FilterQuery } from 'mongoose';
import { IsMongoIdDTO } from 'src/common/DTO/mongoId.dto';
import { UpdateBrandDTO } from './dto/updateBrand.dto';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';
import { BrandRepository } from 'src/db/repositories/brand.repo';
import { TBrand } from 'src/db/Models/Brand/Types/TBrand.types';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  find(query: BrandQueryDTO) {
    return asyncHandler(async () => {
      let filter: FilterQuery<TBrand> = {};

      if (query?.name) {
        filter = {
          $or: [
            {
              name: {
                $regex: query.name,
                $options: 'i',
              },
            },
            {
              slug: {
                $regex: query.name,
                $options: 'i',
              },
            },
          ],
        };
      }
      return await this.brandRepository.find({
        filter,
        projection: query.select,
        sort: query.sort,
        page: query.page,
      });
    });
  }

  create(data: Partial<TBrand>) {
    return asyncHandler(async () => {
      const category = await this.brandRepository.create(data);
      return {
        category,
      };
    });
  }

  update({ id }: IsMongoIdDTO, data: UpdateBrandDTO) {
    return asyncHandler(async () => {
      return await this.brandRepository.updateById({
        id,
        data,
        options: { lean: true, new: true },
      });
    });
  }
}
