
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { callAPI, downloadFile } from "../../../lib/utils";

// const UserProfileCard = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [user,setUser] = useState<any>()

//   const [images,setImages] = useState<any>()

//   async function downloadUserImages(_user, authToken, url) {
//     let downloadedImages = {} as any;
//     if (_user?.image) {
//           if (_user?.image.includes("https")) {
//             downloadedImages.profileImage = _user?.image;
//           } else {
//             downloadedImages.profileImage = await downloadFile(
//               `${url}/file/mvpz-user-private/${_user.image}`,
//               authToken
//             );
//           }
//         }
//         if(_user?.bannerImage){
//           if (_user?.bannerImage.includes("https") ){
//             downloadedImages.bannerImage = _user?.bannerImage
//           } else {
//             downloadedImages.bannerImage = await downloadFile(
//               `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//               authToken
//             );
//           }
//         }
//     setImages(downloadedImages);
//     }
    
   
  
 
//   const fetchAth = async () => {
//       let response = await callAPI({endpoint : `${process.env.NEXT_PUBLIC_APP_URL}/api/user/getProfile`})
//       if(response){
//         setUser(response?.user)
//           await downloadUserImages(
//             response.user,
//             response.imageDownload?.authorizationToken,
//             response.imageDownload?.downloadUrl
//           );
//       }
//   }

//   useEffect(() => {
//       if(session?.user?.id){
//           fetchAth()
//       }
      
//   },[session?.user?.id])


//   return (
//     <div className={`relative w-full ${user?.id ? " md:h-[350px] h-[375px]" : "md:h-[280px] h-[300px]"} bg-secondary rounded-b-3xl rounded-[50px] overflow-hidden`}>
//       {/* Profile */}
//       <div className="relative flex justify-center items-end w-full h-[100px] bg-ternary z-0">
//         {images?.bannerImage && (
//           <Image
//             src={images?.bannerImage || ""}
//             alt="banner"
//             width={500}
//             height={500}
//             className="absolute w-full h-full rounded-xl overflow-hidden  object-cover"
//           />
//         )}
//         <div className="w-[120px] h-[120px] -mb-[60px] rounded-full overflow-hidden p-2 bg-secondary z-10">
//           <div className="relative w-full h-full rounded-full bg-ternary flex justify-center items-center">
//             {images?.profileImage ? 
//             (
//               <Image
//                 src={images?.profileImage || ""}
//                 alt="profile"
//                 width={500}
//                 height={500}
//                 className="relative w-full h-full rounded-full object-cover"
//               />
//             )
//             :
//             <FaUser size={40} opacity={0.5} />
//           }
//           </div>
//         </div>
//       </div>

//       {/* Info */}
//       {user?.id && (
//         <div className="relative flex flex-col justify-start items-center mt-[80px] space-y-3">
//           <div className="space-y-1">
//             <article className="text-foreground opacity-50 text-[10px] text-center">
//               {user?.username}
//             </article>
//           <article className="text-foreground font-bold text-xl text-center">
//               {user?.name}
//             </article>
//           </div>
//           <div className="flex justify-center items-center space-x-2 text-xs">
//             <span>{user?._count?.tribeMembers + " " + "Tribe"} </span>
//             <div className="w-[0.5px] h-[10px] bg-purple-500"></div>
//             <span>{user?.role == "Athlete" ? `${user?._count?.followers} Followers` :  `${user?._count?.following} Following`}</span>
//           </div>
//         </div>
//       )}

//       {user?.id && <div className="relative flex justify-center items-center mt-[20px]">
//         <article
//           className="cursor-pointer font-bold text-purple-500"
//           onClick={() => router.push(user?.role == "Athlete" ? "/fanzone/tribe/profile/athlete" : "/fanzone/profile/user")}
//         >
//           View Profile
//         </article>
//       </div>}

//       {!user?.id && <div className="relative flex flex-col justify-center items-center mt-[80px] space-y-5">
//         <article
//           className="cursor-pointer font-bold"
//         >
//           Guest
//         </article>
//         <div className="h-[30px] px-5 text-xs bg-primary font-bold rounded-md flex justify-center items-center cursor-pointer" onClick={() => {
//           router.push("/auth/signin")
//         }}>
//           Sign Up
//         </div>
//         </div>}
//     </div>
//   );
// };

// export default UserProfileCard;
