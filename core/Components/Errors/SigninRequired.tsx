import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaHome, FaSign, FaSignInAlt } from "react-icons/fa";

const SigninRequired = ({
  image = "/images/errors/signinRequired.svg",
  title = "Signin Required!",
  description = "Oops, You cannot access this page!",
  callback = null
}) => {
  const router = useRouter();
  const hanldeSigin = () => {
    localStorage.setItem(
        "redirectUrl",
        `${ callback || router.pathname}`
      );
      router.push(`/auth/signin`);
  }
  return (
    <div className="w-full h-[500px] rounded-md bg-secondary flex  flex-col justify-center items-center">
      <Image
        src={image}
        alt="404"
        width={1000}
        height={1000}
        className="relative h-[250px] object-contain mb-10"
      />
      <article className="text-center text-2xl">{title}</article>
      <article className="text-center text-sm mt-2 mb-5">{description}</article>
      <div
        className="px-5 py-2 rounded-md bg-primary gap-2 inline-flex justify-center items-center mx-auto cursor-pointer"
        onClick={hanldeSigin}
      >
        <FaSignInAlt />
        Sign In
      </div>
    </div>
  );
};

export default SigninRequired;
