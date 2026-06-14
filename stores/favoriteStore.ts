import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string | null
  source: 'shopping' | 'properties'  // Track origin
  propertyType?: string
  location?: string
  addedAt: number
}

export type FavoriteItemInput = Omit<FavoriteItem, 'addedAt'>

interface FavoriteStore {
  items: FavoriteItem[]
  addItem: (item: FavoriteItemInput) => void
  removeItem: (id: string) => void
  isFavorited: (id: string) => boolean
  getItemCount: () => number
  clearFavorites: () => void
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === newItem.id)
          if (exists) {
            return state
          }

          return {
            items: [
              ...state.items,
              {
                ...newItem,
                addedAt: Date.now(),
              },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      isFavorited: (id: string): boolean => {
        return get().items.some((item) => item.id === id)
      },

      getItemCount: () => get().items.length,

      clearFavorites: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "favorite-store",
    },
  ),
)
