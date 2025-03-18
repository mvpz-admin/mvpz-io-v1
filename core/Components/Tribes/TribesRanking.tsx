import Image from "next/image";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import ToggleSwitch from "../../Atoms/Inputs/ToggleSwitch";

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

const profileImages = [
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241138/pexels-photo-2894292_la0tjc.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241136/pexels-photo-3705645_tiv7p5.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241128/pexels-photo-2887774_g5kodl.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241100/pexels-photo-3063362_eh7gmr.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241098/pexels-photo-3045825_ijti5o.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241076/pexels-photo-3135801_vycaj6.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241071/pexels-photo-4348556_vfony6.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241062/pexels-photo-2927854_yhpzl1.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241008/pexels-photo-1681010_mxbb3g.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740240996/pexels-photo-91227_lfhnzn.jpg",
];

function getRandomName() {
  const firstNames = [
    "John",
    "Emma",
    "Liam",
    "Sophia",
    "Noah",
    "Olivia",
    "Mason",
    "Ava",
    "James",
    "Isabella",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
    "Wilson",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function getRandomUsername() {
  const firstNames = [
    "John",
    "Emma",
    "Liam",
    "Sophia",
    "Noah",
    "Olivia",
    "Mason",
    "Ava",
    "James",
    "Isabella",
  ];
  const words = [
    "Gamer",
    "Coder",
    "Runner",
    "Explorer",
    "Dreamer",
    "Hunter",
    "Warrior",
    "Ninja",
    "Legend",
    "Wizard",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Random number from 0 to 999

  return `${randomFirstName}${randomWord}${randomNumber}`;
}

const ListTabel = ({ row }) => {
  const ListRow = ({ serialNo, cards, user, xp }) => {
    const [showCollections, setShowCollections] = useState(false);
    return (
      <div
        className="w-full flex justify-between items-center rounded-lg border border-white border-opacity-0 hover:border-opacity-10 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer p-3 "
        key={10}
      >
        <div className="flex-[0.1] flex justify-start items-center">
          <span className="font-inter font-semibold text-[14px]">
            {serialNo}
          </span>
        </div>
        <div className="flex-[0.6] flex justify-start items-center gap-2">
          <div className="flex justify-start items-center gap-4">
            <div
              className="relative w-[75px] h-[75px] border-2 border-white border-opacity-30 rounded-full p-[2px]"
              onMouseEnter={() => setShowCollections(true)}
              onMouseLeave={() => setShowCollections(false)}
            >
              <div className="relative w-full h-full bg-secondary rounded-full">
                <Image
                  src={user?.profileImage}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full"
                />
              </div>
              <div
                className={`${
                  showCollections ? "grid" : "hidden"
                } absolute transition-all duration-300 bottom-[110%] w-[300px] h-[100px] grid grid-cols-3 gap-1 bg-secondary rounded-lg border border-white border-opacity-10 overflow-hidden`}
              >
                <div className="w-full h-full border-r border-white border-opacity-5">
                  <Image
                    src={user?.collection[0]}
                    alt="bg"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover "
                  />
                </div>
                <div className="w-full h-full border-r border-white border-opacity-5">
                  <Image
                    src={user?.collection[1]}
                    alt="bg"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover "
                  />
                </div>
                <div className="w-full h-full ">
                  <Image
                    src={user?.collection[2]}
                    alt="bg"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
              <span className="text-[10px] font-inter">{user?.username}</span>
              <div className="flex  justify-start items-center">
                <article className="text-base font-inter font-semibold">
                  {user?.name}
                </article>
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span className="font-inter font-semibold text-[14px]">{cards}</span>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span className="font-inter font-semibold text-[14px]">{xp}XP</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full space-y-4">
      {/* header */}
      <div className="flex justify-between items-center gap-4 py-2 border-b border-white border-opacity-20 px-2 text-[12px] font-inter font-normal opacity-50">
        <div className="flex-[0.1] flex justify-start items-center">
          <span>Rank</span>
        </div>
        <div className="flex-[0.6] flex justify-start items-center">
          <span>Name</span>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span>Cards</span>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span>XP</span>
        </div>
      </div>
      <div className="flex flex-col">
        {Array(5)
          .fill(0)
          ?.map((item, idx) => {
            return (
              <ListRow
                serialNo={row == 1 ? 100 : 55 - idx}
                user={{
                  name: getRandomName(),
                  username: `@${getRandomUsername()}`,
                  profileImage: profileImages[idx],
                  collection: [
                    profileImages[0],
                    profileImages[1],
                    profileImages[2],
                  ],
                  more: 20,
                }}
                cards={getRandomNumber()}
                xp={getRandomNumber()}
              />
            );
          })}
      </div>
    </div>
  );
};

const TribesRanking = () => {
  return (
    <div className="relative w-full space-y-4">
      {/* Tabs */}
      <div className="flex justify-between items-center">
        <div className="w-auto">
          <ToggleSwitch
            tabs={[
              {
                id: "trending",
                label: "Trending",
              },
              {
                id: "top",
                label: "Top",
              },
            ]}
          />
        </div>

      </div>
      {/* Leaderboard */}
      <div className="flex justify-start items-center gap-20">
        {/* Left Container */}
        <div className="flex-[0.5] w-full relative">
          <ListTabel row={1} />
        </div>
        {/* Right Container */}
        <div className="flex-[0.5] w-full relative">
          <ListTabel row={2} />
        </div>
      </div>
    </div>
  );
};

export default TribesRanking;
