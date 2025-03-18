// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import TribeCard from "../../Atoms/TribeCard/TribeCard";
// import TribeAddCard from "../../Atoms/TribeCard/TribeAddCard";
// import TribeAtheletPostCard from "../../Atoms/TribeCard/TribeAtheletPostCard";
// import ModelVr_O from "../../Atoms/Models/ModelVr_O";
// import OpenPost from "../../Atoms/Feed/OpenPost";




// const AtheletPostSlider : React.FC<{theme:{
//   primaryColor : string,
//   secondaryColor : string
// }, shouts : any, imageDownload : any, tribeId : string}> = ({theme, shouts = [], imageDownload, tribeId }) => {
//   const [openModel, setOpenPostModel] = useState(false);
//   const [postId,setPostId] = useState(null)



// const handleOpenModel = (id) => {
//   setPostId(id)
//   setOpenPostModel(true)
// }

// const handleClose = (val) => {
//   setPostId(null)
//   setOpenPostModel(val)
// }

//   const TribeSectionHeader = () => {
//     return (
//       <div className="flex justify-start items-center">
//           <article className="text-xl font-bold cursor-pointer " >Athelte Shout</article>
//         </div>
//     )
//   }

// const TribeSectionSwiper = ({}) => {
//   return (
//   <Swiper
//         slidesPerView={3.1}
//         spaceBetween={10}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           // Adjust for iPhone
//           320: {
//             slidesPerView: 1.1,
//             spaceBetween: 5,
//           },
//           // Adjust for small tablets like iPad Mini
//           768: {
//             slidesPerView: 2.2,
//             spaceBetween: 5,
//           },
//           // Adjust for iPad Pro
//           1024: {
//             slidesPerView: 2.8,
//             spaceBetween: 10,
//           },
//           1440: {
//             slidesPerView: 3.1,
//             spaceBetween: 10,
//           },
//           // Adjust for larger screens
//           1500: {
//             slidesPerView: 3.1,
//             spaceBetween: 20,
//           },
//         }}
//         className="relative mySwiper w-full overflow-hidden z-0"
//       >
   
//         {shouts
//           ?.map((shout, index) => {
//             return (
//               <SwiperSlide className="relative py-2" key={index}>
//                 <TribeAtheletPostCard theme={theme} shout={shout} imageDownload={imageDownload}  handleOpenModel={handleOpenModel}  />
//               </SwiperSlide>
//             );
//           })}
//   </Swiper>
//   )
// }

//   return (
//     <div className="relative w-full gap-10 overflow-hidden gap-y-5">
//       {/* <TribeSectionHeader /> */}
//       <TribeSectionSwiper />
//       {
//         openModel &&
//         <ModelVr_O open={openModel} setHandleOpen={(e) => handleClose(e)} >
//           <OpenPost post={postId} tribeId={tribeId} postType="Shout Post"  />
//         </ModelVr_O>
//       }
//     </div>
//   );
// };

// export default AtheletPostSlider;
