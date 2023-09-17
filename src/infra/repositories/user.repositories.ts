import { Injectable } from '@nestjs/common';
import { UserM } from 'src/domain/model';
import { UserRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class DatabaseUserRepositories implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async insert(user: UserM): Promise<any> {
    const userResult = await this.prismaService.user.create({
      data: {
        ...user,
      },
      // select: this.prismaService.prismaExclude('User', ['password']),
    });

    return userResult;
  }
}
