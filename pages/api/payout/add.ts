import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const calculateShareAmount = (amount, percentage) =>
  parseFloat(((amount * percentage) / 100).toFixed(2));

const handleCreateCardPayOut = async (athleteId) => {
  try {
    let purchaseCard = [];
    let mintCard = [];
    let data = [];

    // Fetch NFT Entities with related data
    const nFTEntity = await prisma.nFTEntity.findMany({
      where: {
        athleteId: athleteId as string,
      },
      include: {
        puchaseCards: {
          where: {
            status: { equals: "ASSIGNED" },
          },
        },
        mintCards: {
          where: { address: { not: null } },
        },
        athlete: true,
      },
    });

    console.log();

    // Process purchase cards
    purchaseCard = await Promise.all(
      nFTEntity.flatMap((nft) =>
        nft.puchaseCards.map(async (card) => {
          const product = await prisma.product.findFirst({
            where: { id: card.productId },
          });

          if (!product) {
            return await prisma.logError.create({
              data: {
                apiName: "/api/payout/add",
                collection: "product",
                errorLog: `${product}`,
                title: "Error While Card Payout : NftPurchase card",
              },
            });
          }

          return {
            ...card,
            prodType: product?.type,
            prodPackQty: product?.packQuantity || 1,
            mintAthleteShare: nft.type === "Athlete" ? nft.mintAthleteShare : 0,
          };
        })
      )
    );

    // Process mint cards
    mintCard = nFTEntity.flatMap((nft) =>
      nft.mintCards.map((card) => ({
        ...card,
        mintAthleteShare: nft.type === "Athlete" ? nft.mintAthleteShare : 0,
      }))
    );

    // Create data arrays for purchase and mint cards
    const dat1 = await Promise.all(
      purchaseCard.map(async (card) => {
        const afterQtyCal = card.prodPackQty
          ? card.purchasePrice / card.prodPackQty
          : card.purchasePrice;
        const athleteShare = calculateShareAmount(
          afterQtyCal,
          card.mintAthleteShare
        );
        const mvpzShare = calculateShareAmount(
          afterQtyCal,
          100 - card.mintAthleteShare
        );

        const athleteInfo = await prisma.nFTEntity.findFirst({
          where: {
            id: card.nftEntityId,
          },
          include: {
            athlete: true,
          },
        });

        const userInfo = await prisma.user.findFirst({
          where: {
            id: card.currentOwnerId,
          },
        });

        return {
          collectionFrom: "Purchase",
          purchaseCardId: card.id,
          productId: card.productId,
          nftEntityId: card.nftEntityId,
          nftType: athleteInfo?.type,
          athleteId:
            athleteInfo?.type == "Athlete" ? athleteInfo?.athlete.id : null,
          athleteName:
            athleteInfo?.type == "Athlete" ? athleteInfo?.athlete?.name : null,
          cardEarnings: afterQtyCal,
          buyerId: userInfo?.id,
          buyerName: userInfo?.name,
          productPrice: card.purchasePrice,
          athleteShareAmt: athleteShare,
          mvpzShareAmt: mvpzShare,
          packType: card.prodType,
          packQty: card.prodPackQty,
          athMintShare: card.mintAthleteShare,
          mintPaymentAddress: "N/A",
          paymentMethods: "N/A",
          multiplier: 1,
          currency: "N/A",
        };
      })
    );

    const dat2 = await Promise.all(
      mintCard.map(async (card) => {
        const metaData = JSON.parse(card.saturnResponse);
        const multiplier = metaData?.paymentMethod === "ADA" ? 0.7 : 1;
        const currency = metaData?.paymentMethod === "ADA" ? "ADA" : "DOLLAR";

        const afterPayCal =
          metaData?.paymentMethod === "credit-card"
            ? card.mintPrice
            : card.mintPrice * multiplier;

        const athleteShare = card.mintAthleteShare
          ? calculateShareAmount(afterPayCal, card.mintAthleteShare)
          : 0;
        const mvpzShare = card.mintAthleteShare
          ? calculateShareAmount(afterPayCal, 100 - card.mintAthleteShare)
          : afterPayCal;

        const athleteInfo = await prisma.nFTEntity.findFirst({
          where: {
            id: card.nftEntityId,
          },
          include: {
            athlete: true,
          },
        });

        let userInfo;

        if (card.currentOwnerId) {
          userInfo = await prisma.user.findFirst({
            where: {
              id: card.currentOwnerId,
            },
          });
        }

        return {
          collectionFrom: "Mint",
          mintCardId: card.id,
          productId: card.productId,
          nftEntityId: card.nftEntityId,
          nftType: athleteInfo?.type,
          athleteId:
            athleteInfo?.type === "Athlete" ? athleteInfo?.athlete.id : null,
          athleteName:
            athleteInfo?.type === "Athlete" ? athleteInfo?.athlete?.name : null,
          buyerId: userInfo?.id,
          buyerName: userInfo?.name || "N/A",
          cardEarnings: afterPayCal,
          multiplier,
          currency,
          paymentMethods: metaData?.paymentMethod || "N/A",
          mintPaymentAddress: card?.address,
          athleteShareAmt: athleteShare,
          mvpzShareAmt: mvpzShare,
          athMintShare: card.mintAthleteShare,
          productPrice: card.mintPrice,
          packType: "N/A",
          packQty: card.prodPackQty,
        };
      })
    );

    data = [...dat1, ...dat2];

    console.log({
      data,
    });

    data.map(async (_) => {
      let reponse = await prisma.stripePayout.create({
        data: {
          amount: _.athleteShareAmt,
          metadata: JSON.stringify({
            collection: _.collectionFrom,
            payoutId: _.mintCardId || _.purchaseCardId,
          }),
          type: "card",
          fromUserId: _.buyerId,
          payoutUserId: _.athleteId,
        },
      });

      console.log({
        reponse,
      });

      if (!reponse) {
        return await prisma.logError.create({
          data: {
            apiName: "/api/payout/add",
            collection: "stripePayout",
            errorLog: `${reponse}`,
            title: "Error While Stripe Card Payout",
            developerRefDescription: "stripe payout is not created",
          },
        });
      }
    });
  } catch (error) {
    return await prisma.logError.create({
      data: {
        apiName: "/api/payout/add",
        collection: "stripePayout",
        errorLog: `${error}`,
        title: "Error While Stripe Payout",
      },
    });
  }
};

