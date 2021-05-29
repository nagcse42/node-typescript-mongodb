import express from 'express';
import userController from '../controller/user-controller';
import router from './books';

const route = express.Router();

router.get('validate', userController.validateToken);
router.post('register', userController.register);
router.post('login', userController.login);
router.get('getAllUsers', userController.getAllUsers);


export = router;