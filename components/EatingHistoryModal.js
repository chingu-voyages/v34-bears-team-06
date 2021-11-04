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
  const [eatingHistory, setEatingHistory] = useState({});

    useEffect(() => {
        console.log(eatingHistory)
    }, [])

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

  return (
    <div>Hello World. This part comes from the EatingHistoryModal section</div>
  );
}
