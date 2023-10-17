import { Box, Button, Text } from "@chakra-ui/react";

const reloadPage = () => {
  location.reload();
};

export const Toast = ({ state }) => {
  let color, message;
  if (state == false) {
    color = "red.300";
    message = "Something went wrong";
  } else {
    color = "green.300";
    message = "The edit was succesfull!";
  }
  return (
    <>
      <Box
        className="modalPopup"
        w={"20rem"}
        h={"8rem"}
        backgroundColor={color}
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
        <Text color={"white"}>{message}</Text>
        <Button onClick={reloadPage}>Close</Button>
      </Box>
    </>
  );
};
