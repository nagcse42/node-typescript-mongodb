import { NextFunction, Request, Response } from 'express';
import book from '../models/Book';

const getAllBooks = (request: Request, response: Response, next: NextFunction) => {
    book.find()
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

export default { getAllBooks };