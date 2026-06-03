"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Navigation from "@/components/layout/navigation";
import Logo from "@/components/logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSignOut = () => {
    console.log("🚪 [SignOut] Logout clicked - clearing cache...");
    
    // Clear all cache dan localStorage untuk ensure clean logout
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.clear();
      console.log("✓ localStorage cleared");
      
      // Clear sessionStorage
      sessionStorage.clear();
      console.log("✓ sessionStorage cleared");
      
      // Clear all IndexedDB (jika ada)
      if (indexedDB && typeof indexedDB.databases === 'function') {
        indexedDB.databases().then((dbs) => {
          dbs.forEach((db) => {
            if (db.name) {
              indexedDB.deleteDatabase(db.name);
            }
          });
        }).catch(() => {
          // Ignore error jika browser tidak support databases API
        });
      }
    }
    
    // Sign out directly tanpa confirmation page
    signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Navigation />
          </div>

          {/* Search Bar */}    
          <div className="mx-8 hidden max-w-xs flex-1 items-center md:flex">
            <div className="relative w-full">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="focus:ring-primary w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="hover:text-primary h-6 w-6 text-gray-700 transition-colors" />
              {isMounted && itemCount > 0 && (
                <span className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="group relative">
                <Link href="#" className="relative" onClick={(e) => e.preventDefault()}>
                  <User className="hover:text-primary h-6 w-6 text-gray-700 transition-colors" />
                </Link>
                <div className="invisible absolute right-0 top-full mt-2 w-64 rounded-md border border-gray-200 bg-white py-2 shadow-lg transition-all group-hover:visible group-hover:opacity-100 opacity-0 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 break-words">{user.email}</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="hover:text-primary px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-primary text-gray-700 transition-colors">
                Home
              </Link>
              <Link href="/shopping" className="hover:text-primary text-gray-700 transition-colors">
                Shop
              </Link>
              <Link href="/about-us" className="hover:text-primary text-gray-700 transition-colors">
                About
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
