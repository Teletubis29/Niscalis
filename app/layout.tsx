import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";

export const metadata: Metadata = {
  title: "Modern E-commerce Store",
  description: "A modern and responsive e-commerce website",
  generator: "v0.dev"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
