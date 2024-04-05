import { Container } from "inversify";
import Repo from "../classes/BookService";

const container = new Container();
container.bind(Repo).toSelf();

export default container;
