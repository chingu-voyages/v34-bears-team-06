import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import TopDashboard from "components/TopDashboard";
import MealTimeSidebar from "components/MealTimeSidebar";
import CalorieGoals from "components/CalorieGoals";
import MenuWeek from "components/MenuWeek";
import CaloriesGraph from "components/CaloriesGraph"

// mock data
import eatingHistory from "utils/api/eatingHistory";
import mockMenu from "utils/api/mealjson";

export default function Dashboard() {
  const [userDB, setUserDB] = useState({
    id: "1234",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "1977-01-01T23:28:56.782+00:00",
    weight: 75,
    height: 175,
  });
  const [menu, setMenu] = useState({
  menu_title: "Sample",
  init_date: "November 28 1999 12:00:00",
  days: []
  })
  async function getResident() {
    const response = await fetch("/api/resident?first_name=John&populate=true");
    console.log("[dashboard][getResident] response:", response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log("[dashboard][getResident] firstResident:", firstResident);
    setUserDB(firstResident);
  }

  async function getMenu() {
    const response = await fetch("/api/menu?populate=true");
    console.log("[dashboard][getMenu] response:", response);
    const data = await response.json();
    const firstMenu = data.menus[0];
    console.log("[dashboard][getMenu] firstMenu:", firstMenu);
    setMenu(firstMenu)
  }

  useEffect(() => {
    console.log("first render")
    getResident()
    getMenu()
  }, [])

  if (!menu || !menu.days || !menu.days[0]) {
    return <p>Loading</p>
  }

  return (
    <div suppressHydrationWarning>
      <TopDashboard userDB={userDB}/>
      <Flex justify="center" >
        <MealTimeSidebar menuData={menu || mockMenu} />
        <Flex direction="column">
          <CaloriesGraph eatingHistory={userDB.eating_history || eatingHistory}/>
          <CalorieGoals userDB={userDB} />
          <MenuWeek menuData={menu || mockMenu}/>
        </Flex>
      </Flex>
    </div>
  );
}
