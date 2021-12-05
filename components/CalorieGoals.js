import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";
import { baseMetabolicEquation, estimatedEnergyEquation, returnAge } from "utils"

export default function CalorieGoals({ userDB, ...props }) {

  // Similar code to sibling component
  // function returnAge(dob) {
  //   const timeDiff = (Date.now() - new Date(dob)) / 1000 / 365 / 24 / 60 / 60;
  //   return Math.floor(timeDiff);
  // }

  const [age, setAge] = useState(returnAge(userDB.date_of_birth))
  
  // If female, set as false (is used for energy equations) 
  const [isMale, setIsMale] = useState(true)

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
        age,
        userDB.weight,
        userDB.height,
        isMale
      )}{" "}
      calories
      <br />
      {/* EER Estimation */}
      <b>Estimated Energy Requirement: </b>
      {estimatedEnergyEquation(
        age,
        userDB.weight,
        userDB.height,
        isMale
      )}{" "}
      calories
    </Box>
  );
}
