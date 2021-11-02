import { useState, useEffect } from "react";
import {
  Box,
  Button,
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
import moment from "moment";
// The following line comes from the momentjs.com/docs
moment().format();

export default function MealTimeSidebar() {
  const [daysDiff, setDaysDiff] = useState(0);
  const [dayOfMenu, setDayOfMenu] = useState(0);
  const [mealOfDay, setMealOfDay] = useState(0);
  const [snackOfDay, setSnackOfDay] = useState(0);
  const menuInit = menuData.init_date;
  const menuLength = menuData.days.length;

  // Refreshes the component about menu info every 10 seconds (customizable)
  useEffect(() => {
    refreshDates();
    setInterval(() => {
      refreshDates();
    }, 10000);
  }, []);

  function refreshDates() {
    // menuDateDiff: Days between today and menu initialization date
    const menuDateDiff = Date.now() - Date.parse(menuInit);
    // setMenuDateDiff(menuDateDiff)
    const menuDateDiffInDays = menuDateDiff / 1000 / 60 / 60 / 24; // converts ms to days
    setDaysDiff(menuDateDiffInDays);
  }

  useEffect(() => {
    // Sets dayOfMenu to a number in [0, menuLength)
    setDayOfMenu(daysDiff % menuLength);
    // console.log(
    //   /*menuDateDiff, */ daysDiff,
    //   menuLength,
    //   dayOfMenu,
    //   Math.floor(dayOfMenu),
    //   Math.ceil(dayOfMenu)
    // );
  }, [daysDiff]);

  useEffect(() => {
    //   Set up to find the first meal and snack from (in this example) 1 hours before to 3 hours after Date.now()
    // Refreshes every 5 minutes
    mealDisplaySelect(1, 12);
    setInterval(() => {
      mealDisplaySelect(1, 12);
    }, 300000);
  }, []);

  function mealDisplaySelect(hoursBefore, hoursAfter) {
    // Establishes time range Only seems to work with 'LLLL' format
    let now = moment().format("LLLL");
    hoursBefore *= -1;
    let hoursBeforeNow = moment(now).add(hoursBefore, "hours");
    let hoursAfterNow = moment(now).add(hoursAfter, "hours");

    // isMatch is true if time of meal is found between hoursBeforeNow && hoursAfterNow, sets mealOfDay
    menuData.days[dayOfMenu].meals.forEach((meal, i) => {
      let mealTime = moment(meal.meal_time, "H:mm:ss");
      let isMatch =
        moment(mealTime, "H:mm:ss").isSameOrAfter(
          moment(hoursBeforeNow, "H:mm:ss")
        ) &&
        moment(mealTime, "H:mm:ss").isSameOrBefore(
          moment(hoursAfterNow, "H:mm:ss")
        );

      if (isMatch) {
        setMealOfDay(i);
      }

      if (i === menuData.days[dayOfMenu].meals.length && !isMatch) {
        setDayOfMenu(dayOfMenu + 1);
      }
    });

    // isMatch is true if time of snack is found between hoursBeforeNow && hoursAfterNow, sets snackOfDay
    menuData.days[dayOfMenu].snacks.forEach((snack, i) => {
      let snackTime = moment(snack.meal_time, "H:mm:ss");
      let isMatch =
        moment(snackTime, "H:mm:ss").isSameOrAfter(
          moment(hoursBeforeNow, "H:mm:ss")
        ) &&
        moment(snackTime, "H:mm:ss").isSameOrBefore(
          moment(hoursAfterNow, "H:mm:ss")
        );

      if (isMatch) {
        setSnackOfDay(i);
      }
    });
  }

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
          <b>
            Day #{Math.ceil(dayOfMenu)}/{menuLength} of menu (or exactly{" "}
            {dayOfMenu} days into menu)
          </b>
          <b>
            {daysDiff} Days between today's date and menu initialization date
          </b>

          <Box h="auto" p="10px" bg="yellow.200">
            <b>
              Upcoming Meal -{" "}
              {
                menuData.days[Math.ceil(dayOfMenu)].meals[`${mealOfDay}`]
                  .meal_role
              }
              :{" "}
            </b>
            <br />
            {
              menuData.days[Math.ceil(dayOfMenu)].meals[`${mealOfDay}`]
                .meal_title
            }
          </Box>
          <Box h="auto" p="10px" bg="tomato">
            <b>
              Upcoming Snack -{" "}
              {
                menuData.days[Math.ceil(dayOfMenu)].snacks[`${snackOfDay}`]
                  .meal_role
              }
              :{" "}
            </b>
            {
              menuData.days[Math.ceil(dayOfMenu)].snacks[`${snackOfDay}`]
                .meal_title
            }
          </Box>
          <Heading as="h3" size="md">
            Add Eating Info ⬇️⬇️
          </Heading>
          <Box as="Button" h="40px" p="10px" bg="pink.100" height="auto">
            <Heading as="h3" size="lg">
              <b>Add or Update Eating Information</b>
            </Heading>
          </Box>
        </VStack>
      </Box>
    </div>
  );
}
