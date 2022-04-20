import { Router } from 'express';
import ApiCtrl from '../controllers/api.ctrl';
import { fetchUserFromToken } from '../middleware/passport';
const router = Router();

const apiController = new ApiCtrl();

router.use(fetchUserFromToken);

router.route('/test').get(apiController.testApi);

export default router;
