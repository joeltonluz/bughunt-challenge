import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { UserFactoryModule } from 'src/usecases/factories/user-factory.module';
import { PostUserUseCase } from 'src/usecases/user/postUser.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserFactoryModule.POST_USER)
    private readonly postUserUc: PostUserUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async postUser(@Body() user: any) {
    return await this.postUserUc.execute(user);
  }
}
