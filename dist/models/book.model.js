"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Описание отсутствует",
    },
    authors: {
        type: String,
        default: "Автор не установлен",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    modified: {
        type: Date,
        default: Date.now,
    },
});
var bookModel = (0, mongoose_1.model)("Book", bookSchema);
exports.default = bookModel;
