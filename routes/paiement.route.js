import express from 'express';
import { createPaiement, deletePaiement, getAllPaiements, getPaiementById, 
    updatePaiement } from '../controllers/paiement.controller.js';


const router = express.Router();

router.get('/', getAllPaiements);
router.get('/:id', getPaiementById);
router.post('/', createPaiement);
router.put('/:id', updatePaiement);
router.delete('/:id', deletePaiement);

export default router;
