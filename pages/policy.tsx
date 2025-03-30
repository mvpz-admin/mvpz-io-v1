import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Footers from "../core/Components/Widgets/Copyright";

const Index = () => {
  const router = useRouter();
  let html = `
     <body class="policy-container">
    <p class="c3">
      <span class="c5"
        >MVPz (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed
        to protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and protect your personal information when you use our
        website, progressive web app (PWA), and services (collectively, the
        &quot;Platform&quot;).</span
      >
    </p>
    <p class="c3">
      <span class="c5"
        >By accessing or using MVPz, you agree to the terms of this Privacy
        Policy. If you do not agree, please do not use the Platform.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.jlslvx34d6lr">
      <span class="c4">1. Information We Collect</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >We collect the following types of information to provide and improve
        our services:</span
      >
    </p>
    <h3 class="c9" id="h.la9vsdbwb0ng">
      <span class="c2">1.1 Information You Provide</span>
    </h3>
    <ul class="c8 lst-kix_4fh0mm3guql-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Account Information:</span
        ><span class="c5"
          >&nbsp;When you sign up, we collect your name, email address, profile
          picture (if signing in via Meta or other third-party providers), and
          password.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Athlete Verification Information:</span
        ><span class="c5"
          >&nbsp;If you are an athlete, we may request additional details to
          verify your identity, including links to official profiles or
          supporting documents.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Payment Information:</span
        ><span class="c5"
          >&nbsp;If you make purchases or receive payments, our third-party
          payment processors will collect and process your payment details. MVPz
          does not store payment information.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">User-Generated Content:</span
        ><span class="c5"
          >&nbsp;Any posts, comments, videos, or other content you upload to the
          Platform.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Support Requests:</span
        ><span class="c5"
          >&nbsp;If you contact us, we may collect information related to your
          inquiry.<br
        /></span>
      </li>
    </ul>
    <h3 class="c9" id="h.v07y9seq6352">
      <span class="c2">1.2 Information We Automatically Collect</span>
    </h3>
    <p class="c3">
      <span class="c5"
        >When you use the Platform, we collect certain information
        automatically:</span
      >
    </p>
    <ul class="c8 lst-kix_8ms366824out-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Device and Usage Data:</span
        ><span class="c5"
          >&nbsp;IP address, browser type, operating system, referring URLs,
          pages visited, and interaction with the Platform.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Cookies and Tracking Technologies:</span
        ><span class="c5"
          >&nbsp;We use cookies and similar technologies to improve user
          experience, personalize content, and analyze usage (see our Cookies
          Policy for more details).<br
        /></span>
      </li>
    </ul>
    <h3 class="c9" id="h.qquan14fhpq6">
      <span class="c2">1.3 Information from Third Parties</span>
    </h3>
    <p class="c3">
      <span class="c5"
        >If you sign in using Meta, Google, or other third-party providers, we
        may collect basic profile information such as name, email, and profile
        picture, in compliance with their respective platform policies.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.epw0be7hho5m">
      <span class="c4">2. How We Use Your Information</span>
    </h2>
    <p class="c3">
      <span class="c5">We use the collected information to:</span>
    </p>
    <ul class="c8 lst-kix_f6j58mqqk57d-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c5">Provide, operate, and improve MVPz.<br /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Verify athlete accounts and ensure compliance with our terms.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Facilitate transactions, including the buying, selling, and trading
          of sports cards.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Personalize content and recommend relevant posts or athletes.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Enforce our Terms and Conditions, investigate violations, and enhance
          platform security.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Communicate with you about updates, security alerts, and promotional
          content (you can opt out of marketing emails at any time).<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Comply with legal obligations and protect against fraud or misuse.<br
        /></span>
      </li>
    </ul>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.mpz43a9t0g21">
      <span class="c4">3. How We Share Your Information</span>
    </h2>
    <p class="c3">
      <span>We do </span><span class="c7">not</span
      ><span class="c5"
        >&nbsp;sell your personal information. However, we may share your data
        in the following circumstances:</span
      >
    </p>
    <h3 class="c9" id="h.r5ehahakcdn1">
      <span class="c2">3.1 Service Providers</span>
    </h3>
    <p class="c3">
      <span class="c5"
        >We work with trusted third-party vendors to provide services such
        as:</span
      >
    </p>
    <ul class="c8 lst-kix_qfyf5o96p8tw-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c5">Payment processing (e.g., Stripe, PayPal).<br /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5">Analytics (e.g., Google Analytics).<br /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5">Cloud storage and security.<br /></span>
      </li>
    </ul>
    <p class="c3">
      <span class="c5"
        >These providers only receive the necessary information to perform their
        functions and are required to maintain confidentiality.</span
      >
    </p>
    <h3 class="c9" id="h.bonx57a1ea0c">
      <span class="c2">3.2 Legal Compliance and Protection</span>
    </h3>
    <p class="c3">
      <span class="c5"
        >We may disclose information if required by law, legal process, or to
        protect the rights, safety, and security of MVPz, users, or third
        parties.</span
      >
    </p>
    <h3 class="c9" id="h.4txsepy965wf">
      <span class="c2">3.3 Business Transfers</span>
    </h3>
    <p class="c3">
      <span class="c5"
        >If MVPz undergoes a merger, acquisition, or sale, your data may be
        transferred as part of the business assets.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.jr4m7pivq1ir">
      <span class="c4">4. Data Storage and Security</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >We take reasonable security measures to protect your personal
        information from unauthorized access, alteration, or disclosure.
        However, no system is completely secure, and we cannot guarantee
        absolute security.</span
      >
    </p>
    <p class="c3"><span class="c7 c10">Data Retention:</span></p>
    <ul class="c8 lst-kix_4w0lpsmorzt9-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >We retain user data as long as necessary for the purposes outlined in
          this policy.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >If you delete your account, we may retain limited information for
          legal, compliance, or fraud prevention purposes.<br
        /></span>
      </li>
    </ul>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.9lajdu8yz46c">
      <span class="c4">5. Your Rights and Choices</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >Depending on your location, you may have rights regarding your personal
        data, including:</span
      >
    </p>
    <ul class="c8 lst-kix_vqx6q3r76rf3-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Access &amp; Correction:</span
        ><span class="c5"
          >&nbsp;You can view and update your profile information in your
          account settings.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Data Portability:</span
        ><span class="c5"
          >&nbsp;You may request a copy of your data.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Deletion:</span
        ><span class="c5"
          >&nbsp;You may request account deletion, subject to any legal
          retention requirements.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c7">Marketing Preferences:</span
        ><span class="c5"
          >&nbsp;You can opt out of marketing communications through your
          account settings or by following unsubscribe links.<br
        /></span>
      </li>
    </ul>
    <p class="c3">
      <span class="c5"
        >To exercise your rights, contact us at [Insert Contact Email].</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.dun2chj87ar8">
      <span class="c4">6. Third-Party Integrations &amp; Meta Compliance</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >MVPz integrates with Meta and other third-party platforms. If you sign
        in with a Meta account:</span
      >
    </p>
    <ul class="c8 lst-kix_dds60fvghhmz-0 start">
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Only your name, email, and profile picture will be collected.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >This data is used solely for account creation and verification.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >We comply with Meta&rsquo;s Platform Terms regarding data collection,
          usage, and security.<br
        /></span>
      </li>
      <li class="c3 c6 li-bullet-0">
        <span class="c5"
          >Your Meta data is not shared with third parties.<br
        /></span>
      </li>
    </ul>
    <p class="c3">
      <span class="c5"
        >If you lose access to your Meta account, alternative verification
        methods may be required.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.2ynkm8rj0q7b">
      <span class="c4">7. Children&rsquo;s Privacy</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >MVPz is not intended for users under 13. If we discover that a child
        has provided personal information, we will delete it. Parents or
        guardians who believe their child has shared data should contact us
        immediately.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.kbilbiavw3hd">
      <span class="c4">8. International Data Transfers</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >If you access MVPz from outside the United States, your information may
        be transferred to and processed in the U.S. By using our Platform, you
        consent to this transfer.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.oli5heqazzsp">
      <span class="c4">9. Updates to This Privacy Policy</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >We may update this policy periodically. If significant changes occur,
        we will notify you via email or in-app notification. Continued use of
        MVPz after updates constitutes acceptance of the revised policy.</span
      >
    </p>
    <div class="hr"></div>
    <p class="c1"><span class="c5"></span></p>
    <h2 class="c0" id="h.qgcyoti5lf7d">
      <span class="c4">10. Contact Us</span>
    </h2>
    <p class="c3">
      <span class="c5"
        >If you have questions or concerns about this Privacy Policy, you can
        reach us at:</span
      >
    </p>
    <p class="c3">
      <span class="c7">Email:</span><span class="c5">&nbsp;team@mvpz.io</span>
    </p>
    <p class="c3">
      <span class="c5"
        >By using MVPz, you acknowledge that you have read and understood this
        Privacy Policy.</span
      >
    </p>
    <p class="c1"><span class="c5"></span></p>
  </body>`;
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
           
          </div>
          <div className="w-full flex-1" />
          <div className="relative w-full space-y-4 ">
            <article className="font-monumentUltraBold text-4xl">
              Privacy Policy
            </article>
            <span className="text-[10px] font-inter font-extrabold opacity-50">
            Effective Date: 03/31/25
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
