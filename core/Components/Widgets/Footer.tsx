import React from "react";
import TextFeild from "../../Atoms/Inputs/TextFeild";
import { socialMediaList } from "../../../lib/utils";
import Image from "next/image";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <div className="relative md:p-10 p-4 pb-5 w-full  bg-secondary">
      {/* Top Sections */}
      <div className="relative w-full h-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {/* Left Section */}
        <div className="relative w-full space-y-4">
          <div className="relative w-full md:space-y-2 space-y-1">
            <article className="font-inter md:text-xl text-base font-bold">
              Newsletter
            </article>
            <article className="font-inter  text-[10px] opacity-50 mx-w-[50%]">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating OpenSea.
            </article>
          </div>
          <div className="flex justify-start items-center gap-5 md:h-[45px] h-[30px]">
            <div className="w-full ">
              <TextFeild placeholder="Enter Email" />
            </div>
            <div className="relative">
              <button
                className={`relative flex-1 px-4 py-3 md:h-[60px] h-[50px] md:text-sm text-xs  font-semibold rounded-lg transition-all duration-300 text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Middle Section - soical - desktop / Last Section - soical - mobile */}
        <div className="relative  w-full space-y-4 md:flex hidden justify-start items-center flex-col">
          <article className="font-inter text-xl font-bold">
            Join the community
          </article>
          <div className="flex justify-center items-center gap-5">
            {socialMediaList?.map((provider) => {
              let Icon = provider.icon;
              return (
                <a href={provider.url} target="_blank" title={provider.type}>
                  <Icon size={24} opacity={50} />
                </a>
              );
            })}
          </div>
        </div>
        {/* Right Section */}
        <div className="relative w-full space-y-4 flex  flex-col md:items-start items-center">
          <article className="font-inter md:text-xl text-base font-bold">Need Help?</article>
          <div className="relative">
            <a
            href="mailTo:team@mvpz.io"
              className={`relative flex-1 px-4 py-3 h-full md:text-sm text-xs font-semibold rounded-lg transition-all duration-300 text-white bg-primary bg-opacity-10 hover:bg-opacity-20  font-inter `}
            >
              Contact Us
            </a>
          </div>
        </div>
        {/* Middle Section - soical - desktop / Last Section - soical - mobile */}
        <div className="relative  w-full space-y-4 md:hidden flex md:justify-start justify-center items-center flex-col">
          <article className="font-inter md:text-xl text-base font-bold">
            Join the community
          </article>
          <div className="flex justify-center items-center gap-5">
            {socialMediaList?.map((provider) => {
              let Icon = provider.icon;
              return (
                <a href={provider.url} target="_blank" title={provider.type}>
                  <Icon className={`md:text-[24px] text-[18px]`} opacity={50} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="relative w-full h-[1px] my-10 bg-white bg-opacity-10" />
      {/* Bottom Section */}
      <div className="relative w-full flex md:flex-row flex-col justify-start  items-start md:gap-40 gap-10">
        {/* left section */}
        <div className="relative w-full md:flex-[0.3] flex-1 h-full space-y-2">
          <Image
            src={`/images/logos/mvpzV1.png`}
            alt="poster"
            width={2000}
            height={2000}
            className="relative w-[100px] object-cover cursor-pointer"
          />
          <article className="md:text-xs text-[10px] font-inter md:font-semibold font-medium">The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</article>
        </div>
        {/* right section */}
        <div className="relative md:flex-[0.7] flex-1  md:flex grid grid-cols-3 justify-center items-start md:gap-20 gap-10">
          <div className="relative  flex-col flex justify-start items-center">
            <div className="relative w-full space-y-3">
              <article className="md:text-base text-xs font-inter font-bold">Features</article>
              <div className="relative w-full md:space-y-2 space-y-1">
                {
                  ["Fanzone","Market","Swap", "Store", "Auction"]?.map((link, idx) => {
                    return (
                      <article key={idx} className="md:text-xs text-[10px] font-medium font-inter">{link}</article>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="relative  flex-col flex justify-start items-center space-y-6 ">
            <div className="relative md:w-[150px] space-y-3">
              <article className="md:text-base text-xs font-inter font-bold">My Account</article>
              <div className="relative w-full md:space-y-2 space-y-1">
                {
                  ["Profile", "Watchlist", "My Cart", "Settings"]?.map((link, idx) => {
                    return (
                      <article key={idx} className="md:text-xs text-[10px] font-medium font-inter">{link}</article>
                    )
                  })
                }
              </div>
            </div>
            <div className="relative md:w-[150px] w-full space-y-3">
              <article className="md:text-base text-xs font-inter font-bold">Stats</article>
              <div className="relative w-full md:space-y-2 space-y-1">
                {
                  ["Ranking", "Activity"]?.map((link, idx) => {
                    return (
                      <article key={idx} className="md:text-xs text-[10px] font-medium font-inter">{link}</article>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="relative  flex-col flex justify-start items-center ">
            <div className="relative  space-y-3">
              <article className="md:text-base text-xs font-inter font-bold">Company</article>
              <div className="relative w-full md:space-y-2 space-y-1">
                {
                  ["About","Blog", "Support", "FAQs", "Terms & Coditions" ]?.map((link, idx) => {
                    return (
                      <article key={idx} className="md:text-xs text-[10px] font-medium font-inter">{link}</article>
                    )
                  })
                }
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <div className="mt-20">
      <Copyright />
      </div>
    </div>
  );
};

export default Footer;
