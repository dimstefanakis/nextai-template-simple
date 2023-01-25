import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

// this is a component that when hovered over, shows a pencil icon on the top right corner

type EditWrapperProps = {
  children: JSX.Element;
  onEdit?: () => void;
};

function EditWrapper({ children, ...props }: EditWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const hoverColor = useColorModeValue("gray.800", "white");
  const editIconColor = useColorModeValue("gray.400", "gray.500");
  const editIconHoverColor = useColorModeValue("gray.500", "gray.600");
  const editIconBg = useColorModeValue("white", "gray.900");
  const editIconHoverBg = useColorModeValue("gray.100", "gray.800");

  // edit controls should only show up on hover and not move the content around

  return (
    <Box
      boxSizing="border-box"
      position="relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      _hover={{
        borderColor: borderColor,
        bg: hoverBg,
        color: hoverColor,
        borderWidth: 1,
        borderRadius: 4,
      }}
      {...props}
    >
      {children}
      <Flex
        position="absolute"
        top={0}
        right={0}
        p={2}
        transition="opacity 0.2s"
        opacity={isHovering ? 1 : 0}
      >
        <IconButton
          aria-label="Edit"
          variant="ghost"
          icon={<EditIcon />}
          size="sm"
          color={editIconColor}
          bg={editIconBg}
          transition="opacity 0.2s"
          _hover={{
            color: editIconHoverColor,
            bg: editIconHoverBg,
          }}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />
      </Flex>
    </Box>
  );
}

export default EditWrapper;
