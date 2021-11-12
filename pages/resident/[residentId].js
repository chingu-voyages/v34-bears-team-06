import { Flex, Center, Spinner } from "@chakra-ui/react";
import database from "utils/api/database";
import TopDashboard from "components/TopDashboard";
import MealTimeSidebar from "components/MealTimeSidebar";
import CalorieGoals from "components/CalorieGoals";
import MenuWeek from "components/MenuWeek";
import DataInsights from "components/DataInsights"
import CaloriesGraph from "components/CaloriesGraph";
import ResidentButton from "components/ResidentButton";

export const getServerSideProps = async ({ params }) => {
  const { residentId } = params;

  const { ResidentModel, MenuModel } = await database();
  const resident = await ResidentModel.findById(residentId).populate(
    "eating_history.mealId"
  );
  const menu = await MenuModel.findOne().populate("days.meals days.snacks");

  return {
    props: {
      // https://github.com/vercel/next.js/issues/11993
      resident: JSON.parse(JSON.stringify(resident)),
      menu: JSON.parse(JSON.stringify(menu)),
    },
  };
};

export default function DetailPage({ resident, menu }) {
  if (!menu || !resident) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <div suppressHydrationWarning>
      <ResidentButton />
      <TopDashboard resident={resident} />
      <Flex justify="center">
        <MealTimeSidebar resident={resident} menuData={menu} />
        <Flex direction="column">
          <CalorieGoals userDB={resident} />
          <CaloriesGraph eatingHistory={resident.eating_history} />
          <DataInsights eatingHistory={resident.eating_history} userDB={resident} />
          <MenuWeek menuData={menu} />
        </Flex>
      </Flex>
    </div>
  );
}
