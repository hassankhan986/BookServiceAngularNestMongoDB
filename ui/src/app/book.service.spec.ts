import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from './app.component';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get books', () => {
    const mockBooks: Book[] = [{ _id: "123", author: "ABC", genre: "DEF", title: "GHI" /* Mock book data */ }];

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne('http://localhost:3000/books');
    expect(req.request.method).toEqual('GET');
    req.flush(mockBooks);
  });

  it('should add a book', () => {
    const mockBook: Book = {_id: "123", author: "ABC", genre: "DEF", title: "GHI" /* Mock book data */ };

    service.addBook(mockBook).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/books');
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });

  it('should update a book', () => {
    const mockBookId = '123';
    const mockUpdatedBook: Book = {_id: "123", author: "ABC", genre: "DEF", title: "GHI" /* Mock updated book data */ };

    service.updateBook(mockBookId, mockUpdatedBook).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/books/${mockBookId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  it('should delete a book', () => {
    const mockBookId = '123';

    service.deleteBook(mockBookId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/books/${mockBookId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
