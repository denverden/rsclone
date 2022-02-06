import express from 'express';
import Achievement from '../controllers/achievementController.js';

const router = express.Router();

router.get('/all', Achievement.getAllAchievement);

export default router;
