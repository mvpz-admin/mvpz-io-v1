import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import HeaderV1 from "../Components/Widgets/Header";
import {
  useGlobalPageLoading,
  useLoginProcessStore,
  usePostTipStore,
} from "../../store/useGlobalStore";
import UserSignin from "../Components/Signin/UserSignin";
import { IoClose } from "react-icons/io5";
import CompleteProfile from "../Components/Signin/CompleteProfile";
import { useAuthStore } from "../../store/useAuthStore";
import LineLoadingEffect from "../Atoms/Loading/LineLoading";
import CartModel from "../Components/Widgets/CartModel";
import BuyModel from "../Components/Widgets/BuyModel";
import PostTipModel from "../Components/Fanzone/PostTipModel";
import CardCreator from "../Components/Cards/CardCreator";
import ProfileWaitlisted from "../Components/Signin/ProfileWaitlisted";
import { callAPI } from "../../lib/utils";
import NotificationsModel from "../Components/Widgets/NotificationsModel";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { loginModel, setCloseLoginModel } = useLoginProcessStore(
    (state) => state
  );
  const { pageLoading } = useGlobalPageLoading((state) => state);
  const { user, setUser } = useAuthStore((state) => state);
  const { openTipModel } = usePostTipStore((state) => state);

  const handleUpdatesOnWaitlist = async () => {
    let response = await callAPI({
      endpoint: "/v1/global/check-updates-waitlisted",
    });

    if (response?.success) {
      setUser({
        ...user,
        isWaitlisted: response.data,
      });
    }
  };

  useEffect(() => {
    if (user?.role === "Athlete" && user?.isWaitlisted !== "Approved") {
      handleUpdatesOnWaitlist();
    }
  }, [user?.isWaitlisted]);

  const router = useRouter();

  const hideHeaderPageList = [
    "/auth/signin",
    "/auth/athleteSignin",
    "/auth/waitlist",
    "/auth/claim/profile",
    "/auth/verifyRequest",
    "/customer/stripe/processing",
    "/developmet",
    "/mvpz-market",
    "/mvpz-market/card/[cardId]",
    "/terms",
    "/cookies",
    "/policy",
    "/auth/account/new",
    "/[accountType]/[username]/card/[cardId]",
    "/[accountType]/[username]/collected/[cardId]",
    "/payment/[prodType]/success",
  ];

  return (
    <div className=" relative w-full min-h-screen max-w-[1750px] mx-auto">
      {!hideHeaderPageList.includes(router.pathname) && (
        <div className={`md:fixed relative top-0 left-0 w-full z-50`}>
          <HeaderV1 />
        </div>
      )}

      <div className="layout">{props.children}</div>
      {loginModel && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[100] flex justify-center items-center"
          onClick={setCloseLoginModel}
        >
          <div
            className="relative md:w-[500px] w-full md:h-[650px] h-screen bg-secondary rounded-lg p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <UserSignin />
            {/* close */}
            <div
              className="absolute top-5 right-5 cursor-pointer"
              onClick={setCloseLoginModel}
            >
              <IoClose size={30} />
            </div>
          </div>
        </div>
      )}
      {user?.email && !user?.isProfileCompleted && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div
            className="relative md:w-[800px] w-full md:h-[600px] h-screen bg-[radial-gradient(circle,_rgba(31,31,31,1)_0%,_rgba(17,17,17,1)_100%)] rounded-lg p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <CompleteProfile />
          </div>
        </div>
      )}
      {user?.role === "Athlete" && user?.isWaitlisted !== "Approved" && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="relative md:w-[800px] w-full md:h-[600px] h-screen bg-[radial-gradient(circle,_rgba(31,31,31,1)_0%,_rgba(17,17,17,1)_100%)] rounded-lg p-10">
            <ProfileWaitlisted />
          </div>
        </div>
      )}
      {pageLoading && (
        <>
          <div className="fixed top-0 left-0 w-full z-50">
            <LineLoadingEffect />
          </div>
        </>
      )}

      {/* Cart Model */}
      <CartModel />
      {/* Buy Model */}
      <BuyModel />
      {/* Notifications Model */}
      <NotificationsModel />
      {/* Fanzone Post Tip Model */}
      {openTipModel && <PostTipModel />}
      {/* Request A Card */}
      {user?.role == "Athlete" &&
        user?.isProfileCompleted &&
        !user?.isCardCreated &&
        !user?.isWaitlisted && <CardCreator />}
    </div>
  );
};

export default Layout;
