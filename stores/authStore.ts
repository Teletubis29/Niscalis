import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/schemas"

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void | Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          console.log("🔐 Login attempt:", email)
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error("Login failed")
          }

          const data = await response.json()
          console.log("✅ Login success:", data.user)
          set({ user: data.user, isLoading: false })
        } catch (error) {
          console.error("❌ Login error:", error)
          set({ isLoading: false })
          throw error
        }
      },

      signup: async (email, password, firstName, lastName) => {
        set({ isLoading: true })
        try {
          console.log("📝 [Signup] Attempting with:", { 
            email, 
            firstName, 
            lastName,
            passwordLength: password?.length,
            password: password ? "***" : "EMPTY"
          })
          
          const body = { email, password, firstName, lastName }
          console.log("📝 [Signup] Body being sent:", { 
            email, 
            firstName, 
            lastName,
            passwordLength: password?.length
          })
          
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })

          const data = await response.json()
          
          if (!response.ok) {
            console.error("❌ [Signup] API returned", response.status)
            console.error("❌ [Signup] Response:", data)
            const errorMsg = data.error || "Signup failed"
            throw new Error(errorMsg)
          }

          console.log("✅ [Signup] Success, user:", data.user?.email)
          set({ user: data.user, isLoading: false })
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Signup failed"
          console.error("❌ [Signup] Error:", errorMsg)
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        console.log("👋 [Logout] Starting AGGRESSIVE logout...");
        
        if (typeof window !== "undefined") {
          // IMPORTANT: Clear localStorage BEFORE changing state
          // This prevents Zustand persist from auto-saving the new state
          console.log("🗑️  [Logout] Clearing ALL localStorage BEFORE state change");
          
          // Get all keys first
          const allKeys = Object.keys(localStorage);
          console.log("📦 [Logout] Keys before clear:", allKeys);
          
          // Clear everything related to auth
          allKeys.forEach(key => {
            localStorage.removeItem(key);
            console.log(`   ✓ Removed: ${key}`);
          });
          
          // Also clear sessionStorage
          sessionStorage.clear();
          
          console.log("✅ [Logout] localStorage completely cleared");
          console.log("📦 [Logout] localStorage after clear:", Object.keys(localStorage));
        }
        
        // NOW set state to null AFTER localStorage is clean
        console.log("🔄 [Logout] Setting state to null");
        set({ user: null, isLoading: false });
        
        console.log("✅ [Logout] Logout complete");
      },

      checkAuth: async () => {
        // Zustand persist middleware automatically restores from localStorage
        // This function is just for explicit initialization/verification
        try {
          if (typeof window !== "undefined") {
            const stored = localStorage.getItem("auth-storage")
            if (stored) {
              const parsed = JSON.parse(stored)
              console.log("✅ [checkAuth] User state loaded from localStorage:", parsed.state?.user?.email || "no user")
            }
          }
        } catch (error) {
          console.error("❌ [checkAuth] Error reading localStorage:", error)
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: (state) => (rehydratedState, error) => {
        if (error) {
          console.error("❌ [Rehydrate] Error:", error);
          return;
        }
        
        if (rehydratedState?.user) {
          console.log("🔄 [Rehydrate] Restored user:", rehydratedState.user.email);
        } else {
          console.log("🔄 [Rehydrate] No user in storage");
        }
      },
    },
  ),
)
