import express from 'express';
import { createMouvement, getAllMouvements, getMouvementsByProduit } 
from '../controllers/stock-mouvement.controller.js';


const router = express.Router();

router.get('/', getAllMouvements);
router.get('/:produitId', getMouvementsByProduit);
router.post('/', createMouvement);


export default router;
