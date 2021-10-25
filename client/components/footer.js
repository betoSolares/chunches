import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{
      base: "4",
      md: "8",
    }}
  >
    <Divider />
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text>Where did you buy your chunches?</Text>
        <ButtonGroup variant="ghost" color="gray.600">
          <IconButton
            as="a"
            href="https://github.com/betoSolares/chunches"
            aria-label="GitHub"
            icon={<FaGithub fontSize="20px" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
        &copy; {new Date().getFullYear()} - Grupo 5.
      </Text>
    </Stack>
  </Box>
);

export default Footer;
