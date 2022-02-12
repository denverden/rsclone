import express from 'express';
import Log from '../controllers/logController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/:id?', roleMiddleware(['USER', 'ADMIN']), Log.getLog);

router.post('/add', roleMiddleware(['USER', 'ADMIN']), Log.createLog);

export default router;
