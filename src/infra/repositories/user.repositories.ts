import { Injectable } from '@nestjs/common';
import { UserM } from 'src/domain/model';
import { UserRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class DatabaseUserRepositories implements UserRepository {
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly prismaService: PrismaService,
  ) {}

  exclude(user: UserM, ...keys) {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async insert(user: UserM): Promise<any> {
    const hasUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (hasUser)
      this.exceptionService.badRequestException({
        message: 'User already exists',
      });

    user.password = hashSync(user.password, 10);

    const userResult = await this.prismaService.user.create({
      data: {
        ...user,
      },
    });

    return this.exclude(userResult, 'password');
  }
}
