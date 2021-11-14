import { useState, useEffect } from 'react'
import {
  Box,
  Center,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { getNextNDayNumberOfMenu, getTodaysDayNumberOfMenu, getMenuByDayNumber } from "utils/menu"

export default function MenuWeek({ menuData, ...props }) {
  
  const [{todaysMenu, tomorrowsMenu}, setMWData] = useState(() => getMWData())

  function getMWData() {
    const todaysDayNumber = getTodaysDayNumberOfMenu(menuData) // tommorws day number
    const tomorrowsDayNumber = getNextNDayNumberOfMenu(menuData) // tommorws day number
    
    const todaysMenu = getMenuByDayNumber(menuData, todaysDayNumber)
    const tomorrowsMenu = getMenuByDayNumber(menuData, tomorrowsDayNumber)

    return {todaysMenu, tomorrowsMenu}
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMWData(() => getMWData());
    }, 300000);
    return () => clearInterval(intervalId)
  }, []);

  return (
    <Box
      maxW="100%"
      my="5px"
      p="10px"
      borderWidth="1px"
      textAlign="center"
      boxShadow="xl"
      borderRadius="md"
      overflow="hidden"
      {...props}
    >
      <b>View This Week's Menu</b>
      
      <br />
      <b>{`${menuData.menu_title}`}</b>

      <VStack>
        <HStack h="120px">
          <MealsSummary bg="yellow.300" meals={todaysMenu.meals} />
          {todaysMenu.meals.map((meal, i) => {
            const color = getCharkaUIColor("orange", i);

            return <Meal key={meal._id} bg={color} {...meal} />;
          })}
        </HStack>
        <HStack h="120px">
          <MealsSummary title="Tomorrow" bg="yellow.400" meals={todaysMenu.meals} />
          {tomorrowsMenu.meals.map((meal, i) => {
            const color = getCharkaUIColor("orange", i, 4);
            
            return <Meal key={meal._id} bg={color} {...meal} />;
          })}
        </HStack>
      </VStack>
    </Box>
  );
}

/**
 * Returns a chakra ui color string with intonation `i`-hundred
 * @example getCharkaUIColor('red', 5) returns "red.500"
 * @todo If colorIndex is smaller than 1, it has to re-assigned to other number between 9 and 1
 */
function getCharkaUIColor(color, i, base = 3) {
  let colorIndex = base - i;
  return "" + color + "." + colorIndex + "00";
}

function Meal({ meal_role, meal_title, ...props }) {
  return (
    <MealBox {...props}>
      <Text fontWeight="bold">{meal_role}</Text>
      <Text noOfLines={2}>{meal_title}</Text>
    </MealBox>
  );
}

function MealsSummary({ meals, title, ...props }) {
  let protein_total = 0;
  let carbs_total = 0;
  let fats_total = 0;

  meals.forEach((meal) => {
    protein_total += meal.protein_offered;
    carbs_total += meal.carbs_offered;
    fats_total += meal.fat_offered;
  });

  return (
    <MealBox {...props}>
      <Text fontWeight="bold">{title || "Today"}</Text>
      <Text>Protein: {protein_total}</Text>
      <Text>Carbs: {carbs_total}</Text>
      <Text>Fats: {fats_total}</Text>
    </MealBox>
  );
}

function MealBox({ children, boxProps, ...props }) {
  return (
    <Center
      w="180px"
      h="100%"
      p="10px"
      textAlign="center"
      boxShadow="sm"
      borderRadius="md"
      {...props}
    >
      <Box {...boxProps}>{children}</Box>
    </Center>
  );
}
