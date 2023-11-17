// src/books/book.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookInterface } from './schemas/book.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookInterface }]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BookModule {}
