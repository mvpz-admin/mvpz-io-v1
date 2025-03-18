// import React, { useState } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { Button, Loader } from "@mantine/core";
// import { TfiNewWindow } from "react-icons/tfi";
// import { useRouter } from "next/router";
// import EditProfile from "../profile/edit";
// import { MdDelete } from "react-icons/md";
// import { callAPI } from "../../lib/utils";
// import ProfileLayout from "../../core/Layout/ProfileLayout";

// const Index = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [deleteComfirmModel, setDeleteConfirmModel] = useState(false);
//   const [handleDeleteLoading, setHandleDeleteLoading] = useState(false);


//   // const handleDelete = async () => {
//   //   setHandleDeleteLoading(true);
//   //   const response = await callAPI({
//   //     endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/user/account/delete`,
//   //     method: "DELETE",
//   //   });

//   //   if(response?.success){
//   //     router.push("/")
//   //   }
    
//   //   setDeleteConfirmModel(false);
//   // };

//   return (
//     <ProfileLayout>
//       <div className="relative w-full bg-secondary p-8 mb-10">
//         <article className="text-3xl mb-2">{session?.user?.name}</article>
//         <article className="text-sm opacity-50 mb-2">
//           {session?.user?.email}
//         </article>
//         <div
//           className=" flex justify-start items-end gap-2 mb-8 cursor-pointer"
//           onClick={() => router.push("/fanzone/profile/user")}
//         >
//           <TfiNewWindow size={22} />
//           <article className="text-xs text-primary underline ">
//             Open Profile
//           </article>
//         </div>
//         {/* <Button
//           color="red"
//           size="xs"
//           className="text-[10px] "
//           onClick={() => setDeleteConfirmModel(true)}
//         >
//           <MdDelete size={18} className="mr-2" /> Delete Account
//         </Button> */}
//       </div>
//       <EditProfile hideback={true} />
//       {/* {deleteComfirmModel && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-secondary rounded-lg shadow-lg w-96 p-6">
//             <h2 className="text-lg font-semibold text-white">
//               Confirm Account Deletion
//             </h2>
//             <p className="mt-2 text-xs text-white text-opacity-30">
//               Are you sure you want to delete your account? This action cannot
//               be undone.
//             </p>
//             <div className="mt-8 flex justify-end space-x-4">
//               <button
//                 onClick={() => setDeleteConfirmModel(false)}
//                 className="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
//               >
//                 Cancel
//               </button>
//               {handleDeleteLoading ? (
//                 <button className="px-4 py-2 text-white bg-red-600 rounded flex justify-start items-center gap-2">
//                   Deleting <Loader size={16} color="white" variant="oval" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleDelete}
//                   className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
//                 >
//                   Confirm
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )} */}
//     </ProfileLayout>
//   );
// };

// export default Index;

import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index