/**
 * Return an object with the calories eaten each day alongside the day
 */
export function transformEatingHistory(eatingHistory) {
  let totalDayCalories = 0;
  let finalData = [];
  // Keep adding the calories of all meals in a day until the day will change
  for (let i = 0; i < eatingHistory.length; i++) {
    const date = eatingHistory[i];
    const dayCalories = getMealCalories(date.mealId, date.amount_eaten);
    totalDayCalories += dayCalories;

    // If it's last day or day will change
    if (!eatingHistory[i + 1] || date.day.getDate() !== eatingHistory[i + 1].day.getDate()) {
      const _finalData = {
        day: `${date.day.getMonth()}/${date.day.getDate()}`,
        calories: totalDayCalories,
      };
      finalData.push(_finalData);
      totalDayCalories = 0;
    }
  }
  return finalData;
}

/**
 * Consumes a Meal and returns the its calories\
 * The calculation performed is: _amount * [(protein_offered * 4) + (carbs_offered * 4) + (fat_offered * 9)]_
 * @param {number} amount [optional] Amount of the food to get calories from. A number between 0 (nothing) and 1 (all). Default to 1
 */
export function getMealCalories(meal, amount = 1) {
  return (amount * (meal.protein_offered * 4 + meal.carbs_offered * 4 + meal.fat_offered * 9));
}
