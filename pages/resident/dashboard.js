import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";
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
  const [menu, setMenu] = useState(() => getMenu())
  async function getResident() {
    const response = await fetch("/api/resident");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[1];
    console.log(firstResident);
    setUserDB(firstResident);
  }

  async function getMenu() {
    const response = await fetch("/api/menu");
    console.log(response);
    const data = await response.json();
    const firstMenu = data.menus[0];
    console.log(firstMenu);
    return firstMenu
  }

  useEffect(() => {
    console.log("first render")
    getResident()
  }, [])

  return (
    <div suppressHydrationWarning>
      <TopDashboard userDB={userDB}/>
      <Flex justify="center" >
        <MealTimeSidebar menuData={mockMenu || menu} />
        <Flex direction="column">
          <CaloriesGraph eatingHistory={userDB.eating_history || eatingHistory}/>
          <CalorieGoals userDB={userDB} />
          <MenuWeek menuData={mockMenu || menu}/>
        </Flex>
      </Flex>
    </div>
  );
}
