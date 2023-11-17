import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: Model<Book>,
  ) {}

  async findAll() {
    const books = await this.bookModel.find().exec();
    console.log('Books from backend:', books);
    return books;
  }
  async update(id: string, book: Book): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }
  async create(book: Book) {
    return await this.bookModel.create(book);
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id).exec();
  }

  async remove(id: string) {
    return await this.bookModel.findByIdAndRemove(id).exec();
  }
}
