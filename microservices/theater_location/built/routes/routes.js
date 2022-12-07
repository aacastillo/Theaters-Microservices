import { Router } from 'express';
import { getLocalTheaters } from '../controllers/getLocalTheaterController.js';
const router = Router();
router.get('/api/theaters/locate', getLocalTheaters);
export { router };