import {Router} from 'express';
const router = Router();
import ApiCtrl from '../controllers/api.ctrl';

const apiController = new ApiCtrl();

router.route('/test').get(apiController.testApi);

export default router;