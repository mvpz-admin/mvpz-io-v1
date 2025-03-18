// import {
//   Container,
//   createStyles,
//   Grid,
//   Group,
//   Loader,
//   rem,
//   Stack,
//   Title,
// } from "@mantine/core";
// import { IconArrowLeft } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import AthleteForm from "../../components/AthleteForm";
// import UserForm from "../../components/UserForm";
// import { callAPI, downloadFile } from "../../lib/utils";



// const EditProfile = (props) => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [user, setUser] = useState<any>();


//   async function downloadImages(user, authToken, url) {
//     if (user.image) {
//       if (user.image.includes("http")) {
//         user.profileDisplayImage = user.image;
//       } else {
//         user.profileDisplayImage = await downloadFile(
//           `${url}/file/mvpz-user-private/${user.image}`,
//           authToken
//         );
//       }
//     }
//     if (user.bannerImage) {
//       user.bannerDisplayImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${user.bannerImage}`,
//         authToken
//       );
//     }
//     if (user.cardImage) {
//       user.cardDisplayImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${user.cardImage}`,
//         authToken
//       );
//     }
//     const twitterUrl =
//       user.socialLinks?.find(
//         (s) => s.socialBrand === "twitter" || s.socialBrand === "X"
//       )?.link || null;
//     const facebookUrl =
//       user.socialLinks?.find((s) => s.socialBrand === "facebook")?.link || null;
//     const instagramUrl =
//       user.socialLinks?.find((s) => s.socialBrand === "instagram")?.link ||
//       null;
//     const linkedinUrl =
//       user.socialLinks?.find((s) => s.socialBrand === "linkedin")?.link || null;
//     const tiktokUrl =
//       user.socialLinks?.find((s) => s.socialBrand === "tiktok")?.link || null;
//     setUser({
//       ...user,
//       twitterUrl,
//       facebookUrl,
//       instagramUrl,
//       linkedinUrl,
//       tiktokUrl,
//     });
//   }

//   const fetchUser = async () => {
//     const response = await callAPI({
//       endpoint: `/api/user/getProfile`,
//       method: "GET",
//     });
//     if (response?.user?.id) {
//       downloadImages(
//         { ...response.user, ...session?.user },
//         response.imageDownload?.authorizationToken,
//         response.imageDownload?.downloadUrl
//       );
//     } else {
//       setUser(session?.user as any);
//     }
//   };
//   useEffect(() => {
//     if (status === "unauthenticated" && !!router) {
//       router.push("/");
//     }
//     if (!user) {
//       fetchUser();
//     }
//   }, []);

//   return (
//     <div className="relative w-full">
//       <Stack>
//         {!props?.hideback && (
//           <Group mb={16}>
//             <IconArrowLeft
//               onClick={() => router.back()}
//               style={{
//                 flexDirection: "column",
//                 textAlign: "start",
//                 cursor: "pointer",
//                 padding: `${rem(2)} ${rem(2)}`,
//               }}
//             />
//           </Group>
//         )}
//         <Title>Edit Profile</Title>
//         {!!user ? (
//           user.role === "Athlete" ? (
//             <AthleteForm
//               user={user}
//               isAdmin={session?.user?.role === "Admin"}
//             />
//           ) : (
//             <UserForm user={user} isAdmin={session?.user?.role === "Admin"} />
//           )
//         ) : (
//           <Loader />
//         )}
//       </Stack>
//     </div>
//   );
// };

// export default EditProfile;


import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index