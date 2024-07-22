import { Router } from 'express';
import userController from '../controllers/user-controller';
const router = Router();

router.get('/:userId', userController.getUser);
router.get('/', userController.getAllUsers);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', userController.updateUserInformation);
router.patch('/change-password/:userId', userController.changePassword);

export default router;
