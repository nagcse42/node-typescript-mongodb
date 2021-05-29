import Logger from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import UserInterface from '../interfaces/user-interface';

const NAME_SPACE = 'Signin JWT';

const signJWT = (user: UserInterface, callback: (error: Error | null, token: string | null,) => void): void => {
    let timeSincEpoch = new Date().getTime();
    let expirationTime = timeSincEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSec = Math.floor(expirationTime / 1000);

    Logger.info(NAME_SPACE, `Attempting token for ${user.username}`);
    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'ES256',
                expiresIn: expirationTimeInSec
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(error, token);
                }
            }
        )
    } catch (error) {
        Logger.error(NAME_SPACE, error.message, error);
        callback(error, null);
    }
}

export default signJWT;