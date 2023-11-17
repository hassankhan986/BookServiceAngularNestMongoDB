import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Set the HTTP status code to 201 Created
  create(@Body() book: Book) {
    return this.bookService.create(book);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const foundBook = this.bookService.findOne(id);
    if (!foundBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return foundBook;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Set the HTTP status code to 204 No Content
  remove(@Param('id') id: string) {
    const deletedBook = this.bookService.remove(id);
    if (!deletedBook) {
      // Consider returning a 404 Not Found response
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedBook: Book) {
    const result = this.bookService.update(id, updatedBook);
    if (!result) {
      // Handle the case where the book with the specified ID is not found
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return result;
  }
}
