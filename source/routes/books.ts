import express from 'express';
import booksController from '../controller/books-controller';

const router = express.Router();

router.get('/get/books', booksController.getAllBooks);

export = router;
