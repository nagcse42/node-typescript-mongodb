import express from 'express';
import controller from '../controller/sample-controller';

const router = express.Router();

router.get('/healthCheck', controller.appHealthCheck);

export = router;