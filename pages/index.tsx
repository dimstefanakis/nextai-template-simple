import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Textarea,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ImageUploadButton from "../src/flat/ImageUploadButton";
import { useGenerationStore } from "../src/store/generationStore";
import axios from "axios";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

type Inputs = {
  appDescription: string;
  imageDescription: string;
  file_?: FileList;
};

export default function Landing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setData = useGenerationStore((state: any) => state.setGeneratedData);
  const data = useGenerationStore((state: any) => state.data);
  const size = useBreakpointValue({ base: "md", md: "lg" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  async function onSubmit(data: Inputs) {
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/generate_website`,
      {
        prompt: data.appDescription,
        image_prompt: data.imageDescription,
      }
    );
    setData(response.data);
    setLoading(false);
    // setData(response.data);
  }

  useEffect(() => {
    if (data) {
      router.push(`/${data.id}`);
    }
  }, [data]);

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          >
            The First
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              {" "}
              Text-To-App
            </Text>{" "}
            Website Builder
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Text-To-App
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Use the power of AI and create your own app in seconds. Just type
              your app idea and we will do the rest.
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Textarea
                placeholder="Your business idea. Try to include key points."
                bg={"gray.100"}
                border={0}
                color={"black"}
                {...register("appDescription", { required: true })}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              {/* <Textarea
                placeholder="The generated website will have a few images. Describe what you want them to look like. Being as specific as possible yields the best results!"
                bg={"gray.100"}
                border={0}
                color={"black"}
                {...register("imageDescription", { required: true })}
                _placeholder={{
                  color: "gray.500",
                }}
              /> */}
              {/* <ImageUploadButton
                accept={"image/*"}
                multiple
                register={register("file_", { validate: validateFiles })}
              >
                <Button
                  fontFamily={"heading"}
                  bg={"gray.200"}
                  color={"gray.800"}
                >
                  Upload Product Image
                </Button>
              </ImageUploadButton> */}
            </Stack>
            <Button
              type="submit"
              isDisabled={loading}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              isLoading={loading}
              loadingText="This usually takes about 30 seconds"
            >
              Generate
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      opacity={0.8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
