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

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'superuserpswd';
const MONGO_HOST = process.env.MONGO_HOST_URL || 'cluster0.ydsso.mongodb.net/node_ts_mongo?retryWrites=true&w=majority';
//mongodb+srv://superuser:<password>@cluster0.ydsso.mongodb.net/node_ts_mongo?retryWrites=true&w=majority
const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4200;

const server = {
    hostName: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: server,
    mongo: MONGO
};

export default config;
