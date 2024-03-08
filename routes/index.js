/**
 * Assign handlers to routes
 */
import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

router.get('/stats', AppController.getStats);
router.get('/status', AppController.getStatus);

export default router;
