import React from "react";

import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  } from "@chakra-ui/react"

export default function create() {
  const [value, setValue] = React.useState(0);
  const increaseValue = () => setValue(value + 1);

  const [firstName, setFirstName] = React.useState(null)
  console.log(firstName)
  const [lastName, setLastName] = React.useState(null)
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date())
  const [height, setHeight] = React.useState(null)
  const [weight, setWeight] = React.useState(null)


  return (
    <>
        {/* <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <h1>{value}</h1>
            <button onClick={increaseValue}>Increase value</button>
        </FormControl> */}
        <FormControl id="first-name" isRequired>
            <FormLabel>First name</FormLabel>
            <Input 
                onChange={event => setFirstName(event.target.value)} 
                placeholder="First name" 
            />
            <FormLabel>Last name</FormLabel>
            <Input 
                onChange={event => setLastName(event.target.value)} 
                placeholder="Last name" 
            />
            <FormLabel>Date of Birth</FormLabel>
            <NumberInput size="md" maxW={20} defaultValue={12} min={0} max={12}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <NumberInput size="md" maxW={20} defaultValue={31} min={0} max={31}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <NumberInput size="md" maxW={100} defaultValue={1970} min={1900} max={new Date().getFullYear()}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormLabel>Height (in centimeters)</FormLabel>
            <NumberInput allowMouseWheel
            size="md" maxW={100} defaultValue={150} min={100} max={250}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormLabel>Weight (in pounds)</FormLabel>
            <NumberInput allowMouseWheel
            size="md" maxW={100} defaultValue={180} min={40} max={400}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    </>
  );
}
