import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { IsPublic } from 'src/domain/decorators/public.decorator';
import { PostLoginUseCase } from 'src/usecases/auth/postLogin.usecase';
import { AuthFactoryModule } from 'src/usecases/factories/auth-factory.module';

@Controller('login')
export class AuthController {
  constructor(
    @Inject(AuthFactoryModule.POST_LOGIN)
    private readonly postLoginUseCase: PostLoginUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Post()
  async postLogin(@Body() login: any, @Request() req: any) {
    return await this.postLoginUseCase.execute(login);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
