import { UserLoginM } from 'src/domain/model';
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseAuthRepositories implements AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
    private jwtService: JwtService,
  ) {}

  async login(login: UserLoginM): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: login.email,
      },
    });

    if (!user)
      this.exceptionService.badRequestException({
        message: 'Wrong username or password',
      });

    const passwordIsMatch = await bcrypt.compare(login.password, user.password);

    if (!passwordIsMatch)
      this.exceptionService.forbiddenException({
        message: 'Wrong username or password',
      });

    const payload = { sub: user.id, email: user.email, role: user.type };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
