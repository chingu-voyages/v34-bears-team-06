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
  ModalFooter
} from "@chakra-ui/react";
import moment from "moment";
import { execOnce } from "next/dist/shared/lib/utils";
moment().format();

export default function EatingHistoryModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mealToUpdate, setMealToUpdate] = useState([])
  const [eatingHistory, setEatingHistory] = useState([
    {
      day: "2000-01-01T04:00:00.000Z",
      mealId: "6181e9b503f69ac8f8f550c0",
      amount_eaten: 0.01,
      _id: "618213c41837ae86c435ba3f",
    },
  ]);

  const [subarrayHistory, setSubarrayHistory] = useState([
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
    }, 10000);
  }, []);

  //   Basic API call to get Data. Can be passed through props
  async function getResident() {
    const response = await fetch("/api/resident?first_name=John");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log(firstResident);
    if (firstResident !== undefined) {
      setEatingHistory(await firstResident.eating_history.reverse());
      console.log(eatingHistory);
    }
  }

  //   Divides the array into subarrays [[Dec 1s], [Dec 2s], [Dec 3s]]
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
    setSubarrayHistory(newArray);
    console.log(newArray);
    // return array
  }

  if (subarrayHistory.length < 1) {
    return <div></div>;
  } else {
    return (
      <Box>
        <VStack>
          {subarrayHistory.map((menuDay, index, array) => {

            console.log(menuDay);

            if (menuDay.length > 1) {
              return (
                <HStack
                  bg="tomato"
                  p={4}
                  px="2"
                  border="black"
                  borderRadius="md"
                >
                  <Heading as="h3" size="md">
                    {moment(menuDay[0].day).format("dddd MMM Do YYYY")}
                  </Heading>
                  {menuDay.map((meal, i, a) => {
                    if (a.length < 1) {
                      return;
                    }
                    return (
                      <div>
                        <Box
                          as="Button"
                          key={meal.mealId}
                          data-id={meal.mealId}
                          bg="white"
                          p={2}
                          mx={2}
                          borderRadius="md"
                          onClick={(e) => {
                            console.log(e.target.closest("button"));
                            
                            let idOfMealToChange = e.target.closest("button").dataset.id

                            let dayOfMealToChange = 
                              e.target.closest("button").children[0].children[1]
                                .innerHTML
                            ;
                            let amountOfMealToChange = 
                              e.target.closest("button").children[1].children[1]
                                .innerHTML
                            ;

                            console.log(idOfMealToChange, dayOfMealToChange, amountOfMealToChange)
                            setMealToUpdate([idOfMealToChange, dayOfMealToChange, amountOfMealToChange])
                            console.log(mealToUpdate)
                          }}
                        >
                          <div className="dateOfMeal">
                            <b>Date: </b>
                            <p>{moment(meal.day).format("MMM Do, YYYY")}</p>
                          </div>
                          <div className="amountEaten">
                            <b>Amount Eaten: </b>
                            <p>{meal.amount_eaten}</p>
                          </div>
                        </Box>
                        
                      </div>
                    );
                  })}
                </HStack>
              );
            }
          })}
          )
        </VStack>
      </Box>
    );
  }
}
