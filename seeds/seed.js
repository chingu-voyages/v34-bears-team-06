import MealsJson from "./mealsjson.json";
import database from "utils/api/database";

export default async function SeedMeals() {
  console.log("Starting to seed the database.");
  const { MealModel } = await database();
  const MealsDocuments = [];

  console.log("Seeding Meals");
  for (let meal of MealsJson) {
    const _mealDocument = await MealModel.create(meal);
    MealsDocuments.push(_mealDocument);
  }
}

export function SeedEatingHistory() {
  console.log("Starting to seed the eating history");
  const { MealModel, ResidentModel } = await database();
  const resident = await ResidentModel.findOne({})
  const allMeals = await MealModel.find()

  for (let meal of allMeals) {

  }

}
