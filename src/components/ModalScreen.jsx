import { Box, Heading, Button } from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import placeholder from "../img/placeholder.png";

export const postAction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.image = placeholder;
  formData.startTime = formData.startTime.replace(" ", "T");
  formData.endTime = formData.endTime.replace(" ", "T");
  formData.createdBy = parseInt();
  console.log(formData);
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const ModalScreen = ({ closeFn, users }) => {
  return (
    <>
      <Box
        className="modalPopup"
        w={"70vw"}
        h={"70vh"}
        backgroundColor={"white"}
        position={"fixed"}
        top={"50%"}
        left={"50%"}
        zIndex={10}
        transform={"translate(-50%, -50%)"}
        borderRadius={"16px"}
        boxShadow={"0 50px 600px black"}
        padding={"1rem"}
        display={"flex"}
        flexWrap={"wrap"}
      >
        <Heading size={"l"}>Add event</Heading>
        <Button
          position={"absolute"}
          right={0}
          marginRight={"1rem"}
          onClick={() => closeFn()}
        >
          Close
        </Button>
        <Form method="post" id="new-post-form" style={{ width: "100%" }}>
          <label
            style={{ width: "100%", display: "block", marginBottom: "1rem" }}
          >
            <span style={{ marginRight: "1rem" }}>Title</span>
            <input
              placeholder="A title"
              aria-label="Title"
              type="text"
              name="title"
            />
          </label>
          <label
            style={{ width: "100%", display: "block", marginBottom: "1rem" }}
          >
            <span style={{ marginRight: "1rem" }}>Description</span>
            <input
              placeholder="A description"
              aria-label="Description"
              type="text"
              name="description"
            />
          </label>
          <label
            style={{ width: "100%", display: "block", marginBottom: "1rem" }}
          >
            <span style={{ marginRight: "1rem" }}>Location</span>
            <input
              placeholder="A location"
              aria-label="Location"
              type="text"
              name="location"
            />
          </label>
          <label
            style={{ width: "100%", display: "block", marginBottom: "1rem" }}
          >
            <span style={{ marginRight: "1rem" }}>Date & starting time</span>
            <input
              placeholder="yyyy-mm-dd tt:tt"
              aria-label="Date"
              type="text"
              name="startTime"
            />
          </label>
          <label
            style={{
              width: "100%",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            <span style={{ marginRight: "1rem" }}>Date & end time</span>
            <input
              placeholder="yyyy-mm-dd tt:tt"
              aria-label="Time"
              type="text"
              name="endTime"
            />
          </label>
          <label
            style={{
              width: "100%",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            <span style={{ marginRight: "1rem" }}>User</span>
            <select placeholder="users" name="createdBy">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit">Submit</Button>
        </Form>
      </Box>
    </>
  );
};
