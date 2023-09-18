import { UserLoginM } from 'src/domain/model';
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Injectable()
export class DatabaseAuthRepositories implements AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(login: UserLoginM): Promise<any> {
    console.log('login', login.email, login.password);
    const user = await this.prismaService.user.findUnique({
      where: {
        email: login.email,
      },
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
