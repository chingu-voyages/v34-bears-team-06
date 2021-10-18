import React from "react";

import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react"

export default function create() {
  const [value, setValue] = React.useState(0);
  const increaseValue = () => setValue(value + 1);

  const [firstName, setFirstName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date())
  const [height, setHeight] = React.useState(null)
  const [weight, setWeight] = React.useState(null)


  return (
    <>
        <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <h1>{value}</h1>
            <button onClick={increaseValue}>Increase value</button>
        </FormControl>
    </>
  );
}
