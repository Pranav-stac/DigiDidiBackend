import { Router } from 'express';
import { protect, authorizeRoles } from '../middleware/auth.js';
import {
  createCategory,
  getAllCategories,
} from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAllCategories);
router.post('/', protect, authorizeRoles('admin'), createCategory);

export default router;
