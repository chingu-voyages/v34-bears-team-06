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
  async function getResident() {
    const response = await fetch("/api/resident");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[1];
    console.log(firstResident);
    setUserDB(firstResident);
  }

  useEffect(() => {
    console.log("first render")
    getResident()
  }, [])

  return (
    <div>
      <TopDashboard userDB={userDB}/>
      <Flex justify="space-around">
        <MealTimeSidebar menuData={mockMenu} />
        <Flex direction="column">
          <CaloriesGraph eatingHistory={eatingHistory}/>
          <CalorieGoals userDB={userDB} />
          <MenuWeek menuData={mockMenu}/>
        </Flex>
      </Flex>
    </div>
  );
}
