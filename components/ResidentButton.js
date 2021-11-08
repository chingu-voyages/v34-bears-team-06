import { useState, useEffect } from "react";
import { Router, Route, Link } from "react-router";
import NextLink from "next/link";
import {
  Box,
  Button,
  Center,
  Image,
  Flex,
  Spacer,
  Badge,
} from "@chakra-ui/react";

export default function ResidentButton() {
  return (
    <div>
      <Center>
        <NextLink href="/resident">
          <Button colorScheme="teal" size="md" m={4}>
            Resident List
          </Button>
        </NextLink>

        <NextLink href="/resident/create">
          <Button colorScheme="yellow" size="md" m={4}>
            Create a New Resident
          </Button>
        </NextLink>
      </Center>
    </div>
  );
}
