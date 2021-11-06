import { useState, useEffect } from "react";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import TopDashboard from "components/TopDashboard";
import MealTimeSidebar from "components/MealTimeSidebar";
import CalorieGoals from "components/CalorieGoals";
import MenuWeek from "components/MenuWeek";
import CaloriesGraph from "components/CaloriesGraph"
import { getResidents, getMenus } from "utils/api"

// mock data
import eatingHistory from "utils/api/eatingHistory";
import mockMenu from "utils/api/mealjson";

export default function Dashboard() {
  const [resident, setResident] = useState();
  const [menu, setMenu] = useState()
  
  async function getData() {
    const _resident = await getResidents({first_name: "John", populate: true})
    const _menu = await getMenus({populate: true})

    console.log("[dashboard] _resident: ", _resident)
    console.log("[dashboard] _menu: ", _menu)

    setResident(_resident[0])
    setMenu(_menu[0])
  }
  useEffect(() => {
    getData()
    console.log("first render")
  }, [])
  
  if (!menu || !resident) {
    return <Center h="100vh"><Spinner size="xl"/></Center>
  }
  
  return (
    <div suppressHydrationWarning>
      <TopDashboard resident={resident}/>
      <Flex justify="center" >
        <MealTimeSidebar menuData={menu || mockMenu} />
        <Flex direction="column">
          <CaloriesGraph eatingHistory={resident.eating_history || eatingHistory}/>
          <CalorieGoals userDB={resident} />
          <MenuWeek menuData={menu || mockMenu}/>
        </Flex>
      </Flex>
    </div>
  );
}
