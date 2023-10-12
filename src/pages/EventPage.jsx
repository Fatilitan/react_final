import React, { useState } from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  Image,
  ListItem,
  List,
  Badge,
  Button,
} from "@chakra-ui/react";
import logo from "../img/icon-locatie.svg";
import { useLoaderData } from "react-router-dom";
import { ModalScreenEdit } from "../components/ModalScreenEdit";

export const loader = async ({ params }) => {
  const event = await fetch(
    `http://localhost:3000/events/${params.eventId}` //params pakt de eventId
  );
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const eventDate = event.startTime.slice(0, 10);
  const eventStart = event.startTime.slice(11, 16);
  const eventEnd = event.endTime.slice(11, 16);

  const userId = event.createdBy;

  let user;

  for (let findUser of users) {
    if (findUser.id == userId) {
      user = findUser;
    }
  }

  const categoryId = event.categoryIds;

  let matchedCategories = [];

  for (let category of categories) {
    for (let id of categoryId) {
      if (category.id == id) {
        console.log(category);
        matchedCategories.push(category);
      }
    }
  }

  console.log(matchedCategories);

  const [addEventScreen, setAddEventScreen] = useState(null);

  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        minH={"100vh"}
        backgroundColor={"blue.300"}
        flexWrap={"wrap"}
      >
        {addEventScreen && (
          <ModalScreenEdit
            closeFn={setAddEventScreen}
            id={event.id}
            event={event}
          />
        )}
        <Flex
          width={"70%"}
          margin={"1rem auto"}
          justifyContent={"space-between"}
        >
          <Button onClick={setAddEventScreen}>Edit event</Button>
        </Flex>
        <Box
          w={"70%"}
          h={"100%"}
          minH={"100vh"}
          backgroundColor={"white"}
          margin={"2rem auto"}
          borderRadius={"16px"}
          overflow={"hidden"}
        >
          <Image src={event.image} w={"100%"} h={"300px"} objectFit={"cover"} />
          <Heading marginTop={"2rem"} textAlign={"center"}>
            {event.title}
          </Heading>
          <Text fontWeight={"300"} fontSize={"1.2rem"} textAlign={"center"}>
            {event.description}
          </Text>
          <List marginTop={"2rem"}>
            <ListItem
              display={"flex"}
              flexWrap={"nowrap"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image w={"1.5rem"} src={logo} marginRight={"0.5rem"} />
              {event.location}
            </ListItem>
          </List>
          <Text textAlign={"center"} marginTop={"1rem"}>
            Category:{" "}
            {matchedCategories.map((category) => (
              <span key={category.id}>{category.name} </span>
            ))}
          </Text>
          <Text textAlign={"center"} margin={"1rem 0 2rem 0"}>
            This event will take place on {eventDate} from
            <Badge
              marginLeft={"0.5rem"}
              fontSize={"1rem"}
              backgroundColor={"green.200"}
            >
              {eventStart}
            </Badge>{" "}
            to{" "}
            <Badge fontSize={"1rem"} backgroundColor={"red.200"}>
              {eventEnd}
            </Badge>
          </Text>
          <Text textAlign={"center"} margin={"1rem 0 2rem 0"}>
            This event is created by:
          </Text>
          <Flex justifyContent={"space-around"}>
            <Flex alignItems={"center"}>
              <Image
                src={user.image}
                w={"50px"}
                h={"50px"}
                borderRadius={"50%"}
                objectFit={"cover"}
                marginRight={"1rem"}
              />
              <Text fontWeight={700}>{user.name}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
