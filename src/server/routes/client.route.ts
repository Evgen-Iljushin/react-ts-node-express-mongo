import {Router} from 'express';
const router = Router();
import ClientCtrl from '../controllers/client.ctrl';

const clientController = new ClientCtrl();

router.route('*').get(clientController.getClientData);

export default router;