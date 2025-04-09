import express from 'express';
import { deleteUtilisateur, getAllUtilisateurs, getUtilisateur, register, 
    updateUtilisateur } from '../controllers/utilisateur.controller.js';

const router = express.Router();

router.get('/', getAllUtilisateurs);
router.get('/:id', getUtilisateur);
router.post('/', register);
router.put('/:id', updateUtilisateur);
router.delete('/:id', deleteUtilisateur);

export default router;
