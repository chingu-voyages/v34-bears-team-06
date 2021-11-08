import { useEffect, useState } from 'react'
import database from "utils/api/database";
import {
  Text,
  Flex,
  Spacer,
  Heading,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { searchObjects } from "utils"

export const getServerSideProps = async () => {
  const { ResidentModel } = await database();
  const residents = await ResidentModel.find();

  return {
    props: {
      residents: JSON.parse(JSON.stringify(residents)),
    },
  };
};

/**
 * @todo
 * - [ ] Add pagination 
 */
export default function ResidentsPage({ residents }) {
  const [searchQuery, setSeachQuery] = useState("")
  const [residentsFiltered, setResidentsFiltered] = useState(residents)
  useEffect(() => {
    const _residentsFiltered = searchObjects(residents, searchQuery)
    setResidentsFiltered(_residentsFiltered)
  }, [searchQuery]) 

  return (
    <Flex align="center" direction="column" h="100vh" overflow="auto">
      <Heading>Residents list</Heading>
      <Flex mt="7%" w="100%" justify="space-around">
        <SearchBar onChange={(e) => setSeachQuery(e.target.value)}/>
        <NextLink href="/resident/create" passHref>
          <Button borderRadius="xl" as="a" leftIcon={<AddIcon />} colorScheme="green">
            Add a resident
          </Button>
        </NextLink>
      </Flex>
      <ResidentList overflow="auto" w="95%" mt="10px" residents={residentsFiltered} />
    </Flex>
  );
}

function SearchBar(props) {
  return (
    <InputGroup w="auto" {...props}>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.500" />}
      />
      <Input borderRadius="50px" placeholder="Search..." />
    </InputGroup>
  );
}

function ResidentList({ residents, ...props }) {
  return (
    <VStack spacing="0" align="stretch" w="100%" h="100%" {...props}>
      {residents.map((resident, i) => (
        <NextLink key={resident._id} href={`/resident/${resident._id}`}>
          <a>
            <ResidentItem data={resident} _hover={{ bg: "gray.200" }} />
          </a>
        </NextLink>
      ))}
    </VStack>
  );
}

function ResidentItem({ data, ...props }) {
  const { first_name, last_name, weight, height } = data;
  return (
    <Flex
      align="center"
      p="0 20px"
      h="100px"
      borderRadius="lg"
      borderBottom="2px solid gray"
      {...props}
    >
      <Text fontSize="xl">
        {first_name} {last_name}
      </Text>
      <Spacer />
      <Text fontSize="sm" color="gray">
        {weight}lb {height}cm
      </Text>
    </Flex>
  );
}
