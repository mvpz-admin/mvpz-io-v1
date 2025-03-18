import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Footers from "../core/Components/Widgets/Copyright";

const Index = () => {
  const router = useRouter();
  let html = `<header>
        <h1>Policy</h1>
    </header>
    <section>
        <h2>Introduction</h2>
        <p>Welcome to our Privacy Policy. Your privacy is critically important to us. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?
</p>
    </section>
    <section>
        <h2>Information We Collect</h2>
        <p>We collect various types of information in connection with the services we provide. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?
</p>
    </section>
    <section>
        <h2>How We Use Your Information</h2>
        <p>We use the collected information to provide, improve, and protect our services. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?
</p>
    </section>
    <section>
        <h2>Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as necessary to provide our services. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?</p>
    </section>
    <section>
        <h2>Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?</p>
    </section>
    <section>
        <h2>Security</h2>
        <p>We implement measures to protect your information from unauthorized access. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?</p>
    </section>
    <section>
        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time, and we encourage you to review it periodically. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, pariatur dignissimos consequatur iure modi aliquam. Voluptatem placeat illum vero fugiat, nemo ipsum nihil neque minus aspernatur tenetur perspiciatis odit pariatur soluta, ut repellat obcaecati quos ratione esse qui iure quas quibusdam dolores. Voluptas beatae dignissimos dolore voluptatem? Molestias maiores harum dicta ipsam sequi voluptatibus deserunt, eos iste cum dolorum, ipsa unde. Tempore eos cum sunt ratione voluptate cumque recusandae molestias veniam delectus tenetur molestiae ad quod cupiditate, dolorum accusantium, quos ab expedita officiis necessitatibus nemo! Commodi eligendi maxime exercitationem adipisci placeat. Illo aliquid nam consequuntur error totam ullam! Ut, distinctio?</p>
    </section>
    <footer>
        <p>Contact us if you have any questions about this policy.</p>
    </footer>`;
  return (
    <div className="relative w-full h-full">
      {/* header */}
      <div className="relative w-full h-[350px]">
        <Image
          src={`https://res.cloudinary.com/dv667zlni/image/upload/v1740085581/Screenshot_2025-02-21_at_2.35.41_AM_jdqwzt.png`}
          alt="poster"
          width={2000}
          height={2000}
          className="relative w-full h-full object-cover "
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent md:p-10 p-5 flex flex-col ">
          <div className="flex justify-between items-center">
            <div
              className="flex justify-start items-center font-inter font-semibold text-white gap-2 cursor-pointer"
              onClick={() => router.back()}
            >
              <FaChevronLeft size={14} />
              <span className="text-[14px]">Back</span>
            </div>
            <div
              className="bg-white text-primary border-white border border-opacity-5 rounded-full px-4 py-2 text-xs flex justify-start items-center gap-2 cursor-pointer"
              onClick={() => router.push("/auth/signin")}
            >
              <span>Login</span>
            </div>
          </div>
          <div className="w-full flex-1" />
          <div className="relative w-full space-y-4 mb-10">
            <article className="font-monumentUltraBold text-4xl">
              Privacy Policy
            </article>
            <span className="text-[10px] font-inter font-extrabold opacity-50">
              Last Updated: December 1, 2023
            </span>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="w-full md:p-10 p-5 policy-container">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>


      <div className="md:px-10 px-5 py-5 border-t border-white border-opacity-10">
        <Footers />
      </div>
    </div>
  );
};

export default Index;