const handleCreateTipPayout = async (user) => {
  try {
    let publicPostTips = await prisma.publicPostTips.findMany({
      where: {
        toUserId: user?.id,
        isPaymentSuccess: true,
        isPaymentWithdrawn: false,
      },
    });

    console.log({
      publicPostTips: publicPostTips,
      length: publicPostTips?.length,
    });

    let tribePostTips = await prisma.tribePostTips.findMany({
      where: {
        toUserId: user?.id,
        isPaymentSuccess: true,
        isPaymentWithdrawn: false,
      },
    });

    console.log({
      tribePostTips: tribePostTips,
      length: tribePostTips?.length,
    });

    let tribeShoutsTips = await prisma.tribeShoutsTips.findMany({
      where: {
        toUserId: user?.id,
        isPaymentSuccess: true,
        isPaymentWithdrawn: false,
      },
    });

    console.log({
      tribeShoutsTips: tribeShoutsTips,
      length: tribeShoutsTips?.length,
    });

    let athleteTips = await prisma.athleteTips.findMany({
      where: {
        toUserId: user?.id,
        isPaymentSuccess: true,
        isPaymentWithdrawn: false,
      },
    });

    console.log({
      athleteTips: athleteTips,
      length: athleteTips?.length,
    });

    publicPostTips.map(async (_) => {
      let reponse = await prisma.stripePayout.create({
        data: {
          amount: _.amount,
          metadata: JSON.stringify({
            collection: "publicPostTips",
            payoutId: _.id,
          }),
          type: "tip",
          fromUserId: _.fromUserId,
          payoutUserId: _.toUserId,
          userPaymentId: _.stripeCheckoutId,
        },
      });

      console.log({
        reponse,
      });
    });

    tribePostTips.map(async (_) => {
      let reponse = await prisma.stripePayout.create({
        data: {
          amount: _.amount,
          metadata: JSON.stringify({
            collection: "tribePostTips",
            payoutId: _.id,
          }),
          type: "tip",
          fromUserId: _.fromUserId,
          payoutUserId: _.toUserId,
          userPaymentId: _.stripeCheckoutId,
        },
      });

      console.log({
        reponse,
      });
    });

    tribeShoutsTips.map(async (_) => {
      let reponse = await prisma.stripePayout.create({
        data: {
          amount: _.amount,
          metadata: JSON.stringify({
            collection: "tribeShoutsTips",
            payoutId: _.id,
          }),
          type: "tip",
          fromUserId: _.fromUserId,
          payoutUserId: _.toUserId,
          userPaymentId: _.stripeCheckoutId,
        },
      });

      console.log({
        reponse,
      });
    });

    athleteTips.map(async (_) => {
      let reponse = await prisma.stripePayout.create({
        data: {
          amount: _.amount,
          metadata: JSON.stringify({
            collection: "athleteTips",
            payoutId: _.id,
          }),
          type: "tip",
          fromUserId: _.fromUserId,
          payoutUserId: _.toUserId,
          userPaymentId: _.stripeCheckoutId,
        },
      });

      if (!reponse) {
        return await prisma.logError.create({
          data: {
            apiName: "/api/payout/add",
            collection: "stripePayout",
            errorLog: `${reponse}`,
            title: "Error While Stripe Tip Payout",
            developerRefDescription: "stripe payout is not created",
          },
        });
      }

      console.log({
        reponse,
      });
    });
  } catch (error) {
    return await prisma.logError.create({
      data: {
        apiName: "/api/payout/add",
        collection: "stripePayout",
        errorLog: `${error}`,
        title: "Error While Stripe Tip Payout",
        developerRefDescription: "stripe payout is not created",
      },
    });
  }
};

