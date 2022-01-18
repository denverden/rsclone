import express from 'express';
import User from '../controllers/userController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/registration', User.create);

router.post('/login', User.login);

router.get('/:id', roleMiddleware(['USER', 'ADMIN']), User.getUser);

router.patch('/:id', roleMiddleware(['USER', 'ADMIN']), User.updateUser);

router.delete('/:id', roleMiddleware(['ADMIN']), User.deleteUser);

export default router;
