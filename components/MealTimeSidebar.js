import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Flex,
  Spacer,
  Badge,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import TimeKeeper from "components/TimeKeeper";
import menuData from "../utils/api/mealjson";

export default function MealTimeSidebar() {

    // const [menuInit, setMenuInit] = useState(new Date(`${menuData.init_date}`).toDateString())
    // const [menuDateDiff, setMenuDateDiff] = useState(0)
    const [daysDiff, setDaysDiff] = useState(0)
    const [dayOfMenu, setDayOfMenu] = useState(0)
    // const [menuLength, setMenuLength] = useState(menuData.days.length)
    const menuInit = menuData.init_date
    const menuLength = menuData.days.length

    // Refreshes the component about menu info every 10 seconds (customizable)    
    useEffect(() => {
        refreshDates()
        setInterval(() => {
          refreshDates()
        }, 10000)
      }, [])
      
      function refreshDates() {
      // menuDateDiff: Days between today and menu initialization date
      const menuDateDiff = Date.now() - Date.parse(menuInit)
      // setMenuDateDiff(menuDateDiff)
      const menuDateDiffInDays = menuDateDiff / 1000 / 60 / 60 / 24 // converts ms to days
      setDaysDiff(menuDateDiffInDays)
    }

    // useEffect(() => {
    //     setMenuInit(new Date(`${menuData.init_date}`).toDateString())
    // }, [menuData])

    // Moved this code to inside the setInterval, as is the same.
    // useEffect(() => {
    //     setDaysDiff(new Date(menuDateDiff) / 1000 / 60 / 60 / 24)
    // }, [menuDateDiff])

    // Removed dayOfMenu from array of dependencies
    // as dayOfMenu is being modified here is very easy to fall in an infinite loop
    useEffect(() => {
        // Sets dayOfMenu to a number in [0, menuLength)
        setDayOfMenu(daysDiff % menuLength)
        console.log(/*menuDateDiff, */daysDiff, menuLength, dayOfMenu, Math.floor(dayOfMenu), Math.ceil(dayOfMenu))
    }, [daysDiff])

  return (
    <div>
      <Box
        w="400px"
        my="20px"
        p="10px"
        boxShadow="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box w="300px">
          <TimeKeeper />
        </Box>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Spacer />
          <b>Day #{Math.ceil(dayOfMenu)}/{menuLength} of menu (or exactly {dayOfMenu} days into menu)</b>
          <b>{daysDiff} Days between today's date and menu initialization date</b>
          <Heading as="h3" size="md">
              Add Eating Info ⬇️⬇️
          </Heading>
          <Box h="auto" p="10px" bg="yellow.200">
            <b>Upcoming Meal - {menuData.days[(Math.ceil(dayOfMenu))].meals[0].meal_role}: </b>
            <br/>
            {menuData.days[Math.ceil(dayOfMenu)].meals[0].meal_title}
          </Box>
          <Box h="auto" p="10px" bg="tomato">
            <b>Upcoming Snack - Afternoon: </b>
            Ginger Snaps (3) and cranberry juice (200 mL)
          </Box>
          <Box h="40px" p="10px" bg="pink.100">
            <b>Update other meals/snacks</b>
          </Box>
        </VStack>
      </Box>
    </div>
  );
}
