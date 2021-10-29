import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";
import menuData from "../utils/api/mealjson";

export default function MenuWeek() {
  return (
    <Box maxW="100%" border="1px" my="5px" borderRadius="md" overflow="hidden">
      <b>View This Week's Menu</b>
      
      <br />
      <b>{`${menuData.menu_title} (${menuData.easy_id})`}</b>

      {/* Was working, but is not working now */}
      {menuData.days.map((day) => {
        let meal = (
          <p
            
          >
            Day {day.day_number}:<br />
            <b>{day.meals[0].meal_role}</b> - {day.meals[0].meal_title}
            <br />
            <b>{day.meals[1].meal_role}</b> - {day.meals[1].meal_title} <br />
            <b>{day.meals[2].meal_role}</b> - {day.meals[2].meal_title}{" "}
          </p>
        );
        return <Box key={`${menuData.easy_id}-${day.day_number}`}
        id={`${menuData.easy_id}-${day.day_number}`} padding="10px"> {meal} </Box>;
      })}
    </Box>
  );
}
