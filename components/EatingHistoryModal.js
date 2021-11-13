import { useState, useEffect } from "react";
import {
  useDisclosure,
  Box,
  HStack,
  VStack,
  Heading,
} from "@chakra-ui/react";
import moment from "moment";
import IndivMealDisplay from "components/IndivMealDisplay";
moment().format();

export default function EatingHistoryModal({ resident }) {
  // For the first layer of modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // For the inner/nested modal
  const {
    isOpen: isInnerOpen,
    onOpen: onInnerOpen,
    onClose: onInnerClose,
  } = useDisclosure();

  const [mealToUpdate, setMealToUpdate] = useState([]);
  const [eatingHistory, setEatingHistory] = useState(resident.eating_history);

  const [subarrayHistory, setSubarrayHistory] = useState(resident.eating_history);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      console.log(dataLoaded);
      eatingHistory.sort(function (a, b) {
        new Date(b.day) - new Date(a.day);
      });
        dateDivide(eatingHistory);
        setDataLoaded(true);
      }
  }, [eatingHistory]);

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
                      return <div key={i}></div>;
                    }
                    return (
                      <div>
                        <IndivMealDisplay
                          key={meal._id}
                          residentId={resident._id}
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
