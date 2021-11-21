import moment from "moment";

/**
 * Returns the menu for `day_number`
 * @param menu
 * @param day_number
 */
export function getMenuByDayNumber(menu, day_number) {
  return menu.days.find((day) => day.day_number == day_number);
}

export function getTodaysDayNumberOfMenu(menu) {
  const menuDateDiff = Date.now() - Date.parse(menu.init_date);
  const menuDateDiffInDays = Math.floor(menuDateDiff / 1000 / 60 / 60 / 24);
  return (menuDateDiffInDays % menu.days.length) + 1;
}

export function getTodaysMenu(menu) {
  return getMenuByDayNumber(menu, getTodaysDayNumberOfMenu(menu));
}

/**
 * Returns the next n day number of the menu\
 * Default: returns the **NEXT** day number of menu (tomorrow)
 */
export function getNextNDayNumberOfMenu(menu, n = 1) {
  const todaysDayNumberOfMenu = getTodaysDayNumberOfMenu(menu);
  const remainder = (todaysDayNumberOfMenu + n) % menu.days.length;
  // if remainder is zero means we are in the last day
  if (remainder == 0) return menu.days.length;
  return remainder;
}

/**
 * Equilty check done with its _id properties
 */
export function areSameMeal(meal1, meal2) {
  return meal1._id == meal2._id;
}

/**
 * Returns an object with the next meal and snack\
 * Will return undefined if there are no meals or snacks left from today
 */
export function getNextMealLazy(menu) {
  const todaysMenu = getTodaysMenu(menu);
  const nextMeal = getFirstMealInInterval(todaysMenu);
  const nextSnack = getFirstMealInInterval(todaysMenu, "snacks");
  return { nextMeal, nextSnack };
}

/**
 * Returns next meal and snack, even if it's in the next day
 */
export function getNextMeal(menu) {
  const todaysMenu = getMenuByDayNumber(menu, getTodaysDayNumberOfMenu(menu));
  const tomorrowsMenu = getMenuByDayNumber(menu, getNextNDayNumberOfMenu(menu));

  let nextMeal = getFirstMealInInterval(todaysMenu);
  if (!nextMeal) {
    nextMeal = tomorrowsMenu.meals[0];
  }

  let nextSnack = getFirstMealInInterval(todaysMenu, "snacks");
  if (!nextSnack) {
    nextSnack = tomorrowsMenu.snacks[0];
  }

  return { nextMeal, nextSnack };
}

/**
 * Returns the first meal or snack in the interval of time: `[-hoursBefore, right now, +hoursAfter]`\
 * By default will return the **meals**, in `[0, right now, +10]`
 * @param menuDay
 * @param {"meals" | "snacks"} type Indicate if will look for "meal" or "snack"
 * @param {Number} hoursBefore
 * @param {Number} hoursAfter
 * @example
 * const meal1 = {meal_time: "12:30", ...mealData}
 * const meal2 = {meal_time: "15:30", ...mealData}
 * const menuDay = {meals: [meal1, meal2], ...menuDayData}
 * // !!! Right now are the 12:00 !!!
 * getFirstMealInInterval(menuDay, "meals", hoursBefore = 0, hoursAfter = 3)
 * // returns meal1
 *
 */
export function getFirstMealInInterval(
  menuDay,
  type = "meals",
  hoursBefore = 0,
  hoursAfter = 10
) {
  // Establishes time range Only seems to work with 'LLLL' format
  let now = moment();
  console.log("[getFirstMealInInterval] now:", now);
  hoursBefore *= -1;
  let hoursBeforeNow = moment(now).add(hoursBefore, "hours");
  let hoursAfterNow = moment(now).add(hoursAfter, "hours");

  // isMatch is true if time of meal is found between hoursBeforeNow && hoursAfterNow, sets mealOfDay
  return menuDay[type].find((meal, i) => {
    let mealTime = moment(meal.meal_time, "H:mm:ss");
    let isMatch =
      moment(mealTime, "H:mm:ss").isSameOrAfter(
        moment(hoursBeforeNow, "H:mm:ss")
      ) &&
      moment(mealTime, "H:mm:ss").isSameOrBefore(
        moment(hoursAfterNow, "H:mm:ss")
      );

    if (isMatch) {
      return true;
    }
  });
}

/**
 * Will return an array of the meals in the menu, without meals repeated. (in other words, unique meals)
 * Logic made with a Hash Table
 */
export function getUniqueMeals(menu) {
  const hashTable = {}
  menu.days.forEach(day => {
    const { meals, snacks } = day
    const mealsAndSnacksArray = [...meals, ...snacks]

    mealsAndSnacksArray.forEach(meal => {
      if (!hashTable[meal._id]) hashTable[meal._id] = meal
    })
  })
  return Object.values(hashTable)
}