import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useBuyStore, useCartStore } from "../../../../store/useGlobalStore";
import { FaCheck } from "react-icons/fa";
import { Skeleton, Modal, Radio, Button } from "@mantine/core";

export const DisplayCard = ({ card, loading, type, height = "h-[375px]" }) => {
  const [isHover, setIsHover] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [eventType, setEventType] = useState<"buy" | "cart">(null);
  const [selectedCard, setSelectedCard] = useState("");
  const router = useRouter();
  const username = router.query.username;
  const {
    addToCartCard,
    removeFromCartCard,
    checkCardBaseCard,
    checkCardEnhancement,
  } = useCartStore((state) => state);
  const { addToBuy } = useBuyStore((state) => state);

  const handleAddToCart = () => {
    if (!card?.hasBaseCard?.hasCard) {
      addToCartCard({
        id: card.id,
        productType: "card" as const,
        card: {
          avatarId: card?.avatarBaseCard?.id,
          availableBaseCard: card?.hasBaseCard?.purchaseCards || [],
          baseCard: card?.avatarBaseCard || {},
          cardProductEnhancementCard: [
            {
              id: card?.id,
              title: card?.title,
              price: card?.price,
              image: card?.nftImage,
              cardType: card?.cardType,
            },
          ],
        },
      });
    } else {
      setShowCardModal(true);
      setEventType("cart");
    }
  };

  const handleBuyNow = () => {
    if (!card?.hasBaseCard?.hasCard) {
      addToBuy({
        id: card.id,
        productType: "card" as const,
        card: {
          avatarId: card?.avatarBaseCard?.id,
          availableBaseCard: card?.hasBaseCard?.purchaseCards || [],
          baseCard: card?.hasBaseCard?.purchaseCards?.[0] || {},
          cardProductEnhancementCard: [
            {
              id: card?.id,
              title: card?.title,
              price: card?.price,
              image: card?.nftImage,
              cardType: card?.cardType,
            },
          ],
        },
      });
    } else {
      setShowCardModal(true);
      setEventType("buy");
    }
  };

  const handleModalConfirm = () => {
    let baseDetails = card?.hasBaseCard?.purchaseCards
      ?.filter((c) => c.cardSerialNumber === selectedCard)
      ?.map((c) => {
        let { nftMajorEnhancement, ...rest } = c;
        return {
          ...rest,
          ...nftMajorEnhancement,
        };
      })[0];

    if (eventType === "buy") {
      // Handle buy case
      addToBuy({
        id: card.id,
        productType: "card" as const,
        card: {
          avatarId: card?.avatarBaseCard?.id,
          availableBaseCard: card?.hasBaseCard?.purchaseCards || [],
          baseCard:
            selectedCard === "new"
              ? {
                  id: card?.avatarBaseCard?.id,
                  title: card?.avatarBaseCard?.title,
                  price: card?.baseCardPrice || 0,
                  image: card?.avatarBaseCard?.thumnail,
                }
              : {
                  id: card?.avatarBaseCard?.id,
                  title: card?.avatarBaseCard?.title,
                  price: 0,
                  image: baseDetails?.thumbnail,
                  serialNumber: baseDetails?.cardSerialNumber,
                },
          cardProductEnhancementCard: card?.cardType === "Base Card" ? [] : [
            {
              id: card?.id,
              title: card?.title,
              price:
                selectedCard === "new"
                  ? Number(card?.price) + Number(card?.baseCardPrice)
                  : Number(card?.price),
              image: card?.nftImage,
              cardType: card?.cardType,
            },
          ],
        },
      });
    } else {
      addToCartCard({
        id: card.id,
        productType: "card" as const,
        card: {
          avatarId: card?.avatarBaseCard?.id,
          availableBaseCard: card?.hasBaseCard?.purchaseCards || [],
          baseCard:
            selectedCard === "new"
              ? {
                  id: card?.avatarBaseCard?.id,
                  title: card?.avatarBaseCard?.title,
                  price: card?.baseCardPrice || 0,
                  image: card?.avatarBaseCard?.thumnail,
                }
              : {
                  id: card?.avatarBaseCard?.id,
                  title: card?.avatarBaseCard?.title,
                  price: 0,
                  image: baseDetails?.thumbnail,
                  serialNumber: baseDetails?.cardSerialNumber,
                },
          cardProductEnhancementCard: [
            {
              id: card?.id,
              title: card?.title,
              price:
                selectedCard === "new"
                  ? Number(card?.price) + Number(card?.baseCardPrice)
                  : Number(card?.price),
              image: card?.nftImage,
              cardType: card?.cardType,
            },
          ],
        },
      });
    }

    setShowCardModal(false);
  };

  return (
    <>
      <div
        className={`relative w-full  bg-secondary rounded-lg overflow-hidden ${height}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => router.push(`/a/${username}/card/${card?.id}`)}
      >
        {/* bgImage */}
        {!loading && (
          <div className="absolute top-0 left-0 w-full h-full">
            {card?.nftImage && (
              <Image
                src={card?.nftImage}
                alt="bgimage"
                width={500}
                height={500}
                className={`relative w-full h-full object-cover rounded-lg  ${
                  isHover ? "scale-105" : "scale-100"
                } transition-all duration-300 ${
                  card?.isSoldOut && "grayscale"
                }`}
              />
            )}
          </div>
        )}
        {/* layer */}
        {
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent flex flex-col justify-end items-center">
            {/* content */}
            {type !== "X3x3Display" && (
              <div
                className={`w-full ${
                  type === "X2x2Display" ? "h-[70px]" : "h-[105px]"
                } bg-black bg-opacity-10 backdrop-blur-md `}
              >
                <div className="flex justify-start items-center gap-2 p-4">
                  <div className="flex flex-col justify-center items-start ">
                    {type !== "X2x2Display" && (
                      <>
                        {loading ? (
                          <Skeleton
                            className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                          />
                        ) : (
                          <span className="text-[10px] font-inter">
                            {card?.tribe?.tribeShortName}
                          </span>
                        )}
                      </>
                    )}
                    <>
                      {loading ? (
                        <Skeleton
                          className={`bg-secondary w-[125px] h-[18px] rounded-md mb-1`}
                        />
                      ) : (
                        <div className="flex  justify-start items-center">
                          <article className="text-sm font-inter font-semibold">
                            {card?.title}
                          </article>
                        </div>
                      )}
                    </>
                  </div>
                </div>
                {type !== "X2x2Display" && (
                  <div
                    className={`w-full transition-all duration-300 bg-white bg-opacity-5 flex-1   flex justify-center items-center text-[10px] py-[8px] font-inter font-bold`}
                  >
                    {!loading && <>${card?.price}</>}
                  </div>
                )}
              </div>
            )}
            {/* Buy Button */}
            {!loading && (
              <div
                className={`absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-start items-center transition-all duration-300 ${
                  isHover && !card?.isSoldOut
                    ? "translate-y-0"
                    : "translate-y-10"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow();
                }}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <article className="text-[10px]">Buy Now</article>
                </div>
              </div>
            )}
          </div>
        }
        {/* Add To Cart */}
        {!loading && (
          <>
            {!card?.isSoldOut &&
              (isHover ||
                (card?.cardType === "Base Card"
                  ? checkCardBaseCard(card?.avatarBaseCard?.id)
                  : checkCardEnhancement(
                      card?.avatarBaseCard?.id,
                      card.id
                    ))) && (
                <div
                  className={`absolute top-2 right-2 h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300 `}
                >
                  {!(card?.cardType === "Base Card"
                    ? checkCardBaseCard(card?.avatarBaseCard?.id)
                    : checkCardEnhancement(
                        card?.avatarBaseCard?.id,
                        card.id
                      )) ? (
                    <div
                      className="relative h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                    >
                      <TiPlus size={20} className="text-white" />
                    </div>
                  ) : (
                    <div
                      className="relative h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCartCard(
                          card?.avatarBaseCard?.id,
                          card.id,
                          card.cardType
                        );
                      }}
                    >
                      <FaCheck size={20} className="text-white" />
                    </div>
                  )}
                </div>
              )}
          </>
        )}

        {/* Card Type */}
        {!loading && (
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-primary flex justify-center items-center transition-all duration-300 font-inter text-[10px] font-bold bg-gradient-to-r ${card?.colors?.bgGradinet}`}
          >
            {card?.cardType}
          </div>
        )}
      </div>

      {/* Card Selection Modal */}
      <Modal
        opened={showCardModal}
        onClose={() => setShowCardModal(false)}
        title="Select Base Card"
        centered
        classNames={{
          content:
            "bg-black bg-opacity-90 backdrop-blur-xl rounded-xl font-inter",
          header: "bg-transparent ",
          title: "text-white text-xl font-bold",
          close: "text-white hover:bg-white/10",
          body: "text-white",
        }}
      >
        <div className="flex flex-col gap-4 !font-inter ">
          <Radio.Group
            value={selectedCard}
            onChange={setSelectedCard}
            className="space-y-2 !font-inter"
          >
            {card?.hasBaseCard?.purchaseCards?.map((purchaseCard) => (
              <Radio
                key={purchaseCard.id}
                value={purchaseCard.cardSerialNumber}
                label={purchaseCard.cardSerialNumber}
                classNames={{
                  label: "text-white font-inter text-[14px] font-medium",
                  radio: "text-primary",
                }}
              />
            ))}
            <Radio
              value="new"
              label="Create New Base Card"
              classNames={{
                label: "text-white font-inter text-[14px] font-medium",
                radio: "text-primary",
              }}
            />
          </Radio.Group>
          <Button
            onClick={handleModalConfirm}
            disabled={!selectedCard}
            className="mt-4 bg-primary hover:bg-primary/90 "
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
