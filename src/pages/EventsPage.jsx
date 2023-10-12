import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Card } from "../components/Card";
import { useState } from "react";
import { ModalScreen } from "../components/ModalScreen";
import { TextInput } from "../components/ui/TextInput";
import { Errorboundary } from "../components/ErrorBoundary";
import { Filters } from "../components/ui/Filters";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, users, categories } = useLoaderData();
  const [addEventScreen, setAddEventScreen] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [filters, setFilters] = useState();

  const matchedEvents = [];

  for (let event of events) {
    // hier gaat iets fout met de conditionals
    if (
      ((filters != undefined || null) &&
        event.title.toLowerCase().includes(searchField.toLowerCase())) ||
      event.description.toLowerCase().includes(searchField.toLowerCase()) ||
      event.location.toLowerCase().includes(searchField.toLowerCase())
    ) {
      matchedEvents.push(event);
    } else if (event.categoryIds.includes(parseInt(filters))) {
      matchedEvents.push(event);
    }
  }

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.checked) {
      setFilters(event.target.id);
    } else if (!event.target.checked) {
      setFilters(() => setFilters());
    }
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
        {addEventScreen && (
          <ModalScreen closeFn={setAddEventScreen} users={users} />
        )}
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Button onClick={setAddEventScreen}>Add event</Button>
          <div>
            {categories.map((catFilter) => (
              <Filters
                key={catFilter.id}
                id={catFilter.id}
                name={catFilter.name}
                changeFn={setFilters}
                onClick={handleFilter}
              />
            ))}
          </div>
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
