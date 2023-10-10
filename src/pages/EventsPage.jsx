import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Card } from "../components/Card";
import { useState } from "react";
import { ModalScreen } from "../components/ModalScreen";
import { TextInput } from "../components/ui/TextInput";
import { Errorboundary } from "../components/ErrorBoundary";

export const loader = async () => {
  const eventsData = await fetch("http://localhost:3000/events");
  const events = await eventsData.json();
  return events;
};

export const EventsPage = () => {
  const events = useLoaderData();
  const [addEventScreen, setAddEventScreen] = useState(null);
  const [searchField, setSearchField] = useState("");

  console.log(events);

  const matchedEvents = [];

  for (let event of events) {
    if (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      event.description.toLowerCase().includes(searchField.toLowerCase()) ||
      event.location.toLowerCase().includes(searchField.toLowerCase())
    ) {
      matchedEvents.push(event);
    }
  }

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };
  return (
    <>
      <Flex
        backgroundColor={"blue.300"}
        flexWrap={"wrap"}
        gap={20}
        flexDirection={"row"}
        justifyContent={"space-around"}
        padding={"4rem"}
        height={"100%"}
        minHeight={"100vh"}
      >
        {addEventScreen && <ModalScreen closeFn={setAddEventScreen} />}
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Button onClick={setAddEventScreen}>Add event</Button>
          <TextInput onChange={handleChange} />
        </Flex>
        <Errorboundary>
          {matchedEvents.map((event) => (
            <Card
              key={event.id}
              id={event.id}
              title={event.title}
              imageSrc={event.image}
              description={event.description}
              dateAndTime={event.startTime}
              endTime={event.endTime}
            />
          ))}
        </Errorboundary>
      </Flex>
    </>
  );
};
