import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import prisma from "../../../../../lib/prisma";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";

const getEventImage = ({ image }) => {
  return image ? (image.includes("https://") ? image : `${BB_BASE_URL}${image}`) : null;
};

const checkIsMember = ({ userId, tribeId }) => {
  return prisma.tribeMember.findFirst({
    where: { userId, tribeId },
  }).then(member => !!member);
};

const Section1TopTribes = ({ user }) => {
  return prisma.tribe.findMany({
    select: {
      id: true,
      tribeId: true,
      tribeLogo: true,
      tribeName: true,
      tribeHorizontalBanner: true,
      tribeShortName: true,
      _count: {
        select: { athletes: true, members: true },
      },
    },
    orderBy: { members: { _count: "desc" } },
    take: 10,
  }).then(res => Promise.all(
    res.map(data => 
      checkIsMember({ tribeId: data.id, userId: user?.id }).then(checkIsAlreadyJoin => ({
        ...data,
        tribeLogo: getEventImage({ image: data.tribeLogo }),
        tribeHorizontalBanner: getEventImage({ image: data.tribeHorizontalBanner }),
        checkIsAlreadyJoin,
      }))
    )
  ));
};

const Section2MyTribes = ({ user }) => {
  return user ? prisma.tribe.findMany({
    where: { members: { some: { userId: user?.id } } },
    select: {
      id: true,
      tribeId: true,
      tribeLogo: true,
      tribeName: true,
      tribeVerticalBanner: true,
      tribeShortName: true,
      _count: { select: { athletes: true, members: true } },
    },
  }).then(res => Promise.all(
    res.map(data => 
      checkIsMember({ tribeId: data.id, userId: user?.id }).then(checkIsAlreadyJoin => ({
        ...data,
        tribeLogo: getEventImage({ image: data.tribeLogo }),
        tribeVerticalBanner: getEventImage({ image: data.tribeVerticalBanner }),
        checkIsAlreadyJoin,
      }))
    )
  )) : Promise.resolve([]);
};

const Sections3OtherTribes = ({ user }) => {
  return prisma.tribe.findMany({
    where: { members: { none: { userId: user?.id } } },
    select: {
      id: true,
      tribeId: true,
      tribeLogo: true,
      tribeName: true,
      tribeVerticalBanner: true,
      tribeShortName: true,
      _count: { select: { athletes: true, members: true } },
    },
  }).then(res => Promise.all(
    res.map(data => 
      checkIsMember({ tribeId: data.id, userId: user?.id }).then(checkIsAlreadyJoin => ({
        ...data,
        tribeLogo: getEventImage({ image: data.tribeLogo }),
        tribeVerticalBanner: getEventImage({ image: data.tribeVerticalBanner }),
        checkIsAlreadyJoin,
      }))
    )
  ));
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    Promise.all([
      Section1TopTribes({ user }),
      Section2MyTribes({ user }),
      Sections3OtherTribes({ user })
    ]).then(([topTribes, myTribes, otherTribes]) => {
      res.status(200).json({
        success: true,
        data: { topTribes, myTribes, otherTribes },
        message: "Tribe Loaded Successfully",
      });
    }).catch(error => {
      console.log({ error });
      res.status(500).json({ error: "Internal Server Error" });
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});