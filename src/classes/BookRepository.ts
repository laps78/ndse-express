import "reflect-metadata";
import { injectable, inject } from "inversify";
import TYPES from "../types/types"; // TODO кажется это тут лишнее? или кажется?

/**
 * ЧТО ТУТ ИНЖЕКТИТЬ???
 * неясно, как связать существующий код с TS?
 *
 * для работы с mongoose нужна модель Book, но она
 * лежит в модуле другого типа и не импортируется
 * директивой import. Следует ли переписать реализацию??
 *
 *
 */
@injectable()
export default abstract class BooksRepository {
  /**
   * создание книги.
   */
  async createBook(
    book: object /* НЕ object но Книга. Как привязать? */
  ): Promise<null> {
    return null;
  }

  /**
   * получение книги по id.
   */
  async getBook(id: string): Promise<null> {
    return null;
  }

  /**
   * получение всех книг.
   */
  async getBooks(): Promise<null> {
    return null;
  }

  /**
   * обновление книги.
   */
  async updateBook(id: string): Promise<null> {
    return null;
  }

  /**
   * удаление книги.
   */
  async deleteBook(id: string): Promise<null> {
    return null;
  }
}
