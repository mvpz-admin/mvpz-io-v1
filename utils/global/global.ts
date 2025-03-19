export const JWT_SECRET_KEY = process.env.JWT_SECRET
export const BB_BASE_URL = "https://f005.backblazeb2.com/file/mvpz-ncaa"

export const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

export const enableBodyScroll = () => {
  document.body.style.overflowY = "auto";
};

export const HomePagesTab = [
    { label: "All",  gradient: 0, url: null },
    { label: "Fanzone", gradient: 3, url: "/fanzone" },
    { label: "Apparel", gradient: 4, url: null },
    { label: "Store", gradient: 5, url: null },
    { label: "Market", gradient: 6, url: null },
    { label: "Swap", gradient: 7, url: null },
    { label: "Auctions", gradient: 8, url: null },
  ]

export const HomePageLeaderboardTab = [
  {
    id: "TRENDING",
    label: "Trending",
  },
  {
    id: "TOP",
    label: "Top",
  },
]


export const HomePageGradients = [
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740085581/Screenshot_2025-02-21_at_2.35.41_AM_jdqwzt.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740085319/Screenshot_2025-02-21_at_2.30.29_AM_it3rlw.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740085732/Screenshot_2025-02-21_at_2.38.06_AM_ftkg8z.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740160244/3_qnjkg3.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740160202/1_hosccs.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740160181/2_aildtx.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740160071/5_xerhen.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/v1740160179/4_omixwl.png",
    "https://res.cloudinary.com/dv667zlni/image/upload/a_90/v1740167222/f504f5208224607.66eb0e5260b23_i6vkxw.png",
  ]


  // athlete profile page
  export const AthletePTabs = [
    {
      label: "Overview",
      id: "overview",
    },
    {
      label: "Collections",
      id: "collections",
    },
    {
      label: "Shouts",
      id: "shouts",
    },
    {
      label: "Tribes",
      id: "tribes",
    },
  ];
  

  export const AthleteOverviewTabs  = [
    {
      id: "BIOGRAPHY",
      label: "Biography",
    },
    {
      id: "STATS",
      label: "Stats",
    },
    {
      id: "RECORDS",
      label: "Records",
    },
    {
      id: "MATCHES",
      label: "Matches",
    },
    {
      id: "NEWS",
      label: "News",
    },
  ];

  export const AthCollectionfilterOptions = [
    {
      label: "Price Low to High",
      id: "PLTH",
    },
    {
      label: "Price High to Low",
      id: "PHTL",
    },
    {
      label: "Recently Added",
      id: "RA",
    },
    {
      label: "Top Cards",
      id: "TC",
    },
    {
      label: "Most Viewed",
      id: "MV",
    },
  ];

  // fanzone
  export function extractPostDetails({ message, maxLength = 50 }) {
    // 1. Remove all HTML tags and keep only the text content
    const cleanText = message
      .replace(/<[^>]+>/g, ' ') // Remove all HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Trim any leading/trailing spaces
  
    // 2. Trim to maxLength if needed
    const postTitle = 
      cleanText.length > maxLength 
        ? `${cleanText.substring(0, maxLength)}...` 
        : cleanText;
  
    return { postTitle, hasMore: cleanText.length > maxLength };
  }
  


  export function getPostThumbnail({htmlContent}){
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };


  export const TribesHomeTabs = [
      { label: "Athletes", id: "Athletes" },
      { label: "Media", id: "Media" },
      { label: "Live", id: "Live" },
      { label: "Challenges", id: "Challenge" },
      { label: "Utilies", id: "Utilies" },
    ];


// Payment Status
export let paymentStatus = {
  100 : "Payment id not found.",
  200 : "Payment id is invalid.",
  300 : "Payment already processed",
  500 : "Internal Sever While Assigning Enh. Card.",
  600 : "Card Assigned Successfully"
}

// Post Type

export let postType = {
  "publicpost" : "PublicPost",
  "tribepost" : "TribePost",
  "shoutpost" : "tribeShouts",
  "athleteprofile" : "AthleteTip"
}