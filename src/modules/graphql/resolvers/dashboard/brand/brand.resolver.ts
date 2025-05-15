import { Args, Query, Resolver } from '@nestjs/graphql';
import { BrandService } from 'src/modules/dashboard/brand/brand.service';
import { OneBrandResponse } from './types/res/oneBrandResponse.type';
import { GetBrandsQueryArgs } from './types/args/getBrandsQueryArgs.type';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => [OneBrandResponse], { name: 'getBrands' })
  async getBrands(@Args({ nullable: true }) queryArgs: GetBrandsQueryArgs) {
    const brands = await this.brandService.find(queryArgs);
    return brands;
  }
}
