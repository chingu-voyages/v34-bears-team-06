import { useState, useEffect } from "react";
import { Box, Image, Flex, Spacer, Badge } from "@chakra-ui/react";

export default function TopDashboard() {
  async function getResident() {
    const response = await fetch("/api/resident?first_name=Donald");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log(firstResident);
    setUserDB(firstResident);
  }

  useEffect(() => {
    // uri: http://localhost:3000/api/resident?_id=<id>
    // const request = await rawRequest.json()
    // resident is in: request.resident[0]
    getResident();
  }, []);

  const [userDB, setUserDB] = useState({
    id: "1234",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "2000-01-01T23:28:56.782+00:00",
    weight: 999,
    height: 999,
  });

  function returnAge(dob) {
    const timeDiff = (Date.now() - new Date(dob)) / 1000 / 365 / 24 / 60 / 60;
    return Math.floor(timeDiff);
  }

  function returnBMI(height, weight) {
    const kilograms = weight / 2.2;
    const metersHeight = height / 100;
    return (kilograms / metersHeight / metersHeight).toFixed(2);
  }

  return (
    <Box
      w="900px"
      mx="auto"
      my="20px"
      p="10px"
      boxShadow="xl"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex direction="row" p="10px" align="center">
        <Image src="https://via.placeholder.com/150" />
        <Box m="15px">
          <div id={userDB.id}>
            <b>Name</b>: {userDB.first_name} {userDB.last_name} &bull;{" "}
            <b>ID:</b> {userDB.id}
            <br />
            <b>Date of Birth (YYYY/MM/DD):</b>{" "}
            {userDB.date_of_birth.split("T")[0]}`` <br />
            <b>Age:</b> {returnAge(userDB.date_of_birth)} <br />
            <b>Height</b>: {userDB.height} cm &bull; <b>Weight</b>:{" "}
            {userDB.weight} lbs ({(userDB.weight / 2.2).toFixed(1)} kgs) <br />
            <b>BMI:</b> {returnBMI(userDB.height, userDB.weight)}
          </div>
          <Badge colorScheme="yellow">New Resident</Badge>
          <Badge colorScheme="red">Calorie Deficit</Badge>
        </Box>
        <Spacer />
        <Box
          as="button"
          borderRadius="md"
          bg="orange"
          color="black"
          px={4}
          h={8}
        >
          Edit Details
        </Box>
      </Flex>
    </Box>
  );
}
