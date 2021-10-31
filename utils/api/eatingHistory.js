import { meal } from "./mealjson";

// Fake eating history
export default [
  // Day 20/10/2021
  {
    day: new Date(2021, 10, 20, 9),
    mealId: meal[1],
    amount_eaten: 0.8,
  },
  {
    day: new Date(2021, 10, 20, 13),
    mealId: meal[2],
    amount_eaten: 1,
  },
  {
    day: new Date(2021, 10, 20, 18),
    mealId: meal[3],
    amount_eaten: 0.7,
  },
  // Day 21/10/2021
  {
    day: new Date(2021, 10, 21, 9),
    mealId: meal[1],
    amount_eaten: 1.1,
  },
  {
    day: new Date(2021, 10, 21, 13),
    mealId: meal[2],
    amount_eaten: 0.8,
  },
  {
    day: new Date(2021, 10, 21, 13),
    mealId: meal[2],
    amount_eaten: 0.6,
  },
  // Day 22/10/2021
  {
    day: new Date(2021, 10, 22, 9),
    mealId: meal[1],
    amount_eaten: 0.9,
  },
  {
    day: new Date(2021, 10, 22, 13),
    mealId: meal[2],
    amount_eaten: 0.7,
  },
  {
    day: new Date(2021, 10, 22, 18),
    mealId: meal[3],
    amount_eaten: 1,
  },
  // Day 23/10/2021
  {
    day: new Date(2021, 10, 23, 9),
    mealId: meal[1],
    amount_eaten: 1.2,
  },
  {
    day: new Date(2021, 10, 23, 13),
    mealId: meal[2],
    amount_eaten: 1.1,
  },
  {
    day: new Date(2021, 10, 23, 18),
    mealId: meal[3],
    amount_eaten: 0.6,
  },
  // Day 24/10/2021
  {
    day: new Date(2021, 10, 24, 9),
    mealId: meal[1],
    amount_eaten: 0.9,
  },
  {
    day: new Date(2021, 10, 24, 13),
    mealId: meal[2],
    amount_eaten: 0.7,
  },
  {
    day: new Date(2021, 10, 24, 18),
    mealId: meal[3],
    amount_eaten: 0.8,
  },
];
