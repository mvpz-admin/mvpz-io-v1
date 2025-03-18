import {
  createStyles,
  Grid,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { callAPI, downloadFile } from "../../lib/utils";
import { getMedalHexCode } from "../../utils/others";
import { useSession } from "next-auth/react";
import ModelVr_O from "../../core/Atoms/Models/ModelVr_O";
import { IoMdClose } from "react-icons/io";
import { notifications } from "@mantine/notifications";
import MarketplaceLayout from "../../core/Layout/MarketplaceLayout";
import { FaHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import MarketCards from "../../core/Components/Marketplace/MarketCards";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import { IoFileTrayOutline } from "react-icons/io5";

const MoreCardLoading = () => {
  const largeScreen = useMediaQuery("(min-width: 60em)");
  return (
    <div className="relative w-full">
      <SimpleGrid cols={largeScreen ? 4 : 2}>
        {" "}
        {Array(10)
          .fill(0)
          .map((_) => (
            <Skeleton className="h-[500px] w-full rounded-md" />
          ))}
      </SimpleGrid>
    </div>
  );
};

const Index = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(null);
  const tabList = ["All","Swap", "Auction", "Popular Cards", "Most Selling", "My Favorite"];
  const [selectedTab, setSelectedTab] = useState("All");

  async function downloadImages(_cards, authToken, url, prevsCards) {
    for (let card of _cards) {
      if (card.enhancementImageNft || card?.baseImageNft) {
        card.displayImage = await downloadFile(
          card.enhancementImageNft
            ? `${url}/file/mvpz-nfts/${card.enhancementImageNft}`
            : `${url}/file/mvpz-nfts/${card.baseImageNft}`,
          authToken
        );
      }
      if (
        card?.owner?.profileImage &&
        !card?.owner?.profileImage?.includes("https://")
      ) {
        let downloadImage = await downloadFile(
          `${url}/file/mvpz-user-private/${card?.owner?.profileImage}`,
          authToken
        );

        card.owner.profileImage = downloadImage || null;
      }
    }

    setCards([...prevsCards, ..._cards]);
    setLoading(false);
    setMoreLoading(false);
  }

  const fetchCards = async () => {
    if (currentPage === 1) setLoading(true);
    if (currentPage > 1) setMoreLoading(true);

    let prevCards = currentPage === 1 ? [] : cards; // Clear previous cards only if it's the first page

    const result = await callAPI({
      endpoint: `/api/market/list?page=${currentPage}&pageType=${selectedTab}`,
    });

    if (result.cards?.length) {
      setHasMore(result?.pagination?.hasMore);
      downloadImages(
        result.cards,
        result.imageDownload?.authorizationToken,
        result.imageDownload?.downloadUrl,
        prevCards
      );
    } else {
      setLoading(false);
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    setCards([]);
    setCurrentPage(1);
    fetchCards();
  }, [selectedTab]);

  return (
    <MarketplaceLayout>
      <div className="min-h-screen">
        {/* banner */}
        <div className="relative w-full h-[350px]">
          <Image
            src={`/images/marketplace/banner2.jpg`}
            alt="marketplace-banner"
            width={500}
            height={500}
            className="relative w-full h-full object-cover brightness-50"
          />
          <div className="absolute bottom-0 left-0 md:p-10 p-5 w-full">
            <article className="md:text-[50px] text-2xl text-start  uppercase font-graffiti md:mb-5 mb-2 ">
              <span className="font-monumentUltraBold">Market</span>
              <span className="text-primary">Place</span>
            </article>
            <article>Buy, sell, swap, and enhance your cards</article>
          </div>
        </div>
        <div className="w-full py-16 md:px-10 p-5">
          <div className="flex md:flex-row flex-col-reverse md:justify-between  md:items-center items-end md:space-y-0 space-x-5 mb-10">
            <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden">
              <div className="flex justify-start items-center gap-2">
                {tabList?.map((tab, idx) => {
                  return (
                    <div
                      key={idx + tab}
                      className={`px-4 py-2 rounded-full ${
                        selectedTab == tab
                          ? "bg-primary border border-white border-opacity-50"
                          : "bg-secondary hover:bg-ternary border border-white border-opacity-5"
                      } font-inter font-semibold cursor-pointer text-sm `}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="flex justify-start items-center gap-2 cursor-pointer md:mb-0 mb-5"
              onClick={() => setSelectedTab("My Wishlist")}
            >
              <FaBagShopping size={22} className="text-primary" />
              <article className="text-sm">Wishlist</article>
            </div>
          </div>
          {/* Crards List */}
          {loading ? (
            <MoreCardLoading />
          ) : cards.length > 0 ? (
            moreLoading ? (
              <MoreCardLoading />
            ) : (
              <div className="relative w-full h-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 my-10 lg:gap-10 gap-5">
                {cards?.map((card) => {
                  return <MarketCards key={card?.title} card={card} />;
                })}
              </div>
            )
          ) : (
            <div className="relative w-[full] md:h-[50vh] flex flex-col justify-center items-center p-10">
              No Product Found
            </div>
          )}
          {hasMore && !loading && (
            <div className="w-full flex  justify-center items-center mt-10">
              <div
                className="px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2"
                onClick={() =>
                  !moreLoading && setCurrentPage((prev) => prev + 1)
                }
              >
                <article className="text-xs text-white">
                  {moreLoading || loading ? "Loading..." : "Load More"}
                </article>
                {moreLoading ||
                  (loading && (
                    <Loader variant="oval" className="text-primary" size={20} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Index;
