import { UserLoginM, UserM } from 'src/domain/model';
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseAuthRepositories implements AuthRepository {
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserM>,
  ) {}

  async login(login: UserLoginM): Promise<any> {
    const user = await this.userModel.findOne({
      email: login.email,
    });

    if (
      user &&
      (await this.bcryptService.compare(login.password, user.password))
    ) {
      const payload = { sub: user.id, email: user.email, role: user.type };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      this.exceptionService.unauthorizedException({
        message: 'Wrong username or password',
      });
    }
  }
}
