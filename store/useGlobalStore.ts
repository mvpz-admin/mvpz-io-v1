import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { callAPI } from "../lib/utils";

// Global Loading //

type pageLoading = {
  pageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
};

export const useGlobalPageLoading = create<pageLoading>()((set) => ({
  pageLoading: false,
  setPageLoading: (loading) => {
    set({
      pageLoading: loading,
    });
  },
}));

// Global Loading //

// Global Complete Profile //

type completeProfile = {
  step: number;
  setStep: (value: number) => void;
  profileImage: string;
  username: string;
  setUsername: (value: string) => void;
  accountType: "fan" | "athlete";
  setAccountType: (at: "fan" | "athlete") => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  dob: Date;
  setDOB: (val: Date) => void;
  gender: "Male" | "Female" | "Perfer_Not_To_Say";
  setGender: (val: "Male" | "Female" | "Perfer_Not_To_Say") => void;
  instgramId: string;
  setInstgramId: (val: string) => void;
  sport: string;
  setSport: (val: string) => void;
  position: string;
  setPositon: (val: string) => void;
  school: string;
  setSchool: (val: string) => void;
  setReset: () => void;
};

export const useCompleteProfileStore = create<completeProfile>()(
  persist(
    (set, get) => ({
      step: 1,
      setStep: (step) => {
        set({
          step,
        });
      },
      profileImage:
        "https://res.cloudinary.com/dv667zlni/image/upload/v1741680187/man_wp3pfp.png",
      username: "",
      setUsername: (username) => {
        set({
          username,
        });
      },
      accountType: "fan",
      setAccountType: (at) =>
        set({
          accountType: at,
        }),
      firstName: "",
      setFirstName: (val) =>
        set({
          firstName: val,
        }),
      lastName: "",
      setLastName: (val) =>
        set({
          lastName: val,
        }),
      dob: null,
      setDOB: (val) =>
        set({
          dob: val,
        }),
      gender: "Male",
      setGender: (val) =>
        set({
          gender: val,
        }),
      instgramId: "",
      setInstgramId: (val) =>
        set({
          instgramId: val,
        }),
      position: "",
      setPositon: (val) =>
        set({
          position: val,
        }),
      sport: "Cricket",
      setSport: (val) =>
        set({
          sport: val,
        }),
      school: "",
      setSchool: (val) =>
        set({
          school: val,
        }),
      setReset: () =>
        set({
          accountType: "fan",
          dob: null,
          firstName: null,
          gender: "Male",
          lastName: null,
          profileImage: null,
          step: 1,
          username: null,
        }),
    }),
    {
      name: "cp-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Global Complete Profile //

// Global Login Process //

type loginProcess = {
  loginModel: boolean;
  setOpenLoginModel: () => void;
  setCloseLoginModel: () => void;
};

export const useLoginProcessStore = create<loginProcess>()((set) => ({
  loginModel: false,
  setOpenLoginModel: () => {
    set({
      loginModel: true,
    });
  },
  setCloseLoginModel: () => {
    set({
      loginModel: false,
    });
  },
}));

// Global Login Process //

// Global Search Process //

type SearchItem = {
  thumbnail: string;
  title: string;
  isVerified: boolean;
  url: string;
};

type GlobalState = {
  recentSearchs: SearchItem[];
  addToRecentSearch: (item: SearchItem) => void;
  removeFromSearch: (url: string) => void;
  removeAll: () => void;
  defaultSearchList: any;
  defaultSearchLoading: boolean;
  setDefaultSearchList: () => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      recentSearchs: [],
      addToRecentSearch: (item) => {
        set((state) => {
          let updatedSearches = state.recentSearchs.filter(
            (search) => search.url !== item.url
          );

          if (updatedSearches.length >= 5) {
            updatedSearches.pop(); // Remove last item if list exceeds 5
          }

          updatedSearches.unshift(item); // Add new item at index 0

          return { recentSearchs: updatedSearches };
        });
      },

      removeFromSearch: (url) => {
        set((state) => ({
          recentSearchs: state.recentSearchs.filter(
            (search) => search.url !== url
          ),
        }));
      },
      removeAll: () => {
        set((state) => ({
          recentSearchs: [],
        }));
      },
      defaultSearchLoading: false,
      defaultSearchList: [],
      setDefaultSearchList: async () => {
        set({ defaultSearchLoading: true });
        try {
          let response = await callAPI({
            endpoint: "/v1/global",
          });

          if (!response.success) throw new Error("Failed to fetch");

          set({
            defaultSearchList: response?.data?.defaultSearchList,
            defaultSearchLoading: false,
          });
        } catch (error) {
          console.error("Error fetching default search list:", error);
          set({ defaultSearchLoading: false });
        }
      },
    }),
    {
      name: "global-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Global Search Process //

// Global Cart & Buy Process //

type cardProductBaseCard = {
  id: string;
  title: string;
  price?: number;
  image: string;
  serialNumber?: string;
};

type cardProductEnhancementCard = {
  id: string;
  title: string;
  price: number;
  image: string;
  cardType: string;
};

type cardProduct = {
  avatarId: string;
  availableBaseCard: cardProductBaseCard[];
  baseCard: cardProductBaseCard;
  cardProductEnhancementCard: cardProductEnhancementCard[];
};

type apparelProduct = {
  id: string;
  qty: number;
  size: string;
  title: string;
  thumbnail: string;
  price: number;
};

type packProduct = {};

type Cart = {
  id: string;
  productType: "pack" | "apparel" | "card";
  card?: cardProduct;
  apparel?: apparelProduct;
  pack?: packProduct;
};

type CartState = {
  cart: Cart[];
  totalProd: number;
  openModel: boolean;

  addToCartCard: (card: any) => void;
  addToCartApparel: (apparel: any) => void;
  addToCartPack: (pack: any) => void;
  removeFromCartCard: (
    avatarId: string,
    cardId: string,
    cardType: string
  ) => void;
  removeFromCartApparel: (apparelId: string) => void;
  removeFromCartPack: (packId: string) => void;
  clearCart: () => void;
  setOpenModel: () => void;
  setCloseModel: () => void;
  checkIdInCard: (id: string) => boolean;
  checkCardEnhancement: (avatarId: string, cardId: string) => boolean;
  checkCardBaseCard: (avatarId: string) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalProd: 0,
      openModel: false,
      addToCartCard: (prod) => {
        let selectedCard = prod?.card?.cardProductEnhancementCard[0];
        let existingCartItem = get().cart.find(
          (item) =>
            item.productType === "card" &&
            item.card?.avatarId === prod.card.avatarId
        );

        if (selectedCard.cardType === "Base Card") {
          if (!existingCartItem) {
            // If no cart item exists for this avatar, create new
            set((state) => ({
              cart: [
                ...state.cart,
                {
                  id: prod.id,
                  productType: "card",
                  card: {
                    avatarId: prod.card.avatarId,
                    availableBaseCard: prod.card.availableBaseCard || [],
                    baseCard: prod.card.baseCard,
                    cardProductEnhancementCard: [],
                  },
                },
              ],
            }));
          } else {
            // Update existing cart item's base card
            set((state) => ({
              cart: state.cart.map((item) =>
                item.productType === "card" &&
                item.card.avatarId === prod.card.avatarId
                  ? {
                      ...item,
                      card: {
                        ...item.card,
                        baseCard: prod.card.baseCard,
                      },
                    }
                  : item
              ),
            }));
          }
          // Open model after adding to cart
          set((state) => ({
            ...state,
            openModel: true,
            totalProd: state.totalProd + 1,
          }));
        } else {
          // Enhancement card case
          if (!existingCartItem) {
            // If no cart item exists, create new with base card and enhancement
            set((state) => ({
              cart: [
                ...state.cart,
                {
                  id: prod.id,
                  productType: "card",
                  card: {
                    avatarId: prod.card.avatarId,
                    availableBaseCard: prod.card.availableBaseCard || [],
                    baseCard: prod.card.baseCard || {},
                    cardProductEnhancementCard: [selectedCard],
                  },
                },
              ],
            }));
            set((state) => ({
              ...state,
              openModel: true,
              totalProd: state.totalProd + 2,
            }));
          } else {
            // Add enhancement to existing cart item
            set((state) => ({
              cart: state.cart.map((item) =>
                item.productType === "card" &&
                item.card.avatarId === prod.card.avatarId
                  ? {
                      ...item,
                      card: {
                        ...item.card,
                        cardProductEnhancementCard: [
                          ...item.card.cardProductEnhancementCard,
                          selectedCard,
                        ],
                      },
                    }
                  : item
              ),
            }));
            set((state) => ({
              ...state,
              openModel: true,
              totalProd: state.totalProd + 1,
            }));
          }
        }
      },
      addToCartApparel: (apparel) => {
        set((state) => ({
          cart: [...state.cart, apparel],
          openModel: true,
          totalProd: state.totalProd + 1,
        }));
      },
      addToCartPack: (pack) => {
        set((state) => ({
          cart: [...state.cart, pack],
          openModel: true,
          totalProd: state.totalProd + 1,
        }));
      },
      removeFromCartCard: (
        avatarId: string,
        cardId: string,
        cardType: string
      ) => {
        if (cardType === "Base Card") {
          // If it's a base card, remove the entire cart item
          set((state) => {
            return {
              cart: state.cart.filter(
                (item) => item.productType === "card" && item.id !== cardId
              ),
              openModel: false, // Close model after removing
            };
          });
        } else {
          // If it's an enhancement, only remove that enhancement from the array
          set((state) => ({
            cart: state.cart.map((item) => {
              if (
                item.productType === "card" &&
                item.card.avatarId === avatarId
              ) {
                return {
                  ...item,
                  card: {
                    ...item.card,
                    cardProductEnhancementCard:
                      item.card.cardProductEnhancementCard.filter(
                        (card) => card.id !== cardId
                      ),
                  },
                };
              }
              return item;
            }),
            openModel: false,
            totalProd: state.totalProd - 1, // Close model after removing
          }));
        }
      },
      removeFromCartApparel: (apparelId) => {
        set((state) => ({
          cart: state.cart.filter((prod) => prod.id !== apparelId),
          openModel: false,
          totalProd: state.totalProd - 1, // Close model after removing
        }));
      },
      removeFromCartPack: (packId) => {
        set((state) => ({
          cart: state.cart.filter((prod) => prod.id !== packId),
          openModel: false,
          totalProd: state.totalProd - 1, // Close model after removing
        }));
      },
      clearCart: () => {
        set(() => {
          return { cart: [], totalProd: 0, openModel: false };
        });
      },
      setOpenModel: () => {
        set(() => ({
          openModel: true,
        }));
      },
      setCloseModel: () => {
        set(() => ({
          openModel: false,
        }));
      },
      checkIdInCard: (prodId) => {
        return get().cart.some((prod) => prod.id === prodId);
      },
      checkCardEnhancement: (avatarId: string, cardId: string) => {
        return get().cart.some(
          (prod) =>
            prod.productType === "card" &&
            prod.card.avatarId === avatarId &&
            prod.card.cardProductEnhancementCard.some(
              (card) => card.id === cardId
            )
        );
      },
      checkCardBaseCard: (avatarId: string) => {
        return get().cart.some(
          (prod) =>
            prod.productType === "card" && prod.card.avatarId === avatarId
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type BuyState = {
  cart: Cart | null;
  openModel: boolean;
  addToBuy: (card: Cart) => void;
  setOpenModel: () => void;
  setCloseModel: () => void;
};

export const useBuyStore = create<BuyState>()((set, get) => ({
  cart: null,
  openModel: false,
  addToBuy: (prod) => {
    set(() => {
      return { cart: prod, openModel: true };
    });
  },
  setOpenModel: () => {
    set(() => ({
      openModel: true,
    }));
  },
  setCloseModel: () => {
    set(() => ({
      openModel: false,
    }));
  },
}));

// Global Cart & Buy Process //

// Fanzone Post Tip Process //

type tipPostedByProfile = {
  id: string;
  name: string;
  profileImage: string;
  isVerified: string;
};

type FanonzeTipState = {
  postedBy?: tipPostedByProfile;
  postId?: string;
  postThumbnail?: string;
  postFor?: string;
  openTipModel: boolean;
  setOpenTipModel: ({
    postedBy,
    postId,
    postThumbnail,
    postFor,
  }: {
    postedBy: tipPostedByProfile;
    postId?: string;
    postThumbnail?: string;
    postFor: string;
  }) => void;
  setCloseTipModel: () => void;
};

export const usePostTipStore = create<FanonzeTipState>()((set, get) => ({
  postedBy: null,
  postId: null,
  postThumbnail: null,
  postFor: null,
  openTipModel: false,
  setOpenTipModel: ({ postedBy, postId, postThumbnail = null, postFor }) => {
    set(() => {
      return { postedBy, postId, postThumbnail, postFor, openTipModel: true };
    });
  },
  setCloseTipModel: () => {
    set(() => ({
      postedBy: null,
      postId: null,
      postThumbnail: null,
      openTipModel: false,
    }));
  },
}));

// notification store //
interface Notification {
  id: string;
  thumbnail: string;
  title: string;
  message: string;
  isRead: boolean;
  url: string;
  notifyAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
  openModel: boolean;
  setOpenModel: () => void;
  setCloseModel: () => void;
  setFilterNotifications: (id: string) => void;
  setClearAllNotifications: () => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  setNotifications: (notifications) => set({ notifications }),
  openModel: false,
  setOpenModel: () => {
    set(() => ({
      openModel: true,
    }));
  },
  setCloseModel: () => {
    set(() => ({
      openModel: false,
    }));
  },
  setFilterNotifications: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
  setClearAllNotifications: () => {
    set(() => ({
      notifications: [],
    }));
  },
}));
