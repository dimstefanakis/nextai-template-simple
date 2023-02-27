import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useWebsiteStore } from "../../store/websiteStore";

// this is a component that when hovered over, shows a pencil icon on the top right corner

type EditWrapperProps = {
  children: JSX.Element;
  editingKey: string;
  onEdit?: () => void;
};

function EditWrapper({ children, ...props }: EditWrapperProps) {
  const { editingKey } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const setEditingKey = useWebsiteStore((state: any) => state.setEditingKey);
  const saveWebsiteData = useWebsiteStore(
    (state: any) => state.saveWebsiteData
  );
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

  useEffect(() => {
    if (isEditing) {
      setEditingKey(editingKey);
    } else {
      setEditingKey(null);
    }
  }, [isEditing]);

  function handleMouseLeave() {
    setIsHovering(false);
    setIsEditing(false);
    saveWebsiteData();
  }

  return (
    <Box
      boxSizing="border-box"
      position="relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      border="1px solid transparent"
      _hover={{
        borderColor: borderColor,
        bg: hoverBg,
        color: hoverColor,
        borderWidth: 1,
        borderRadius: 4,
      }}
      onClick={() => {
        setIsEditing(true);
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
        />
      </Flex>
    </Box>
  );
}

export default EditWrapper;
