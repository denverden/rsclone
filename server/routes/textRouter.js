import express from 'express';
import Text from '../controllers/textController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/rand/:groupId?', Text.getText);

router.get('/all/:groupId?', Text.getAllText);

router.post('/add', roleMiddleware(['ADMIN']), Text.createText);

router.patch('/:id', roleMiddleware(['ADMIN']), Text.updateText);

router.delete('/:id', roleMiddleware(['ADMIN']), Text.deleteTexts);

export default router;
