import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'my-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookComponent implements OnInit {
  heading = 'Library';
  cash: number =0;
  books: Book[];

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.bookService.getBooks()
      .then(books => this.books = books.slice(0, 5));
  }

  totalCost(): number {
    let sum = 0;
    if (this.books) {
      for (let book of this.books) {
        if (!book.isAvailable) {
          sum += book.price;
        }
      }
    }
    return sum;
  }

  castDate(date) {
    return new Date(date);
  }

  cashLeft(): number{
    return (this.cash-this.totalCost());
  }

  buy(book) {
    if (this.cashLeft() >= book.price) {
      book.isAvailable = false;
    } else {
      alert("You don't have enough cash");
    }
  }

  cancelBuy(book) {
    book.isAvailable = true;
  }

}