const handleReferralEarnings = async (payout) => {
  try {
    let reponse = await prisma.stripePayout.create({
      data: {
        amount: payout.payoutAmount,
        metadata: JSON.stringify({
          collection: "referralInvite",
          payoutId: payout.orderId,
        }),
        type: "referral",
        payoutUserId: payout.userId,
      },
    });

    console.log({ reponse });

    if (!reponse) {
      return await prisma.logError.create({
        data: {
          apiName: "/api/payout/add",
          collection: "stripePayout",
          errorLog: `${reponse}`,
          title: "Error While Stripe referral Payout",
          developerRefDescription: "stripe payout is not created",
        },
      });
    }
  } catch (error) {
    return await prisma.logError.create({
      data: {
        apiName: "/api/payout/add",
        collection: "stripePayout",
        errorLog: `${error}`,
        title: "Error While Stripe referral Payout",
        developerRefDescription: "stripe payout is not created",
      },
    });
  }
};

const createStripeAccount = async (user) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user?.email,
    });

    console.log({
      account,
    });

    let alreadyThere = await prisma.webStripe.findFirst({
      where: {
        userId: user?.id,
      },
    });

    let reponse;

    if (!alreadyThere) {
      reponse = await prisma.webStripe.create({
        data: {
          customerId: account.id,
          userId: user?.id,
        },
      });
    } else {
      reponse = await prisma.webStripe.update({
        where: {
          id: alreadyThere.id,
        },
        data: {
          customerId: account.id,
          userId: user?.id,
        },
      });
    }

    console.log({ reponse });
  } catch (error) {
    console.log({ error });

    return await prisma.logError.create({
      data: {
        apiName: "/api/payout/add",
        collection: "webStripe",
        errorLog: `${error}`,
        title: "Error While stripe account add",
        developerRefDescription: "stripe payout is not created",
      },
    });
  }
};
// --------------------------- Trade & martketplace ----------------------

const handleTradeStratingPrice = async () => {
  let startPrice = await prisma.tradeSellingStartPrice.findFirst();

  if (!startPrice) {
    let response = await prisma.tradeSellingStartPrice.create({
      data: {
        price: 20,
      },
    });

    return response;
  } else {
    let response = await prisma.tradeSellingStartPrice.update({
      where: {
        id: startPrice.id,
      },
      data: {
        price: 20,
      },
    });

    return response;
  }
};

const handleTradeMvpzShare = async () => {
  let createTradeMvpzShare = await prisma.tradeMvpzShare.findFirst();

  if (!createTradeMvpzShare) {
    let response = await prisma.tradeMvpzShare.create({
      data: {
        share: 0,
      },
    });

    return response;
  } else {
    let response = await prisma.tradeMvpzShare.update({
      where: {
        id: createTradeMvpzShare.id,
      },
      data: {
        share: 0,
      },
    });

    return response;
  }
};

// --------------------------- Update Tribe Logo ----------------------

const updateTribeLogo = async () => {
  const getAllTribe = await prisma.tribe.findMany();

  await Promise.all(
    getAllTribe.map(async (tribe) => {
      await prisma.tribe.update({
        where: { id: tribe.id },
        data: {
          tribeName: tribe?.tribeName?.split("&amp;")?.join(" & "),
          tribeLogo: `https://f005.backblazeb2.com/file/mvpz-other-assest/tribemascotlogo/ncaa/d1/${tribe.tribeName
            ?.split(" ")
            ?.join("")
            ?.split("&amp;")
            ?.join("&")}.png`,
        },
      });
    })
  );

  return true;
};

// --------------------------- add tribe share ----------------------

const updateEntityShare = async () => {
  const getAllEntity = await prisma.nFTEntity.findMany();

  await Promise.all(
    getAllEntity.map(async (entity) => {
      await prisma.nFTEntity.update({
        where: { id: entity.id },
        data: {
          mintMvpzShare: 100 - entity.mintAthleteShare,
          tradeMvpzShare: 7.5,
        },
      });
    })
  );

  return true;
};

const updateToTribeMemver = async () => {
  const getAllAtlete = await prisma.user.findMany({
    where: {
      role: "Athlete",
      isMascot: {
        not: true,
      },
      isMvpzAccount: {
        not: true,
      },
      isAnonymous: {
        not: true,
      },
    },
    include: {
      organisation: {
        include: {
          tribe: true,
        },
      },
    },
  });

  await Promise.all(
    getAllAtlete.map(async (athlete) => {
      if (!!athlete.currentSchool) {
        let organisation = await prisma.organisation.findFirst({
          where: {
            name: athlete.currentSchool,
          },
        });

        let getTribe = await prisma.tribe.findFirst({
          where: {
            organisationId: organisation.id,
            isPrimary: true,
          },
        });

        if (!!getTribe) {
          let findMember = await prisma.tribeMember.findFirst({
            where: {
              tribeId: getTribe.id,
              userId: athlete.id,
            },
          });

          if (!!findMember) {
            await prisma.tribeMember.update({
              where: {
                id: findMember.id,
              },
              data: {
                tribeId: getTribe.id,
                userId: athlete.id,
              },
            });
          } else {
            await prisma.tribeMember.create({
              data: {
                tribeId: getTribe.id,
                userId: athlete.id,
              },
            });
          }
        }
      }
    })
  );

  return true;
};

