import express from 'express';
import { createCommande, deleteCommande, getAllCommandes, getCommandeById, 
    updateCommande } from '../controllers/commande.controller.js';


const router = express.Router();

router.get('/', getAllCommandes);
router.get('/:id', getCommandeById);
router.post('/', createCommande);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);

export default router;
