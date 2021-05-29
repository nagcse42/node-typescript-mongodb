import { Request, Response, NextFunction } from 'express';
import Logger from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAME_SPACE = 'Extract JWT';

const extractJWT = (request: Request, response: Response, next: NextFunction) => {
    Logger.info(NAME_SPACE, `Validating Token`);

    let token = request.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return response.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                response.locals.jwt = decoded;
                next();
            }
        })
    } else {
        response.status(401).json({
            message: 'Unauthorized please check with IT Team.'
        })
    }
}

export default extractJWT;