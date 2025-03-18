import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../utils/global/global";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";
import { formateDateTimeOn } from "../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1Shouts = async ({ user }) => {
  const shouts = await prisma.tribeShout
    .findMany({
      where: {
        isMemberOnly:false,
        thumbnail: {
          not: null,
        },
      },
      select: {
        id: true,
        thumbnail: true,
        message: true,
        postedBy: {
          select: {
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })
    .then((res) =>
      res.map((data) => ({
        ...data,
        postedBy: {
          ...data.postedBy,
          profileImage: getEventImage({
            image: data.postedBy.profileImage,
          }),
        },
        upload_on: formateDateTimeOn({ date: data.createdAt }),
      }))
    );

  return shouts;
};

const Section2Posts = async ({ user }) => {

  return prisma.post
    .findMany({
      select: {
        id: true,
        thumbnail: true,
        message: true,
        postedBy: {
          select: {
            id:true,
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
            following : {
              where : {
                followerId : user?.id
              }
            }
          },
        },
        bolts: { where: { userId: user?.id } },
        claps: { where: { userId: user?.id } },
        clovers: { where: { userId: user?.id } },
        likes: { where: { userId: user?.id } },
        _count: {
          select: {
            comments: true,
            bolts: true,
            claps: true,
            clovers: true,
            likes: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      // take : 5
    })
    .then(async (posts) =>
    {
   
      return posts.map((post) => ({
        ...post,
        postedBy: {
          ...post.postedBy,
          profileImage: getEventImage({ image: post.postedBy.profileImage }),
          following: post.postedBy.following?.length > 0,
        },
        reactions: {
          hearts : post?._count?.likes,
          claps : post?._count?.claps,
          fires :  post?._count?.bolts,
          good_luck : post?._count?.clovers,
          totalReactions:
            post._count.bolts +
            post._count.claps +
            post._count.clovers +
            post._count.likes,
        },
        upload_on: formateDateTimeOn({ date: post.createdAt }),
        isLiked:
          (post.bolts.length > 0 && { isLiked: true, likedType: "fires" }) ||
          (post.claps.length > 0 && { isLiked: true, likedType: "claps" }) ||
          (post.clovers.length > 0 && { isLiked: true, likedType: "good_luck" }) ||
          (post.likes.length > 0 && { isLiked: true, likedType: "hearts" }) ||
          { isLiked: false, likedType: null },
      }))
    }
    );
};


const Sections3Tribes = async ({ user }) => {
  let tribes;

  if (!user) {
    tribes = await prisma.tribe
      .findMany({
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
          tribeShortName: true,
          members : true,
          _count: {
            select: {
              athletes: true,
              members: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        take: 10,
      })
      .then((res) =>
        res.map((data) => {
          let {members,...tribeData} = data
          let checkMember  = members.every((member) => member.userId == user?.id)
          return ({
          ...tribeData,
          tribeLogo: getEventImage({ image: tribeData.tribeLogo }),
          isMember : checkMember
        })})
      );
  } else {
    tribes = await prisma.tribe
      .findMany({
        where: {
          members: {
            none: {
              userId: user.id, // Excludes tribes where the user is a member
            },
          },
        },
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
          tribeShortName: true,
          members : true,
          _count: {
            select: {
              athletes: true,
              members: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        take: 10,
      })
      .then((res) =>
        res.map((data) => {
          let {members,...tribeData} = data
          let checkMember  = members.every((member) => member.userId == user?.id)
          return ({
          ...tribeData,
          tribeLogo: getEventImage({ image: tribeData.tribeLogo }),
          isMember : checkMember
        })})
      );
  }

  return tribes;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    let [shouts, posts, tribes] = await Promise.all([
      Section1Shouts({ user }),
      Section2Posts({ user }),
      Sections3Tribes({ user }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        shouts,
        posts,
        tribes,
      },
      message: `Fanzone Loaded SuccessFully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
