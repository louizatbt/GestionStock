import express from 'express';
import {
  
  createProduit,
  updateProduit,
  deleteProduit,
  getAllProduits,
  getProduitById
} from '../controllers/produit.controller.js';

const router = express.Router();

router.get('/', getAllProduits);
router.get('/:id', getProduitById);
router.post('/', createProduit);
router.put('/:id', updateProduit);
router.delete('/:id', deleteProduit);

export default router;
