"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaBell,
  FaRegUserCircle,
  FaUser,
  FaUserAstronaut,
} from "react-icons/fa";
import { FaCartShopping, FaSquarePlus } from "react-icons/fa6";
import { IoSearch, IoWallet } from "react-icons/io5";
import { BsFillPatchCheckFill, BsGridFill } from "react-icons/bs";
import { MdKeyboardCommandKey } from "react-icons/md";
import { HiOutlinePlusSm } from "react-icons/hi";
import SearchModel from "../../Components/Widgets/SearchModel";
import MenuOptions from "../Others/MenuOption";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import {
  useCartStore,
  useLoginProcessStore,
  useNotifications,
} from "../../../store/useGlobalStore";
import { GoSignOut } from "react-icons/go";
import { SiTradingview } from "react-icons/si";
import Tooltip from "../Others/Tooltip";
import { io } from "socket.io-client";
import { callAPI } from "../../../lib/utils";
import { formatNumber } from "../../../utils/global/formating";

const socket = io(process.env.NEXT_PUBLIC_APP_URL, { path: "/api/socket" });

const LoginHeader = () => {
  const router = useRouter();
  const [focusSearch, setFocusSearch] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const { logout } = useAuthStore.getState();
  const isLoggedIn = useAuthStore((state) => state.user);
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const { totalProd, setOpenModel : setOpenCartModel } = useCartStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const [showOptions, setShowOptions] = useState(false);
  const [showUtilitiesInfo, setShowUtilitiesInfo] = useState(false);
  const [showXPInfo, setShowXPInfo] = useState(false);
  const [activeXPTab, setActiveXPTab] = useState("Progress");
  const xpRef = React.useRef<HTMLDivElement>(null);
  const {addNotification, setNotifications, setOpenModel : setOpenNotificationsModel } =
    useNotifications();
  const [xp, setXp] = useState<any>(null);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);

  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await callAPI({endpoint : "/v1/xp/xpLeaderboard"});
      setStages(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch stored notifications on page load
    const fetchNotifications = async () => {
     const response = await callAPI({
      endpoint : "/v1/global/notifications",

     })

     if(response.success){
      setNotifications(response.data.notifications);
      setUnreadNotificationsCount(response.data.unreadNotificationsCount);
      setXp(response.data.xp);
     }
    };
    fetchNotifications();

    // Listen for real-time notifications
    socket.on("receiveNotification", (data) => {
      addNotification(data);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  const handleLogout = async () => {
    logout();
  };

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMac && e.metaKey && e.key === "/") {
        if (isLoggedIn) {
          setFocusSearch(true);
          searchInputRef.current?.focus();
          e.preventDefault(); // Prevent default browser behavior
        } else {
          setOpenLoginModel();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac]);

  useEffect(() => {
    if (focusSearch) {
      document.body.style.overflow = "hidden";
      searchInputRef.current?.focus();
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto"; // Cleanup to prevent issues
    };
  }, [focusSearch]);

  // Add click outside handler for XP tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (xpRef.current && !xpRef.current.contains(event.target as Node)) {
        setShowXPInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let mainLinks = [
    {
      label: "Profile",
      icon: FaUser,
      url:
        user?.role == "User" ? `/p/${user?.username}` : `/a/${user?.username}`,
    },
    {
      label: "Orders",
      icon: FaCartShopping,
      url: null,
    },
    {
      label: "Referrals",
      icon: FaUserAstronaut,
      url: null,
    },
    {
      label: "Earnings",
      icon: SiTradingview,
      url: null,
    },
    {
      label: "Wallets",
      icon: IoWallet,
      url: null,
    },
  ];

  // // Add click outside handler
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const userMenu = document.getElementById("user-menu");
  //     if (userMenu && !userMenu.contains(event.target as Node)) {
  //       setShowOptions(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <>
      <div className="relative w-full flex justify-between items-center">
        <div className="flex justify-start items-center">
          <BsGridFill size={20} className="mr-3 lg:hidden block" />
          <a href="/">
            <Image
              src={`/images/logos/mvpzV1.png`}
              alt="poster"
              width={2000}
              height={2000}
              className="relative lg:w-[100px] w-[80px] object-contain cursor-pointer lg:mt-0 mt-2"
            />
          </a>
          {/* <div className="md:block hidden w-[1px] h-[40px] bg-white bg-opacity-10 mx-5"></div>
          <div className=" md:flex hidden justify-start items-center gap-8">
            {["What is Mvpz", "How it works", "Pricing"].map((item, idx) => (
              <span key={idx} className="text-[14px] font-inter font-semibold">
                {item}
              </span>
            ))}
          </div> */}
        </div>
        {/* search */}
        {
          <div
            className={`lg:flex hidden justify-start items-center gap-2 h-[45px] w-[500px] bg-white ${
              focusSearch
                ? "bg-opacity-10 backdrop-blur-xl"
                : "bg-opacity-5 backdrop-blur-xl"
            } border border-white border-opacity-10 rounded-lg cursor-pointer pl-3 pr-2 py-2`}
          >
            <IoSearch size={20} />
            <input
              className="w-full h-full relative flex-1 bg-transparent outline-none"
              placeholder="Search"
              onFocus={() => {
                isLoggedIn ? setFocusSearch(true) : setOpenLoginModel();
              }}
              readOnly
            />
            {/* {isMac && (
            <div className="flex justify-center items-center  w-[50px] h-[30px] bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg cursor-pointer px-2">
              <MdKeyboardCommandKey />
              <HiOutlinePlusSm />
              <article className="text-[12px]">/</article>
            </div>
          )} */}
          </div>
        }

        {isLoggedIn ? (
          <>
            {/* right section for desktop */}
            <div className="lg:flex hidden justify-end items-center gap-5">
              <div className="flex justify-start items-center gap-2">
                <div
                  ref={xpRef}
                  className="relative flex justify-start items-center gap-2 cursor-pointer ml-2"
                >
                  <div
                    className="flex justify-start items-center gap-2 cursor-pointer ml-2"
                    onMouseEnter={() => setShowXPInfo(true)}
                    onMouseLeave={() => setShowXPInfo(false)}
                    onClick={() => router.push("/xp")}
                  >
                    <article className="font-mono font-bold">{formatNumber(xp?.xp)}</article>
                    <Image
                      src={`/images/other/xp.svg`}
                      alt="xp"
                      width={20}
                      height={20}
                      className="w-[30px] h-[30px] object-contain"
                    />
                  </div>

                  {/* XP Tooltip */}
                  {showXPInfo && (
                   <div  onMouseEnter={() => setShowXPInfo(true)}
                   onMouseLeave={() => setShowXPInfo(false)}>
                     <XPBar
                     stages={stages}
                      activeXPTab={activeXPTab}
                      setActiveXPTab={setActiveXPTab}
                    />
                   </div>
                  )}
                </div>
                <div
                  className="relative flex justify-start items-center gap-2 cursor-pointer ml-2"
                  onMouseEnter={() => setShowUtilitiesInfo(true)}
                  onMouseLeave={() => setShowUtilitiesInfo(false)}
                >
                  <div className="flex justify-start items-center gap-2 cursor-pointer ml-2">
                    <Image
                      src={`/images/other/utilities.gif`}
                      alt="utilities"
                      width={20}
                      height={20}
                      className="w-[30px] h-[30px] object-contain mb-2"
                    />
                    <article className="font-mono font-bold">0</article>
                  </div>

                  {showUtilitiesInfo && <UtilitiesBar />}
                </div>
              </div>
              <div className="relative flex justify-start items-center gap-2 cursor-pointer ml-2"
              onClick={setOpenNotificationsModel}>
                <FaBell size={20} />
                {unreadNotificationsCount > 0 && (
                  <div className="absolute -top-2 -right-2 font-monumentUltraBold font-semibold text-[10px] w-5 h-5 bg-red-500 flex justify-center items-center rounded-full">
                    <span>{unreadNotificationsCount}</span>
                  </div>
                )}
              </div>
              <div
                className="relative flex justify-start items-center gap-2 p-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg cursor-pointer"
                onClick={setOpenCartModel}
              >
                <FaCartShopping size={20} />

                <article className="text-[14px] font-inter font-semibold">
                  Cart
                </article>
                {totalProd > 0 && (
                  <div className="absolute -top-2 -right-2 font-inter font-semibold text-[10px] w-5 h-5 bg-red-500 flex justify-center items-center rounded-full">
                    <span>{totalProd}</span>
                  </div>
                )}
              </div>

              <div
                id="user-menu"
                className="relative flex justify-start items-center gap-2 p-3 px-4 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              >
                <FaRegUserCircle size={20} />
                {/* menu options */}
                {showOptions && (
                  <ProfileMenu
                    handleLogout={handleLogout}
                    mainLinks={mainLinks}
                    user={user}
                  />
                )}
              </div>
            </div>
            {/* right section for mobile */}
            <div className="lg:hidden flex justify-end items-center gap-5">
              <IoSearch size={20} onClick={() => setFocusSearch(true)} />
              <div onClick={setOpenNotificationsModel}>
              <FaBell size={20} />
              </div>
              <div onClick={setOpenCartModel}>
                <FaCartShopping size={20} />
              </div>
              <div
                id="user-menu"
                className="relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(!showOptions);
                }}
              >
                <FaRegUserCircle size={20} />
                {showOptions && (
                  <ProfileMenu
                    handleLogout={handleLogout}
                    mainLinks={mainLinks}
                    user={user}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex  justify-end items-center md:gap-5 gap-2 ">
            <div
              className="relative flex justify-start items-center gap-2 p-3 bg-white bg-opacity-5 md:border border-white border-opacity-10 rounded-lg cursor-pointer"
              onClick={setOpenCartModel}
            >
              <FaCartShopping size={20} />

              <article className="text-[14px] font-inter font-semibold md:block hidden">
                Cart
              </article>
              {totalProd > 0 && (
                <div className="absolute -top-2 -right-2 font-inter font-semibold text-[10px] w-5 h-5 bg-red-500 flex justify-center items-center rounded-full">
                  <span>{totalProd}</span>
                </div>
              )}
            </div>
            <div
              className="flex justify-start items-center gap-2 p-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg cursor-pointer"
              onClick={setOpenLoginModel}
            >
              <FaUser size={20} />
              <article className="text-[14px] font-inter font-semibold">
                Sign Up
              </article>
            </div>
          </div>
        )}
      </div>
      {/* cotainer */}
      {focusSearch && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={() => setFocusSearch(false)}
        >
          <div
            className={`relative lg:w-[700px] lg:h-[500px] h-full w-full lg:rounded-xl  backdrop-blur-xl bg-black bg-opacity-80 border border-white border-opacity-10 flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchModel
              searchInputRef={searchInputRef}
              setFocusSearch={setFocusSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ProfileMenu = ({ user, mainLinks, handleLogout }) => {
  return (
    <div className="absolute top-[120%] right-0 w-[250px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden font-inter p-2 transition-all duration-300 ease-in-out shadow-xl">
      {/* header */}
      <div className="p-3 border-b border-white/10 mb-2">
        <p className="text-sm font-semibold">{user?.name || "User"}</p>
        <p className="text-xs opacity-70">{user?.email}</p>
      </div>
      <LinksSections list={mainLinks} />
      {/* Separate logout section */}
      <div
        className="flex justify-start items-center p-2 gap-3  rounded-lg cursor-pointer transition-all duration-300 text-red-500"
        onClick={handleLogout}
      >
        <GoSignOut size={22} className="opacity-90" />
        <span className="text-sm font-inter font-semibold">Logout</span>
      </div>
    </div>
  );
};

const LinksSections = ({ title = null, list = [] }) => {
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const router = useRouter();
  let pathname = router.pathname;
  const handleNavigate = (item) => {
    if (isLoggedIn) {
      if (item?.url) {
        router.push(item.url);
      } else {
        let func = item?.func;
        func();
      }
    } else {
      setOpenLoginModel();
    }
  };
  return (
    <div className="relative w-full pb-2 mb-2 border-b border-white border-opacity-10 space-y-2">
      {title && (
        <article className="md:block hidden text-[12px] font-nato font-normal opacity-50 px-2">
          {title}
        </article>
      )}
      {list?.map((item) => {
        let Icon = item?.icon;

        return (
          <div
            className={`flex justify-start items-center p-2 gap-3 bg-white  ${
              pathname === item.url ? "bg-opacity-10 " : "bg-opacity-0"
            }   hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-300`}
            onClick={() => handleNavigate(item)}
          >
            {!Icon ? (
              <div className="w-[22px] h-[22px] relative rounded-full overflow-hidden">
                <Image
                  src={item?.thumbnail}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full overflow-hidden scale-150"
                />
              </div>
            ) : (
              <Icon size={22} className={"opacity-90"} />
            )}
            <article className=" text-sm font-inter font-semibold opacity-90">
              {item?.label}
            </article>
          </div>
        );
      })}
    </div>
  );
};

const XPBar = ({ activeXPTab, setActiveXPTab, stages }) => {
 

  const calculateTotalXp = (xpTypes) => {
    return xpTypes.reduce((total, type) => {
      return total + (type.earnings.length * type.xpValue);
    }, 0);
  };
  return (
    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[300px] bg-black/90 backdrop-blur-xl border border-gray-700 rounded-lg shadow-xl z-50 font-inter">
      {/* Tabs */}
      <div className="flex border-b border-gray-700 font-bold">
        <button
          className={`flex-1 py-3 text-sm  ${
            activeXPTab === "Progress"
              ? "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveXPTab("Progress")}
        >
          Progress
        </button>
        <button
          className={`flex-1 py-3 text-sm  ${
            activeXPTab === "Rewards"
              ? "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveXPTab("Rewards")}
        >
          Rewards
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeXPTab === "Progress" ? (
          <>
          {stages?.map((stage) => (
        <div key={stage.id} className='space-y-4 relative w-full '>
          <h2 className='text-xl font-bold mb-3'>{stage.name}</h2>
          
          {/* Progress Items */}
          <div className='space-y-2 text-xl'>
            {stage?.xpTypes.map((xpType, index) => (
              <div key={index} className='flex justify-between items-center'>
                <span className='text-base'>{xpType.name}</span>
                <div className='flex items-center'>
                  {xpType.earnings.length > 0 && (
                    <span className='text-green-400 mr-3 text-xs'>✓</span>
                  )}
                  <span className="text-sm">{xpType.xpValue} XP</span>
                </div>
              </div>
            ))}

            <div className='flex justify-between items-center pt-6 border-t border-gray-800'>
              <span className='text-gray-400 text-base'>Total XP earned</span>
              <span className="text-sm">{calculateTotalXp(stage.xpTypes)} XP</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='h-2 bg-gray-800 rounded-full mt-6'>
            <div 
              className='h-full bg-green-400 rounded-full'
              style={{ width: `${(calculateTotalXp(stage.xpTypes) / (stage.xpTypes.reduce((total, type) => total + type.xpValue, 0))) * 100}%` }}
            ></div>
          </div>

          {/* Complete Stage Button */}
          <button className='w-full py-1 px-2 rounded-2xl bg-gray-900 mt-8 flex justify-between items-center text-sm'>
            <span className='text-green-400'>Complete {stage.name}</span>
            <span className='text-gray-400'>{stage.rewards[0]?.name}</span>
          </button>
        </div>
      ))}
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-lg text-gray-400 font-bold">No rewards yet!</span>
              <span className="text-sm text-gray-500 mt-2 text-center">Complete stages to unlock rewards</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const UtilitiesBar = () => {
  return (
    <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[280px] bg-black/90 backdrop-blur-xl border border-gray-700 rounded-lg shadow-xl z-50">
      <div className="p-4 font-inter">
        <h3 className="text-base font-bold mb-1 text-white">Surge</h3>
        <p className="text-[12px] text-gray-300 mb-4">Exclusive Utilities</p>

        <div className="space-y-3 font-bold">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-300">
              Limited Signed Jerseys:
            </span>
            <span className="text-[10px] font-bold text-white">$90.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-300">VIP Match Access:</span>
            <span className="text-[10px] font-bold text-white">$50.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-300">
              Exclusive Discounts:
            </span>
            <span className="text-[10px] font-bold text-white">$25.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-300">
              Player-Led Skill Challenges:
            </span>
            <span className="text-[10px] font-bold text-white">$150</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
