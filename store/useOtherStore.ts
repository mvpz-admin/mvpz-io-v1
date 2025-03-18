import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FilterStoreState = {
  athCardDisplay: any;
  setAthCardDisplay: (
    display: { id: "3x3Display" } | { id: "2x2Display" } | { id: "x2Design" }
  ) => void;
};

export const useFilterStore = create<FilterStoreState>()(
  persist(
    (set) => ({
      athCardDisplay: { id: "x2Design" }, // Default
      setAthCardDisplay: (display) => set({ athCardDisplay: display }),
    }),
    {
      name: "layout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type FeedStoreState = {
  uploading: Boolean;
  setUploading: (uploading: Boolean) => void;
  publicFeed: any;
  setPublicFeed: (post: any) => void;
  tribeFeed: any;
  setTribeFeed: (post: any) => void;
  shoutFeed: any;
  setShoutFeed: (post: any) => void;
};

export const useFeedStore = create<FeedStoreState>((set) => ({
  uploading: false,
  setUploading: (uploading) => set({ uploading }),
  publicFeed: null,
  setPublicFeed: (post) => set({ publicFeed: post }),
  tribeFeed: null,
  setTribeFeed: (post) => set({ tribeFeed: post }),
  shoutFeed: null,
  setShoutFeed: (post) => set({ shoutFeed: post }),
}));
