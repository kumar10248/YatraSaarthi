import { Router } from "express";

import {
  getSightSeeingLocations,
  testApi,
} from "../controllers/sightSeeing.js";

const router = Router();

router.post("/", getSightSeeingLocations);
router.get("/", testApi);

export default router;

// study about:
