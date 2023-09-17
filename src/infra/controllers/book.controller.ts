import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  PostBookUseCase,
  GetBookUseCase,
  GetBooksUseCase,
  PutBookUseCase,
  DeleteBookUseCase,
  PutAvailableBookUseCase,
} from 'src/usecases/book';
import { BookFactoryModule } from 'src/usecases/factories/book-factory.module';
import { AddBookDto, PutAvailableBookDto, PutBookDto } from './dto/book.dto';

@Controller('books')
export class BookController {
  constructor(
    @Inject(BookFactoryModule.POST_BOOK)
    private readonly postBookUc: PostBookUseCase,
    @Inject(BookFactoryModule.GET_BOOKS)
    private readonly getBooksUc: GetBooksUseCase,
    @Inject(BookFactoryModule.GET_BOOK)
    private readonly getBookUc: GetBookUseCase,
    @Inject(BookFactoryModule.PUT_BOOK)
    private readonly putBookUc: PutBookUseCase,
    @Inject(BookFactoryModule.PUT_AVAILABLE_BOOK)
    private readonly putAvailableBookUc: PutAvailableBookUseCase,
    @Inject(BookFactoryModule.DELETE_BOOK)
    private readonly deleteBookUseCase: DeleteBookUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async postBook(@Body() book: AddBookDto) {
    return await this.postBookUc.execute(book);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getBooks() {
    return await this.getBooksUc.execute();
  }

  @HttpCode(HttpStatus.OK)
  @Get('available')
  async getBooksAvailable() {
    return await this.getBooksUc.execute(true);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBook(@Param('id') id: string) {
    try {
      return await this.getBookUc.execute(id);
    } catch (error) {
      throw new HttpException('Forbidden', 403);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async putBook(
    @Param('id') id: string,
    @Body() { author, title }: PutBookDto,
  ) {
    return await this.putBookUc.execute(id, { author, title });
  }

  @HttpCode(HttpStatus.OK)
  @Put('available/:id')
  async reserveBook(
    @Param('id') id: string,
    @Body() { available }: PutAvailableBookDto,
  ) {
    return await this.putAvailableBookUc.execute(id, available);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.deleteBookUseCase.execute(id);
  }
}
