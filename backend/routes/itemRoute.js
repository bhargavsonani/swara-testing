
// routes/itemRoutes.js
import express from 'express';
import { 
  addItem, 
  addItemWithCurrentSessionPdf, 
  getItemsByCreation, 
  deleteItem 
} from '../controllers/itemController.js';

const router = express.Router();

// Regular item operations
router.post('/add', addItem);
router.get('/creation/:creationId', getItemsByCreation);
router.delete('/:itemId', deleteItem);

// New endpoint for adding item with current session PDF
router.post('/addWithCurrentSessionPdf', addItemWithCurrentSessionPdf);

export default router;