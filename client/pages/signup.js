import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading, Link, Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useHistory } from "react-router";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [failedForm, setFailedForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formInfo, setFormInfo] = useState({});
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const authenticate = (data) => {
    const currentDate = Math.floor(Date.now() / 1000);
    const futureDate = currentDate + 2629800;
    localStorage.setItem("WDYBYC_TOKEN", data.token);
    localStorage.setItem("WDYBYC_EXPIRATION", futureDate);
    localStorage.setItem("WDYBYC_AUTHENTICATED", true);
    history.push("/");
  };

  const submitForm = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });
    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.message);
      setFailedForm(true);
      setShowAlert(true);
    }

    if (res.ok) {
      setFailedForm(false);
      setShowAlert(true);
      authenticate(data);
    }
  };

  return (
    <Flex
      backgroundColor="gray.50"
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Create an account</Heading>
      {showAlert && (
        <Alert my={2} status={failedForm ? "error" : "success"}>
          <AlertIcon />
          {failedForm ? errorMessage : "Thanks for joining us!"}
        </Alert>
      )}
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <Input
                  name="name"
                  placeholder="Put your name"
                  value={formInfo.name}
                  onChange={handleTextChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  name="lastname"
                  placeholder="Put your lastname"
                  value={formInfo.lastname}
                  onChange={handleTextChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  name="email"
                  type="email"
                  placeholder="Put your email address"
                  value={formInfo.email}
                  onChange={handleTextChange}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Put your password"
                    onChange={handleTextChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                      {showPassword ? (
                        <ViewOffIcon size="sm" />
                      ) : (
                        <ViewIcon size="sm" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={12}
                variant="solid"
                colorScheme="blue"
                width="full"
                onClick={submitForm}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Alredy have an account?{" "}
        <Link color="blue.500" href="/login">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
