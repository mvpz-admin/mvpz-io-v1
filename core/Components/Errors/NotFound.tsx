import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";

const NotFound = ({
  image = "/images/errors/notFound.svg",
  title = "Not Found",
  description = "Something Went Wrong, Go Back To Home",
  callback = "/fanzone",
}) => {
  const router = useRouter();
  return (
    <div className="relative w-full h-[80vh] md:pt-5  z-0 flex flex-col justify-center items-center">
      <Image
        src={image}
        alt="404"
        width={1000}
        height={1000}
        className="relative h-[300px] object-contain mb-10"
      />

      <Image
        src={"/images/mvpz-logo.png"}
        alt="mvpz"
        width={500}
        height={500}
        className="relative h-[20px] object-contain mb-5"
      />

      <article className="text-center text-4xl">{title}</article>
      <article className="text-center mb-10">{description}</article>
      <div
        className="px-5 py-2 rounded-md bg-primary gap-2 inline-flex justify-center items-center mx-auto cursor-pointer"
        onClick={() => router?.push(callback)}
      >
        <FaHome />
        Back To Home
      </div>
    </div>
  );
};

export default NotFound;
