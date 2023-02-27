import { ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import EditWrapper from "../../features/EditWrapper";
import { useWebsiteStore } from "../../store/websiteStore";
import EditImage from "../../features/EditImage";
import useAutoFocus from "../../hooks/useAutoFocus";

export default function Features({ data }: any) {
  useAutoFocus();
  const handleEdit = (key: string, data: any) => {
    editWebsiteData(key, data);
  };
  const editWebsiteData = useWebsiteStore(
    (state: any) => state.editWebsiteData
  );

  return (
    <Box position={"relative"}>
      <Flex
        flex={1}
        zIndex={10000}
        display={{ base: "none", lg: "flex" }}
        backgroundImage={`url('${data.images.features_prompt}')`}
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderTopLeftRadius={"xl"}
        borderBottomLeftRadius={"xl"}
        position={"absolute"}
        width={"45%"}
        insetY={0}
        right={0}
      >
        {!data.images.features_prompt && <EditImage dataKey="features_prompt"/>}
        {/* <Flex
          bgGradient={"linear(to-l, gray.300 10%, transparent)"}
          w={"full"}
          h={"full"}
        /> */}
      </Flex>
      <Container maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              {/* <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
              >
                Benefits
              </Text> */}
              <EditWrapper editingKey="copy.features.title">
                <Heading
                  id="copy.features.title"
                  color={useColorModeValue("gray.700", "gray.50")}
                  mb={5}
                  fontSize={{ base: "3xl", md: "5xl" }}
                  onInput={(e: React.FormEvent<HTMLElement>) => {
                    handleEdit(
                      "copy.features.title",
                      e.currentTarget.textContent
                    );
                  }}
                >
                  {data.copy.features.title}
                </Heading>
              </EditWrapper>
              <EditWrapper editingKey="copy.features.description">
                <Text
                  fontSize={"xl"}
                  id="copy.features.description"
                  onInput={(e: React.FormEvent<HTMLElement>) => {
                    handleEdit(
                      "copy.features.description",
                      e.currentTarget.textContent
                    );
                  }}
                >
                  {data.copy.features.description}
                </Text>
              </EditWrapper>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {data.copy.features.feature_items.map(
                (feature: any, i: number) => (
                  <Box key={feature.title}>
                    <EditWrapper
                      editingKey={`copy.features.feature_items[${i}].title`}
                    >
                      <Text
                        id={`copy.features.feature_items[${i}].title`}
                        fontFamily={"heading"}
                        fontSize={"3xl"}
                        color={"black"}
                        mb={3}
                        onInput={(e: React.FormEvent<HTMLElement>) => {
                          handleEdit(
                            `copy.features.feature_items[${i}].title`,
                            e.currentTarget.textContent
                          );
                        }}
                      >
                        {feature.title}
                      </Text>
                    </EditWrapper>
                    <EditWrapper
                      editingKey={`copy.features.feature_items[${i}].description`}
                    >
                      <Text
                        id={`copy.features.feature_items[${i}].description`}
                        fontSize={"xl"}
                        color={"gray.400"}
                        onInput={(e: React.FormEvent<HTMLElement>) => {
                          handleEdit(
                            `copy.features.feature_items[${i}].description`,
                            e.currentTarget.textContent
                          );
                        }}
                      >
                        {feature.description}
                      </Text>
                    </EditWrapper>
                  </Box>
                )
              )}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text
    as={"span"}
    fontWeight={700}
    color={useColorModeValue("gray.700", "gray.50")}
  >
    {children}
  </Text>
);

const stats = [
  {
    title: "10+",
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: "13%",
    content: (
      <>
        <StatsText>Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    ),
  },
  {
    title: "250M+",
    content: (
      <>
        <StatsText>Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];
