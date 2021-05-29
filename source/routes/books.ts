import express from 'express';
import booksController from '../controller/books-controller';

const router = express.Router();

router.get('/getAll', booksController.getAllBooks);
router.post('/create', booksController.createBook);

export = router;
