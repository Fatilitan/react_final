import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { postAction as addEvent } from "./components/ModalScreen";
// import { editAction as editEvent } from "./components/ModalScreenEdit";
import { Errorboundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
        action: addEvent,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        // action: editEvent,
        loader: postLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Errorboundary>
        <RouterProvider router={router} />
      </Errorboundary>
    </ChakraProvider>
  </React.StrictMode>
);
