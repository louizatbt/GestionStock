import express from 'express';
import { createCarton, deleteCarton, getAllCartons, getCartonById, updateCarton } 
from '../controllers/carton.controller.js';


const router = express.Router();

router.get('/', getAllCartons);
router.get('/:id', getCartonById);
router.post('/', createCarton);
router.put('/:id', updateCarton);
router.delete('/:id', deleteCarton);

export default router;
