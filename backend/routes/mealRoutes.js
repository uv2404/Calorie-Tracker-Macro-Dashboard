import { Router } from "express";
import { addMeal, getMeals, deleteMeal } from "../controllers/mealController.js";

const router = Router();

router.route("/").post(addMeal).get(getMeals);
router.delete("/:id", deleteMeal);

export default router;
