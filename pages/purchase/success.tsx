import {
  Button,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { callAPI, downloadFile } from "../../lib/utils";
import { MdError } from "react-icons/md";
import { useSession } from "next-auth/react";

export default function Cancel() {
  const router = useRouter();
  const { paymentId } = router.query;
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [bundleType, setBundleType] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(true);
  const [packQuantity, setPackQuantity] = useState(1);
  const { data: session } = useSession();

  const ReportToMvpz = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="md:w-[450px] w-full py-10 rounded-lg">
          <MdError size={40} className="text-red-500 mb-2" />
          <article className="mb-2">We Apologize for the Inconvenience</article>
          <article className="font-inter text-[12px] font-semibold opacity-80 mb-10">
            Dear {session?.user?.name},<br /> we sincerely apologize for the
            inconvenience. Your payment ID is {paymentId}. Due to a system
            error, your card couldn't be revealed immediately. Rest assured, we
            have logged your issue, and you will receive your card within 1-2
            business days. Thank you for your understanding and patience!
          </article>

          <div
            className="text-[10px] bg-primary py-2 px-3 rounded-md inline-block cursor-pointer mb-10"
            onClick={() => router.push("/profile/myCards")}
          >
            My Collections
          </div>

          <div className="flex flex-col justify-center items-center mt-10">
            <article className="font-inter text-[10px] text-center font-semibold opacity-50">
              Thank You, Mvpz.io
            </article>
            <article className="font-inter text-[10px] text-center font-semibold opacity-50">
              {" "}
              @MVPz Website | Copyright 2025
            </article>
          </div>
        </div>
      </div>
    );
  };

  async function downloadImages(_cards, authToken, url) {
    for (let card of _cards) {
      if (card.nftEntity?.cardImageNFT) {
        card.displayImage = await downloadFile(
          `${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`,
          authToken
        );
      }
    }
    setCards(_cards);
    return setLoading(false)
  }

  const processPayment = async () => {
    setLoading(true);
    const result = await callAPI({
      endpoint: `/api/purchase/processPayment?paymentId=${paymentId}`,
    });
    setPaymentSuccessful(result?.status === "success");
    if (result.message === "payment already processed") {
      router.push("/profile/myCards");
    }

    if (result?.status === "success") {
      const response = await callAPI({
        endpoint: `/api/purchase/assignCards?paymentId=${paymentId}`,
      });
      
      if (response.cards) {
        if(response?.cards?.length === 0){
          return setLoading(false);
        }
        await downloadImages(
          response.cards,
          response.imageDownload?.authorizationToken,
          response.imageDownload?.downloadUrl
        );
        setLoading(false);
        setBundleType(response.bundleType);
        setPackQuantity(response.packQuantity);
      } else if (response.order) {
        setLoading(false);
        notifications.show({ message: "Order successfully placed." });
        router.push("/orders");
      }
    } else {
      notifications.show({
        message: "Something went wrong in processing the order.",
      });
    }
  };

  const revealCard = (card) => {
    setCards(
      cards.map((c) => {
        if (bundleType === "collection") {
          c.revealed = true;
        } else {
          if (c.id === card.id) {
            c.revealed = true;
          }
        }
        return c;
      })
    );
  };

  useEffect(() => {
    if (paymentId) {
      processPayment();
    }
  }, [paymentId]);

  return (
    <div className="relative min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] py-10">
      {loading ? (
        <div className="flex flex-col w-full  h-full justify-center items-center">
          <Loader variant="dots" color="white" />
          <article>Payment Processing, Please Wait...</article>
        </div>
      ) : (
        <>
          <Group mt={16} position={"center"}>
            {paymentSuccessful ? (
              !!cards.length ? (
                <Text>Click on each card to reveal</Text>
              ) : (
                <div className="relative w-full h-full">
                  <ReportToMvpz />
                </div>
              )
            ) : (
              <Text>
                There has been some issue with the payment. We will get back to
                you shortly.
              </Text>
            )}
          </Group>
          {!!cards.length && (
            <Stack>
              <SimpleGrid
                mt={32}
                breakpoints={[
                  { minWidth: 240, cols: 2 },
                  { minWidth: "md", cols: 3 },
                  { minWidth: 1200, cols: 5 },
                ]}
              >
                {cards.map((card) => {
                  return (
                    <Image
                      alt=""
                      style={{ cursor: "pointer" }}
                      key={card.id}
                      onClick={() => revealCard(card)}
                      src={
                        !!card.revealed
                          ? card.displayImage
                          : "/images/card-backside.png"
                      }
                    ></Image>
                  );
                })}
              </SimpleGrid>
              <Group position="center">
                <Button onClick={() => router.push("/profile/myCards")}>
                  My Collection
                </Button>
              </Group>
            </Stack>
          )}
        </>
      )}
    </div>
  );
}
