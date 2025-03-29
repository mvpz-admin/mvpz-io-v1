import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

interface Card {
  id: string;
  name: string;
  imageUrl: string;
  isOwned: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  daysLeft: number;
  progress: {
    current: number;
    total: number;
  };
  requiredCards: Card[];
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: "Collector's Dream",
    description: "Collect 5 cards from the Mythical series to unlock a special reward.",
    icon: "🏆",
    daysLeft: 3,
    progress: {
      current: 3,
      total: 5
    },
    requiredCards: [
      { id: '1', name: "Dragon's Breath", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329488/5f9b1417675a07e2ee46a0b76633d708_eocfkv.jpg", isOwned: true },
      { id: '2', name: "Phoenix Rising", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329468/4c5870210b1b0991c28b616ffd799482_idbojf.jpg", isOwned: true },
      { id: '3', name: "Kraken's Depth", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329445/90ac4f4bfbe4da4709d41134b9800d35_vyz4qj.jpg", isOwned: true },
      { id: '4', name: "Unicorn's Grace", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329431/37fac74cd1b2d0901059cf2f6e74b7e5_hh6erq.jpg", isOwned: false },
      { id: '5', name: "Griffin's Flight", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329403/00307a7fd07a4c90e44ffcd3b0dd6a6b_p9xhlw.jpg", isOwned: false }
    ]
  },
  {
    id: '2',
    title: "Elemental Master",
    description: "Collect one card of each element to demonstrate your mastery.",
    icon: "⚡",
    daysLeft: 5,
    progress: {
      current: 1,
      total: 4
    },
    requiredCards: [
      { id: '6', name: "Fire Essence", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329382/d4440dcfe44656a82e584dcb4804a73a_tulzhq.jpg", isOwned: true },
      { id: '7', name: "Water Spirit", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329363/2e7a9e5bff90f9fe735e2873d1c1e295_l7nfup.jpg", isOwned: false },
      { id: '8', name: "Earth Guardian", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329349/fafeac534ac4bbbb8b6f468ec9d70a22_wcje1n.jpg", isOwned: false },
      { id: '9', name: "Air Nomad", imageUrl: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329319/d79c86518d274274fb481f2e1bf481bf_mos5lh.jpg", isOwned: false }
    ]
  },
  {
    id: '3',
    title: "Legendary Hunt",
    description: "Find and collect all legendary cards from the latest expansion.",
    icon: "⭐",
    daysLeft: 14,
    progress: {
      current: 0,
      total: 3
    },
    requiredCards: []
  },
  {
    id: '4',
    title: "Time Traveler",
    description: "Collect cards from different eras to complete your time-traveling collection.",
    icon: "⏰",
    daysLeft: 7,
    progress: {
      current: 1,
      total: 3
    },
    requiredCards: []
  }
];

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);

  const toggleChallenge = (challengeId: string) => {
    setExpandedChallenge(expandedChallenge === challengeId ? null : challengeId);
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter p-8 pt-[128px]">
      <Head>
        <title>Challenges | MVPz Crickit</title>
      </Head>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Challenges</h1>
            <p className="text-gray-400">Complete challenges to earn rewards and special cards</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <span>Filter</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 mb-8">
          {['All', 'Active', 'Completed', 'Rewards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-secondary rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <h3 className="text-xl font-semibold">{challenge.title}</h3>
                </div>
                <span className="text-sm text-gray-400">{challenge.daysLeft} days left</span>
              </div>
              <p className="text-gray-400 mb-6">{challenge.description}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{challenge.progress.current}/{challenge.progress.total} cards</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(challenge.progress.current / challenge.progress.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => toggleChallenge(challenge.id)}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white rounded-lg border border-gray-800 hover:border-gray-700"
                  >
                    <span>View required cards</span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform ${expandedChallenge === challenge.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedChallenge === challenge.id && challenge.requiredCards.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {challenge.requiredCards.map((card) => (
                        <div key={card.id} className="relative">
                          <div className="aspect-w-3 aspect-h-4 bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={card.imageUrl}
                              alt={card.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          {card.isOwned && (
                            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-xs px-2 py-1 rounded">
                              Owned
                            </div>
                          )}
                          <p className="mt-2 text-xs text-center text-gray-400">{card.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">How Challenges Work</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🏆</span>
              <p>Browse available challenges and see what cards you need to collect</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">⭐</span>
              <p>Add the required cards to your collection through trades, purchases, or special events</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">⚡</span>
              <p>Complete challenges to earn exclusive rewards and special edition cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
