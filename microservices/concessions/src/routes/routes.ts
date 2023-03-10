import express, {Router, Request, Response} from 'express';
import { createConcession } from '../controllers/createConcessionController.js';
import { deleteConcession } from '../controllers/deleteConcessionController.js';
import { getConcessions } from '../controllers/getConcessionsController.js';
import { updateConcession } from '../controllers/updateConcessionsController.js';
import { getAllConcessions } from '../controllers/getAllConcessionsController.js';

const router = Router();

router.post('/api/v1/concession', createConcession);
router.put('/api/v1/concession', updateConcession);
router.get('/api/v1/concessions', getConcessions);
router.get('/api/v1/concessions/all', getAllConcessions);
router.delete('/api/v1/concession', deleteConcession);

export {router};