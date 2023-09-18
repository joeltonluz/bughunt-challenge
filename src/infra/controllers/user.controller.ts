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
import { UserDto } from './dto/user.dto';
import { IsPublic } from 'src/domain/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserFactoryModule.POST_USER)
    private readonly postUserUc: PostUserUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @IsPublic()
  @Post()
  async postUser(@Body() user: UserDto) {
    return await this.postUserUc.execute(user);
  }
}
