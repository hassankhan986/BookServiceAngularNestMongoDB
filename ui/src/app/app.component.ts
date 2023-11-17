import {Component, OnInit, ViewChild} from '@angular/core';

// src/app/app.component.ts

import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import {BookService} from "./book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AddBookDialogComponent} from "./add-book-dialog/add-book-dialog.component";
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


export class Book {
  _id?: string; // Make id optional as it might be generated on the server side
  title: string;
  author: string;
  genre: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['title', 'genre', 'author'];
  dataSource = new MatTableDataSource<Book>([]);
  books: Book[] = [];
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';
    editingBook: Book = {author: "",genre: "", title: ""}; // initialize editingBook with an empty object
  constructor(private bookService: BookService, private authService: AuthService, private dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books; //can slice
      this.dataSource.data = books;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.loadBooks();
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        // Handle successful login, e.g., update isLoggedIn and reload the book list
        this.isLoggedIn = true;
        this.loadBooks();
      },
      error: (error) => {
        // Handle login error
        console.error('Login error:', error);

        // Handle login error
        // You might want to check the error object for specific information
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP error status:', error.status);
          console.error('Error message:', error.message);
          // Handle different HTTP status codes or error scenarios
        }
      },
    });
  }

  editBook(book: Book): void {
    this.editingBook = { ...book }; // Create a copy of the book to avoid modifying the original directly
    console.log(book._id, book.author);
  }


  addBook(): void {
    // Implement the logic to add a new book, using this.newBookTitle and this.newBookAuthor
    // Ensure the user is logged in before adding a new book
    if (!this.isLoggedIn) {
      console.error('User is not logged in. Cannot add a new book.');
      return;
    }

    if (!this.editingBook.title || !this.editingBook.author || !this.editingBook.genre) {
      // Open the error dialog
      this.dialog.open(AddBookDialogComponent, {
        data: { message: 'All fields are required to add a book.' },
      });
      return;
    }

    // Determine whether to add or update based on the existence of editingBook.id
    const isUpdate = !!this.editingBook._id;

    // Call the backend API to add/update a book
    const request = isUpdate
        ? this.bookService.updateBook(this.editingBook._id, this.editingBook)
        : this.bookService.addBook(this.editingBook);
    request.subscribe({
      error: (error) => {
        // Handle error while adding/updating the book
        console.error('Error adding/updating a book:', error);
      },
      next: () => {
        // Handle successful book addition/update, e.g., reload the book list
        this.loadBooks();
        // Reset editingBook after adding/updating a book
        this.editingBook = {author: "", genre: "", title: ""};
      },
    });
  }
}
