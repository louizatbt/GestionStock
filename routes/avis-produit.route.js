import express from 'express';
import { createAvisProduit, deleteAvisProduit, getAllAvisProduits,
     getAvisProduitById, updateAvisProduit } 
     from '../controllers/avis-produit.controller.js';

const router = express.Router();

router.get('/', getAllAvisProduits);
router.get('/:id', getAvisProduitById);
router.post('/', createAvisProduit);
router.put('/:id', updateAvisProduit);
router.delete('/:id', deleteAvisProduit);

export default router;
