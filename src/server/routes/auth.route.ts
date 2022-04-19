import { Router } from 'express';
import AuthCtrl from '../controllers/auth.ctrl';
const router = Router();

const authController = new AuthCtrl();

router.route('/signin').post(authController.login);
router.route('/register').post(authController.login);

export default router;
