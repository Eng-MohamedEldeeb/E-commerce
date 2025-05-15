import { CloudService } from './../utils/upload/service/cloud.upload.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { IFileReq } from '../interfaces/ICustomRequest.interface';

@Injectable()
export class CloudInterceptor implements NestInterceptor {
  constructor(private readonly cloudService: CloudService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<IFileReq>();
    const file = request.file;
    if (file) {
      const { public_id, secure_url } = await this.cloudService.uploadFile({
        path: file.path,
        folder: `${process.env.APP_NAME}/category`,
      });

      request.body.image = { public_id, secure_url };

      return next.handle().pipe(
        catchError((err) => {
          this.cloudService.destroyFile(public_id);
          return throwError(() => err);
        }),
      );
    }
    return next.handle();
  }
}
