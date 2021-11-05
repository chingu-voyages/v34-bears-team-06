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
} from "@chakra-ui/react";
import moment from "moment";
import { execOnce } from "next/dist/shared/lib/utils";
moment().format();

export default function EatingHistoryModal() {
  const [eatingHistory, setEatingHistory] = useState([
    {
      day: "2000-01-01T04:00:00.000Z",
      mealId: "6181e9b503f69ac8f8f550c0",
      amount_eaten: 0.01,
      _id: "618213c41837ae86c435ba3f",
    },
  ]);

  useEffect(() => {
    getResident();
    setTimeout(() => {
      getResident();
      eatingHistory.sort(function (a, b) {
        new Date(b.day) - new Date(a.day);
      });
      dateDivide(eatingHistory);
    }, 5000);
  }, []);

  async function getResident() {
    const response = await fetch("/api/resident?first_name=John");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log(firstResident);
    if (firstResident !== undefined) {
      setEatingHistory(await firstResident.eating_history.reverse());
      //   console.log(eatingHistory);
    }
  }

  async function dateDivide(array) {
    if (array === undefined) return array;
    if (array.length < 2) return array;
    let newArray = [];

    let j = 0;
    for (let i = 1; i < array.length; i++) {
      let firstValue = moment(array[j].day).format("YYYY-MM-DD h:mm:ss a");
      let secondValue = moment(array[i].day).format("YYYY-MM-DD h:mm:ss a");
      if (moment(firstValue).isSame(secondValue, `day`)) {
        continue;
      } else {
        let subArray = array.slice(j - 1, i);
        console.log(subArray);
        newArray.push(subArray);
        j = i + 1;
        continue;
      }
    }

    setEatingHistory(newArray);
    console.log(newArray);
    // return array
  }

  if (eatingHistory.length < 1) {
    return <div></div>;
  } else {
    return (
      <div>
        {eatingHistory.map((menuDay, index, array) => {
          return (
            <div key={index}>
              <b>Date: </b>
              {menuDay.day}
              <b>Amount Eaten: </b>
              {menuDay.amount_eaten}
              <b>Meal ID: </b>
              {menuDay.mealId}
              <Box>
                <VStack>
                  {/* {menuDay.map((meal, i, a) => {
                    return (
                      <HStack>
                        {meal.day}
                        <b>Date: </b>
                        {e.day}
                        <b>Amount Eaten: </b>
                        {e.amount_eaten}
                        <b>Meal ID: </b>
                        {e.mealId}
                      </HStack>
                    );
                  })} */}
                </VStack>
              </Box>
            </div>
          );
        })}
      </div>
    );
  }
}
