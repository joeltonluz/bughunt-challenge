import { Inject, Injectable } from '@nestjs/common';
import { UserM, UserWithoutPasswordM } from 'src/domain/model';
import { UserRepository } from 'src/domain/repositories';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseUserRepositories implements UserRepository {
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly bcryptService: BcryptService,
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserM>,
  ) {}

  async insert(user: UserM): Promise<UserWithoutPasswordM> {
    const { email } = user;
    const hasUser = await this.userModel.findOne({ email });

    if (hasUser)
      this.exceptionService.badRequestException({
        message: 'User already exists',
      });

    user.password = await this.bcryptService.hash(user.password);
    const result = new this.userModel(user);
    result.save();

    return {
      _id: String(result._id),
      name: result.name,
      email: result.email,
      type: result.type,
    };
  }
}
