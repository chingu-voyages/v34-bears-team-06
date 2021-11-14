import moment from "moment";

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
    // If date.day is not a Date object, then convert it to it
    const dateDay = date.day instanceof Date ? date.day : new Date(date.day);
    // The same with the next date
    let nextDateDay = {};
    if (eatingHistory[i + 1]) {
      nextDateDay =
        eatingHistory[i + 1].day instanceof Date
          ? eatingHistory[i + 1].day
          : new Date(eatingHistory[i + 1].day);
    }
    // If it's last day or day will change
    if (!eatingHistory[i + 1] || dateDay.getDate() !== nextDateDay.getDate()) {
      const _finalData = {
        day: `${dateDay.getMonth()}/${dateDay.getDate()}`,
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
  return (
    amount *
    (meal.protein_offered * 4 + meal.carbs_offered * 4 + meal.fat_offered * 9)
  );
}

/**
 * Get an array of the objects in `arr` that match the `searchQuery`\
 * Separates queries by whitespace
 * @param arr Array of object to match to query to
 * @param searchQuery Query to match
 */
export function searchObjects(arr = [], searchQuery = "") {
  const arrayQuery = convertToRawString(searchQuery).split(" ");
  return arr.filter((item) => doesObjectMatchQuery(item, arrayQuery));
}

/**
 * Transform a string this way:
 * 1. Removes whitespaces
 * 2. Converts to lowercase
 * 3. Removes any kind of accent
 * Info about `normalize` and `replace`: https://stackoverflow.com/a/37511463
 */
export function convertToRawString(str = "") {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
/**
 * Returns true if the any props. of `obj` matches any string in `arrQuery`
 *
 * Only works for resident's first_name and last_name
 * @todo make it to work with any object
 */
export function doesObjectMatchQuery(obj, arrQuery) {
  const rawFirstName = convertToRawString(obj["first_name"]);
  const rawLastName = convertToRawString(obj["last_name"]);
  for (let query of arrQuery) {
    const regex = new RegExp(query, "gi");
    if (rawFirstName.search(regex) !== -1 || rawLastName.search(regex) !== -1)
      return true;
  }
  return false;
}

export function getDayOfMenu(menu) {
  const menuDateDiff = Date.now() - Date.parse(menu.init_date);
  const menuDateDiffInDays = Math.floor(menuDateDiff / 1000 / 60 / 60 / 24);
  return (menuDateDiffInDays % menu.days.length) + 1;
}

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
export function getNextNDayNumberOfMenu(menu, n=1) {
  const todaysDayNumberOfMenu = getTodaysDayNumberOfMenu(menu)
  const remainder = (todaysDayNumberOfMenu + n) % menu.days.length
  // if remainder is zero means we are in the last day
  if (remainder == 0) return menu.days.length
  return remainder
}

/**
 * Performs a very basic equality check. Only looks if meal_titles are the same.
 */
export function areSameMeal(meal1, meal2) {
  return meal1.meal_title == meal2.meal_title
}

/**
 * Returns next meal and snack\
 * Will fail if there are no meals or snacks left from today
 */
export function getNextMealLazy(menu) {
  const todaysMenu = getTodaysMenu(menu);
  const nextMeal = getFirstMealInInterval(todaysMenu);
  const nextSnack = getFirstMealInInterval(todaysMenu, "snacks");
  return {nextMeal, nextSnack}
}


/**
 * Returns next meal and snack, even if it's in the next day 
 */
export function getNextMeal(menu) {
  const todaysMenu = getMenuByDayNumber(menu, getTodaysDayNumberOfMenu(menu))
  const tomorrowsMenu = getMenuByDayNumber(menu, getNextNDayNumberOfMenu(menu))
  
  let nextMeal = getFirstMealInInterval(todaysMenu);
  if (areSameMeal(nextMeal, todaysMenu.meals[0])) {
    nextMeal = tomorrowsMenu.meals[0]
  }
  
  let nextSnack = getFirstMealInInterval(todaysMenu, "snacks");
  if (areSameMeal(nextMeal, todaysMenu.snacks[0])) {
    nextSnack = tomorrowsMenu.snacks[0]
  }

  return {nextMeal, nextSnack}
}

/**
 * Returns the first meal or snack in the interval of time: `[-hoursBefore, right now, +hoursAfter]`\
 * By default will return the meals, in `[-1, right now, +12]`
 * @param menuDay 
 * @param {"meals" | "snacks"} type Indicate if will look for "meal" or "snack"
 * @param {Number} hoursBefore 
 * @param {Number} hoursAfter 
 * @example
 * const meal1 = {meal_time: "12:30", ...mealData}
 * const meal2 = {meal_time: "15:30", ...mealData}
 * const menuDay = {meals: [meal1, meal2], ...menuDayData}
 * // !!! Right now are the 13:00 !!!
 * getFirstMealInInterval(menuDay, "meals", hoursBefore = 1, hoursAfter = 3)
 * // returns meal1
 * 
 */
export function getFirstMealInInterval(menuDay, type="meals", hoursBefore = 1, hoursAfter = 12) {
    // Establishes time range Only seems to work with 'LLLL' format
  let now = moment().format("LLLL");
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
