import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { brandModel } from 'src/db/Models/Brand/Brand.model';
import { BrandRepository } from 'src/db/repositories/brand.repo';

@Module({
  imports: [brandModel],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository, CloudService],
})
export class BrandModule {}
