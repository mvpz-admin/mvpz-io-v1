import { Carousel } from "@mantine/carousel";
import {
  Button,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const useStyles = createStyles((theme) => ({
  bannerImage: {
    marginTop: -32,
    marginBottom: -32,
    [theme.fn.smallerThan("sm")]: {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  splitter: {
    marginTop: -100,
    marginBottom: -100,
    [theme.fn.smallerThan("sm")]: {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  curvedIcons: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

const Arenaz = () => {
  const { classes } = useStyles();
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(3);
  const carouselRef = useRef(null);
  const router = useRouter();
  const largeScreen = useMediaQuery("(min-width: 60em)");

  useEffect(() => {
    setLoading(false);
  }, []);

  const Slide = ({ image, title, description, buttonText, buttonAction }) => {
    return (
      <Carousel.Slide>
        <Group position="center">
          <Image alt="" width={largeScreen ? 200 : 100} src={image} />
          <Stack>
            <Title order={largeScreen ? 2 : 4}>{title}</Title>
            <Text size={largeScreen ? "sm" : "xs"} w={largeScreen ? 400 : 200}>
              {description}
            </Text>
            <Group>
              <Button onClick={buttonAction}>{buttonText}</Button>
            </Group>
          </Stack>
        </Group>
      </Carousel.Slide>
    );
  };

  const CurvedIcons = () => {
    const handleClick = (slideIndex) => {
      setActiveSlide(slideIndex);
      if (carouselRef.current) {
        carouselRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <Group
        position="center"
        spacing={largeScreen ? 60 : 40}
        noWrap
        style={{ position: "relative" }}
      >
        <Stack
          align="center"
          style={{ transform: "translateY(-10%)", cursor: "pointer" }}
          onClick={() => handleClick(0)}
        >
          <Image alt="" width={largeScreen ? 80 : 50} src="/images/pack5.png" />
          <Title order={largeScreen ? 4 : 6} align="center">
            Collection
          </Title>
        </Stack>

        <Stack
          align="center"
          style={{ transform: "translateY(20%)", cursor: "pointer" }}
          onClick={() => handleClick(2)}
        >
          <Image alt="" width={largeScreen ? 80 : 50} src="/images/handshake.png" />
          <Title order={largeScreen ? 4 : 6} align="center">
            Marketplace
          </Title>
        </Stack>

        <Stack
          align="center"
          style={{ transform: "translateY(35%)", cursor: "pointer" }}
          onClick={() => handleClick(3)}
        >
          <Image alt="" width={largeScreen ? 80 : 50} src="/images/mvpz-store.png" />
          <Title order={largeScreen ? 4 : 6} align="center">
            Stores
          </Title>
        </Stack>

        <Stack
          align="center"
          style={{ transform: "translateY(20%)", cursor: "pointer" }}
          onClick={() => handleClick(1)}
        >
          <Image alt="" width={largeScreen ? 80 : 50} src="/images/whistle.png" />
          <Title order={largeScreen ? 4 : 6} align="center">
            Game On
          </Title>
        </Stack>

        <Stack
          align="center"
          style={{ transform: "translateY(-10%)", cursor: "pointer" }}
          onClick={() => handleClick(4)}
        >
          <Image alt="" width={largeScreen ? 80 : 50} src="/images/trophyBig.png" />
          <Title order={largeScreen ? 4 : 6} align="center">
            Leaderboard
          </Title>
        </Stack>
      </Group>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <Stack align={"center"} spacing={0}>
      <Image
        className={classes.bannerImage}
        width={largeScreen ? 1200 : 600}
        src="/images/arena.png"
      />
      {largeScreen && <CurvedIcons />}
      <Image
        className={classes.splitter}
        width={window.innerWidth - 16}
        src="/images/splitter.png"
        style={{ marginTop: '5px' }}
      />
      <Carousel
        ref={carouselRef} // Attach the ref here
        pb={64}
        withControls
        withIndicators
        maw={largeScreen ? window.innerWidth / 1.5 : window.innerWidth - 32}
        initialSlide={activeSlide}
        onSlideChange={(index) => setActiveSlide(index)} // Sync state with carousel
      >
        <Slide
          title={"Collections"}
          description={
            "Complete collections to gain XP, win prizes and claim revenue."
          }
          image={"/images/pack5.png"}
          buttonText={"Get Started!"}
          buttonAction={() => {
            router.push(
              status === "authenticated" ? "/profile/myCards" : "/auth/signin"
            );
          }}
        />
        <Slide
          title={"Game on"}
          description={"Use your cards to compete in sports strategy games."}
          image={"/images/whistle.png"}
          buttonText={"Coming soon!"}
          buttonAction={() => {}}
        />
        <Slide
          title={"Marketplace"}
          description={"Buy, sell and swap your cards with other users."}
          image={"/images/handshake.png"}
          buttonText={"Coming soon!"}
          buttonAction={() => {}}
        />
        <Slide
          title={"Store"}
          description={"Purchase the latest card packs and enhancements."}
          image={"/images/mvpz-store.png"}
          buttonText={"Lets go!"}
          buttonAction={() => {
            router.push("/mvpz-store");
          }}
        />
        <Slide
          title={"Leaderboard"}
          description={
            "Check out where you stand against other users and your friends."
          }
          image={"/images/trophyBig.png"}
          buttonText={"Lets go!"}
          buttonAction={() => {
            router.push("/leaderboard");
          }}
        />
      </Carousel>
      <Group position="center">
            <Image alt="" width={largeScreen ? 1000 : 350} src="/images/featuredon.png"></Image>
          </Group>
    </Stack>
  );
};
export default Arenaz;
