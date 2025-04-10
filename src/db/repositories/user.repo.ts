import { Injectable } from '@nestjs/common';
import { DataBaseRepository } from './db.repo';
import { TUserDocument } from '../Models/User/Types/User.type';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Models/User/User.schema';
import { Model, Types } from 'mongoose';
import { TSingleReturn } from './Types/dbRepo.types';
import { errorResponse } from 'src/common/res/error.response';

@Injectable()
export class UserRepository extends DataBaseRepository<TUserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<TUserDocument>,
  ) {
    super(userModel);
  }

  async createUser(data: Partial<TUserDocument>) {
    const checkUser = await this.findOne({
      filter: { email: data.email },
    });
    if (checkUser) {
      return errorResponse('conflict', 'User Already Exists');
    }
    return this.create(data);
  }

  findByEmail(email: string): TSingleReturn<TUserDocument> {
    return this.findOne({
      filter: { email },
      projection: { _id: 1, email: 1 },
    });
  }

  async updatePassword({
    id,
    newPassword,
  }: {
    id: Types.ObjectId;
    newPassword: string;
  }) {
    const user = await this.findById({
      id,
      projection: { password: 1, passwords: 1 },
    });

    if (newPassword == user?.password)
      return errorResponse('bad-req', "newPassword Can't be used before");

    return this.updateById({
      id,
      data: { password: newPassword, $push: { password: newPassword } },
    });
  }
}
