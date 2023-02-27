import { Box, Flex, HStack } from "@chakra-ui/react";
import Pill from "../../flat/Pill";

function ActionButtons() {
  return (
    <HStack spacing={2} zIndex={10000000000} position="fixed" bottom="20px" right="20px">
      <Pill loading>Save</Pill>
      {/* <Pill>Preview</Pill> */}
      <Pill bg="blue.300">Publish</Pill>
    </HStack>
  );
}

export default ActionButtons;
