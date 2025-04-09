import express from 'express';
import { createFacture, deleteFacture, getAllFactures, getFactureById, 
    updateFacture } from '../controllers/facture.controller.js';

const router = express.Router();

router.get('/', getAllFactures);
router.get('/:id', getFactureById);
router.post('/', createFacture);
router.put('/:id', updateFacture);
router.delete('/:id', deleteFacture);

export default router;
