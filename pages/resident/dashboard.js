import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";
import TopDashboard from "components/TopDashboard";
import MealTimeSidebar from "components/MealTimeSidebar";
import CalorieGoals from "components/CalorieGoals";
import MenuWeek from "components/MenuWeek";
import CaloriesGraph from "components/CaloriesGraph"

export default function Dashboard() {
  return (
    <div>
      <TopDashboard />
      <Flex justify="space-around">
        <MealTimeSidebar />
        <Flex direction="column">
          <CaloriesGraph />
          <CalorieGoals />
          <MenuWeek />
        </Flex>
      </Flex>
    </div>
  );
}
