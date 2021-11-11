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
} from "@chakra-ui/react";
import moment from "moment";
import UpdateIndividualMeal from "components/UpdateIndividualMeal";
import IndivMealDisplay from "components/IndivMealDisplay";
import { execOnce } from "next/dist/shared/lib/utils";
moment().format();

export default function EatingHistoryModal() {
  // For the first layer of modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // For the inner/nested modal
  const {
    isOpen: isInnerOpen,
    onOpen: onInnerOpen,
    onClose: onInnerClose,
  } = useDisclosure();

  const [mealToUpdate, setMealToUpdate] = useState([]);
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

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      console.log(dataLoaded);
      getResident().then(function () {
        eatingHistory.sort(function (a, b) {
          new Date(b.day) - new Date(a.day);
        });
        dateDivide(eatingHistory);
        setDataLoaded(true);
      });
    }
  }, [eatingHistory]);

  //   Basic API call to get Data. Could later be passed through props
  async function getResident() {
    const response = await fetch("/api/resident?first_name=John");
    const data = await response.json();
    const firstResident = data.resident[0];
    if (firstResident !== undefined) {
      setEatingHistory(firstResident.eating_history.reverse());
      // console.log(eatingHistory);
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
        newArray.push(subArray);
        j = i + 1;
        continue;
      }
    }
    setSubarrayHistory(newArray);
    console.log(newArray);
  }

  if (subarrayHistory.length < 1) {
    return <div></div>;
  } else {
    return (
      <Box>
        <VStack>
          {subarrayHistory.map((menuDay, index, array) => {
            if (menuDay.length > 1) {
              return (
                <HStack
                  bg="tomato"
                  key={menuDay[0].day}
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
                      return <div></div>;
                    }
                    return (
                      <div>
                        <IndivMealDisplay
                          historyId={meal._id}
                          mealId={meal.mealId}
                          day={meal.day}
                          amount={meal.amount_eaten}
                          setMealToUpdate={setMealToUpdate}
                          mealToUpdate={mealToUpdate}
                        />
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