// -------------------------- xp factor -------------------------

const updateUserXp = async () => {
  let users = await prisma.user.findMany();

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          xp: 0,
        },
      });

      let totalXpToAdd = 0;

      // Fetch all purchase cards for the user
      let allPurchaseCard = await prisma.nFTPurchaseCard.findMany({
        where: { currentOwnerId: user?.id },
        include: { nftEntity: true },
      });

      // Process each purchase card to calculate XP
      const purchaseXpPromises = allPurchaseCard.map(async (purchaseCard) => {
        const nftEntity = purchaseCard.nftEntity;

        if (!nftEntity) {
          console.log(
            `No nftEntity found for purchase card with ID ${purchaseCard.id}`
          );
          return; // Skip processing this card if nftEntity is null or undefined
        }

        const getXPFactor = await prisma.xPFactor.findFirst({
          where:
            nftEntity.type === "Athlete"
              ? {
                  type: nftEntity.type,
                  membershipTier: nftEntity.membershipTier,
                }
              : {
                  type: nftEntity.type,
                },
        });

        if (getXPFactor) {
          totalXpToAdd += getXPFactor.factorValue;
        }
      });

      await Promise.all(purchaseXpPromises);

      // Fetch all mint cards for the user
      let allMinCard = await prisma.nFTMintCard.findMany({
        where: { currentOwnerId: user?.id },
        include: { nftEntity: true },
      });

      // Process each mint card to calculate XP
      const mintXpPromises = allMinCard.map(async (minCard) => {
        const nftEntity = minCard.nftEntity;

        if (!nftEntity) {
          console.log(`No nftEntity found for mint card with ID ${minCard.id}`);
          return; // Skip processing this card if nftEntity is null or undefined
        }

        const getXPFactor = await prisma.xPFactor.findFirst({
          where:
            nftEntity.type === "Athlete"
              ? {
                  type: nftEntity.type,
                  membershipTier: nftEntity.membershipTier,
                }
              : {
                  type: nftEntity.type,
                },
        });

        if (getXPFactor) {
          totalXpToAdd += getXPFactor.factorValue;
        }
      });

      await Promise.all(mintXpPromises);

      // Update the user's XP once all calculations are complete
      if (totalXpToAdd > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            xp: user.xp + totalXpToAdd,
          },
        });
      }
    })
  );
};

// ------------------------- post -------------------

const addTribePost = async () => {
  const tribe = await prisma.tribe.findMany();
  const response = await Promise.all(
    tribe.map(async (item, idx) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            isMvpzAccount: true,
          },
        });

        await prisma.tribePost.create({
          data: {
            message: `<strong>🎉🎊 Hey MVPz, check out the tribes! 🎊🎉</strong></br>${item?.tribeName} has just been added to the platform!<br/><br/>JOIN THE COMMUNITY, CONNECT WITH ATHLETES, AND SHOW YOUR SUPPORT!`,
            tribeId: item?.id,
            userId: user?.id,
          },
        });
      } catch (error) {
        console.error(`Error creating data at index ${idx}:`, error);
        return null; // Log and skip if there's an error
      }
    })
  );
};

