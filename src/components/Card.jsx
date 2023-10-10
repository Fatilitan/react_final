import { Box, Heading, Text, Image, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Card = ({
  title,
  imageSrc,
  description,
  dateAndTime,
  endTime,
  id,
}) => {
  const date = dateAndTime.slice(0, 10);
  const timeStart = dateAndTime.slice(11, 16);
  const timeEnd = endTime.slice(11, 16);
  return (
    <>
      <Link to={`event/${id}`}>
        <Box
          w={"300px"}
          h={"400px"}
          backgroundColor={"white"}
          borderRadius={"12px"}
          boxShadow={"0 0 12px rgba(0, 0, 0, 0.5)"}
          overflow={"hidden"}
          transition={"300ms"}
          _hover={{
            transform: "translateY(5px)",
            cursor: "pointer",
          }}
        >
          <Image
            src={imageSrc}
            width={"100%"}
            height={"180px"}
            objectFit={"cover"}
          />
          <Heading fontSize={"1.8rem"} textAlign={"center"} paddingTop={"1rem"}>
            {title}
          </Heading>
          <Text textAlign={"center"} paddingTop={"1rem"}>
            {description}
          </Text>
          <Badge
            fontSize={"1rem"}
            backgroundColor={"green.400"}
            display={"block"}
            margin={"2rem auto"}
            w={"6rem"}
            textAlign={"center"}
          >
            {date}
          </Badge>
          <Text fontSize={"1.1rem"} textAlign={"center"}>
            <span>{timeStart}</span> <i>to</i> <span>{timeEnd}</span>
          </Text>
        </Box>
      </Link>
    </>
  );
};
