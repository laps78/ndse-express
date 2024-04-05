import { Book } from "../../interfaces/Book";
export default abstract class BooksRepository {
  abstract getBooks(): Promise<Book[] | null>;
  abstract getBook(id: string): Promise<Book | null>;
  abstract createBook(book: Book): void;
  abstract updateBook(id: string, book: Book): Promise<Book | null>;
  abstract deleteBook(id: string): Promise<Book | null>;
}
