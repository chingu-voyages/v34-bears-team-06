import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Flex,
  Spacer,
  Badge,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import TimeKeeper from "components/TimeKeeper";

export default function MealTimeSidebar() {
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
          <Heading as="h3" size="md">
              Add Eating Info ⬇️⬇️
          </Heading>
          <Box h="auto" p="10px" bg="yellow.200">
            <b>Upcoming Meal - Lunch: </b>
            Chicken Salad Sandwich with Green Salad and Garlic Bread
          </Box>
          <Box h="auto" p="10px" bg="tomato">
            <b>Upcoming Snack - Afternoon: </b>
            Ginger Snaps (3) and cranberry juice (200 mL)
          </Box>
          <Box h="40px" p="10px" bg="pink.100">
            <b>Update other meals/snacks</b>
          </Box>
        </VStack>
      </Box>
    </div>
  );
}
