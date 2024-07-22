import { Router } from 'express';
import categoryController from '../controllers/category-controller';
const router = Router();

router.post("/", categoryController.createCategory)
router.get("/", categoryController.allCategories)

export default router;
