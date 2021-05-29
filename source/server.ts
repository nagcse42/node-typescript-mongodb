import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import mongoose from 'mongoose';
import config from './config/config';
import healthCheck from './routes/sample';
import books from './routes/books';
import connectDB from './config/db-service'

const NAME_SPACE = 'Server';
const router = express();

/** Connect to Mongo DB unsing mongoose*/
mongoose.connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAME_SPACE, `Connected to Mongo DB :)`);
    })
    .catch((error) => {
        logging.error(NAME_SPACE, error.message, error);
    });

/** Connecting Mongo DB using Mongo Client */
//connectDB.connectDB();

/** Logging the request */
router.use((req, res, next) => {
    logging.info(NAME_SPACE, `Method - [${req.method}], URL-[${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAME_SPACE, `Method - [${req.method}], URL-[${req.url}], IP - [${req.socket.remoteAddress}],
         STATUS - [${res.statusCode}]`);
    })
    next();
});

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/app', healthCheck);
router.use('/books', books);

/** Error Handling */
router.use((req, res, next) => {
    const error = new Error('Resource Not Found');

    return res.status(404).json({
        message: error.message
    });

    next();
});


/** Create Server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAME_SPACE, `Server running on ${config.server.hostName} : ${config.server.port}`);
});

