import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import CardCollectionStories from "../../../../core/Components/Cards/CardCollectionStories";

const data = [
    {
      title: "India Otto",
      subtitle: "Base Cards",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
      cards: [
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "India Otto Bronze Card",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
      ],
    },
    {
      title: "2025 RCB Avatars",
      subtitle: "3 Enhancement",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1739094331/Screenshot_2025-02-09_at_3.14.46_PM_it5sxi.png",
      cards: [
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete Team Change",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete x Oliva",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete Signature",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
      ],
    },
    {
      title: "2024 India Avatars",
      subtitle: "3 Enhancement",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1739036181/Group_8.png",
      cards: [
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete Team Change",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete x Oliva",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
        {
          image:
            "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
          title: "Athlete Signature",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, blanditiis.",
        },
      ],
    },
  ];

export default function InstagramHighlights() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Instagram Highlights</h2>
      <div onClick={() => handleOpenModal()}>Open</div>

      {open && (
        <CardCollectionStories
          openStories={open}
          setOpenStories={setOpen}
          collections={data}
        />
      )}
    </div>
  );
}
