import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from 'src/modules/dashboard/category/category.service';
import { OneCategoryResponse } from './types/res/oneCategoryResponse.type';
import { GetCategoriesQueryArgs } from './types/args/getCategoriesArgs.type';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [OneCategoryResponse], { name: 'getCategories' })
  async getCategories(
    @Args({
      nullable: true,
    })
    queryArgs: GetCategoriesQueryArgs,
  ) {
    const categories = await this.categoryService.find(queryArgs);

    return categories;
  }
}
