import { Container } from "inversify";
import BooksRepository from "../classes/abstract/BooksRepository";

const container = new Container();
container.bind(BooksRepository).toSelf();

export default { container };
