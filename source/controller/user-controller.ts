import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import Logger from '../config/logging';

const NAME_SPACE = 'User Route';

const validateToken = (request: Request, response: Response, next: NextFunction) => {
    Logger.info(NAME_SPACE, `Token validated and user authorized`);

    response.status(200).json(
        {
            message: 'User authorized successfully..'
        }
    );
};

const register = (request: Request, response: Response, next: NextFunction) => {
    Logger.info(NAME_SPACE, `Register customer`);

    let { username, password } = request.body;
    bcryptjs.hash(password, 15, (hashError, hash) => {
        if (hashError) {
            return response.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
    });

    //Insert into user document

};

const login = (request: Request, response: Response, next: NextFunction) => {

};

const getAllUsers = (request: Request, response: Response, next: NextFunction) => {

};

export default { validateToken, register, login, getAllUsers }