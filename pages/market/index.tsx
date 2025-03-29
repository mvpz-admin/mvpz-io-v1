import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaInfoCircle, FaGlobe, FaTwitter, FaCopy, FaShareAlt, FaHeart } from 'react-icons/fa';
import { BiGrid, BiListUl } from 'react-icons/bi';
import { TiPlus } from "react-icons/ti";
import { useRouter } from 'next/router';

interface Collection {
  name: string;
  verified: boolean;
  network: string;
  totalItems: number;
  floorPrice: number;
  topOffer: number;
  totalVolume: number;
  owners: { total: number; percentage: string };
}

interface Card {
  id: number;
  name: string;
  price: number;
  lastSale: number;
  image: string;
  season: string;
  quality: string;
  position: string;
  rating: number;
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  stats: {
    att: number;
    pos: number;
    def: number;
  };
  likes: number;
  expiresIn: string;
}

const Card = ({ card }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  // Generate random card ID
  const cardId = `CARD${Math.floor(Math.random() * 1000000)}`;

  return (
    <div
      className="relative bg-[#111217] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(`/market/card/${cardId}`)}
    >
      {/* Card Header */}
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full">
            <Image
              src={card.seller.avatar}
              alt={card.seller.name}
              layout="fill"
              objectFit="cover"
              className='rounded-full'
            />
            {card.seller.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            )}
          </div>
          <span className="text-sm font-medium">{card.seller.name}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <FaHeart className="w-4 h-4" />
          <span className="text-sm">{card.likes}</span>
        </div>
      </div>

      {/* Card Image */}
      <div className="relative aspect-square">
        <Image
          src={card.image}
          alt={card.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2 bg-purple-500/80 px-2 py-1 rounded text-xs">
          {card.quality}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
          {card.position} • {card.rating}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-[14px]">{card.name}</h3>
            <p className="text-gray-400 text-[12px]">{card.season}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-gray-400">Price</p>
            <p className="font-bold text-[14px]">${card.price}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 text-[12px]">Last Sale: ${card.lastSale}</span>
          <span className="text-gray-400 text-[12px]">Expires in {card.expiresIn}</span>
        </div>
      </div>

      {/* Add To Cart Button - Shows on Hover */}
      {isHover && (
        <div 
          className="absolute top-2 right-2 h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking plus button
          }}
        >
          <div className="relative h-10 w-10 rounded-full bg-primary flex justify-center items-center">
            <TiPlus size={20} className="text-white" />
          </div>
        </div>
      )}

      {/* Buy Now Button - Shows on Hover */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-start items-center transition-all duration-300 ${
          isHover ? "translate-y-0" : "translate-y-10"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when clicking buy now
        }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <article className="text-[10px]">Buy Now</article>
        </div>
      </div>
    </div>
  );
};

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isHover, setIsHover] = useState(false);
  
  const collectionInfo: Collection = {
    name: "MVPz Sports",
    verified: true,
    network: "Polygon",
    totalItems: 128735,
    floorPrice: 1.00,
    topOffer: 0.20,
    totalVolume: 10.6,
    owners: { total: 20676, percentage: "16.1%" }
  };

  const cards: Card[] = [
    {
      id: 1,
      name: "Aaron Wan-Bissaka",
      price: 32.00,
      lastSale: 0.95,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329488/5f9b1417675a07e2ee46a0b76633d708_eocfkv.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "DEF",
      rating: 79,
      seller: {
        name: "MVPz_Trader",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022310/3ab263764ecfc7923315c7a4e4171408_rxr44z.jpg",
        verified: true
      },
      stats: {
        att: 61,
        pos: 83,
        def: 87
      },
      likes: 23,
      expiresIn: "2h 45m"
    },
    {
      id: 2,
      name: "Iker Muñoz",
      price: 48.68,
      lastSale: 0.88,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329468/4c5870210b1b0991c28b616ffd799482_idbojf.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "CryptoSports",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022286/65aa2076d793da1d90c505a64de1d7ea_kvrkoh.jpg",
        verified: true
      },
      stats: {
        att: 62,
        pos: 79,
        def: 86
      },
      likes: 15,
      expiresIn: "2h 30m"
    },
    {
      id: 3,
      name: "Tommy Doyle",
      price: 90.67,
      lastSale: 0.92,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329445/90ac4f4bfbe4da4709d41134b9800d35_vyz4qj.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "SportsFan",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022265/a4e8f56d856d04a0859ee9fc7a0b8bb9_jfdaxx.jpg",
        verified: false
      },
      stats: {
        att: 61,
        pos: 80,
        def: 85
      },
      likes: 18,
      expiresIn: "2h 36s"
    },
    {
      id: 4,
      name: "Ruben Loftus-Cheek",
      price: 25.00,
      lastSale: 0.90,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329431/37fac74cd1b2d0901059cf2f6e74b7e5_hh6erq.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "CardCollector",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022196/5aeda9e07c48db53584a0b2ac90198b3_w72fkr.jpg",
        verified: true
      },
      stats: {
        att: 64,
        pos: 83,
        def: 85
      },
      likes: 27,
      expiresIn: "2h 40s"
    },
    {
      id: 5,
      name: "Marcus Edwards",
      price: 76.23,
      lastSale: 0.87,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329403/00307a7fd07a4c90e44ffcd3b0dd6a6b_p9xhlw.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "MVPz_Master",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022171/b32e66785edfc6f73360b22b2f1c1323_jsxmxm.jpg",
        verified: true
      },
      stats: {
        att: 63,
        pos: 81,
        def: 84
      },
      likes: 19,
      expiresIn: "2h 50s"
    },
    {
      id: 6,
      name: "Matheus Nunes",
      price: 50.00,
      lastSale: 0.93,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329382/d4440dcfe44656a82e584dcb4804a73a_tulzhq.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "TopTrader",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022332/754a6c2e56773f34036f66fe8670fdfc_cx9vlz.jpg",
        verified: false
      },
      stats: {
        att: 62,
        pos: 82,
        def: 83
      },
      likes: 21,
      expiresIn: "3h 10m"
    },
    {
      id: 7,
      name: "Brennan Johnson",
      price: 87.00,
      lastSale: 0.89,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329363/2e7a9e5bff90f9fe735e2873d1c1e295_l7nfup.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "FWD",
      rating: 79,
      seller: {
        name: "CardKing",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022352/2952def989aa46db19f25d75d8465967_ldzane.jpg",
        verified: true
      },
      stats: {
        att: 65,
        pos: 80,
        def: 82
      },
      likes: 25,
      expiresIn: "3h 20m"
    },
    {
      id: 8,
      name: "Morgan Gibbs-White",
      price: 130.00,
      lastSale: 0.91,
      image: "https://res.cloudinary.com/dv667zlni/image/upload/v1740329349/fafeac534ac4bbbb8b6f468ec9d70a22_wcje1n.jpg",
      season: "Season 2025",
      quality: "Quality 1",
      position: "MID",
      rating: 79,
      seller: {
        name: "MVPz_Elite",
        avatar: "https://res.cloudinary.com/dv667zlni/image/upload/v1741022371/85ed0c8772e82f0d95b539eaa9b5742e_ypmdki.jpg",
        verified: true
      },
      stats: {
        att: 64,
        pos: 81,
        def: 83
      },
      likes: 22,
      expiresIn: "3h 30m"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr bg-black font-inter text-white pt-[128px] bg">
    <div className='relative w-full bg-gradient-to-t from-black via-[rgba(0,0,0,0.8)] to-transparent backdrop-blur-xl'>
        {/* Top Navigation */}
        <div className="  border-gray-800">
        <div className="px-[10px] py-3 flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            <article className='text-[40px] font-bold'>Marketplace</article>
          </div>
          
      
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-gray-800">
        <div className="px-[10px] py-4">
          <div className="flex items-center space-x-8 text-sm">
            <div>
              <span className="text-gray-400">FLOOR PRICE</span>
              <span className="ml-2">$1</span>
            </div>
            <div>
              <span className="text-gray-400">TOP OFFER</span>
              <span className="ml-2">$0.2</span>
            </div>
            <div>
              <span className="text-gray-400">TOTAL VOLUME</span>
              <span className="ml-2">$10.6M</span>
            </div>
            <div>
              <span className="text-gray-400">OWNERS (UNIQUE)</span>
              <span className="ml-2">20,676 (16.1%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="px-[10px]">
          <div className="flex items-center space-x-8">
            <button 
              className={`py-4 px-2 relative text-sm ${activeTab === 'items' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('items')}
            >
              Items
              {activeTab === 'items' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button className="py-4 px-2 text-sm text-gray-400">Activity</button>
            <button className="py-4 px-2 text-sm text-gray-400">About</button>
          </div>
        </div>
      </div>
    </div>

      {/* Main Content */}
      <div className="px-[10px] py-6 bg-black">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-60">
            <div className="space-y-4">
              <div className="border-b border-gray-800 pb-4">
                <button className="w-full flex items-center justify-between py-2 text-sm">
                  <span>Status</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <button className="w-full flex items-center justify-between py-2 text-sm">
                  <span>Price</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Card Type</span>
                  <span className="text-gray-400">4</span>
                </div>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Category</span>
                  <span className="text-gray-400">37</span>
                </div>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Event</span>
                  <span className="text-gray-400">36</span>
                </div>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Grade</span>
                  <span className="text-gray-400">40</span>
                </div>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Grader</span>
                  <span className="text-gray-400">17</span>
                </div>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span>Language</span>
                  <span className="text-gray-400">15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by item or trait"
                  className="w-[320px] bg-[#1a1b23] border border-gray-800 rounded-lg px-4 py-2 pl-10 text-sm"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
              <div className="flex items-center space-x-4">
                <select className="bg-[#1a1b23] border border-gray-800 rounded-lg px-4 py-2 text-sm">
                  <option>Price low to high</option>
                </select>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <BiGrid className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <BiListUl className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              128,735 items
            </div>

            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
