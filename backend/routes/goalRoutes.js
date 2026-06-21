import { Router } from "express";
import { getGoal, changeGoal } from "../controllers/goalController.js";

const router = Router();

router.route("/").get(getGoal).put(changeGoal);

export default router;
