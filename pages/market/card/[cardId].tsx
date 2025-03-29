"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaAngleLeft, FaHeart } from "react-icons/fa";

// Dummy data
const cardData = {
  id: "CARD123",
  title: "Aaron Wan-Bissaka",
  description: "Season 2025 • Quality 1",
  price: 1.00,
  totalLikes: 23,
  position: "DEF",
  rating: 79,
  cardLeft: 5,
  seller: {
    name: "MVPz_Trader",
    username: "@mvpz_trader",
    image: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022371/85ed0c8772e82f0d95b539eaa9b5742e_ypmdki.jpg",
  },
  cardImage: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329468/4c5870210b1b0991c28b616ffd799482_idbojf.jpg",
  tradeHistory: [
    {
      buyer: {
        name: "CryptoSports",
        image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329445/90ac4f4bfbe4da4709d41134b9800d35_vyz4qj.jpg",
        buyAtPrice: 0.95,
        purchaseOne: "2024-03-15"
      },
    },
    {
      buyer: {
        name: "SportsFan",
        image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329431/37fac74cd1b2d0901059cf2f6e74b7e5_hh6erq.jpg",
        buyAtPrice: 0.88,
        purchaseOne: "2024-03-10"
      },
    },
    {
      buyer: {
        name: "NFTCollector",
        image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329403/00307a7fd07a4c90e44ffcd3b0dd6a6b_p9xhlw.jpg",
        buyAtPrice: 0.82,
        purchaseOne: "2024-03-05"
      },
    }
  ],
  relatedCards: {
    cards: [
      {
        id: "1",
        nftImage: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329468/4c5870210b1b0991c28b616ffd799482_idbojf.jpg",
        selected: true
      },
      {
        id: "2",
        nftImage: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329445/90ac4f4bfbe4da4709d41134b9800d35_vyz4qj.jpg",
        selected: false
      },
      {
        id: "3",
        nftImage: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329431/37fac74cd1b2d0901059cf2f6e74b7e5_hh6erq.jpg",
        selected: false
      }
    ]
  },
  cardDetails: {
    special: "Limited Edition",
    edition: "Mvpz Gen 1",
    year: "2024",
    membershipTier: "Gold",
    design: "Premium",
    designer: "MVPz Studio"
  },
  athlete: {
    name: "Aaron Wan-Bissaka",
    username: "@awb",
    profileImage: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022371/85ed0c8772e82f0d95b539eaa9b5742e_ypmdki.jpg",
    isVerified: true
  },
  avatar: {
    version: "1.0",
    edition: "First Edition",
    title: "Premier League"
  }
};

const CardHistory = ({ trades }) => {
  return (
    <div className="w-full">
      <article className="text-xl mb-4">Trade History</article>
      <div className="w-full">
        {trades?.map((trade, idx) => (
          <div className="flex justify-start items-center gap-4 mb-5" key={idx}>
            <div className="w-10 h-10 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden">
              <Image
                src={trade.buyer.image}
                alt={trade.buyer.name}
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="relative flex-1 w-full">
              <article className="text-sm">{trade.buyer.name}</article>
              <article className="text-[10px] opacity-50">
                buy at <strong>${trade.buyer.buyAtPrice}</strong> on{" "}
                <strong>{new Date(trade.buyer.purchaseOne).toDateString()}</strong>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="min-h-screen bg-black w-full pt-[125px] py-16 md:px-10 px-5 space-y-10">
      <div
        className="flex justify-start items-center gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <FaAngleLeft />
        <article className="text-[14px]">Marketplace</article>
      </div>

      <div className="w-full md:h-screen h-auto flex md:flex-row flex-col justify-start items-start gap-20 md:px-10">
        {/* Card Image */}
        <div className="md:sticky top-40 md:w-[450px] w-full">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={cardData.cardImage}
              alt={cardData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Card Details */}
        <div className="flex-1 w-full">
          <div className="flex justify-start items-center gap-2 mb-6">
            <div className="px-4 py-2 rounded-md bg-secondary flex justify-start items-center border border-white border-opacity-5 gap-4 cursor-pointer">
              <FaHeart color={isLike ? "red" : "white"} onClick={() => setIsLike(!isLike)} />
              <article className="text-xs">
                {cardData.totalLikes} Likes
              </article>
            </div>
          </div>

          <div className="w-full mb-10">
            <article className="text-2xl font-monumentRegular mb-2">
              {cardData.title}
            </article>
            <article className="text-sm font-inter font-semibold max-w-[80%]">
              {cardData.description}
            </article>
          </div>

          {/* Seller Info */}
          <div className="flex justify-start items-center gap-x-14 mb-10">
            <div className="relative space-y-2">
              <article>Seller</article>
              <div className="flex justify-start items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden">
                  <Image
                    src={cardData.seller.image}
                    alt={cardData.seller.name}
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="relative flex-1 w-full mb-1">
                  <article className="text-xs">{cardData.seller.name}</article>
                  <article className="text-[8px] opacity-50">{cardData.seller.username}</article>
                </div>
              </div>
            </div>
          </div>

          {/* Trade History */}
          <CardHistory trades={cardData.tradeHistory} />

          {/* Price and Actions */}
          <div className="w-full mb-5">
            <article className="text-md mb-2">Price</article>
            <article className="text-3xl font-monumentUltraBold">
              ${cardData.price}
            </article>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="px-4 py-2 rounded-md bg-primary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm">
              <article className="text-lg">Buy Now</article>
            </div>

            <div 
              className="px-4 py-2 rounded-md bg-secondary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <article className="text-lg">{isWishlist ? "Remove From Wishlist" : "Wishlist"}</article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
