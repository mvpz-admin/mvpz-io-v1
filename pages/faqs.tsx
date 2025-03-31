import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import Footers from "../core/Components/Widgets/Copyright";

const Index = () => {
  const router = useRouter();
  let faqsGQ = [
    {
      question: "What is MVPz?",
      answer: "MVPz is a platform designed for student-athletes to monetize their name, image, and likeness (NIL) through fan engagement, sports specific content, and selling merchandise. Fans can purchase, trade, and collect limited-edition digital cards of their favourite athletes, while athletes earn through card sales, tips, and referrals.",
    },
    {
      question: "How does MVPz help me as a student-athlete?",
      answer: "MVPz provides you with a new way to monetize your NIL without requiring traditional sponsorship deals. You can generate income by selling your digital sports cards, engaging with your fans, and leveraging the platform’s referral system to earn commissions on the purchases and earnings of new users.",
    },
    {
      question: "Is MVPz free for athletes?",
      answer: "Yes, MVPz is free to join for all eligible student-athletes. There are no upfront costs, and you earn money when your sports card is sold, traded, or used in platform interactions.",
    },
    {
      question: "How do I get started?",
      answer: "To get started, you need to sign up for MVPz and connect your social media accounts. Once you’ve created your account, you can start selling your digital sports cards, engaging with your fans, and earning money.",
    },
  ];

  let faqsDSC = [
    {
      question: "How do my digital sports cards work?",
      answer:      `Each athlete on MVPz has a limited number of digital cards based on their athlete tier:
      <ul class="c4 lst-kix_kasrzkc1u5ag-0 start">
      <li class="c0 li-bullet-0">
        <span class="c2">Tier 1:</span><span class="c1">&nbsp;250 cards</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c2">Tier 2:</span><span class="c1">&nbsp;50 cards</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c2">Tier 3:</span><span class="c1">&nbsp;25 cards</span>
      </li>
    </ul>
       <p class="c5">
      <span class="c1"
        >Fans can buy, trade, and collect these cards. Owning a card grants fans
        access to the &nbsp;Your card&rsquo;s value can theoretically increase
        based on your engagement and activity on the platform, as the more you
        promote yourself the more demand there will be for your cards.</span
      >
    </p>
    <p class="c5">
      <span class="c1"
        >Fans require a card to gain access to the team community forums, dubbed
        &ldquo;Tribes&rdquo;. Within these forums they will be able to interact
        with athletes and other fans.</span
      >
    </p>
`,
    },
    {
      question: "How do I earn from my digital sports cards?",
      answer:   `You earn revenue in two ways:
    <ol class="c4 lst-kix_be0hx5izzft6-0 start" start="1">
      <li class="c0 li-bullet-0">
        <span class="c2">Primary Sales:</span
        ><span class="c1"
          >&nbsp;When your card is first purchased, you receive a percentage of
          the sale price.</span
        >
      </li>
      <li class="c0 li-bullet-0">
        <span class="c2">Secondary Market:</span
        ><span class="c1"
          >&nbsp;You earn transaction fees when your card is resold by fans on
          the MVPz marketplace.</span
        >
      </li>
    </ol>
      `
    },
    {
      question: "Can I customize my card?",
      answer:   `Yes! MVPz allows customization options such as autographs, card redesigns, and other premium features that can increase the value of your cards.`
    },
  ];

  let faqEM = [
    {
        question: "How do I get paid?",
        answer : `Your earnings from card sales, tips, and referrals are deposited into your MVPz account. You can withdraw funds to your bank account through our secure payment processing system.`
    },
    {
        question: "What percentage do I earn from sales?",
        answer: `Athletes receive a share of the revenue from each card sale, with additional bonuses based on engagement. The exact percentage varies depending on the type of transaction (primary sale vs. secondary sale).`
    },
    {
        question: "Are there other ways to earn on MVPz?",
        awnser : `Yes! In addition to card sales, you can:
         <ul class="c4 lst-kix_6d1ihk9pk690-0 start">
      <li class="c0 li-bullet-0">
        <span>Receive </span><span class="c2">tips</span
        ><span class="c1">&nbsp;from fans on your posts.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span>Receive </span><span class="c2">tips</span
        ><span class="c1">&nbsp;from fans directly if they own your card.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span>Sell subscriptions to fans to access your </span
        ><span class="c2">exclusive content</span
        ><span>&nbsp;e.g. coaching content</span><span class="c1">.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span>Earn from </span><span class="c2">referrals</span
        ><span class="c1"
          >, receiving a commission when new users sign up and make purchase or
          earn on the platform.</span
        >
      </li>
    </ul>`
    },
  
  ]

  let faqCE = [
    {
        question: "What kind of content can I post?",
        answer: `MVPz supports:
         <ul class="c4 lst-kix_q42e4b4if15l-0 start">
      <li class="c0 li-bullet-0"><span class="c1">Short-form posts.</span></li>
      <li class="c0 li-bullet-0">
        <span class="c1">Long-form text posts.</span>
      </li>
      <li class="c0 li-bullet-0"><span class="c1">Images.</span></li>
      <li class="c0 li-bullet-0"><span class="c1">Video content.</span></li>
      <li class="c0 li-bullet-0">
        <span class="c1"
          >A combination off all the above in a sinlge post!
        </span>
      </li>
    </ul>
      <p class="c5">
      <span class="c1"
        >Your content helps boost your card&rsquo;s visibility and value, and
        you can even restrict certain content to card owners for
        exclusivity.</span
      >
    </p>
`
    },
    {
        question: "Can I control who interacts with my content?",
        answer: `Yes. Athletes can choose to limit comments and interactions to only card owners and or subscribers, giving you more control over your audience engagement.`
    },
   
  ]

  let faqRG = [
    {
        question: "How does the referral program work?",
        answer: ` You can refer both other athletes and general users to MVPz. When
        someone signs up using your referral code, you earn:
            <ul class="c4 lst-kix_gjdwasy56274-0 start">
      <li class="c0 li-bullet-0">
        <span class="c2">5% of all their spending</span
        ><span class="c1">&nbsp;on the platform.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c2">2.5% of their earnings</span
        ><span class="c1"
          >&nbsp;if they are an athlete. This creates ongoing passive income
          opportunities for you.</span
        >
      </li>
    </ul> `
    },
    {
        question: "How do I invite my fans and friends?",
        answer: `You can share your unique referral link or code through social media, direct messages, or even in-person promotions. The more users you bring to MVPz, the more you earn.`
    },
  ]

  let faqEQ = [
    {
        question: "Who can join MVPz as an athlete?",
        answer: `Currently, MVPz is open to NCAA Division 1 (D1) and above student-athletes. If you're eligible, you can claim your profile by verifying your identity. NCAA Division 2&3, NJCAA, and NIAI athletes should still apply as we will cater to demand.         `
    },
    {
        question: "How do I sign up?",
        answer: ` <ol class="c4 lst-kix_o60xz4jj7r42-0 start" start="1">
      <li class="c0 li-bullet-0">
        <span class="c1">Go to the MVPz website or app.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c1"
          >Search for your profile (pre-created for NCAA athletes) or sign up
          manually.</span
        >
      </li>
      <li class="c0 li-bullet-0">
        <span class="c1">Complete the verification process.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c1">Customize your profile and start engaging!</span>
      </li>
    </ol>`
    },
    {
        question: "What if my school or sport isn’t listed?",
        answer: `If your school or sport isn’t listed, contact MVPz support, and we’ll assist in setting up your profile.`
    },
   
  ]

  let faqTM = [
    {
        question: "How does the trading marketplace work?",
        answer: `Fans can buy, sell, and trade your digital sports cards on the MVPz marketplace. The platform applies transaction fees, and you continue to earn when your card is resold.`
    },
    {
        question: "Can I promote my card sales?",
        answer: `Yes! You can encourage fans to buy your cards by posting content, engaging with your community, and offering exclusive perks to cardholders.`
    },
  ]

  let faqPD = [
    {
        question: "Is my data safe on MVPz?",
        answer: `Yes. MVPz prioritizes user privacy and security. Your personal information is protected, and we do not share it without consent.`
    },
    {
        question: "Will my content be visible to everyone?",
        answer: `You control your content's visibility. You can post public content or make it exclusive to cardholders for additional monetization opportunities.`
    }
  ]

  let faqSC = [
    {
        question: "Who do I contact for support?",
        answer: `If you need help, you can reach out to MVPz support through:
         <ul class="c4 lst-kix_fuhxml7l1y44-0 start">
      <li class="c0 li-bullet-0">
        <span class="c1">The in-app support feature.</span>
      </li>
      <li class="c0 li-bullet-0">
        <span>Email at </span><span class="c6 c2">team@mvpz.io</span>
      </li>
      <li class="c0 li-bullet-0">
        <span class="c1">Direct messages on our social media pages.</span>
      </li>
    </ul>
    `
    },
    {
        question: "Can I provide feedback or request new features?",
        answer: `Absolutely! MVPz is constantly evolving, and we value athlete input. You can submit feedback through the app or contact our support team with suggestions.`
    },
  ]

  return (
    <div className="relative w-full h-full">
      {/* header */}
      <div className="relative w-full h-[350px]">
        <Image
          src={`/images/home/main-bg.png`}
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
              FAQs
            </article>
            <span className="text-[12px] font-inter font-extrabold opacity-50">
             Answers of common questions about MVPz.
            </span>
          </div>
        </div>
      </div>

      {/* body */}
     <div className="relative w-full md:px-10 px-5 space-y-20 my-10">
     <FAQBlock label={"General Questions"}  faqs={faqsGQ}/>
     <FAQBlock label={"Digital Sports Cards"}  faqs={faqsDSC}/>
     <FAQBlock label={"Earnings & Monetization"}  faqs={faqEM}/>
     <FAQBlock label={"Content & Engagement"}  faqs={faqCE}/>
     <FAQBlock label={"Referrals & Growth"}  faqs={faqRG}/>
     <FAQBlock label={"Eligibility & Onboarding"}  faqs={faqEQ}/>
     <FAQBlock label={"Trading & Marketplace"}  faqs={faqTM}/>
     <FAQBlock label={"Privacy & Data"}  faqs={faqPD}/>
     <FAQBlock label={"Support & Contact"}  faqs={faqSC}/>
     </div>

      <div className="md:px-10 px-5 py-5 border-t border-white border-opacity-10">
        <Footers />
      </div>
    </div>
  );
};

const FAQBlock = ({label, faqs}) => {
    return (
        <div className="w-full relative space-y-10">
            <article className="font-bold text-2xl">{label}</article>
            <div className="relative w-full">{
            faqs.map((faq, index) => (
                <FAQItem defaultOpen={index === 0} question={faq.question} answer={faq.answer} key={index}/>
            ))
            }</div>
        </div>
    )
}

const FAQItem = ({question, answer,defaultOpen = false}) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="relative w-full space-y-4 border-b border-white border-opacity-10 pb-5 mb-5 cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="relative w-full flex justify-between items-center">
                <article className=" flex-1 font-bold text-base">{question}</article>
                <div className="relative ">
                    <FaChevronDown size={14} className={ ` transition-all duration-300 ${open ? "rotate-180" : ""}`} />
                </div>
            </div>
         {   open && <div className="relative w-full">
                <div className="text-[12px] font-inter opacity-80 policy-container" dangerouslySetInnerHTML={{__html: answer}} />
            </div>}
        </div>
    )
}

export default Index;

