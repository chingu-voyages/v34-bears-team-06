import database from "utils/api/database";
import { List, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const getServerSideProps = async () => {
  const { ResidentModel } = await database();
  const residents = await ResidentModel.find();

  return {
    props: {
      residents: JSON.parse(JSON.stringify(residents)),
    },
  };
};

export default function ResidentsList({ residents }) {
  return (
  <Flex direction="column" h="100%">
    <Heading alignSelf="center">
      Residents list
    </Heading>
    <List h="100%" mt="10%">
      {residents.map((resident, i) => (
          <Link key={resident._id} href={`resident/${resident._id}`}>
            <a>
              <ResidentItem
                data={resident}
                sx={{_hover: {
                  bg: "gray.200"
                }}}
                />
            </a>
          </Link>
      ))}
    </List>
    </Flex>
  );
}

function ResidentItem({ data, ...props }) {
  const { first_name, last_name, weight, height } = data
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
