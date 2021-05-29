import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAME_SPACE = 'Sample Controller';

const appHealthCheck = (request: Request, response: Response, next: NextFunction) => {
    logging.info(NAME_SPACE, 'Sample app health check route called.');

    return response.status(200).json({
        message: 'App health check is Good..'
    })
}

export default {
    appHealthCheck
};