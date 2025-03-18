import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface ClaimCardsProps {
  cards: string[];
}

const ClaimCards: React.FC<ClaimCardsProps> = ({ cards }) => {
  const router = useRouter();
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState<number | null>(null);
  const [hasRevealStarted, setHasRevealStarted] = useState(false);
  const [isRevealingAll, setIsRevealingAll] = useState(false);

  const handleReveal = (index: number) => {
    if (isRevealingAll) return;
    
    setCurrentRevealIndex(index);
    setHasRevealStarted(true);
    
    setTimeout(() => {
      setRevealedCards(prev => [...prev, index]);
      setCurrentRevealIndex(null);
      setHasRevealStarted(false);
    }, 1500);
  };

  const handleRevealAll = () => {
    if (isRevealingAll || revealedCards.length === cards.length) return;
    
    setIsRevealingAll(true);
    setHasRevealStarted(true);

    const unrevealed = Array.from({ length: cards.length }, (_, i) => i)
      .filter(i => !revealedCards.includes(i));

    unrevealed.forEach((index, i) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, index]);
        if (i === unrevealed.length - 1) {
          setIsRevealingAll(false);
          setHasRevealStarted(false);
        }
      }, 300 * i);
    });
  };

  const allCardsRevealed = revealedCards.length === cards.length;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-3 sm:mb-4">Your Collection Awaits!</h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">Swipe to explore and click to reveal your rewards</p>
          
          {!allCardsRevealed && (
            <button
              onClick={handleRevealAll}
              disabled={isRevealingAll}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Reveal All Cards
            </button>
          )}
        </div>
        
        <div className="relative py-10">
          <style jsx global>{`
            .swiper {
              padding: 50px 0;
              overflow: visible;
            }
            .swiper-slide {
              transition: all 0.3s ease;
              opacity: 0.4;
              transform: scale(0.8);
            }
            .swiper-slide-active {
              opacity: 1;
              transform: scale(1.1);
            }
            .swiper-slide-prev,
            .swiper-slide-next {
              opacity: 0.7;
              transform: scale(0.9);
            }
            .swiper-3d .swiper-slide-shadow-left,
            .swiper-3d .swiper-slide-shadow-right {
              background-image: none;
            }
          `}</style>
          
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 350,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="w-full"
          >
            {cards.map((imageUrl, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <Card
                  imageUrl={imageUrl}
                  index={index}
                  isLocked={false}
                  isRevealed={revealedCards.includes(index)}
                  hasRevealStarted={hasRevealStarted && (currentRevealIndex === index || isRevealingAll)}
                  revealDelay={isRevealingAll ? index * 0.3 : 0}
                  onReveal={handleReveal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {allCardsRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => router.push('/collectables')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              View My Collectables
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface CardProps {
  imageUrl: string;
  isLocked: boolean;
  onReveal: (index: number) => void;
  index: number;
  isRevealed: boolean;
  hasRevealStarted: boolean;
  revealDelay?: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, isLocked, onReveal, index, isRevealed, hasRevealStarted, revealDelay = 0 }) => {
  return (
    <div
      className={`relative w-[280px] sm:w-[300px] h-[380px] sm:h-[400px] mx-auto cursor-pointer ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={() => !isLocked && !isRevealed && onReveal(index)}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative w-full h-full transition-transform duration-1000"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card (unrevealed) */}
        <div 
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-purple-900 to-purple-600 shadow-xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Image
            src={`https://res.cloudinary.com/dv667zlni/image/upload/v1742019454/Enh2_boc_orvnll.png`}
            alt="Card Back"
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 rounded-xl backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-xl font-bold">Click to Reveal</div>
          </div>
        </div>

        {/* Back of card (revealed) */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Image
            src={imageUrl}
            alt="Card Front"
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>

      {/* Reveal effect overlay */}
      <AnimatePresence>
        {hasRevealStarted && !isRevealed && (
          <motion.div
            className="absolute inset-0 bg-purple-500/50 backdrop-blur-md rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClaimCards; 