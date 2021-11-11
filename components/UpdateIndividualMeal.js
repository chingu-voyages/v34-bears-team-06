import { useState, useEffect } from "react";
import {
  useDisclosure,
  Box,
  Button,
  Center,
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
import { useForm } from "react-hook-form";
moment().format();

export default function UpdateIndividualMeal({ amountEaten, mealId }) {

  const [numberEaten, setNumberEaten] = useState(amountEaten)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      amountEaten
    },
  });

  return (
    <>
      <Center mb={2}>
        <NumberInput
        // {...register("amountEaten")}
        name="amountEaten"
          step={0.05}
          value={numberEaten}
          size="sm"
          maxW={20}
          min={0}
          max={1}
          onChange={(e) => {
            setNumberEaten(e)
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Center>
      <Button size="sm" colorScheme="green">
        Update
      </Button>
    </>
  );
}
