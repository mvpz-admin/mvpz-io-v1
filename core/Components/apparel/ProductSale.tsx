import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';



export default function ProductSwiper({products,loading}) {
  return (
    <div className="relative w-full mx-auto py-10">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        spaceBetween={20}
        className="rounded-lg overflow-hidden"
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-[500px] flex items-center justify-center" style={{
                background : product?.theme?.gradient
            }}>
              <div className="flex flex-col md:flex-row items-center bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-4xl" style={{
                background : product?.theme?.primary
              }}>
                <div className="w-[300px] h-[300px] flex justify-center">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="rounded-lg h-full w-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0 md:pl-6 text-white">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-[12px] font-inter mt-2">{product.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <button className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full shadow-md">
        <ChevronLeft size={24} />
      </button>
      <button className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full shadow-md">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}