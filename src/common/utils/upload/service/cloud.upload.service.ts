import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloud.upload.config';
import { IUploadFileOptions } from './interface/cloudOptions.interface';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudService {
  constructor(private readonly cloud = cloudinary) {}

  async uploadFile({
    path,
    folder,
    public_id,
  }: IUploadFileOptions): Promise<UploadApiResponse> {
    return await this.cloud.uploader.upload(path, { folder, public_id });
  }

  async destroyFile(public_id: string): Promise<any> {
    return await this.cloud.uploader.destroy(public_id);
  }

  async destroyAllResources(path: string): Promise<any> {
    return await this.cloud.api.delete_resources_by_prefix(path);
  }

  async destroyFolder(path: string): Promise<any> {
    return await this.destroyAllResources(path).then(() =>
      this.cloud.api.delete_folder(path),
    );
  }
}
