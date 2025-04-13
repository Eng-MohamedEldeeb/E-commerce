import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { CloudInterceptor } from 'src/common/interceptors/cloud.upload.interceptor';
import { localMulterConfig } from 'src/common/utils/upload/config/local.upload.config';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { AddCategoryDTO } from './dto/addCategory.dto';
import { CategoryQueryDTO } from './dto/getCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { IsMongoIdDTO } from 'src/common/DTO/mongoId.dto';

@Controller('dashboard/category')
@UseInterceptors(FileInterceptor('file', localMulterConfig()), CloudInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(@Query() query: CategoryQueryDTO) {
    return this.categoryService.find(query);
  }

  @Auth(UserRoles.admin)
  @Post()
  create(@Body() body: AddCategoryDTO) {
    return this.categoryService.create(body);
  }

  @Auth(UserRoles.admin)
  @Patch(':id')
  update(
    @Param() categoryID: IsMongoIdDTO,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return this.categoryService.update(categoryID, updateCategoryDTO);
  }
}
