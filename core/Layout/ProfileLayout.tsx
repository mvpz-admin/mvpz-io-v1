import React, { useEffect, useState } from "react";
import LinkSections from "../Atoms/LinkSections";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaGift,
  FaPiggyBank,
  FaUser,
  FaUserMd,
  FaWallet,
} from "react-icons/fa";
import { FaBagShopping, FaChartSimple, FaMoneyBills } from "react-icons/fa6";
import { TbCardsFilled } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProfileLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const { data: session } = useSession();



  const logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  
  return (
    <div className="w-[100vw] relative md:p-10  overflow-hidden">
      <div className="relative flex md:flex-row flex-col justify-start md:items-center items-start w-ful h-[100vh] ">
        <div
          className={`md:flex-[0.20] flex-1 w-[100vw] h-full overflow-y-auto px-5 md:relative absolute top-0 ${
            open ? "left-0" : "md:left-0 -left-[100vw]"
          } z-50  md:bg-transparent bg-black overflow-hidden`}
        >
          <LinkSections
            sectionTitle=""
            links={[
              {
                url: "/profile",
                title: "Profile",
                icon: FaUser,
              },
            ]}
          />
          <LinkSections
            sectionTitle="Account Hub"
            links={[
              {
                url: "/profile/myCards",
                title: "Collections",
                icon: TbCardsFilled,
              },
              {
                url: "/orders",
                title: "Orders",
                icon: FaBagShopping,
              },
              {
                url: "/profile/referrals",
                title: "Referrals",
                icon: FaGift,
              },
              {
                url: "/profile/wallet",
                title: "Wallet",
                icon: FaWallet,
              },
              {
                url: "/profile/earnings",
                title: "Earnings",
                icon: FaMoneyBills,
              },
            ]}
          />

          <div
            className={`flex justify-start items-center gap-4 px-5 py-3  bg-white bg-opacity-15  cursor-pointer `}
            onClick={logout}
          >
            <MdLogout className="text-red-500" />
            <div className="text-xs opacity-80 text-red-500">Sign Out</div>
          </div>
        </div>

        <div className="md:flex-[0.80] flex-1 w-[100vw]  h-full overflow-y-auto md:pl-5 md:px-0 px-5 relative z-0 scroller-hidden md:pb-20 pb-40">
          {children}
        </div>

        {!open && (
          <div
            className="md:hidden absolute top-1/2 -translate-y-1/2 -left-6 justify-center items-center gap-2 mb-2 bg-primary w-[50px] h-[50px] rounded-full"
            onClick={() => setOpen(true)}
          >
            <FaAngleRight
              size={22}
              className="absolute top-1/2 -translate-y-1/2 right-1 text-white"
            />
          </div>
        )}
        {open && (
          <div
            className="md:hidden absolute top-1/2 -translate-y-1/2 -right-6 justify-center items-center gap-2 mb-2 bg-primary w-[50px] h-[50px] rounded-full z-[200]"
            onClick={() => setOpen(false)}
          >
            <FaAngleLeft
              size={22}
              className="absolute top-1/2 -translate-y-1/2 left-1 text-white"
            />
          </div>
        )}
      </div>
     
    </div>
  );
};

export default ProfileLayout;
