import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Footer, NavBar } from "../components";

const Search = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [imgSrc, setImgSrc] = useState("https://i.stack.imgur.com/y9DpT.jpg");
  const [hasResult, setHasResult] = useState(false);
  const [message, setMessage] = useState("");
  const [webcamOpen, setWebcamOpen] = useState(false);
  const uploaderRef = useRef(null);
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };

  useEffect(() => {
    setAuthenticated(localStorage.getItem("WDYBYC_AUTHENTICATED") ?? false);
  });

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImgSrc(url);
  };

  const takePhoto = () => {
    const img = webcamRef.current.getScreenshot();
    setImgSrc(img);
    setWebcamOpen(false);
  };

  return (
    <>
      <NavBar authenticated={authenticated} />
      <Box p={4}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!webcamOpen && (
            <Image
              boxSize="275px"
              objectFit="cover"
              borderRadius={12}
              src={imgSrc}
            />
          )}
          {webcamOpen && (
            <Webcam
              audio={false}
              height={275}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={275}
              videoConstraints={videoConstraints}
            />
          )}
          {!webcamOpen && (
            <Stack p={3} direction={["column", "row"]}>
              <Button
                borderRadius={12}
                variant="outline"
                colorScheme="blue"
                width="full"
                onClick={() => setWebcamOpen(true)}
              >
                Take Photo
              </Button>
              <Button
                type="file"
                borderRadius={12}
                variant="outline"
                colorScheme="blue"
                width="full"
                onClick={() => uploaderRef.current.click()}
              >
                Upload Image
              </Button>
              <input
                hidden
                type="file"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                name="uploader"
                ref={uploaderRef}
                onChange={(e) => uploadImage(e)}
              />
            </Stack>
          )}
          {webcamOpen && (
            <Stack p={3} direction={["column", "row"]}>
              <Button
                borderRadius={12}
                variant="outline"
                colorScheme="blue"
                width="full"
                onClick={takePhoto}
              >
                Capture
              </Button>
              <Button
                type="file"
                borderRadius={12}
                variant="outline"
                colorScheme="blue"
                width="full"
                onClick={() => setWebcamOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          )}
          <Button borderRadius={12} variant="solid" colorScheme="blue">
            Search
          </Button>
        </Flex>
      </Box>
      <Box p={4}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {hasResult && <Text>DO THE MAGIC</Text>}
          {!hasResult && <Text>{message}</Text>}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default Search;
