import { useState, useEffect, useMemo } from "react";
import {
  useDisclosure,
  Box,
  Button,
  Spacer,
  VStack,
  StackDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import TimeKeeper from "components/TimeKeeper";
import EatingHistoryModal from "./EatingHistoryModal";
import EatingHistoryForm from "./EatingHistoryForm";
import moment from "moment";
import { getTodaysDayNumberOfMenu, getNextMeal } from "utils/menu";

// The following line comes from the momentjs.com/docs
moment().format();

export default function MealTimeSidebar({ resident, menuData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addMealModal = useDisclosure();
  const [{ dayOfMenu, menuLength, nextMeal, nextSnack }, setMTSData] = useState(() => getMTSData())

  function getMTSData() {
    const menuLength = menuData.days.length;
    const dayOfMenu = getTodaysDayNumberOfMenu(menuData);
    const { nextMeal, nextSnack } = getNextMeal(menuData);
  
    return { dayOfMenu, menuLength, nextMeal, nextSnack };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMTSData(() => getMTSData());
    }, 300000);
    return () => clearInterval(intervalId)
  }, []);

  return (
    <div>
      <Box
        w="400px"
        my="20px"
        p="10px"
        boxShadow="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box w="300px">
          <TimeKeeper />
        </Box>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Spacer />
          <b>
            Day #{dayOfMenu}/{menuLength} of menu
          </b>

          <Box h="auto" p="10px" bg="yellow.200">
            <b>Upcoming Meal - {nextMeal.meal_role}:</b>
            <br />
            {nextMeal.meal_title}
          </Box>
          <Box h="auto" p="10px" bg="tomato">
            <b>Upcoming Snack - {nextSnack.meal_role}:</b>
            <br />
            {nextSnack.meal_title}
          </Box>
          <Button leftIcon="🍚" onClick={onOpen} colorScheme={"pink"}>
            Add or Update Eating Information
          </Button>
          <Button
            leftIcon="🥗"
            onClick={addMealModal.onOpen}
            colorScheme={"red"}
          >
            Register a meal
          </Button>

          {/* How to put a modal within a modal: https://stackoverflow.com/questions/65988633/chakra-ui-using-multiple-models-in-a-single-component */}
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add/Edit Meal-Time Eating Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EatingHistoryModal resident={resident} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={addMealModal.isOpen} onClose={addMealModal.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">🥗 Register a meal</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" justifyContent="center">
              <EatingHistoryForm
                residentId={resident._id}
                upcomingMealId={nextMeal._id}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
}
