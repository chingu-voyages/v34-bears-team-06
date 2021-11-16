import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
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
import { transformEatingHistory } from "utils";

export default function DataInsights({ eatingHistory, resident }) {
  const data = transformEatingHistory(eatingHistory);

  const [dayLookback, setDayLookback] = useState(3);

  function handleChange(value) {
    setDayLookback(value);
  }
  //   console.log(data);
  console.log(dayLookback);

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
        min={1}
        step={1}
        maxW={24}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Box border="1px" padding={2} margin={3} borderRadius="5px" >
        <p>Hello</p>
      </Box>
    </>
  );
}
