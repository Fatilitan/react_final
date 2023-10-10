import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
  return (
    <>
      <Input bg={"white"} onChange={changeFn} {...props} w={"80%"} />
    </>
  );
};
