import { Router } from 'express';
import AuthCtrl from '../controllers/auth.ctrl';
import { fetchUserFromToken } from '../middleware/passport';
import * as passportConfig from '../middleware/passport';
const router = Router();
router.use(fetchUserFromToken);
const authController = new AuthCtrl();

router.route('/signin').post(authController.login);
router.route('/register').post(authController.register);
router.route('/checkUserAuth').post(authController.checkUserAuth);
router.route('/restorePassword').post(authController.restorePassword);

export default router;
