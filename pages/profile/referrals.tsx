import {
  Button,
  CopyButton,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandPinterest,
  IconBrandX,
  IconCheck,
  IconClipboardCopy,
  IconCopy,
  IconCopyleft,
  IconCopyright,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { callAPI } from "../../lib/utils";
import ProfileLayout from "../../core/Layout/ProfileLayout";

export default function Referrals() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [referralData, setReferralData] = useState({} as any);
  const largeScreen = useMediaQuery("(min-width: 60em)");
  const theme = useMantineTheme();
  const shareUrl = referralData.inviteCode
    ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin?referralCode=${referralData.inviteCode}`
    : "";
  const fetchInviteCode = async () => {
    const response = await callAPI({ endpoint: "/api/user/getReferralInvite" });
    if (response) {
      setReferralData(response);
    }
  };
  const fetchReferralsInfo = async () => {
    const response = await callAPI({
      endpoint: "/api/user/getReferralEarnings",
    });
    if (response) {
      setReferralData((prevData) => {
        return { ...prevData, ...response };
      });
    }
  };

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      fetchInviteCode();
      fetchReferralsInfo();
    }
  }, []);

  return (
    <ProfileLayout>
      <div className="relative w-full ">
        {loading ? (
          <Loader />
        ) : (
          <Stack align={"center"}>
            <article className="md:text-[50px] text-2xl  md:text-left   uppercase font-graffiti">
             <span className='text-primary'>My</span> REFERRAL
            </article>

            <Group
              px={8}
              style={{ backgroundColor: theme.colors.gray[9] }}
              mt={64}
              spacing={largeScreen ? 32 : 8}
            >
              <Text size={largeScreen ? "md" : "sm"}>REFERRAL LINK</Text>
              <Group position="apart" spacing={largeScreen ? 64 : 16}>
                <Divider
                  size={"md"}
                  orientation="vertical"
                  color={theme.colors.mvpz[8]}
                />
                <Text size={largeScreen ? "md" : "sm"}>
                  /{referralData.inviteCode}
                </Text>
                <CopyButton value={shareUrl}>
                  {({ copied, copy }) => (
                    <Button
                      px={0}
                      variant={"subtle"}
                      color={"white"}
                      onClick={copy}
                    >
                      {copied ? <IconCheck /> : <IconCopy color="white" />}
                    </Button>
                  )}
                </CopyButton>
              </Group>
            </Group>
            <Group style={{ background: "white", padding: 16 }} mt={16}>
              <QRCode size={200} value={shareUrl} />
            </Group>
            <Text mt={32} align="center">
              SIGNUPS
            </Text>
            <Divider w={"100%"} size={"sm"} color={theme.colors.mvpz[9]} />
            <Text align="center">{referralData.signupsCount}</Text>
            <SimpleGrid mt={16} w={"100%"} spacing={"xl"} cols={2}>
              <Text align="center">SIGNUP REFERRAL</Text>
              <Text align="center">EARNED</Text>
            </SimpleGrid>
            <Divider w={"100%"} size={"sm"} color={theme.colors.mvpz[9]} />
            <SimpleGrid w={"100%"} spacing={"xl"} cols={2}>
              <Text align="center">
                {referralData.signupReferralsCount || 0}
              </Text>
              <Text align="center">
                ${referralData.signupReferralsAmount || 0}
              </Text>
            </SimpleGrid>
            <Divider w={"100%"} size={"sm"} color={theme.colors.mvpz[9]} />
            <SimpleGrid w={"100%"} spacing={"xl"} cols={2}>
              <Text align="center">PRODUCT REFERRAL</Text>
              <Text align="center">EARNED</Text>
            </SimpleGrid>
            <Divider w={"100%"} size={"sm"} color={theme.colors.mvpz[9]} />
            <SimpleGrid w={"100%"} spacing={"xl"} cols={2}>
              <Text align="center">
                {referralData.productReferralsCount || 0}
              </Text>
              <Text align="center">
                ${referralData.productReferralsAmount || 0}
              </Text>
            </SimpleGrid>
            <Divider w={"100%"} size={"sm"} color={theme.colors.mvpz[9]} />
            <SimpleGrid w={"100%"} spacing={"xl"} cols={2}>
              <Text align="center">TOTAL</Text>
              <Text align="center">
                $
                {(
                  (referralData.productReferralsAmount || 0) +
                  (referralData.signupReferralsAmount || 0)
                ).toFixed(2)}
              </Text>
            </SimpleGrid>
            <Group mt={16}>
              <Button
                variant={"light"}
                component="a"
                href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}
                target={"_blank"}
                leftIcon={<IconBrandFacebook />}
              >
                Share
              </Button>
              <Button
                variant={"light"}
                component="a"
                href={`https://twitter.com/share?text=${encodeURIComponent(
                  "Welcome to MVPZ!"
                )}&url=${shareUrl}`}
                target={"_blank"}
                leftIcon={<IconBrandX />}
              >
                Tweet
              </Button>
              <Button
                variant={"light"}
                component="a"
                href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
                target={"_blank"}
                leftIcon={<IconBrandPinterest />}
              >
                Pin it
              </Button>
            </Group>
            <Stack mt={64} spacing={0}>
              <Text align="center" size={8}>
                *For best results we recommend putting your referral link in
                your social media bio with “MVPz ambassador”
              </Text>
              <Text align="center" size={8}>
                As well sending it to people who you know are sports fans via
                DM, Email, and MSM.
              </Text>
              <Text align="center" size={8}>
                Hit the share button to be presented with different options.
              </Text>
            </Stack>
          </Stack>
        )}
      </div>
    </ProfileLayout>
  );
}
