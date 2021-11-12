import {
  Box,
  Center,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

export default function MenuWeek({ menuData, ...props }) {
  const menuDateDiff = Date.now() - Date.parse(menuData.init_date);
  const menuDateDiffInDays = Math.floor(menuDateDiff / 1000 / 60 / 60 / 24);
  const dayOfMenu = (menuDateDiffInDays % menuData.days.length) + 1
  const nextDayOfMenu = dayOfMenu + 1 >= menuData.days.length ? 1 : dayOfMenu + 1

  const today = menuData.days.find(day => day.day_number == dayOfMenu);
  const tomorrow = menuData.days.find(day => day.day_number == nextDayOfMenu);
  // const today = menuData.days[0]
  // const tomorrow = menuData.days[1]

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
      <b>{`${menuData.menu_title} (${menuData.easy_id})`}</b>

      <VStack>
        <HStack h="120px">
          <MealsSummary bg="yellow.300" meals={today.meals} />
          {today.meals.map((meal, i) => {
            const color = getCharkaUIColor("orange", i);

            return <Meal key={meal._id} bg={color} {...meal} />;
          })}
        </HStack>
        <HStack h="120px">
          <MealsSummary bg="yellow.400" meals={today.meals} />
          {tomorrow.meals.map((meal, i) => {
            const color = getCharkaUIColor("orange", i, 4);
            
            return <Meal key={meal._id} bg={color} {...meal} />;
          })}
        </HStack>
      </VStack>
    </Box>
  );
}

function getCharkaUIColor(color, i, base = 3) {
  let colorIndex = base - i;
  // If colorIndex is smaller than 1, it has to re-assigned to other number between 9 and 1
  // if (colorIndex < 1) {
  // }
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

function MealsSummary({ meals, ...props }) {
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
      <Text fontWeight="bold">Today</Text>
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
