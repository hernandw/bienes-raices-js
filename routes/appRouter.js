import express from 'express';
import { controller } from '../controllers/appController.js';
const router = express.Router()

router.get('/', controller.home)



export default router