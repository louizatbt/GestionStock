import express from 'express';
import { createExpedition, deleteExpedition, getAllExpeditions, getExpeditionById, 
    updateExpedition } from '../controllers/expedition.controller.js';


const router = express.Router();

router.get('/', getAllExpeditions);
router.get('/:id', getExpeditionById);
router.post('/', createExpedition);
router.put('/:id', updateExpedition);
router.delete('/:id', deleteExpedition);

export default router;
