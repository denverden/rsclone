import express from 'express';
import Group from '../controllers/groupController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/all', Group.getAllGroup);

router.get('/:id', Group.getGroup);

router.post('/add', roleMiddleware(['ADMIN']), Group.createGroup);

router.patch('/:id', roleMiddleware(['ADMIN']), Group.updateGroup);

router.delete('/:id', roleMiddleware(['ADMIN']), Group.deleteGroup);

export default router;
