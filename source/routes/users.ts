import express from 'express';
import userController from '../controller/user-controller';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('validate', extractJWT, userController.validateToken);
router.post('register', userController.register);
router.post('login', userController.login);
router.get('getAllUsers', userController.getAllUsers);


export = router;