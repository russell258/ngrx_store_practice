import { GoogleBooksService } from './book-list/books.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private booksService: GoogleBooksService, private store:Store){}

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string){
    this.store.dispatch(BooksActions.addBook({bookId}));
  }

  onRemove(bookId:string){
    this.store.dispatch(BooksActions.removeBook({bookId}));
  }

  ngOnInit():void{
    this.booksService.getBooks().subscribe((books)=>this.store.dispatch(BooksApiActions.retrievedBookList({books})));
  }

}
