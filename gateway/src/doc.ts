import express from 'express'
import swaggerDoc from './docs';
const router = express.Router();
import { serve, setup } from 'swagger-ui-express';


router.use('/', serve);
router.get('/', setup(swaggerDoc));

export default router