const updateDetails = async () => {
  let majorEnhancements = await prisma.nFTMajorEnhancement.findMany({
    select: {
      id: true,
      cardNFTImage: true,
      nftEntity: {
        select: {
          athlete: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    majorEnhancements.map(async (majorEnhancement) => {
      if (majorEnhancement.cardNFTImage.includes("//")) {
        let url = majorEnhancement.cardNFTImage.split("//");

        if (!majorEnhancement.nftEntity?.athlete?.username) return; // Ensure username exists

        let newUrl = `${url[0]}/${majorEnhancement.nftEntity.athlete.username}/${url[1]}`;

        await prisma.nFTMajorEnhancement.update({
          where: {
            id: majorEnhancement.id,
          },
          data: {
            cardNFTImage: newUrl,
          },
        });
      }
    })
  );
};

const createAvatar = async () => {
  const avatars = await prisma.avatars.findMany({
    include : {
      nftEntity : {
        include : {
          athlete : true
        }
      },
      tribe : true,
    }
  });

  await Promise.all(
    avatars.map(async (ava) => {

      let type = await prisma.majorEnhancementType.create({
        data : {
          type : "ATHLETE_PERSONALIZATIONS",
          subType : "TEAM_ADD"
        }
      })

      await prisma.nFTMajorEnhancement.create({
        data: {
         nftEntityId : ava.nftEntity.id,
         title : ava.nftEntity.title,
         avatarsId : ava.id,
         typeId : type.id,
         ver :1,
         cardNFTImage : `/entities/prod/${ava.nftEntity.athlete.username}/nft_${ava.nftEntity.membershipTier}_${ava.nftEntity.design?.split(" ")?.join("-")}.png`,
         isBaseCard : true,
         duration :"PERMANENT"
        }
      });
    })
  );
};



const updateDetails0 = async () => {
  let users = await prisma.user.findMany();

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    users.map(async (user) => {
      // Update only if the username is modified
      await prisma.user.update({
        where: { id: user.id },
        data: { username: "@" + user?.email?.split("@")[0] },
      });
    })
  );
};

const updateDetails1 = async () => {
  let users = await prisma.user.findMany();

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    users.map(async (user) => {
      // Update only if the username is modified
      await prisma.user.update({
        where: { id: user.id },
        data: {
          profileImage: user?.profileImage?.includes("https://")
            ? user?.profileImage
            : `/user-profiles/prod/${user?.username}/profile.png`,
          bannerImage: user?.bannerImage?.includes("https://")
            ? user?.bannerImage
            : `/user-profiles/prod/${user?.username}/banner.png`,
          verticalImage: user?.profileImage?.includes("https://")
            ? user?.profileImage
            : `/user-profiles/prod/${user?.username}/profile.png`,
        },
      });
    })
  );
};

const updateDetails12 = async () => {
  let tribes = await prisma.tribe.findMany({
    include: {
      organisation: true,
    },
  });

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    tribes.map(async (tribe) => {
      let tribeId = `@${tribe.organisation?.shortName
        ?.toLowerCase()
        ?.split(" ")
        ?.join("_")}`;
      let tribeShortName = tribe.organisation?.shortName;
      let tribeName = tribe.organisation.name;

      // Update only if the username is modified
      await prisma.tribe.update({
        where: { id: tribe.id },
        data: { tribeId, tribeShortName, tribeName },
      });
    })
  );
};

const updateDetails13 = async () => {
  let tribes = await prisma.tribe.findMany({
    include: {
      organisation: true,
    },
  });

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    tribes.map(async (tribe) => {
      let tribeMascotLogo = `/tribes/prod/${tribe.tribeId}/tribeMascotLogo.png`;
      let tribeLogo = `/tribes/prod/${tribe.tribeId}/tribeLogo.png`;
      let tribeVerticalBanner = `/tribes/prod${tribe.tribeId}/tribeVerticalBanner.png`;
      let tribeHorizontalBanner = `/tribes/prod/${tribe.tribeId}/tribeHorizontalBanner.png`;

      // Update only if the username is modified
      await prisma.tribe.update({
        where: { id: tribe.id },
        data: {
          tribeMascotLogo,
          tribeLogo,
          tribeVerticalBanner,
          tribeHorizontalBanner,
        },
      });
    })
  );
};

const updateDetails14 = async () => {
  let posts = await prisma.tribeShout.findMany({
    include: {
      media: true,
    },
  });

  // Use Promise.all to handle async updates in parallel
  await Promise.all(
    posts.map(async (post) => {
      if (!post.media || post.media.length === 0) return;

      let mediaHtml = post.media
        .map(
          (m, idx) =>
            `<br/> <img src="https://f005.backblazeb2.com/file/mvpz-ncaa/posts/prod/post_${
              post.id
            }/${m.mediaType}/p${idx + 1}.png"/>`
        )
        .join("");

      let message = `${post.message || ""} ${mediaHtml}`;

      await prisma.tribeShout.update({
        where: {
          id: post.id,
        },
        data: {
          message,
          thumbnail: `https://f005.backblazeb2.com/file/mvpz-ncaa/posts/prod/post_${post.id}/${post.media[0].mediaType}/p1.png`,
        },
      });
    })
  );
};

const updateDetails2 = async () => {
  let nftEntitys = await prisma.nFTEntity.findMany({
    select: {
      id: true,
      cardImageNFT: true,
      athlete: {
        select: {
          username: true,
        },
      },
    },
  });

  await Promise.all(
    nftEntitys.map(async (majorEnhancement) => {
      if (majorEnhancement.cardImageNFT.includes("Crickit/Gen1/")) {
        let url = majorEnhancement.cardImageNFT.split("Crickit/Gen1/");

        if (!majorEnhancement?.athlete?.username) return;

        let newUrl = `/entities/prod/${majorEnhancement.athlete.username}/${url[0]}`;

        await prisma.nFTEntity.update({
          where: {
            id: majorEnhancement.id,
          },
          data: {
            cardImageNFT: newUrl,
          },
        });
      }
    })
  );
};

const updateDetails3 = async () => {
  let users = await prisma.user.findMany();

  await Promise.all(
    users.map(async (user) => {
      if ((user.role = "Athlete")) {
        let profileImage = `/user-profiles/prod/${user?.username}/profile.png`;
        let bannerImage = `/user-profiles/prod/${user?.username}/banner.png`;
        let verticalImage = `/user-profiles/prod/${user?.username}/vertical.png`;
        let tpProfileImage = `/user-profiles/prod/${user?.username}/transparent.png`;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            profileImage,
            bannerImage,
            verticalImage,
            tpProfileImage,
            isVerified: true,
          },
        });
      } else {
        let profileImage = `/user-profiles/prod/${user?.username}/profile.png`;
        let bannerImage = `/user-profiles/prod/${user?.username}/banner.png`;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            profileImage,
            bannerImage,
            isVerified: true,
          },
        });
      }
    })
  );
};

