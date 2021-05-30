import { Request, Response, NextFunction } from 'express';
import bcryptjs, { hash } from 'bcryptjs';
import Logger from '../config/logging';
import mongoose from 'mongoose';
import User from '../models/User';
import signJWT from '../functions/signJWT';

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

        //Save it in User Document
        const _user = new User(
            {
                _id: new mongoose.Types.ObjectId(),
                username: username,
                password: hash
            }
        );

        _user.save()
            .then(result => {
                return response.status(200).json({
                    result
                });
            })
            .catch(error => {
                return response.status(500).json(
                    {
                        message: error.message,
                        error
                    }
                );
            });
    });

};

const login = (request: Request, response: Response, next: NextFunction) => {
    Logger.info(NAME_SPACE, `Login customer`);
    let { username, password } = request.body;

    User.find(username)
        .exec()
        .then(users => {
            if (users.length !== 1) {
                return response.status(401)
                    .json({
                        message: 'Unauthorized user'
                    });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    Logger.info(NAME_SPACE, error.message, error);

                    return response.status(401)
                        .json({
                            message: 'Unauthorized user'
                        });
                } else if (result) {
                    signJWT(users[0], (error, token) => {
                        if (error) {
                            Logger.info(NAME_SPACE, 'Unable to sign token', error);

                            return response.status(401)
                                .json({
                                    message: 'Unauthorized user',
                                    error
                                });
                        } else if (token) {
                            return response.status(200)
                                .json({
                                    message: 'Authorized successfully.',
                                    token,
                                    user: users[0]
                                });
                        }
                    })
                }
            })
        })
        .catch(error => {
            return response.status(500).json(
                {
                    message: error.message,
                    error
                }
            );
        });
};

const getAllUsers = (request: Request, response: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then(users => {
            return response.status(200)
                .json(
                    {
                        users,
                        count: users.length
                    }
                );
        })
        .catch(error => {
            return response.status(500).json(
                {
                    message: error.message,
                    error
                }
            );
        });
};

export default { validateToken, register, login, getAllUsers }