// import { Button, Loader } from "@mantine/core";
// import React, { useState } from "react";
// import { IoSend } from "react-icons/io5";
// import { handleKeyDown } from "../../../utils/keyboards";
// import { useSession } from "next-auth/react";

// interface AddCommentFieldProps {
//   onComment: (commentMessage: string) => void;
//   loading: boolean;
//   hasCard : boolean;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
//   handleOpenBuyCard: () => void;
// }

// const AddCommentField: React.FC<AddCommentFieldProps> = ({
//   onComment,
//   loading,
//   hasCard,
//   postType,
//   handleOpenBuyCard
  
// }) => {
//   const [val, setVal] = useState<string>("");
//   const {data: session} = useSession()

//   function handleCommentMessage() {
//     if (!loading) {
//       onComment(val);
//       setVal("");
//     }
//   }

//   function handleOnFocus(){
//     console.log({session});
    
//     if(postType === "Shout Post" && !hasCard && session.user.role !== "Athlete"){
//       return handleOpenBuyCard()
//     }
//   }

//   return (
//     <div className="flex justify-between items-center  space-x-2">
//       <div className="w-full h-[50px] bg-ternary rounded-full overflow-hidden">
//         <textarea
//           className="w-full h-full px-5 py-2 font-semibold text-xs bg-transparent outline-none"
//           placeholder="Write Comment Here..."
//           value={val}
//           onFocus={handleOnFocus}
//           onChange={(event) => setVal(event.target.value)}
         
//         />
//       </div>
//       <Button
//         className={`w-[50px] h-[50px] rounded-full  flex justify-center items-center ${
//           val.length > 0
//             ? "bg-primary"
//             : "bg-ternary hover:bg-ternary cursor-not-allowed"
//         } `}
//         onClick={handleCommentMessage}
//       >
//         {
//           loading ?
//           <Loader size={30} />
//           :
//           <IoSend size={18} className="text-white" />
//         }
//       </Button>
//     </div>
//   );
// };

// export default AddCommentField;
