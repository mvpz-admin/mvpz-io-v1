import Image from "next/image";
import React from "react";

const ProfileWaitlisted = () => {
  return (
    <div className="relative w-full h-full flex-1 font-inter ">
      <div className="relative w-full h-full flex flex-col justify-center items-center space-x-5">
        {/* body */}
        <div className="relative w-full h-full flex-1  py-5 flex  flex-col justify-center items-center ">
          <div className="md:w-[150px] w-[75px] mb-2">
            <Image
              src={`/images/logos/logo-transparent.png`}
              alt={"Logo"}
              title={"logo"}
              width={500}
              height={500}
              className="relative w-full h-full object-contain"
            />
          </div>
          <article className="text-4xl font-bold text-center mb-2">
            Profile Waitlisted
          </article>

          <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto">
            Thank you for your interest! Your profile is currently waitlisted
            and will be reviewed within 1-2 business days.
          </article>
        </div>
        <div className="relative w-full">
          <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto mb-2">
            If you have any query, please contact us{" "}
          </article>
          <a
            href="mailTo:team@mvpz.io"
            className={`w-full py-2 flex justify-center items-center bg-primary max-w-[75%] mx-auto rounded-full font-inter font-bold cursor-pointer`}
          >
            Conatact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileWaitlisted;
