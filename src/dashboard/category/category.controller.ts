import { CategoryService } from './category.service';
import { Controller, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';

@Controller('dashboard/category')
@Auth(UserRoles.admin)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create() {
    // return this.categoryService.create()
  }
}
