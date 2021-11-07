import { useState, useEffect } from "react";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import TopDashboard from "components/TopDashboard";
import MealTimeSidebar from "components/MealTimeSidebar";
import CalorieGoals from "components/CalorieGoals";
import MenuWeek from "components/MenuWeek";
import CaloriesGraph from "components/CaloriesGraph"
import { getResidents, getMenus } from "utils/api"
import database from "utils/api/database"

/**
 * This function, explained here https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * is called by Next.js at requesting this page but before the javascript loads, so we have the data faster.
 */
 export const getServerSideProps = async () => {
  const { ResidentModel, MenuModel } = await database()
  const resident = await ResidentModel.findOne({first_name: "John"}).populate("eating_history.mealId");
  const menu = await MenuModel.findOne().populate("days.meals days.snacks");
  return {
    props: {
      // https://github.com/vercel/next.js/issues/11993
      resident: JSON.parse(JSON.stringify(resident)),
      menu: JSON.parse(JSON.stringify(menu))
    },
  }
}

export default function Dashboard({ resident, menu }) {
  /**
   * I didn't remove this because we may needed later
   * ... we may need to call the server and get again the resident after editing it
   * with TopDashboardModal
   */
  // const [resident, setResident] = useState();
  // const [menu, setMenu] = useState()
  
  // async function getData() {
  //   const _resident = await getResidents({first_name: "John", populate: true})
  //   const _menu = await getMenus({populate: true})

  //   console.log("[dashboard] _resident: ", _resident)
  //   console.log("[dashboard] _menu: ", _menu)

  //   setResident(_resident[0])
  //   setMenu(_menu[0])
  // }
  // useEffect(() => {
  //   getData()
  //   console.log("first render")
  // }, [])
  
  if (!menu || !resident) {
    return <Center h="100vh"><Spinner size="xl"/></Center>
  }
  
  return (
    <div suppressHydrationWarning>
      <TopDashboard resident={resident}/>
      <Flex justify="center" >
        <MealTimeSidebar menuData={menu} />
        <Flex direction="column">
          <CaloriesGraph eatingHistory={resident.eating_history}/>
          <CalorieGoals userDB={resident} />
          <MenuWeek menuData={menu}/>
        </Flex>
      </Flex>
    </div>
  );
}