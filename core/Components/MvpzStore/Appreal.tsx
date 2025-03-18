import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  BackgroundImage,
  Box,
  Button,
  CheckIcon,
  Container,
  Group,
  Image,
  Loader,
  NumberInput,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  rem,
  useMantineTheme,
  Divider,
  CopyButton,
  Popover,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../../lib/utils";
import ProductShare from "../../../components/ProductShare";

const useStyles = createStyles((theme) => ({
  tabSize: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 12,
    },
  },
  image: {
    [theme.fn.largerThan("sm")]: {
      maxWidth: 300,
    },
  },
  grid: {
    [theme.fn.smallerThan("sm")]: {
      width: 200,
    },
    [theme.fn.smallerThan("md")]: {
      width: 400,
    },
    [theme.fn.largerThan("md")]: {
      width: 1200,
    },
  },
  tabs: {
    [theme.fn.smallerThan("xs")]: {
      fontSize: "10px !important",
    },
    [theme.fn.largerThan("sm")]: {
      fontSize: 16,
    },
  },
  textStore: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
    [theme.fn.largerThan("sm")]: {
      fontSize: "50px !important",
    },
  },
  store: {
    [theme.fn.smallerThan("sm")]: {
      height: 80,
    },
    [theme.fn.largerThan("sm")]: {
      height: 120,
    },
  },
  text1: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
    [theme.fn.largerThan("sm")]: {
      fontSize: 48,
    },
  },
  text2: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 64,
    },
    [theme.fn.largerThan("sm")]: {
      fontSize: 100,
    },
  },
  text3: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 20,
    },
    [theme.fn.largerThan("sm")]: {
      fontSize: 36,
    },
  },
  font: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: "12px !important",
      maxWidth: "2 rem",
    },
    fontSize: "12px !important",
  },
  customButton: {
    padding: "4px 6px",
    fontSize: "12px",
    gap: "4px",
  },
  boxWrapper: {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    // width: `calc(100% / 3)`,
    padding: `${rem(8)} ${rem(16)}`,
    textAlign: "center",
    background: "rgb(26, 25, 25) !important",
    color: "white !important",
    textTransform: "uppercase",

    "&:first-of-type": {
      borderRadius: theme.radius.sm,
    },

    "&:last-of-type": {
      borderRadius: theme.radius.sm,
    },

    "&:hover": {
      backgroundColor: "white !important",
      color: "black !important",
    },

    "&[data-active]": {
      zIndex: 1,
      backgroundColor: "rgb(140, 82, 255) !important",
      borderColor: "rgb(140, 82, 255) !important",
      color: theme.white,

      "&:hover": {
        backgroundColor: "rgb(140, 82, 255) !important",
      },
    },
  },
  tabList: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: "10px",
    [theme.fn.smallerThan("md")]: {
      display: "flex",
      flexDirection: `column`,
    },
  },
  accordionControl: {
    padding: "4px 8px",
    height: "30px",
    display: "flex",
    alignItems: "center",
  },
  tabBannerContent: {
    [theme.fn.smallerThan("sm")]: {
      margin: "auto !important",
      textAlign: "justify",
    },
  },
  displayNormal:{
    [theme.fn.smallerThan('xs')]:{
      display: 'none !important'
    }
  },
  displayMobile:{
    [theme.fn.largerThan("xs")]:{
      display: 'none !important'
    }
  },
}));

