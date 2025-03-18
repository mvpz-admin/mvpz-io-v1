// import { Container } from "@mantine/core";
// import { useEffect } from "react";
// import Layout from "../../components/Layout";
// import UserProfile from "../../components/profile/UserProfile";

// const users = [{
//     id: 1,
//     image: "/images/1.png",
//     name: "Marcus Fraser",
//     rank: 53,
//     price: "0.50"
// },
// {
//     id: 2,
//     image: "/images/2.png",
//     name: "Mark Birighitti",
//     rank: 53,
//     price: "0.50"
// },
// {
//     id: 3,
//     image: "/images/3.png",
//     name: "Marissa Sheva",
//     rank: 60,
//     price: "0.50"
// },
// {
//     id: 4,
//     image: "/images/4.png",
//     name: "Nathaniel Atkinson",
//     rank: 77,
//     price: "0.50"
// }
// ]


// const User = ({ id }: { id: number }) => {
//     const selectedUser = users[id] || users[0]    
//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             <UserProfile user={selectedUser}></UserProfile>
//         </Container>
//     )
// }

// export default User;