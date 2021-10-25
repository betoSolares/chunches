import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} px={8}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Image
              boxSize="50px"
              objectFit="cover"
              src="https://i.imgur.com/UuspPhk.jpeg"
              alt="Logo"
            />
          </Box>
        </HStack>
        <Flex alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;
