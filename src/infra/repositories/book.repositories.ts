import { BookM, UpdatedFieldsBook } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DatabaseBookRepositories implements BookRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}
  async insert(book: BookM): Promise<BookM> {
    try {
      console.log('dentro do insert', book);
      const result = await this.prismaService.book.create({
        data: {
          ...book,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
      }
      console.log('errrooorrr', error.code);
      throw new Error(error);
    }
  }

  async findAll(available?: boolean): Promise<BookM[]> {
    const result = await this.prismaService.book.findMany({
      where: {
        available,
      },
    });
    return result;
  }

  async findById(id: string): Promise<BookM> {
    const result = await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async updateContent(id: string, book: UpdatedFieldsBook): Promise<BookM> {
    const result = await this.prismaService.book.update({
      where: {
        id,
      },
      data: {
        ...book,
      },
    });

    return result;
  }

  async reserveContent(id: string, available: boolean): Promise<BookM> {
    const result = await this.prismaService.book.update({
      where: {
        id,
      },
      data: {
        available,
      },
    });

    return result;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.book.delete({ where: { id } });
    return;
  }
}