const Apparel = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery("(min-width: 40em)");
  const [activeTab, setActiveTab] = useState("athleisure");
  const [loading, setLoading] = useState(true)

  const ApparelTabs = () => {
    return (
      <Tabs
        variant="unstyled"
        value={activeTab}
        onTabChange={setActiveTab}
        style={{ width: "100%", overflow: "hidden" }}
      >
        <Tabs.List
          className={classes.tabList}
          style={{
            display: "flex",
            flexDirection: `${largeScreen ? "row" : "column"}`,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Tabs.Tab
            value="athleisure"
            className={classes.tab}
            style={{ width: "100%" }}
          >
            ATHLEISURE
          </Tabs.Tab>
          <Tabs.Tab
            value="offside"
            className={classes.tab}
            style={{ width: "100%" }}
          >
            OFFSIDE
          </Tabs.Tab>
          <Tabs.Tab
            value="accessories"
            className={classes.tab}
            style={{ width: "100%" }}
          >
            ACCESSORIES
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="athleisure">
          <AthleisureTab/>
        </Tabs.Panel>

        <Tabs.Panel value="offside">
          <Stack p={32} style={{ maxWidth: "1200px", maxHeight: "1080px" }}>
            <Group style={{ marginLeft: `${largeScreen ? "5rem" : "0rem"}` }}>
              <Image
                style={{ transform: "rotate(-5deg)" }}
                width={300}
                src="/images/offset-shirt.png"
              ></Image>
              <Stack align={"start"} spacing={2} mb={4}>
                <Text
                  mb={8}
                  size={"sm"}
                  align="center"
                  className={classes.tabBannerContent}
                >
                  OFFSIDE
                </Text>
                <Stack className={classes.displayNormal} align={'start'} spacing={0} >
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    Represent your team with pride and look good doing so.
                  </Text>
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    Each unique team designs is a limited edition item.
                  </Text>
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    All revenue is shared directly with the athletes.
                  </Text>
                </Stack>
                <Stack className={classes.displayMobile }>
                  <Text size={'xs'}>Represent your team with pride and look good doing so. Each unique team designs is a limited edition item. All revenue is shared directly with the athletes.</Text>
                </Stack>
              </Stack>
            </Group>

            <div
              style={{
                display: "grid",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Text
                lh={0.8}
                size={34}
                color={theme.colors.mvpz[8]}
                ff={"SpriteGraffiti-Regular"}
                style={{ transform: "rotate(5deg)" }}
              >
                offside apparel
              </Text>
              <Text
                lh={0.8}
                size={50}
                color={theme.colors.mvpz[8]}
                ff={"SpriteGraffiti-Regular"}
                style={{ transform: "rotate(5deg)" }}
              >
                Coming Soon
              </Text>
            </div>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel
          value="accessories"
          style={{ maxWidth: "1200px", maxHeight: "1080px" }}
        >
          <Stack style={{ padding: "0px 6rem" }}>
            <Group position={"center"} style={{ justifyContent: "flex-start" }}>
              <Image alt="" width={300} src="/images/hat-icon.png"></Image>
              <Stack ml={-32} align={"start"} spacing={2} mb={4}>
                <Text
                  mb={8}
                  size={"sm"}
                  align="center"
                  className={classes.tabBannerContent}
                >
                  Accessories
                </Text>
                <Stack className={classes.displayNormal} align={'start'} spacing={0}>
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    Accessorize your lifestyle with MVPz.
                  </Text>
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    We'll do everything you need and somethings you don't.
                  </Text>
                  <Text
                    size={largeScreen ? "xs" : 10}
                    align={largeScreen ? "center" : "start"}
                  >
                    It has got to be robust, functional, and cool.
                  </Text>
                </Stack>
                <Stack className={classes.displayMobile}>
                  <Text size={'xs'}>Accessorize your lifestyle with MVPz. We'll do everything you need and somethings you don't. It has got to be robust, functional, and cool.</Text>
                </Stack>
              </Stack>
            </Group>
            <div
              style={{
                display: "grid",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Text
                lh={0.8}
                size={50}
                color={theme.colors.mvpz[8]}
                ff={"SpriteGraffiti-Regular"}
                style={{ transform: "rotate(5deg)" }}
              >
                Accessories
              </Text>
              <Text
                lh={0.8}
                size={56}
                color={theme.colors.mvpz[8]}
                ff={"SpriteGraffiti-Regular"}
                style={{ transform: "rotate(5deg)" }}
              >
                Coming Soon
              </Text>
            </div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    );
  };

  useEffect(() => {
    setLoading(false)
  },[])

  return ( loading ? <Group position="center" align={'center'}><Loader/></Group> :
    <Container
      style={{
        maxWidth: "1200px",
        maxHeight: "1080px",
        margin: "0 auto",
      }}
    >
      <Stack>
        <Box mx="auto" className={classes.boxWrapper}>
          <BackgroundImage
            w={largeScreen ? window.innerWidth / 1.25 : window.innerWidth}
            h={240}
            src="/images/apparel-new-banner.png"
            style={{ backgroundSize: "cover" }}
          >
            <div
              style={{
                position: "relative",
                top: largeScreen ? "11%" : "20%",
                left: largeScreen ? "46%" : "30px",
              }}
            >
              <Title color={"white"}>
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "SpriteGraffiti-Regular",
                    fontSize: "8rem",
                    top: 3,
                    left: 8,
                    position: "relative",
                    color: theme.colors.mvpz[9],
                    fontWeight: 100,
                    letterSpacing: ".3rem",
                    textShadow: `
                      1px 1px 0px #000,
                      2px 2px 0px #000,
                      3px 3px 0px #000,
                      4px 4px 0px #000,
                      5px 5px 0px #000`,
                    transform: "rotate(10deg)",
                  }}
                >
                  A
                </span>
                <span
                  style={{
                    fontSize: "3.5rem",
                    position: "relative",
                    top: "-0.2em",
                  }}
                >
                  pparel
                </span>
              </Title>
            </div>
          </BackgroundImage>
        </Box>
        <Box style={{ marginTop: "20px" }}>
          <ApparelTabs />
          <Group position="center">
            <Image
              width={largeScreen ? 1000 : 350}
              src="/images/featuredon.png"
            ></Image>
          </Group>
        </Box>
      </Stack>
    </Container>
  );
};

function AthleisureTab(){
  const {classes} = useStyles()
  const [quantity, setQuantity] = useState(1);
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();
  const [size, setSize] = useState(null);
  const largeScreen = useMediaQuery("(min-width: 40em)");
  const DIV = largeScreen ? Group : Stack;
  // const width = largeScreen ? 200 : undefined;
  // const [viewAll, setViewAll] = useState(false);
  const [product, setProduct] = useState<any>();
  const [variantId, setVariantId] = useState(null);
  const [orderLimitPopoverOpened, setOrderLimitPopoverOpened] = useState(false)
  let sizes = [];
  let variantImage = "";
  if (product && product.variants?.length) {
    variantImage = variantId
      ? product.variants.find((v) => v.id === variantId).image
      : product.images[0];
    sizes = variantId
      ? product.variants.find((v) => v.id === variantId).sizes
      : product.variants[0].sizes;
  }
  const fetchProducts = async () => {
    setLoading(true);
    const result = await callAPI({
      endpoint: "/api/product/getActive?type=apparel",
    });

    setLoading(false);
    if (result.length) {
      setProduct(result[0]);
    }
  };

  const gotoCheckout = async () => {
    if (status === "unauthenticated") {
      localStorage.setItem("redirectUrl", "/apparel");
      router.push("/api/auth/signin");
      return;
    }
    if (!size) {
      return notifications.show({
        message: "Please select a size to continue",
      });
    }
    if (!variantId) {
      return notifications.show({
        message: "Please select a color to continue",
      });
    }
    setLoading(true);
    const result = await callAPI({
      endpoint: `/api/purchase/initiate`,
      method: "POST",
      body: { productId: product.id, quantity, variantId, size },
    });
    setLoading(false);
    if (result?.checkoutUrl) {
      router.push(result.checkoutUrl);
    }
  };

  useEffect(() => {
    setLoading(false);
    fetchProducts();
  }, []);
  return ( loading ? <Group align={'center'} my={40} position='center'><Loader/></Group> :
    <Stack py={32} style={{width:"100vw" }} className="flex md:flex-col flex-col-reverse justify-start items-start space-y-20">
      <Group className="md:pl-40 mt-20 w-full flex md:flex-row flex-col md:justify-start justify-center items-center">
        <Image alt="" width={300} src="/images/athlesiure_new.png"></Image>
        <Stack  align={"start"}  mb={4}>
          <Text
            mb={8}
            size={"sm"}
            align="center"
            className={classes.tabBannerContent}
          >
            ATHLEISURE
          </Text>
          <Stack  align={"start"}  className={classes.displayNormal} spacing={0}>
            <Text
              size={"xs"}
              align={ "center"}
            >
              We provide the highest quality athleisure.
            </Text>
            <Text
              size={"xs"}
              align={ "center"}
            >
              We accept nothing but the best for our athletes.
            </Text>
            <Text
              size={"xs"}
              align={ "center"}
            >
              All garments are unisex and made to last.
            </Text>
            <Text
              size={"xs"}
              align={ "center"}
            >
              Limited first edition PRE-SALE ON NOW!
            </Text>
          </Stack>
          <div className={classes.displayMobile}>
            <Text align="center" size={'xs'}>We provide the highest quality athleisure. We accept nothing but the best for our athletes. All garments are unisex and made to last. Limited first edition PRE-SALE ON NOW!</Text>
          </div>
        </Stack>
      </Group>

      <Group className="w-full">
      <div
       className="flex justify-center items-center flex-col  w-full "
      >
        <Text
          lh={0.8}
          size={34}
          color={theme.colors.mvpz[8]}
          ff={"SpriteGraffiti-Regular"}
          style={{ transform: "rotate(5deg)" }}
          className="md:-ml-[200px]"
          
        >
          Limited First Edition
        </Text>
        <Text
          lh={0.8}
          size={74}
          color={theme.colors.mvpz[8]}
          ff={"SpriteGraffiti-Regular"}
          style={{ transform: "rotate(5deg)" }}
           className="md:-ml-[200px]"
        >
          Pre-sale!
        </Text>
      </div>

      {product && (
        <DIV
          spacing={50}
          style={{
            display: "flex",
            width: "100%",
            marginTop: "20px",
            flexDirection: `${largeScreen ? "row" : "column"}`,
          }}
        >
          <Stack
            align={"center"}
            // style={{
            //   width: `${largeScreen ? "40%" : "80%"}`,
            //   justifyContent: "flex-end",
            // }}
          >
            <Image
              width={400}
              onClick={() => router.push(`/apparel/${product.id}`)}
              className={classes.image}
              src={variantImage}
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
            <Group position="center">
              <Stack spacing={0}>
                {!!product.costBeforeDiscount && <Text style={{textDecorationLine: 'line-through', textDecorationColor: theme.colors.mvpz[8]}} size={largeScreen ? 36 : 20}>${product.costBeforeDiscount}</Text>}
                <Text mt={-24} color={theme.colors.mvpz[8]} ff={"SpriteGraffiti-Regular"} size={largeScreen ? 54 : 36}>${product.cost}</Text>
              </Stack>
            {!largeScreen && (
              <Button
                onClick={() => router.push(`/apparel/${product.id}`)}
              >
                View
              </Button>
            )}</Group>
          </Stack>

          {largeScreen && (
            <Stack
              align="flex-start"
              style={{
                width: `${largeScreen ? "40%" : "100%"}`,
                justifyContent: "center",
                padding: "5px",
              }}
              spacing={5}
            >
              <Text
                size={"71px"}
                style={{ lineHeight: "60px" }}
                weight={700}
              >
                {product.subCategory.toUpperCase()}
              </Text>
              {!!product.specification && (
                <Text
                  size={20}
                  style={{
                    letterSpacing: "20px",
                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}
                >
                  {product.specification.material}
                </Text>
              )}

              <Group
                spacing={0}
                align={"center"}
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <Stack spacing={4} style={{ flex: 1, maxWidth: "30%" }}>
                  <Text
                    size={43}
                    weight={700}
                    style={{ color: "white", lineHeight: "42px" }}
                  >
                    SIZE
                  </Text>
                  <Select
                    onChange={setSize}
                    placeholder="Select"
                    data={sizes?.map((size) => ({
                      label: size,
                      value: size,
                    }))}
                    value={size}
                    size="sm"
                    style={{
                      width: "100%",
                    }}
                  />
                </Stack>
                <Stack spacing={4} style={{ flex: 1, maxWidth: "60%" }}>
                  <Text
                    size={43}
                    weight={700}
                    style={{ lineHeight: "42px" }}
                  >
                    COLORS
                  </Text>
                  <Group
                    spacing={4}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {product.variants?.length > 0 &&
                      product.variants.map((v, index) => (
                        <Box
                          key={index}
                          onClick={() => setVariantId(v.id)}
                          sx={(theme) => ({
                            position: "relative",
                            flex: `1 1 calc(100% / ${product.variants.length})`,
                            maxWidth: `calc(90% / ${product.variants.length})`,
                            height: 36,
                            backgroundColor: v.shortName.toLowerCase(),
                            border: `3px solid ${
                              variantId === v.id
                                ? theme.colors.violet[7]
                                : theme.colors.gray[7]
                            }`,
                            cursor: "pointer",
                            "&:hover": {
                              opacity: 0.8,
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          })}
                        >
                          {/* {variantId === v.id && (
                            <CheckIcon
                              fontSize={20}
                              color="white"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                mixBlendMode: "difference",
                                fontSize: "20px",
                              }}
                            />
                          )} */}
                        </Box>
                      ))}
                  </Group>
                </Stack>
              </Group>

              <Group mt={4} sx={{ width: "100%" }}>
                <Button
                  ff="MonumentExtended-Regular"
                  disabled={quantity <= 0}
                  onClick={gotoCheckout}
                  py={4}
                  fw={900}
                  style={{
                    color: "black",
                    letterSpacing: "16px",
                    fontSize: 44,
                    width: "70%",
                    height: "50px",
                  }}
                >
                  ORDER
                </Button>
                <Popover opened={orderLimitPopoverOpened} onChange={setOrderLimitPopoverOpened}>
                  <Popover.Target>
                    <NumberInput
                      sx={{
                        input: {
                          height: "50px",
                          lineHeight: "50px",
                          fontSize: "50px",
                          background: "#854df2",
                          color: "black",
                        },
                        ".mantine-NumberInput-control": {
                          color: "black",
                          fontSize: "50px",
                        },
                      }}
                      style={{
                        background: "#854df2",
                        fontFamily: "MonumentExtended-Regular",
                        width: "20%",
                      }}
                      min={1}
                      max={1}
                      value={quantity}
                      onChange={(e) => setOrderLimitPopoverOpened(true)}
                    />
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text w={300} size='xs'>Customers are restricted to one T-Shirt per order as these are Limited First Editions</Text>
                  </Popover.Dropdown>
                </Popover>
                
              </Group>
              <Stack
                style={{
                  width: "100%",
                  overflow: "hidden",
                  paddingRight: "15px",
                }}
              >
                <Accordion>
                  <Accordion.Item value="features">
                    <Accordion.Control
                      className={classes.accordionControl}
                    >
                      Features
                    </Accordion.Control>
                    <Accordion.Panel
                      style={{ width: "100%", overflow: "hidden" }}
                    >
                      <Text className={classes.font}>
                        {product.features}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>

                <Accordion>
                  <Accordion.Item value="design">
                    <Accordion.Control
                      className={classes.accordionControl}
                    >
                      Design
                    </Accordion.Control>
                    <Accordion.Panel
                      style={{ width: "100%", overflow: "hidden" }}
                    >
                      <Text className={classes.font}>
                        {product.inspiration}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>

                <Accordion>
                  <Accordion.Item value="shipping-returns">
                    <Accordion.Control
                      className={classes.accordionControl}
                    >
                      Shippings & Returns
                    </Accordion.Control>
                    <Accordion.Panel
                      style={{ width: "100%", overflow: "auto" }}
                    >
                      <Text className={classes.font}>
                        {product?.additional?.shipping}
                      </Text>
                      <Divider my={20} />
                      <Text mt={8} className={classes.font}>
                        {product?.additional?.returns}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Stack>
              <ProductShare
                productId={product.id}
                productName={product.name}
                size={"xs"}
                status={status}
              />
            </Stack>
          )}
        </DIV>
      )}
      </Group>
    </Stack>
  )
}
export default Apparel;