const updateDetails4 = async () => {
  let shouts = [
    {
      userId: "67a5c0380d9c26cff12b2056",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741793716/snapinst_txf97z.jpg",
      message: `
  
  
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741793716/snapinst_txf97z.jpg" alt="image"/>
  
  <br/>
  <article>📸<br/>
  
          `,
    },
    {
      userId: "67a5c4e60d9c26cff12b206a",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741793886/snapinst_id8fss.jpg",
      message: `
  <article>Merry Christmas everybody . Special time with family and celebrating Jesus. ❤️<article />
  <br/>
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741793886/snapinst_id8fss.jpg" alt="image"/>
  <br/>
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741793892/snapinst_a0ojwj.jpg" alt="image"/>
  <br/>
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741793900/snapinst_n78iww.jpg" alt="image"/>
  
          `,
    },

    {
      userId: "67a5c44e0d9c26cff12b2066",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741802475/snapinst_zbcokz.jpg",
      message: `
            <article>The Catch Max Million Dollar Catch final is here!<article />
  <br/>
            <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741802475/snapinst_zbcokz.jpg" alt="image"/>
  <br/>
  <article>4 catchers made it through, plus one lucky fan pulled from the crowd—all the catchers are catching for a whopping $10,000 prize! 💵<article />
  <br/>
  <article>Big shoutout to @t20vision for decking them out in fresh new T20 Flair sunglasses 😎<article />
  
  <br/>
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741802479/snapinst_wtpjyf.jpg" alt="image"/>
  <br/>
  
          `,
    },
    {
      userId: "67a5c0380d9c26cff12b2056",
      message: `
            <article>Must visit in Barbados @cafealamer18 some of the best food we ever ate 🤌
            <br/>
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741811679/snapinst_mljqdh.jpg" alt="image"/>
  
          `,
    },
    {
      userId: "67a5c4e60d9c26cff12b206a",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741811801/snapinst_zbyvhl.jpg",
      message: `
            <article>Great training week !! Body is feeling good . Prepped done before the Xmas holidays . 🏋️💨🏃🏻<article />
  <br/>
            
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741811801/snapinst_zbyvhl.jpg" alt="image"/>
  
  
          `,
    },
    {
      userId: "67a5c44e0d9c26cff12b2066",
      thumbnail:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741811801/snapinst_zbyvhl.jpg",
      message: `
        <article>  Chuffed with this review of The Showman in the new Wisden Cricket Monthly. As it says, @gmaxi_32 has a big heart and never resisted in opening it up throughout the writing process. So pleased it has been this well received. Available in all the usual places. ❤️
  
  Also nice to share the page with @felixwhite for the top job he did with @jimmya9’s book. <article />
  
  <br/>
            
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741811912/snapinst_ue9hvg.jpg" alt="image"/>
  <br/>
            
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741811908/snapinst_bbrv4w.jpg" alt="image"/>
  <br/>
            
  <img src="https://res.cloudinary.com/dv667zlni/image/upload/v1741811902/snapinst_say3hu.jpg" alt="image"/>
          `,
    },
  ];

  await Promise.all(
    shouts.map(async (shout) => {
      await prisma.tribeShout.create({
        data: {
          tribeId: "67a5af974286518cfdc84129",
          message: shout.message,
          userId: shout.userId,
          thumbnail: shout?.thumbnail,
        },
      });
    })
  );
};

const updateDetails5 = async () => {
  let tribes = await prisma.tribe.findMany();

  await Promise.all(
    tribes.map(async (tribe) => {
      let logo = `/tribes/prod/${tribe.tribeId}/logo.png`;
      let vBanner = `/tribes/prod/${tribe.tribeId}/vBanner.jpeg`;
      let hBanner = `/tribes/prod/${tribe.tribeId}/hBanner.jpeg`;
      await prisma.tribe.update({
        where: {
          id: tribe.id,
        },
        data: {
          tribeLogo: logo,
          tribeVerticalBanner: vBanner,
          tribeHorizontalBanner: hBanner,
        },
      });
    })
  );
};

const updateDetails6 = async () => {
  let users = await prisma.user.findMany();

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isMvpzAccount: false,
          isMascot: false,
          isAnonymous: false,
          isDeleted: false,
          isMvpzTestingAccount: false,
          isProfileCompleted: true,
        },
      });
    })
  );
};

