import React, { useEffect, useState } from "react";
import { callAPI } from "../../lib/utils";
import ChallengesList from "../../core/Components/Challenges/ChallengesList";
import { useRouter } from "next/router";

const Index = () => {
  const [list, setList] = useState([]);
  const [collections,setCollections] = useState([])
  const [loading, setLoading] = useState(false);
  const [imageToken,setImageToken] = useState(null)
  const [userXp,setUserXp] = useState(0)
  const router = useRouter()

  const handleGetList = async () => {
    setLoading(true);
    const res = await callAPI({
      endpoint: router?.query?.tribe ? `${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/getAllChallenges?tribe=${router?.query?.tribe}` : `${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/getAllChallenges`,
      method: "GET",
    });

    if (!res.success) {
      return console.log(res.error);
    }

    setLoading(false)
    setUserXp(res.data.userXp)
    setImageToken(res.data.imageDownload)
    setCollections(res.data.collections)
    return setList(res?.data?.list);
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] py-20">
      <div className="mb-10">
        <article className="md:text-[50px] text-2xl text-center  uppercase font-graffiti mb-5 ">
          <span className="font-monumentUltraBold">{router?.query?.tribe ? router?.query?.tribe :  "Tribes"}</span> 
          <span className="text-primary">{" "}Challeneges</span>
        </article>
        <article className="text-xs text-center">
        UNITE. COMPETE. CONQUER. THE ULTIMATE {router?.query?.tribe} CHALLENGE!
        </article>
      </div>

      {loading ?<>
        <div className="flex justify-center items-center w-full h-[80px]">
          <article className="text-lg font-monumentUltraBold opacity-50">
            Loding Challenges...
          </article>
        </div>
      </>: list?.length > 0 ? (
        <div className="flex flex-col justify-start gap-10 items-start">{
        <ChallengesList list={list} loading={loading}  imageToken={imageToken} collections={collections}/>
        }</div>
      ) : (
        <div className="flex justify-center items-center w-full h-[80px]">
          <article className="text-lg font-monumentUltraBold opacity-50">
            No Challnege Available
          </article>
        </div>
      )}
    </div>
  );
};

export default Index;
