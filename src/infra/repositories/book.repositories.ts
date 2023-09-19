import { BookM, UpdatedFieldsBook } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

import { ExceptionsService } from '../exceptions/exceptions.service';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseBookRepositories implements BookRepository {
  constructor(
    private readonly exceptionService: ExceptionsService,
    @Inject('BOOK_MODEL')
    private readonly bookModel: Model<BookM>,
  ) {}

  async insert(book: BookM): Promise<BookM> {
    const result = new this.bookModel(book);
    result.save();

    return result;
  }

  async findAll(available?: boolean): Promise<BookM[]> {
    if (available) return await this.bookModel.find({ available }).exec();
    else return await this.bookModel.find().exec();
  }

  async findById(id: string): Promise<BookM> {
    return await this.bookModel.findOne({ _id: id });
  }

  async updateContent(id: string, book: UpdatedFieldsBook): Promise<BookM> {
    await this.bookModel.updateOne({ _id: id }, { ...book });

    return await this.findById(id);
  }

  async reserveContent(id: string, available: boolean): Promise<BookM> {
    await this.bookModel.updateOne({ _id: id }, { available });

    return await this.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.bookModel.deleteOne({ _id: id });
    return;
  }
}