const updateDetails7 = async () => {
  let updateInfos = [
    {
      id: "67a5c0380d9c26cff12b2056",
      name: "Virat Kohli",
      height: "1.75m",
      weight: "69kg",
      dob: new Date("1988-11-05"),
      nationality: "Indian",
      currentLeague: "IPL 2025",
      biography: `<h2><strong>Virat Kohli</strong></h2>
      <p>One of India's greatest batsmen, Virat Kohli is known for his aggressive batting, fitness, and leadership.</p>`,
      smallBio:
        "Indian cricket icon, former captain, and modern-day great, Virat Kohli is known for his aggressive batting and record-breaking consistency.",
    },
    {
      id: "67a5c18e0d9c26cff12b205c",
      name: "Saurabh Netravalkar",
      height: "1.80m",
      weight: "78kg",
      dob: new Date("1991-10-16"),
      nationality: "Indian-American",
      currentLeague: "MLC 2025",
      biography: `<h2><strong>Saurabh Netravalkar</strong></h2>
      <p>Left-arm pacer and software engineer, Saurabh represents the USA in international cricket.</p>`,
      smallBio:
        "A left-arm pacer and software engineer, Netravalkar played for India U-19 before moving to the USA.",
    },
    {
      id: "67a5c2ab0d9c26cff12b2060",
      name: "Pat Cummins",
      height: "1.92m",
      weight: "89kg",
      dob: new Date("1993-05-08"),
      nationality: "Australian",
      currentLeague: "IPL 2025",
      biography: `<h2><strong>Pat Cummins</strong></h2>
      <p>Australia's pace spearhead and captain, Cummins is known for his lethal bowling and composed leadership.</p>`,
      smallBio:
        "Australia’s premier fast bowler and captain, Cummins leads with pace, precision, and a calm mindset.",
    },
    {
      id: "67a5c38f0d9c26cff12b2063",
      name: "Travis Head",
      height: "1.79m",
      weight: "75kg",
      dob: new Date("1993-12-29"),
      nationality: "Australian",
      currentLeague: "BBL 2025",
      biography: `<h2><strong>Travis Head</strong></h2>
      <p>A dynamic left-handed batsman, Head plays a crucial role in Australia's middle order.</p>`,
      smallBio:
        "An aggressive left-handed batsman, Head has been vital for Australia with impactful performances in Tests and ODIs.",
    },
    {
      id: "67a5c44e0d9c26cff12b2066",
      name: "Glenn Maxwell",
      height: "1.82m",
      weight: "73kg",
      dob: new Date("1988-10-14"),
      nationality: "Australian",
      currentLeague: "IPL 2025",
      biography: `<h2><strong>Glenn Maxwell</strong></h2>
      <p>A destructive all-rounder, Maxwell is known for his explosive batting, sharp off-spin, and game-changing fielding.</p>`,
      smallBio:
        "One of the most explosive all-rounders in cricket, Maxwell is known for his innovative stroke play and electric fielding.",
    },
    {
      id: "67a5c4e60d9c26cff12b206a",
      name: "Faf du Plessis",
      height: "1.78m",
      weight: "79kg",
      dob: new Date("1984-07-13"),
      nationality: "South African",
      currentLeague: "SA20 2025",
      biography: `<h2><strong>Faf du Plessis</strong></h2>
      <p>One of South Africa's most dependable batsmen, Faf has been a leader on and off the field.</p>`,
      smallBio:
        "A stylish and resilient batsman, Faf led South Africa with great determination, becoming one of their most dependable players.",
    },
    {
      id: "67a5c5710d9c26cff12b206d",
      name: "Rashid Khan",
      height: "1.70m",
      weight: "70kg",
      dob: new Date("1998-09-20"),
      nationality: "Afghan",
      currentLeague: "IPL 2025",
      biography: `<h2><strong>Rashid Khan</strong></h2>
      <p>Afghanistan's cricketing superstar, Rashid is one of the world's best T20 spinners.</p>`,
      smallBio:
        "A global T20 sensation, Rashid is one of the best leg-spinners in the world, playing a crucial role in Afghanistan’s rise.",
    },
    {
      id: "67a5c6740d9c26cff12b2073",
      name: "Rachin Ravindra",
      height: "1.79m",
      weight: "74kg",
      dob: new Date("1999-11-18"),
      nationality: "New Zealander",
      currentLeague: "IPL 2025",
      biography: `<h2><strong>Rachin Ravindra</strong></h2>
      <p>A promising all-rounder from New Zealand, Rachin has showcased his talent in both batting and spin bowling.</p>`,
      smallBio:
        "A rising all-rounder from New Zealand, Rachin brings solid left-handed batting and spin bowling.",
    },
    {
      id: "67a5c7260d9c26cff12b2076",
      name: "Liam Plunkett",
      height: "1.91m",
      weight: "90kg",
      dob: new Date("1985-04-06"),
      nationality: "English",
      currentLeague: "T20 Blast 2025",
      biography: `<h2><strong>Liam Plunkett</strong></h2>
      <p>A key part of England's 2019 World Cup-winning squad, Plunkett was known for his fast bowling.</p>`,
      smallBio:
        "A World Cup-winning pacer for England, Plunkett specialized in middle-overs bowling with pace and variations.",
    },
  ];

  await Promise.all(
    updateInfos.map(async (user) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          height: user?.height,
          weight: user?.weight,
          dob: user?.dob,
          nationality: user?.nationality,
          biography: user?.biography,
          bio: user?.smallBio,
          sex: "Male",
          currentLeague: user?.currentLeague,
        },
      });
    })
  );
};

