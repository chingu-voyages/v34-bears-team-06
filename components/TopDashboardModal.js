import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { updateResident } from "utils/api"

moment().format();

export default function TopDashboardModal({ resident }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dob, setDob] = useState(new Date(resident.date_of_birth));
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(resident.date_of_birth).day()
  );
  const [monthOfBirth, setMonthOfBirth] = useState(
    moment(resident.date_of_birth).month()
  );
  const [yearOfBirth, setYearOfBirth] = useState(
    moment(resident.date_of_birth).year()
  );
  const [height, setHeight] = useState(resident.height);
  const [weight, setWeight] = useState(resident.weight);

  useEffect(() => {
    setDob(moment({ y: yearOfBirth, M: monthOfBirth, d: dateOfBirth }));
  }, [dateOfBirth, monthOfBirth, yearOfBirth]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: resident.first_name,
      last_name: resident.last_name,
    },
  });

  /**
   * @param formData Its an object containing only the props. passed in the object passed
   * to `useForm` hook. Right now is `first_name` and `last_name`
   */
  const onSubmit = async (formData) => {
    let residentData = {
      ...formData,
      date_of_birth: dob.toISOString(),
      height,
      weight,
    };
    console.log("[TopDashboardModal][onSubmit] residentData:", residentData);
    if (
      formData.first_name !== "" &&
      formData.last_name !== "" &&
      height !== 0 &&
      weight !== 0
    ) {
      console.log("cannot submit until these are filled");
    }
    // API call
    const res = await updateResident(resident._id, residentData)
    // Reload page, router.push or similar
    // use res.error to know if there was an error and display useful information to the client
  };

  return (
    <>
      <Button
        as="button"
        borderRadius="md"
        bg="orange"
        color="black"
        px={4}
        h={8}
        onClick={onOpen}
      >
        Edit Details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Resident</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="first_name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input {...register("first_name")} placeholder="First name" />
                <FormLabel>Last name</FormLabel>
                <Input {...register("last_name")} placeholder="Last name" />
                <FormLabel>Date of Birth</FormLabel>
                <NumberInput
                  size="md"
                  maxW={20}
                  min={1}
                  max={12}
                  // The "+1" is for fixing month zero indexed
                  value={monthOfBirth + 1}
                  onChange={(valueAsString, valueAsNumber) => {
                    console.log("Changing month of birth to:", valueAsNumber);
                    // The "-1" is for fixing month zero indexed
                    setMonthOfBirth(valueAsNumber - 1);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  flex="1"
                  value={monthOfBirth + 1}
                  maxW={300}
                  min={1}
                  max={12}
                  onChange={(value) => {
                    setMonthOfBirth(value - 1);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={monthOfBirth + 1}
                  />
                </Slider>

                <NumberInput
                  size="md"
                  maxW={20}
                  min={1}
                  max={31}
                  value={dateOfBirth}
                  onChange={(valueAsString, valueAsNumber) =>
                    setDateOfBirth(valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  flex="1"
                  value={dateOfBirth}
                  maxW={300}
                  min={1}
                  max={31}
                  onChange={(value) => {
                    setDateOfBirth(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={dateOfBirth}
                  />
                </Slider>

                <NumberInput
                  size="md"
                  maxW={100}
                  min={1900}
                  max={moment().year()}
                  value={yearOfBirth}
                  onChange={(valueAsString, valueAsNumber) =>
                    setYearOfBirth(valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Slider
                  flex="1"
                  value={yearOfBirth}
                  maxW={500}
                  min={1900}
                  max={moment().year()}
                  onChange={(value) => {
                    setYearOfBirth(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={yearOfBirth}
                  />
                </Slider>

                <FormLabel>Height (in centimeters)</FormLabel>
                <NumberInput
                  {...register("height")}
                  value={height}
                  allowMouseWheel
                  size="md"
                  maxW={100}
                  min={100}
                  max={300}
                  onChange={(valueAsString, valueAsNumber) =>
                    setHeight(valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Slider
                  {...register("height")}
                  flex="1"
                  value={height}
                  maxW={500}
                  min={100}
                  max={300}
                  onChange={(value) => {
                    setHeight(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize="32px" children={height} />
                </Slider>

                <FormLabel>Weight (in pounds)</FormLabel>
                <NumberInput
                  {...register("weight")}
                  allowMouseWheel
                  value={weight}
                  size="md"
                  maxW={100}
                  min={40}
                  max={400}
                  onChange={(valueAsString, valueAsNumber) =>
                    setWeight(valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  {...register("weight")}
                  flex="1"
                  value={weight}
                  maxW={800}
                  min={40}
                  max={400}
                  onChange={(value) => {
                    setWeight(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize="32px" children={weight} />
                </Slider>
              </FormControl>
              <Button colorScheme="teal" size="lg" type="submit">
                Save Data
              </Button>
              <Button colorScheme="blue" size="lg" mr={3} onClick={onClose}>
                Close
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
