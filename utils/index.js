/**
 * Return an object with the calories eaten each day alongside the day
 */
export function transformEatingHistory(eatingHistory) {

  eatingHistory.sort(function(a, b) {
    return new Date(a.day) - new Date(b.day)
  })

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
        day: `${dateDay.getMonth() + 1}/${dateDay.getDate()}`,
        date: dateDay,
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

export function baseMetabolicEquation(age, weight, height, male) {

  weight = weight / 2.2
  //   If male, +5. If female, - 161. Put in -80 as a middle ground
  let equation = weight * 10 + height * 6.25 - age * 5;

  if (male === true) {
    equation += 5;
  } else {
    equation -= 80;
  }
  return Math.floor(equation);
}

export function estimatedEnergyEquation(age, weight, height, male) {
  weight = weight / 2.2
  height = height / 100;
  let equation;

  if (male === true) {
    equation = 662 - 9.53 * age + (15.91 * weight + 539.6 * height);
  } else {
    equation = 354 - 6.91 * age + (9.36 * weight + 726 * height);
  }
  return Math.floor(equation);
}

export function returnAge(dob) {
  const timeDiff = (Date.now() - new Date(dob)) / 1000 / 365 / 24 / 60 / 60;
  return Math.floor(timeDiff);
}