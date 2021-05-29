import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'nodeadmin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'nodeadmin123';
const MONGO_HOST = process.env.MONGO_HOST_URL || 'cluster0.kkvam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4200;
//Authorization properties
const SERVER_TOKEN_EXPIRE_TIME = process.env.SERVER_TOKEN_EXPIRE_TIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'nodeadmin';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'nodeadminsecrethash';

const server = {
    hostName: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRE_TIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    server: server,
    mongo: MONGO
};

export default config;
