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
moment().format();

export default function EatingHistoryModal() {
  const [eatingHistory, setEatingHistory] = useState([{
    day: "2000-01-01T04:00:00.000Z",
    mealId: "6181e9b503f69ac8f8f550c0",
    amount_eaten: 0.01,
    _id: "618213c41837ae86c435ba3f",
  }]);

  useEffect(() => {
    getResident();
    setTimeout(() => {
      getResident();
      eatingHistory.sort(function (a, b) {
        return new Date(b.day) - new Date(a.day);
      });
    }, 5000);
    console.log(eatingHistory);
  }, []);

  async function getResident() {
    const response = await fetch("/api/resident?first_name=John");
    console.log(response);
    const data = await response.json();
    const firstResident = data.resident[0];
    console.log(firstResident);
    if (firstResident !== undefined) {
      setEatingHistory(await firstResident.eating_history);
      console.log(eatingHistory);
    }
  }

  if (eatingHistory.length < 1) {
    return <div></div>;
  } else {
    return (
      <div>
        {eatingHistory.map((element, index, array) => {
          return (
            <div>
              <b>Date: </b>
              {element.day}
              <b>Amount Eaten: </b>
              {element.amount_eaten}
              <b>Meal ID: </b>
              {element.mealId}
            </div>
          );
        })}
      </div>
    );
  }
}
