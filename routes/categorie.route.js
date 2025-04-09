import express from 'express';
import { createCategorie, deleteCategorie, getAllCategories, getCategorieById, 
    updateCategorie } from '../controllers/categorie.controller.js';


const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategorieById);
router.post('/', createCategorie);
router.put('/:id', updateCategorie);
router.delete('/:id', deleteCategorie);

export default router;
