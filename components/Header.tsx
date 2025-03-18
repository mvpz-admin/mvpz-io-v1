// import React from "react";
// import { useRouter } from "next/router";
// import { getSession, useSession } from "next-auth/react";
// import {HeaderSearch} from "./HeaderSearch"
// import {HeaderDefault} from "./HeaderDefault"

// interface HeaderLinkProps {
//   link: string; label: string; links?: {link: string; label: string;}[]
// }
// const Header = ({transparent = false}) => {
//   const router = useRouter();
//   const { data: session, status} = useSession();
//   let links: HeaderLinkProps[] = [
//     // {label: 'Collection', link:'/profile/myCards'},
//     {label: 'MVPz Store', link: '/mvpz-store'},
//     {label: 'Market', link: '/mvpz-market'},
//     {label: 'Challenges', link: '/mvpz-challenges'},
    
//     // {label: 'Apparel', link: '/apparel'},
//     // {label: 'APPAREL', link: '/apparel'},
//     // {label: 'ARENAZ', link: '/arenaz'},
//     {label: 'FANZONE', link: '/fanzone'},
//     // {label: 'Blog', link: '/blog'},
//   ]
//   if(session?.user?.role === 'Admin'){
//     links.push({label: 'Admin', link: '/admin', links: [
//       { link: '/admin/athlete', label: 'Athletes' },
//       { link: '/admin/cards', label: 'Cards' },
//       { link: '/admin/user', label: 'Users' },
//       { link: '/admin/subscriptions', label: 'Subscriptions'},
//       { link: '/admin/challenges', label: 'Challenges'}
//     ],})
//   }
//   return(
//     <>
//       {status === 'authenticated' ? 
//       <HeaderSearch
//         transparent={transparent}
//         user={{name: session.user.name, image: session.user.image, email: session.user.email}}
//         links={links}/> :
//       <HeaderDefault transparent={transparent} links={links}/>
//       }
//     </>
//   )
// };

// export default Header;


// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// };