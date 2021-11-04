import MealsJson from "./mealsjson.json";
import MenuJson from "./menujson.json";
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

export async function SeedEatingHistory() {
  console.log("Starting to seed the eating history");
  const { MealModel, ResidentModel } = await database();

  const resident = await ResidentModel.findOne({});
  const allMeals = await MealModel.find();

  let numberOfMeal = 0
  let day = 0
  /**
   * Adds each meal to the eating history, with this constraint:
   * - It's assumed that each day has 5 meals, so every 5 meals will change the day. 
   *   This is done with `numberOfMeal` and `day` variables and the conditional.
   * - The `amount eaten` will be a random number between 0.5 and 1
   */
  for (let meal of allMeals) {
    numberOfMeal++
    if (numberOfMeal >= 5) {
      day++
      numberOfMeal = 0
    }
    const eating_history_entry = {
      day: new Date(2021, 11, 3+day),
      mealId: meal,
      amount_eaten: roundTwoDecimals(getRandomArbitrary(0.5, 1))
    }
    await resident.update({ $push: { eating_history: eating_history_entry } });
  }
}

/**
 * Returns a random number between two numbers
 * @source https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns the numbers rounded to two decimals
 * @source https://stackoverflow.com/a/11832950 
 */
function roundTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export async function SeedMenu() {
  console.log("Starting to seed the database.");
  const { MealModel, MenuModel } = await database();

  const allMeals = await MealModel.find({})
  // const mANDs = getMealsAndSnack(allMeals)
  const { menu_title, init_date } = MenuJson
  const menuData = {
    menu_title,
    init_date: new Date(init_date),
    days: getMenuDays(allMeals)
  }
  // const day_number = 0 
  const menu = await MenuModel.create(menuData)
  return menu
}

export function getMenuDays(_meals = MealsJson, each = 3) {
  const mANDs = getMealsAndSnack(_meals)
  const days = []
  for (let i = 0; i<mANDs.meals.length; i++) {
    // dayNumber++
    if (!mANDs.meals[ each*i + 2]) {
      break
    }
    const day = {
      day_number: i + 1,
      meals: [mANDs.meals[each* i], mANDs.meals[each* i + 1], mANDs.meals[each* i + 2]],
      snacks: [mANDs.snacks[each* i], mANDs.snacks[each* i + 1], mANDs.snacks[each* i + 2]],
    }
    days.push(day)
  }
  return days
}

export function getMealsAndSnack(_meals = MealsJson) {
  let meals = []
  let snacks = []
  let numberOfMeal = 0
  for (let meal of _meals) {
    numberOfMeal++
    if (numberOfMeal > 6) {
      numberOfMeal = 1
    }
    if (numberOfMeal > 0 && numberOfMeal <= 3) {
      // first tree: meals
      meals.push(meal)
    } else {
      // last tree: snacks
      snacks.push(meal)
    }
  }
  return { meals, snacks }
}

export function getMealsByUniqueCode(unique_codes) {
  return unique_codes.map(getMealByUniqueCode)
}

export function getMealByUniqueCode(unique_code) {
  return MealsJson.find(meal => meal.unique_code === unique_code)
}