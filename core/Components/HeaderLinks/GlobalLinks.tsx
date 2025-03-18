import React, { useEffect, useState } from 'react'
import { FzoneLinksEnum } from './GlobalLinksEnum';



  interface HeaderLinksProps {
    selectedTab : FzoneLinksEnum
    setTab : (tab:FzoneLinksEnum) => void
  }
  
  const GlobalHeaderLinks : React.FC<HeaderLinksProps> =({selectedTab,setTab}) => {
    let links = Object.keys(FzoneLinksEnum).map((key) => {
      return { key, val: FzoneLinksEnum[key as keyof typeof FzoneLinksEnum] };
    });

    
  
    return (
      <div className="flex w-full relative justify-start items-start backdrop-blur-md py-5  px-2 gap-x-10 z-10 md:overflow-hidden  scroller-hidden  my-10" >
        <div className='w-full o flex md:justify-start justify-between items-center gap-x-10 !scroller-hidden '>
        {links.map((li) => (
          <article 
          key={li.key}
          className={`md:text-md text-sm  font-bold flex justify-center items-center ${selectedTab == li.val ? "text-purple-500" : "text-foreground"}  ${(li.val == FzoneLinksEnum.feed || li.val == FzoneLinksEnum.shout )? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed" } `}
          onClick={() => ( li.val == FzoneLinksEnum.feed || li.val == FzoneLinksEnum.shout) &&  setTab(li.val as FzoneLinksEnum)}
          >{li.val}</article>
        ))}
        </div>
        <div className='absolute top-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50'></div>
        <div className='absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50'></div>
      </div>
    );
  };


export default GlobalHeaderLinks
