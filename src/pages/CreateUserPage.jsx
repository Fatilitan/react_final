import { Heading, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useLoaderData, Form } from "react-router-dom";
import placeholder from "../img/placeholder.png";

export const loader = async () => {
  const usersData = await fetch("http://localhost:3000/users");
  const users = await usersData.json();
  return users;
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.image = placeholder;
  const newId = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return newId;
};

export const CreateUserPage = () => {
  const users = useLoaderData();
  return (
    <Flex
      w={"100%"}
      wrap={"wrap"}
      backgroundColor={"blue.300"}
      gap={20}
      flexDirection={"row"}
      justifyContent={"space-around"}
      padding={"4rem"}
      height={"100%"}
      minHeight={"100vh"}
      alignContent={"flex-start"}
    >
      <Heading w={"100%"} textAlign={"center"}>
        Add new user
      </Heading>
      <Form method="post" id="new-post-form" style={{ width: "100%" }}>
        <label
          style={{
            width: "100%",
            display: "block",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <span style={{ marginRight: "1rem" }}>Name</span>
          <input
            placeholder="Your name"
            aria-label="Your name"
            type="text"
            name="name"
            style={{ padding: "0.5rem", borderRadius: "8px" }}
          />
          <Button type="submit" marginLeft={"1rem"}>
            Submit
          </Button>
        </label>
      </Form>
      <Flex flexWrap={"wrap"} width={"10rem"} alignContent={"flex-start"}>
        {users.map((user) => (
          <Flex key={user.id} height={"4rem"} alignItems={"center"}>
            <Image
              src={user.image}
              w={"50px"}
              h={"50px"}
              borderRadius={"50%"}
              objectFit={"cover"}
              marginRight={"1rem"}
            />
            <Text>{user.name}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
