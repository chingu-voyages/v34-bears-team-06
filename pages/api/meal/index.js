import nc from "next-connect";
import database from "utils/api/database";
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req, res) => {
  const { MealModel } = await database();
  const { query } = req;
  const meals = await MealModel.find(query);
  res.json({ msg: "Meals list", meals });
});

handler.post(async (req, res) => {
  const { MealModel } = await database();
  const mealData = req.body;
  const meal = await MealModel.create(mealData);
  res.json({ msg: "Meal created", meal });
});

export default handler;
