import Image from "next/image";

export const DisplayCard = ({ card, loading, type }) => {
  return (
    <div className="relative w-full h-[375px] bg-secondary rounded-lg overflow-hidden">
      {/* bgImage */}
      {!loading && (
        <div className="absolute top-0 left-0 w-full h-full">
          {card && (
            <Image
              src={card}
              alt="bgimage"
              width={500}
              height={500}
              className={`relative w-full h-full object-cover rounded-lg  ${
                card?.isSoldOut && "grayscale"
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};
