import { Router } from 'express';
import ApiUserCtrl from '../controllers/apiUser.ctrl';
import { fetchUserFromToken } from '../middleware/passport';
import * as passportConfig from '../middleware/passport'
const router = Router();

const apiUserController = new ApiUserCtrl();

router.use(fetchUserFromToken);

router.route('/createOrder').post(passportConfig.isAuthenticated, apiUserController.createOrder);
router.route('/getUserOrder').post(passportConfig.isAuthenticated, apiUserController.getUserOrder);

export default router;
