import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";

export default function CalorieGoals({ userDB, ...props }) {

  // Similar code to sibling component
  function returnAge(dob) {
    const timeDiff = (Date.now() - new Date(dob)) / 1000 / 365 / 24 / 60 / 60;
    return Math.floor(timeDiff);
  }

  function baseMetabolicEquation(age, weight, height, male) {

    weight = weight / 2.2
    //   If male, +5. If female, - 161. Put in -80 as a middle ground
    let equation = weight * 10 + height * 6.25 - age * 5;

    if (male === true) {
      equation += 5;
    } else {
      equation -= 80;
    }
    return Math.floor(equation);
  }

  function estimatedEnergyEquation(age, weight, height, male) {
    weight = weight / 2.2
    height = height / 100;
    let equation;

    if (male === true) {
      equation = 662 - 9.53 * age + (15.91 * weight + 539.6 * height);
    } else {
      equation = 354 - 6.91 * age + (9.36 * weight + 726 * height);
    }
    return Math.floor(equation);
  }

  return (
    <Box w="700px" h="100px" border="1px" borderRadius="5px">
      {/* Intro statement */}
      <b>
        Based on an age of {returnAge(userDB.date_of_birth)} years, a weight of{" "}
        {userDB.weight} pounds and a height of {userDB.height} cm, you'll
        need...
      </b>
      <br />
      {/* Base Metabolic Estimate */}
      <b>Baseline Metabolic Rate: </b>{" "}
      {baseMetabolicEquation(
        returnAge(userDB.date_of_birth),
        userDB.weight,
        userDB.height,
        true
      )}{" "}
      calories
      <br />
      {/* EER Estimation */}
      <b>Estimated Energy Requirement: </b>
      {estimatedEnergyEquation(
        returnAge(userDB.date_of_birth),
        userDB.weight,
        userDB.height,
        true
      )}{" "}
      calories
    </Box>
  );
}
