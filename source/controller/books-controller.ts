import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = (request: Request, response: Response, next: NextFunction) => {
    let { author, title } = request.body;

    const book = new Book({
        _id: mongoose.Types.ObjectId(),
        author,
        title
    });

    book.save()
        .then(result => {
            return response.status(201).json({
                book: result
            });
        })
        .catch(error => {
            return response.status(500).json({
                message: error.message,
                error
            });
        })
};

const getAllBooks = (request: Request, response: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then((results) => {
            return response.status(200).json({
                books: results,
                count: results.length
            });
        })
        .catch((error) => {
            return response.status(500).json({
                message: error.message,
                error
            });
        })
};

export default { getAllBooks, createBook };