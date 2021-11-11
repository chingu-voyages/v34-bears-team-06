import { useState, useEffect } from "react";
import {
  useDisclosure,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import moment from "moment";
import { execOnce } from "next/dist/shared/lib/utils";
import UpdateIndividualMeal from "components/UpdateIndividualMeal";

moment().format();

export default function IndivMealDisplay({ historyId, mealId, day, amount, mealToUpdate, setMealToUpdate }) {
  const [active, setActive] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false)
  // setMealToUpdate([mealId, day, amount])
  return (
    <>
      <Box
        key={mealId}
        data-id={historyId}
        data-meal-id={mealId}
        // name={mealId}
        bg="white"
        p={2}
        mx={2}
        borderRadius="md"
        
      >
        <div className="dateOfMeal" onClick={(e) => {
          if (active === false) setActive(true);
          console.log(mealId, active)
        }}>
          <b>Date: </b>
          <p>{moment(day).format("MMM Do, YYYY")}</p>
        </div>
        <div className="amountEaten">
          <b>Amount Eaten: </b>
        {
        active === false && 
          <p>{amount}</p>}
        </div>
        <div>
          {
          active === true && 
          <UpdateIndividualMeal amountEaten={amount} mealId={mealId}/>
          } 
        </div>
      </Box>
    </>
  );
}
