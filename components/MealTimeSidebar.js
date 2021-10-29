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

    const [menuInit, setMenuInit] = useState(new Date(`${menuData.init_date}`).toDateString())
    const [menuDateDiff, setMenuDateDiff] = useState(0)
    const [daysDiff, setDaysDiff] = useState(0)
    const [dayOfMenu, setDayOfMenu] = useState(0)
    const [menuLength, setMenuLength] = useState(menuData.days.length)

    // Refreshes the component about menu info every 10 seconds (customizable)
    useEffect(() => {
        setInterval(() => {
            setMenuDateDiff(Date.now() - Date.parse(menuInit))    
        }, 10000)
    }, [])

    useEffect(() => {
        setMenuInit(new Date(`${menuData.init_date}`).toDateString())
    }, [menuData])

    useEffect(() => {
        setDaysDiff(new Date(menuDateDiff) / 1000 / 60 / 60 / 24)
    }, [menuDateDiff])

    useEffect(() => {
        setDayOfMenu(daysDiff % menuLength)
        console.log(menuDateDiff, daysDiff, menuLength, dayOfMenu, Math.floor(dayOfMenu), Math.ceil(dayOfMenu))
    }, [daysDiff, dayOfMenu])

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
          <b>{new Date(menuDateDiff) / 1000 / 60 / 60 / 24} Days between today's date and menu initialization date</b>
          <Heading as="h3" size="md">
              Add Eating Info ⬇️⬇️
          </Heading>
          <Box h="auto" p="10px" bg="yellow.200">
            {/* <b>Upcoming Meal - {menuData.days[(Math.ceil(dayOfMenu))].meals[0].meal_role}: </b> */}
            <br/>
            {/* {menuData.days[Math.ceil(dayOfMenu)].meals[0].meal_title} */}
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
