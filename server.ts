import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';

const NAMESPACE = 'server';
const router = express();

/**
 * Connect to mongo DB
 */
mongoose.connect(config.mongo.url, config.mongo.options).then(result => {
    console.log(NAMESPACE, 'Connected to mongo DB')
}).catch(error => {
    console.log(NAMESPACE, error);
})