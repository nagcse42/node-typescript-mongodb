import { NextFunction, Request, Response } from 'express';

const getAllBooks = (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({
        message: 'Books List'
    })
};

export default { getAllBooks };