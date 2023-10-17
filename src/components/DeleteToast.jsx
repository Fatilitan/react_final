import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const DeleteToast = ({ closeFn, id }) => {
  const deleteEvent = async () => {
    await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <>
      <Box
        className="modalPopup"
        w={"20rem"}
        h={"8rem"}
        backgroundColor={"white"}
        position={"fixed"}
        top={"50%"}
        left={"50%"}
        zIndex={20}
        transform={"translate(-50%, -50%)"}
        borderRadius={"16px"}
        boxShadow={"0 50px 600px black"}
        padding={"1rem"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Text>Are you sure you want to delete this event?</Text>
        <Button onClick={() => closeFn()}>Cancel</Button>
        <Button onClick={deleteEvent}>
          <Link to="/">Confirm</Link>
        </Button>
      </Box>
    </>
  );
};
