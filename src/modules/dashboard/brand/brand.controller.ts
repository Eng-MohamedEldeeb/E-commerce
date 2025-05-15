import { BrandService } from './brand.service';
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
import { AddBrandDTO } from './dto/addBrand.dto';
import { BrandQueryDTO } from './dto/getBrand.dto';
import { UpdateBrandDTO } from './dto/updateBrand.dto';
import { IsMongoIdDTO } from 'src/common/DTO/mongoId.dto';
import { Types } from 'mongoose';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('dashboard/brand')
@UseInterceptors(FileInterceptor('file', localMulterConfig()), CloudInterceptor)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @CacheTTL(1000)
  getCategories(@Query() query: BrandQueryDTO) {
    return this.brandService.find(query);
  }

  @Auth(UserRoles.admin)
  @Post()
  create(@User('_id') userId: Types.ObjectId, @Body() body: AddBrandDTO) {
    return this.brandService.create(userId, body);
  }

  @Auth(UserRoles.admin)
  @Patch(':id')
  update(
    @Param() BrandID: IsMongoIdDTO,
    @Body() updateBrandDTO: UpdateBrandDTO,
  ) {
    return this.brandService.update(BrandID, updateBrandDTO);
  }
}
