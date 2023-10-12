import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <List listStyleType={"none"} backgroundColor={"blue.300"}>
        <Flex>
          <ListItem marginLeft={"2rem"} marginTop={"1rem"}>
            <Link to="/">Events</Link>
          </ListItem>
          <ListItem marginLeft={"2rem"} marginTop={"1rem"}>
            <Link to="/event/1">Event</Link>
          </ListItem>
          <ListItem marginLeft={"2rem"} marginTop={"1rem"}>
            <Link to="/users">Users</Link>
          </ListItem>
        </Flex>
      </List>
    </nav>
  );
};
