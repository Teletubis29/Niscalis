"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // URLs yang ingin disembunyikan navbarnya
  const hiddenNavbarRoutes = ["/admin", "/auth/signin", "/auth/signup"];
  
  // URLs yang ingin disembunyikan footernya
  const hiddenFooterRoutes = ["/admin", "/auth/signin", "/auth/signup"];
  
  const shouldHideNavbar = hiddenNavbarRoutes.some(route => pathname.startsWith(route));
  const shouldHideFooter = hiddenFooterRoutes.some(route => pathname.startsWith(route));

  return (
    <SessionProvider>
      {!shouldHideNavbar && <Navbar />}
      {children}
      {!shouldHideFooter && <Footer />}
    </SessionProvider>
  );
}
