import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  VStack,
  StackDivider,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  transformEatingHistory,
  estimatedEnergyEquation,
  returnAge,
} from "utils";
import moment from "moment";

moment().format();

export default function DataInsights({ eatingHistory, userDB }) {
  const data = transformEatingHistory(eatingHistory);

  const [dayLookback, setDayLookback] = useState(3);
  const [daysAgo, setDaysAgo] = useState(1);
  const [dateDisplayed, setDateDisplayed] = useState("");
  const [prevDateDisplayed, setPrevDateDisplayed] = useState("");
  const [transformedData, setTransformedData] = useState([]);
  const [averageCalories, setAverageCalories] = useState(0);
  const [offsetCalories, setOffsetCalories] = useState(0);
  const [residentAge, setResidentAge] = useState(
    returnAge(userDB.date_of_birth)
  );
  const [isMale, setIsMale] = useState(true);
  const [calorieGoal, setCalorieGoal] = useState(estimatedEnergyEquation(
    residentAge,
    userDB.weight,
    userDB.height,
    isMale
  ));
//   const [calorieGoal, setCalorieGoal] = useState(1500);
  const [intakeStatement, setIntakeStatement] = useState({
      calorieBlurb: "maintaining",
      calorieDifference: 0,
      weightPrediction: "maintaining",
  })
  const [poundDifference, setPoundDifference] = useState(0)
  const [kiloDifference, setKiloDifference] = useState(0)

  function handleChange(value) {
    setDayLookback(value);
    setMealsEatenInRange();
  }

  function handleDaysAgo(value) {
    setDaysAgo(value);
    setMealsEatenInRange();
  }

  useEffect(() => {
    let date = new Date();
    let daysAgoText = moment(date).subtract(daysAgo, "days");
    let prevDaysAgo = moment(daysAgoText).subtract(dayLookback, "days");

    prevDaysAgo = moment(prevDaysAgo).format("dddd MMM DD, YYYY"); // Oldest date (between 'x')
    daysAgoText = moment(daysAgoText).format("dddd MMM DD, YYYY"); // Most recent date (and 'y')

    setDateDisplayed(daysAgoText);
    setPrevDateDisplayed(prevDaysAgo);
  }, [handleDaysAgo, handleChange]);

  useEffect(() => {  
    let calorieInteger = parseInt(averageCalories)
    //   console.log(calorieInteger, calorieInteger + 100, calorieInteger - 100)

      if ((calorieInteger + 100) < calorieGoal) {
        setIntakeStatement({
            calorieBlurb: "below",
            calorieDifference: calorieGoal - averageCalories,
            weightPrediction: "lose"
        })
        // console.log("losing weight")
      } else if (calorieInteger + 99 > calorieGoal && calorieInteger - 99 < calorieGoal) {
          setIntakeStatement({
              calorieBlurb: "within",
              calorieDifference: calorieGoal - averageCalories,
              weightPrediction: "maintain"
            })
            //   console.log("within range")
      } else if (calorieInteger - 100 > calorieGoal) {
          setIntakeStatement({
              calorieBlurb: "above",
              calorieDifference: calorieGoal - averageCalories,
              weightPrediction: "gain"
            })
            // console.log("gaining weight")
      } else if (calorieInteger === 0) {
          console.log("not accounted for")
      }

      setPoundDifference(Math.abs((intakeStatement.calorieDifference * 365 / 12) / 3500).toFixed(2))
      setKiloDifference((poundDifference / 2.2).toFixed(2))
  }, [daysAgo, dayLookback])

  function setMealsEatenInRange() {
    let moddedData = [];
    let lowerLimit = moment(dateDisplayed);
    let upperLimit = moment(prevDateDisplayed);
    for (let i = 0; i < data.length; i++) {
      let dateOfMeal = data[i].date;
      dateOfMeal = moment(dateOfMeal);
      if (dateOfMeal.isBetween(upperLimit, lowerLimit, "day")) {
        moddedData.push(data[i]);
      }
    }
    setTransformedData(moddedData);

    let totalKcal = 0;
    let daysBetweenDates = lowerLimit.diff(upperLimit, "days");

    for (let i = 0; i < moddedData.length; i++) {
      let kcal = moddedData[i].calories;
      totalKcal += kcal;
    }

    let avgCalories = (totalKcal / moddedData.length).toFixed(0);
    let allDayCalories = (totalKcal / moddedData.length).toFixed(0);

    if (daysBetweenDates !== moddedData.length) {
      allDayCalories = (totalKcal / daysBetweenDates).toFixed(0);
    }

    // Sets the avg calorie intake for all days from array
    if (daysBetweenDates === 0 || isNaN(avgCalories)) {
      setAverageCalories(0);
    } else {
      setAverageCalories(avgCalories);
    }

    // Sets the avg calorie intake if all meals are counted
    if (moddedData.length === 0 || isNaN(allDayCalories)) {
      setOffsetCalories(0);
    } else {
      setOffsetCalories(allDayCalories);
    }
  }

  return (
    <>
      <Center>
        <Heading as="h3" size="md">
          Data Insights
        </Heading>
      </Center>
      <p>Set number of days for lookback</p>
      <NumberInput
        onChange={handleChange}
        defaultValue={7}
        value={dayLookback}
        //   min={1}
        step={1}
        maxW={24}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <p>Set how many days ago lookback occured</p>
      <NumberInput
        onChange={handleDaysAgo}
        defaultValue={7}
        value={daysAgo}
        //   min={1}
        step={1}
        maxW={24}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <p>
        {prevDateDisplayed} to {dateDisplayed}
      </p>
      <Box
        border="1px"
        padding={2}
        margin={3}
        borderRadius="5px"
        overflowWrap="normal"
      >
        <p>
          Over the course of {dayLookback} days, {userDB.first_name} has eaten
          for {transformedData.length} of those days.
        </p>
        <p>
          {userDB.first_name} has eaten an average of{" "}
          <b>{averageCalories} calories/day</b> on days where eating is tracked
          (<b>{offsetCalories} calories/day</b> if missed days are included){" "}
        </p>
        <p>
            Average calorie intake is <b>{intakeStatement.calorieBlurb} goal</b> by <b>{Math.abs(intakeStatement.calorieDifference)} calories</b> per day.
        </p>
        <p>Based on lookback period, {userDB.first_name} is predicted to <b>{intakeStatement.weightPrediction} weight - ~{poundDifference} lbs ({kiloDifference} kg) over the next 30 days -</b> if current intake continue.</p>
      </Box>
    </>
  );
}
