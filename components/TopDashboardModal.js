import {
  useDisclosure,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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

export default function TopDashboardModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   Almost 100% same code as 'resident/create' path; might require a common component
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date().getDate());
  const [monthOfBirth, setMonthOfBirth] = useState(new Date().getMonth() + 1);
  const [yearOfBirth, setYearOfBirth] = useState(new Date().getYear() + 1900);

  const [dob, setDob] = React.useState(new Date());
  useEffect(() => {
    setDob(new Date(`${yearOfBirth}-${monthOfBirth}-${dateOfBirth}`));
  }, [dateOfBirth, monthOfBirth, yearOfBirth]);

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const [userDB, setUserDB] = useState({
    id: "1234",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "2000-01-01T23:28:56.782+00:00",
    weight: 999,
    height: 999,
  });

  async function getResident() {
    const response = await fetch("/api/resident?first_name=Daniel");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log(firstResident);
    if (firstResident !== undefined) {
      setUserDB(await firstResident);
    }
  }

  useEffect(() => {
    getResident();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dataObject = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      height,
      weight,
    };

    if (firstName !== "" && lastName !== "" && height !== 0 && weight !== 0) {
      console.log("cannot submit until these are filled");
    }
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
            <form onSubmit={handleSubmit}>
              <FormControl id="first_name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  name={"first_name"}
                  defaultValue={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="First name"
                />
                <FormLabel>Last name</FormLabel>
                <Input
                  name={"last_name"}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Last name"
                />
                <FormLabel>Date of Birth</FormLabel>
                <NumberInput
                  size="md"
                  maxW={20}
                  defaultValue={12}
                  min={1}
                  max={12}
                  value={monthOfBirth}
                  onChange={(valueAsString, valueAsNumber) =>
                    setMonthOfBirth(valueAsNumber)
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
                  value={monthOfBirth}
                  defaultValue={12}
                  maxW={300}
                  min={1}
                  max={12}
                  onChange={(value) => {
                    setMonthOfBirth(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={monthOfBirth}
                  />
                </Slider>

                <NumberInput
                  size="md"
                  maxW={20}
                  defaultValue={31}
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
                  defaultValue={31}
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
                  defaultValue={1970}
                  min={1900}
                  max={new Date().getFullYear()}
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
                  defaultValue={1970}
                  maxW={500}
                  min={1900}
                  max={new Date().getYear() + 1900}
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
                  value={height}
                  allowMouseWheel
                  size="md"
                  maxW={100}
                  defaultValue={150}
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
                  flex="1"
                  value={height}
                  defaultValue={150}
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
                  allowMouseWheel
                  value={weight}
                  size="md"
                  maxW={100}
                  defaultValue={180}
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
                  flex="1"
                  value={weight}
                  defaultValue={150}
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
