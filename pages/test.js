import MealsListPopover from 'components/Meal/MealsListPopover'
import database from "utils/api/database";
import { getUniqueMeals } from "utils/menu" 

export const getServerSideProps = async ({ params }) => {
  // const { residentId } = params;

  const { ResidentModel, MenuModel } = await database();
  // const resident = await ResidentModel.findById(residentId).populate(
  //   "eating_history.mealId"
  // );
  const menu = await MenuModel.findOne({_id: "618e904b2596cd9cd417707f"}).populate("days.meals days.snacks");

  return {
    props: {
      // https://github.com/vercel/next.js/issues/11993
      // resident: JSON.parse(JSON.stringify(resident)),
      menu: JSON.parse(JSON.stringify(menu)),
    },
  };
};

export default function Test({ menu }) {
  const meals = getUniqueMeals(menu)
  const handleMealClick = ({ _id }) => {
    console.log("[Test][handleMealClick] _id:", _id)
  }
  return <MealsListPopover meals={meals} onMealClick={handleMealClick} />;
}
