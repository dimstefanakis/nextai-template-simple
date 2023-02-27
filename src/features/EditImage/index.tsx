import { useRef, useEffect } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  useToken,
} from "@chakra-ui/react";
import { IoImageOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import ImageUploadButton from "../../flat/ImageUploadButton";
import { useWebsiteStore } from "../../store/websiteStore";
import { uploadImage as supaUploadImage } from "../../../utils/supabase-client";
import axios from "axios";

function EditImage({ dataKey }: { dataKey: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const imagePlaceHolderColor = useToken("colors", "gray.600");
  const data = useWebsiteStore((state: any) => state.data);
  const website_id = useWebsiteStore((state: any) => state.id);
  const image = watch("image");

  async function uploadImage(file: File) {
    const data = await supaUploadImage(file);
    const url = data.publicUrl;

    const res = await axios.post(`/api/upload-image`, {
      websiteId: website_id,
      image: url,
      dataKey,
    });
    // formData.append("image", file);
    // formData.append("websiteId", website_id);
    // formData.append("dataKey", dataKey);
    // const res = await axios.post(
    //   `/api/upload-image`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // return res.data.secure_url;
  }

  useEffect(() => {
    if (image && image[0]) {
      uploadImage(image[0]);
    }
  }, [image]);

  return (
    <ImageUploadButton
      multiple={false}
      accept="image/*"
      register={register("image")}
    >
      <Flex
        bg={data.color_scheme.primary}
        flexFlow="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100%"
      >
        <Text
          color="gray.600"
          fontSize="2xl"
          fontWeight="bold"
          alignSelf="center"
          justifySelf="center"
          textAlign="center"
          w="100%"
        >
          Upload an image
        </Text>
        <Flex mt={5} w="100%" justifyContent="center">
          <IoImageOutline size={30} color={imagePlaceHolderColor} />
        </Flex>
      </Flex>
    </ImageUploadButton>
  );
}

export default EditImage;