const updateDetails8 = async () => {
  let avatars = await prisma.avatars.findMany({});

  await Promise.all(
    avatars.map(async (avatar) => {
      let tribe = await prisma.tribe.findFirst({
        where: {
          tribeShortName: avatar.title,
        },
      });
      await prisma.avatars.update({
        where: {
          id: avatar.id,
        },
        data: {
          tribeId: tribe?.id,
        },
      });
    })
  );
};

const updateDetails9 = async () => {
  await prisma.tribeShout.updateMany({
    where: {
      id: {
        in: [
          "67c59ba87b729241dcbc03d6",
          "67c59ba87b729241dcbc03d7",
          "67c59ba97b729241dcbc03d8",
          "67c59ba97b729241dcbc03d9",
        ],
      },
    },
    data: {
      isMemberOnly: false,
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  try {
    //
    let response = await createAvatar();
    //
    /// ------------------ update userXp --------------

    // let response = await addTribePost();

    // let response = await updateUserXp();

    // ------------------ tribeMember --------------
    // let response = await updateToTribeMemver();
    // ------------------- tribe logo -------------
    // let response = await  updateTribeLogo()
    // ------------------- Entity Shares -------------
    // let response = await updateEntityShare()
    // let response = await  updateTribeLogo()
    // ------------------- create TradeSellingStartPrice -------------
    // let response = handleTradeStratingPrice()
    // ------------------- create TradeMvpzShare -------------------
    // let response = handleTradeMvpzShare()
    // ------------------  create stripe account ---------------
    // let users = await prisma.user.findMany({
    //   skip : 0,
    //   take : 10
    // })
    // users?.length > 0 && users?.map(async (_) => {
    //   await createStripeAccount(_)
    // })
    // ------------------ ******** -----------------------------
    // let getWithdEnable  = await prisma.enableWithdraw.findFirst()
    // let reponse
    // if(!getWithdEnable){
    //   reponse=  await prisma.enableWithdraw.create({
    //     data : {
    //       isEnable : false
    //     }
    //   })
    // }else{
    //   reponse = await prisma.enableWithdraw.update({
    //     where : {
    //       id : getWithdEnable.id
    //     },
    //     data : {
    //       isEnable : false
    //     }
    //   })
    // }
    // ------------------- add balance to stripe -----------------------------
    // let response = stripe.charges.create({
    //   amount: 10000000, // Amount in cents ($100.00)
    //   currency: "usd",
    //   source: "tok_bypassPending", // Test token that simulates successful payment
    //   description: "Adding test funds to balance",
    // });
    // console.log({response});
    // --------------------- add withdraw access type -----------------------------
    // let repose = await prisma.earningWithdrawAccess.findFirst()
    // if(!repose){
    //   await prisma.earningWithdrawAccess.create({
    //     data : {
    //       type : "instant"
    //     }
    //   })
    //   return res.status(200).json({success : true})
    // }
    // await prisma.earningWithdrawAccess.update({
    //   where:{
    //     id : repose.id
    //   },
    //   data : {
    //     type : "instant"
    //   }
    // })
    // return res.status(200).json({success : true})
    // ------------------- stripe charge fees -----------------------------
    // let repose = await prisma.stripeCharges.findFirst();
    // if (!repose) {
    //   await prisma.stripeCharges.create({
    //     data: {
    //       paymentSuccessCharge: 0.3,
    //       transactionCharge: 3,
    //     },
    //   });
    // } else {
    //   await prisma.stripeCharges.update({
    //     where: {
    //       id: repose.id,
    //     },
    //     data: {
    //       paymentSuccessCharge: 0.3,
    //       transactionCharge: 3,
    //     },
    //   });
    // }
    // return res.status(200).json({ success: true });
    // ------------------- card -----------------------------
    // const ath = await prisma.user.findMany({
    //   where : {
    //     role : "Athlete"
    //   }
    // })
    // ath.map(async (_) => {
    //   await handleCreateCardPayOut(_.id)
    // })
    // await handleCreateCardPayOut("678a5b87689d74d0e65c2088")
    // return res.status(200).json({ success: true });
    // ------------------- tips -----------------------------
    // const allUser = await prisma.user.findMany();
    // allUser.map(async (user) => {
    //  await handleCreateTipPayout(user)
    // });
    // -------------------  refferal -----------------------------
    // const allReferrals = await prisma.payout.findMany();
    // allReferrals.map(async (payout) => {
    //   await handleReferralEarnings(payout);
    // });
    // ------------------- addlimit --------------------------
    // let stripeLimit = await prisma.stripeWithdrawPayoutLimit.create({
    //   data : {
    //     maxWithdraw : 100,
    //     minWithdraw : 20
    //   }
    // })
    // console.log({
    //   stripeLimit
    // });
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error fetching link preview:", error);
    res.status(500).json({ error: "Failed to fetch link preview." });
  }
}
