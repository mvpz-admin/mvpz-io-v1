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

type Cart = {
  id: string;
  productType: "pack" | "apperal" | "card";
  thumnail: string;
  title: string;
  subtitle: string;
  price: number;
  isBaseReq: boolean;
};

type CartState = {
  cart: Cart[];
  totalProd: number;
  openModel: boolean;
  addToCart: (card: Cart) => void;
  removeFromCart: (cardId: string) => void;
  clearCart: () => void;
  setOpenModel: () => void;
  setCloseModel: () => void;
  checkIdInCard: (id: string) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalProd: 0,
      openModel: false,
      addToCart: (prod) => {
        set((state) => {
          let prodList = [...state.cart, prod];
          return {
            cart: prodList,
            totalProd: prodList?.length,
            openModel: true,
          };
        });
      },
      removeFromCart: (prodId) => {
        set(() => {
          let updateList = get().cart.filter((prod) => prod.id !== prodId);
          return {
            cart: updateList,
            totalProd: updateList?.length,
            openModel: false,
          };
        });
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
