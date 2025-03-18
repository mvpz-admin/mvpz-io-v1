import { useRouter } from "next/router";
import React from "react";
interface LinksProps {
  url: string;
  title: string;
  icon: React.ElementType; 
}

interface LinkSectionsProps {
  sectionTitle?: string; 
  links: LinksProps[]; 
}

const LinkSections: React.FC<LinkSectionsProps> = ({
  sectionTitle = "Cards",
  links = [],
}) => {
    const router = useRouter()
    
    

   
  return (
    <div className="w-full space-y-4 mb-10">
      <article className="opacity-40 text-sm px-5">{sectionTitle}</article>
      <div className="w-full flex-col justify-start items-start bg-white bg-opacity-5 rounded-md py-2 ">
        {links.map((link) => {
          return (
            <div
              className={`flex justify-start items-center gap-4 px-5 py-3 ${router.asPath === link.url ? "bg-white bg-opacity-15" : "bg-white bg-opacity-5"} hover:bg-white hover:bg-opacity-15 cursor-pointer `}
              key={link.title}
              onClick={() => 
              {
                console.log(link?.url);
                
                router.push(`${link?.url}`)
              }
              }
            >
              {link.icon && React.createElement(link.icon, { size: 20, opacity: 0.8 })}
              <div className="text-base opacity-80">{link.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinkSections;
