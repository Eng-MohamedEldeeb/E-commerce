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
import { User } from 'src/common/decorators/user/userParam.decorator';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('dashboard/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @CacheTTL(1000)
  getCategories(@Query() query: CategoryQueryDTO) {
    return this.categoryService.find(query);
  }

  @Post()
  @Auth(UserRoles.admin)
  @UseInterceptors(
    FileInterceptor('file', localMulterConfig()),
    CloudInterceptor,
  )
  create(@User('_id') userId, @Body() body: AddCategoryDTO) {
    return this.categoryService.create(userId, body);
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
