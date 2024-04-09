import { injectable } from "inversify";
import { Book as BookType } from "../interfaces/Book";
import bookModel from "../models/book.model";
import BooksRepository from "./abstract/BooksRepository";

@injectable()
export default class BookService extends BooksRepository {
  async createBook(book: BookType) {
    const newBook = new bookModel(book);
    await newBook.save();
    return newBook;
  }

  async getBooks(): Promise<BookType[] | null> {
    const books: BookType[] = await bookModel.find().select("-__v");
    return books;
  }

  async getBook(id: string): Promise<BookType | null> {
    const foundBook: BookType = await bookModel.findById(id).select("-__v");
    return foundBook;
  }

  async updateBook(id: string, newBookData: BookType) {
    await bookModel.findByIdAndUpdate(id, newBookData);
  }

  async deleteBook(id: string) {
    await bookModel.findByIdAndDelete(id);
  }
}
