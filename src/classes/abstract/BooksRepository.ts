import { Book } from "../../interfaces/Book";
export abstract class BooksRepository {
  /**
   * создание книги.
   */
  createBook(book: Book) {}

  /**
   * получение книги по id.
   */
  getBook(id) {}

  /**
   * получение всех книг.
   */
  getBooks() {}

  /**
   * обновление книги.
   */
  updateBook(id) {}

  /**
   * удаление книги.
   */
  deleteBook(id) {}
}
