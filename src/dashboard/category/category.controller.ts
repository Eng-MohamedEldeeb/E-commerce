import { CategoryService } from './category.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { CloudInterceptor } from 'src/common/interceptors/cloud.upload.interceptor';
import { localMulterConfig } from 'src/common/utils/upload/config/local.upload.config';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { AddCategoryDTO } from './dto/addCategory.dto';

@Controller('dashboard/category')
@Auth(UserRoles.admin)
@UseInterceptors(FileInterceptor('file', localMulterConfig()), CloudInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() body: AddCategoryDTO) {
    return { body };
    // return this.categoryService.create()
  }
}
