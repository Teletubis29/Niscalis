"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsThreads, BsEnvelope } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Don't render footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiPost("/api/contact", {
        name: "Newsletter Subscriber",
        email,
        subject: "Newsletter Subscription",
        message: "User subscribed to the newsletter",
      });

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to subscribe");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="space-y-4">
              <Logo />
              <p className="text-muted-foreground mb-6 max-w-md">
                Discover premium products with exceptional quality.
                <br />
                Your satisfaction is our priority.
              </p>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Subscribe to our newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>

            {/* Social Links */}

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/niscalis.official/"
                className="hover:text-primary text-gray-400 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary text-gray-400 transition-colors">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary text-gray-400 transition-colors">
                <BsThreads className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary text-gray-400 transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t border-gray-200 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} NISCALIS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
