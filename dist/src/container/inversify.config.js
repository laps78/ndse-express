"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var BookService_1 = __importDefault(require("../classes/BookService"));
var container = new inversify_1.Container();
container.bind(BookService_1.default).toSelf();
exports.default = container;
