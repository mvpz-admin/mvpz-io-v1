"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/router";

interface EnhancementCard {
  title: string;
  description: string;
  cardNFTImage: string;
  purchaseId: string;
}

interface BaseCard {
  title: string;
  description: string;
  cardImageNFT: string;
  purchaseCardId: string;
}

interface CardSet {
  baseCard: BaseCard;
  enhancementCards: EnhancementCard[];
}

export default function Index({ cardData, handleCloseModel }) {
  const [selectedCard, setSelectedCard] = useState<CardSet | null>(null);
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50">
      <div className="h-screen overflow-y-auto flex flex-col items-center justify-start text-white font-inter py-20">
        {/* Header */}
        <div className="w-full max-w-4xl px-4 mb-12">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handleCloseModel}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={() => router.push(`/p/${user?.username}`)}
              className="px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
            >
              View Collection
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-3 text-white/90 tracking-tight">
            Mint Your Cards
          </h1>
          <p className="text-gray-400 text-center text-base max-w-2xl mx-auto">
            Transform your base cards into powerful enhanced versions through our unique minting process
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-6">
            {cardData?.map((card, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                <div className="flex items-center gap-8">
                  {/* Base Card */}
                  <div className="relative w-[160px] h-[240px] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={card.baseCard.cardImageNFT}
                      alt={card.baseCard.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Card Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-white/90 mb-2">
                        {card.baseCard.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {card.baseCard.description}
                      </p>
                    </div>
                    
                    {/* Enhancement Cards Preview */}
                    {card.enhancementCards.length > 0 && (
                      <div className="flex gap-4">
                        {card.enhancementCards.map((enhancement, i) => (
                          <div
                            key={i}
                            className="relative w-[100px] h-[150px] rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                          >
                            <Image
                              src={enhancement.cardNFTImage}
                              alt={enhancement.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm flex-shrink-0">
                    Start Minting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minting Modal */}
      {selectedCard && (
        <MintingModal
          cardSet={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}

interface MintingModalProps {
  cardSet: CardSet;
  onClose: () => void;
}

function MintingModal({ cardSet, onClose }: MintingModalProps) {
  const [mintingStep, setMintingStep] = useState<
    "initial" | "merging1" | "merged1" | "merging2" | "complete"
  >("initial");
  const [isMinting, setIsMinting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);

  const allCards = [
    {
      image: cardSet.baseCard?.cardImageNFT || "/placeholder.jpg",
      title: "Base Card",
    },
    ...(cardSet.enhancementCards || []).map((card, index) => ({
      image: card?.cardNFTImage || "/placeholder.jpg",
      title: `Enhancement ${index + 1}`,
    })),
  ];

  const hasEnhancements = allCards.length > 1;
  const hasTwoEnhancements = allCards.length > 2;

  useEffect(() => {
    if (isMinting) {
      const interval = setInterval(() => {
        setMintingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [isMinting]);

  const handleMint = async () => {
    setIsMinting(true);

    if (!hasEnhancements) {
      setMintingStep("complete");
      return;
    }

    setMintingStep("merging1");
    setMintingProgress(0);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (!hasTwoEnhancements) {
      setMintingStep("complete");
      return;
    }

    setMintingStep("merged1");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMintingProgress(0);
    setMintingStep("merging2");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setMintingStep("complete");
  };

  const renderArrow = () => (
    <div className="flex items-center mx-4">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const renderCard = (image: string, title: string) => (
    <div className="flex flex-col items-center gap-2">
      <p className="text-white/70 text-sm font-medium mb-2">{title}</p>
      <div className="relative w-[200px] h-[300px] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="w-full max-w-6xl px-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white/90 tracking-tight">
              Mint Your Enhanced Card
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cards Display Area */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {mintingStep === "initial" && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                {renderCard(allCards[0].image, "Base Card")}
                {renderArrow()}
                {renderCard(allCards[1].image, "Enhancement 1")}
                {allCards.length > 2 && (
                  <>
                    {renderArrow()}
                    {renderCard(allCards[2].image, "Enhancement 2")}
                  </>
                )}
                {renderArrow()}
                {renderCard(allCards[allCards.length - 1].image, "Final Card")}
              </div>
            )}

            {(mintingStep === "merging1" || mintingStep === "merging2") && (
              <div className="relative">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  {renderCard(
                    mintingStep === "merging1" ? allCards[0].image : allCards[1].image,
                    mintingStep === "merging1" ? "Base Card" : "Enhanced Card"
                  )}
                  {renderArrow()}
                  {renderCard(
                    mintingStep === "merging1" ? allCards[1].image : allCards[2].image,
                    mintingStep === "merging1" ? "Enhancement 1" : "Enhancement 2"
                  )}
                </div>
                <div className="mt-8">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/20 transition-all duration-300"
                      style={{ width: `${mintingProgress}%` }}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {mintingProgress}% Complete
                  </p>
                </div>
              </div>
            )}

            {mintingStep === "complete" && (
              <div className="flex flex-col items-center">
                <p className="text-white/70 text-sm font-medium mb-2">Enhanced Card</p>
                <div className="relative w-[200px] h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={allCards[allCards.length - 1].image}
                    alt="Enhanced Card"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            )}
          </div>

          {/* Status and Controls */}
          <div className="text-center mt-8">
            {mintingStep === "initial" && (
              <button
                onClick={handleMint}
                disabled={isMinting}
                className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
              >
                Start Minting Process
              </button>
            )}

            {mintingStep === "merging1" && (
              <p className="text-white/80 text-base">
                Merging Base Card with First Enhancement...
              </p>
            )}

            {mintingStep === "merging2" && (
              <p className="text-white/80 text-base">
                Applying Final Enhancement...
              </p>
            )}

            {mintingStep === "complete" && (
              <div className="space-y-4">
                <p className="text-white/90 text-base font-medium">
                  Card Successfully Enhanced!
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
                >
                  View in Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
