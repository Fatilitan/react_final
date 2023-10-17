import { Box, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import { Toast } from "./Toast";

export const ModalScreenEdit = ({ closeFn, id, event, categories }) => {
  const [formEvent, setFormEvent] = useState(event);
  const [toast, setToast] = useState(null);
  const [fetchState, setFetchState] = useState(null);
  const editEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(formEvent),
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      setFetchState(true);
    } else {
      setFetchState(false);
    }
  };

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
        {toast && <Toast state={fetchState} />}
        <Heading size={"l"}>Add event</Heading>
        <Button
          position={"absolute"}
          right={0}
          marginRight={"1rem"}
          onClick={() => closeFn()}
        >
          Close
        </Button>
        <Form onSubmit={editEvent} id="new-put-form" style={{ width: "100%" }}>
          <label
            style={{ width: "100%", display: "block", marginBottom: "1rem" }}
          >
            <span style={{ marginRight: "1rem" }}>Title</span>
            <input
              placeholder="A title"
              aria-label="Title"
              type="text"
              name="title"
              onChange={(e) =>
                setFormEvent({ ...formEvent, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormEvent({ ...formEvent, description: e.target.value })
              }
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
              onChange={(e) =>
                setFormEvent({ ...formEvent, location: e.target.value })
              }
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
              onChange={(e) =>
                setFormEvent({ ...formEvent, startTime: e.target.value })
              }
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
              onChange={(e) =>
                setFormEvent({ ...formEvent, endTime: e.target.value })
              }
            />
          </label>
          <label
            style={{
              width: "100%",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            <span style={{ marginRight: "1rem" }}>Categories</span>
            <select
              placeholder="Categories"
              name="categoryIds"
              onChange={(e) =>
                setFormEvent({ ...formEvent, endTime: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label
            style={{
              width: "100%",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          ></label>
          <Button type="submit" onClick={setToast}>
            Submit
          </Button>
        </Form>
      </Box>
    </>
  );
};
