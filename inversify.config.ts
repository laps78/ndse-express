import { Container } from "inversify";
// import TYPES from "./src/types/types"; // TODO ЗАЧЕМ ЭТО ТУТ???
import Repo from "./src/classes/BookRepository";

/**
 * Вот в этом месте не совсем понял что к чему нужно привязать,
 * чтобы все заработало, как надо.
 *
 * 1. Импортировал сущность контейнера из библиотеки
 * 2. Импортировал класс реализующий BookRepository
 *
 * (-) Также не совсем ясен синтаксис: Что указывается в <таких> скобках??
 * (-) Что делает toSelf?
 */
const container = new Container();
container.bind(Repo).toSelf();

export default { container };
