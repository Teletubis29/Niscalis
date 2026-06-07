import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/lib/schemas"

interface CartOperationResult {
  success: boolean
  message?: string
  availableStock?: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => CartOperationResult
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => CartOperationResult
  getTotal: () => number
  getItemCount: () => number
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem): CartOperationResult => {
        // Check if stock is available
        if (newItem.stock !== undefined && newItem.stock <= 0) {
          return {
            success: false,
            message: `${newItem.name} is out of stock`,
            availableStock: 0,
          }
        }

        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)

          if (existingItem) {
            // Check if adding quantity would exceed stock
            const totalQuantity = existingItem.quantity + newItem.quantity
            const availableStock = newItem.stock ?? Infinity

            if (totalQuantity > availableStock) {
              // Return early without updating - but we need to handle this differently
              // We'll just cap the quantity to available stock
              return {
                items: state.items.map((item) =>
                  item.id === newItem.id
                    ? { ...item, quantity: availableStock, stock: newItem.stock }
                    : item,
                ),
              }
            }

            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: totalQuantity, stock: newItem.stock }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...newItem,
                quantity: Math.min(newItem.quantity, newItem.stock ?? Infinity),
              },
            ],
          }
        })

        // Validate final state
        const state = get()
        const addedItem = state.items.find((item) => item.id === newItem.id)

        if (addedItem && addedItem.stock !== undefined && addedItem.quantity > addedItem.stock) {
          return {
            success: false,
            message: `Only ${addedItem.stock} ${addedItem.name} available in stock. Cart limited to ${addedItem.stock}.`,
            availableStock: addedItem.stock,
          }
        }

        return {
          success: true,
          message: `${newItem.name} added to cart`,
        }
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity): CartOperationResult => {
        if (quantity <= 0) {
          get().removeItem(id)
          return { success: true, message: "Item removed from cart" }
        }

        // Find the item to check stock
        const item = get().items.find((item) => item.id === id)
        if (!item) {
          return { success: false, message: "Item not found in cart" }
        }

        const availableStock = item.stock ?? Infinity

        if (quantity > availableStock) {
          return {
            success: false,
            message: `Only ${availableStock} ${item.name} available in stock`,
            availableStock,
          }
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }))

        return { success: true }
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)
