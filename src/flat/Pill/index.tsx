import { Box, Flex, Text, Spinner } from "@chakra-ui/react";

function Pill({
  loading,
  bg,
  children,
}: {
  loading?: boolean;
  bg?: string;
  children: JSX.Element | string;
}) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg={bg}
      borderRadius="full"
      boxShadow="md"
      h={10}
      px={5}
      py={1}
      mr={1}
      mb={1}
      cursor="pointer"
    >
      <Text fontSize="md" fontWeight="semibold">{children}</Text>
      {loading && <Spinner size="xs" ml={1} />}
    </Flex>
  );
}

export default Pill;
