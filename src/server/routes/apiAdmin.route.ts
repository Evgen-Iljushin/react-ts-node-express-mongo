import { Router } from 'express';
import ApiAdminCtrl from '../controllers/apiAdmin.ctrl';
import { fetchUserFromToken } from '../middleware/passport';
import * as passportConfig from '../middleware/passport';
import { upload, uploadFiles } from '../middleware/fileUpload';
const router = Router();

const apiController = new ApiAdminCtrl();

router.use(fetchUserFromToken);

router.route('/test').get(apiController.testApi);
router.route('/createDryCleaner').post(passportConfig.isAdminUser, apiController.createDryCleaner);
router.route('/uploadFiles').post(passportConfig.isAdminUser, upload.any(), uploadFiles);
router.route('/getAllCleaners').post(apiController.getAllCleaners);
router.route('/deleteCleaners').delete(passportConfig.isAdminUser, apiController.deleteCleaners);
router.route('/createService').post(passportConfig.isAdminUser, apiController.createService);
router.route('/getServices').post(apiController.getServices);
router.route('/deleteServices').delete(passportConfig.isAdminUser, apiController.deleteServices);
router.route('/getOrders').post(passportConfig.isAdminUser, apiController.getOrders);
router.route('/updateOrders').post(passportConfig.isAdminUser, apiController.updateOrders);

export default router;
