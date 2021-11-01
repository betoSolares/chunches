import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Footer, NavBar } from "../components";

const Search = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState("https://i.stack.imgur.com/y9DpT.jpg");
  const [hasResult, setHasResult] = useState(false);
  const [message, setMessage] = useState("");
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [response, setResponse] = useState([]);
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
    setImage(file);
    setImgSrc(url);
  };

  const takePhoto = () => {
    const img = webcamRef.current.getScreenshot();
    setImgSrc(img);
    setImage(img);
    setWebcamOpen(false);
  };

  const normalizeImageData = () => {
    if (typeof image === "object") {
      return image;
    }

    const split = image.split(",");
    const bytes =
      split[0].indexOf("base64") >= 0 ? atob(split[1]) : decodeURI(split[1]);
    const mime = split[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(bytes.length);

    for (let i = 0; i < bytes.length; i += 1) ia[i] = bytes.charCodeAt(i);

    return new Blob([ia], { type: mime });
  };

  const handleOrderBy = (value) => {
    const newArray = [...response];

    if (value === "time") {
      newArray.sort((a, b) => {
        return a.date - b.date;
      });
    }

    if (value === "price-desc") {
      newArray.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (value === "price-asc") {
      newArray.sort((a, b) => {
        return a.price - b.price;
      });
    }

    setResponse(newArray);
  };

  const parseResponse = (results) => {
    const array = [];

    results.forEach((element) => {
      const validDate = Date.parse(element.date);
      const newObject = {
        url: element.url,
        date: validDate,
        description: element.description,
        image: element.image,
        price: element.price,
      };
      array.push(newObject);
    });

    setResponse(array);
  };

  const makeRequest = async () => {
    const newImage = normalizeImageData();
    const formData = new FormData();
    formData.append("image", newImage);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setSearching(false);
      setMessage("An error occurred while doing the search");
      setHasResult(false);
      setResponse([]);
    }

    if (res.ok) {
      setSearching(false);
      setMessage("");
      setHasResult(true);
      parseResponse(data.data.results);
    }
  };

  const search = async () => {
    setHasResult(false);
    setResponse([]);
    setSearching(true);
    makeRequest();
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
                colorScheme="red"
                width="full"
                onClick={() => setWebcamOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          )}
          <Button
            borderRadius={12}
            variant="solid"
            colorScheme="blue"
            onClick={search}
          >
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
          {searching && (
            <Image
              boxSize="150px"
              objectFit="cover"
              borderRadius={12}
              src="https://animated-gif-creator.com/images/01/search-icon-by-ali-snawi-on-dribbble_52.gif"
            />
          )}
          {!hasResult && <Text>{message}</Text>}
        </Flex>
        {hasResult && (
          <FormControl id="country">
            <FormLabel>Order by</FormLabel>
            <Select
              placeholder="Select option"
              onChange={(e) => handleOrderBy(e.target.value)}
            >
              <option value="time">Most recent</option>
              <option value="price-desc">Price (desc)</option>
              <option value="price-asc">Price (asc)</option>
            </Select>
          </FormControl>
        )}
        {hasResult &&
          response.map((item, idx) => (
            <Flex borderWidth="1px" borderRadius="12px" p={2} m={2} key={idx}>
              <Image src={item.image} boxSize="100px" objectFit="cover" />
              <Stack flex="1" direction={"column"} px={3}>
                <Text>{item.description}</Text>
                <Link href={item.url} isExternal>
                  {item.url} <ExternalLinkIcon mx="2px" />
                </Link>
                <Text>Price: {item.price}</Text>
              </Stack>
            </Flex>
          ))}
      </Box>
      <Footer />
    </>
  );
};

export default Search;
