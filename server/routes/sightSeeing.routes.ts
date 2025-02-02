import express, { Router } from 'express';

import {getSightSeeingLocations} from '../controller/sightSeeing.controller.js';



const router: Router = express.Router();



router.post('/', getSightSeeingLocations);

export default router;
