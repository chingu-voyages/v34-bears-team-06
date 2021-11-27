/**
 * Returns true if `meal` is a snack
 * @param {Meal} meal 
 */
export const getIsSnack = (meal) => ((["AM Snack", "PM Snack", "HS Snack"]).some(role => role === meal.meal_role))
