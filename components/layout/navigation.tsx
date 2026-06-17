"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import NewArrivals from "@/components/sections/NewArrivals";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Men",
    href: "/category/men",
    description: "Apparel, shoes, and accessories for men."
  },
  {
    title: "Women",
    href: "/category/women",
    description: "Stylish and comfortable fashion for women."
  },
  {
    title: "Kids",
    href: "/category/kids",
    description: "Fun and functional outfits for kids of all ages."
  },
  {
    title: "Home & Living",
    href: "/category/home",
    description: "Decor, kitchenware, and lifestyle products."
  },
  {
    title: "Beauty",
    href: "/category/beauty",
    description: "Skin care, cosmetics, and grooming essentials."
  },
  {
    title: "Electronics",
    href: "/category/electronics",
    description: "Gadgets, accessories, and smart devices."
  }
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="cursor-pointer">
          <div className="mb-1 text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navigation() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <NewArrivals />
                </NavigationMenuLink>
              </li>
              <ListItem href="/shopping" title="Shopping">
                Discover a wide range of products at great prices for your everyday needs.
              </ListItem>
              <ListItem href="/properties" title="Properties">
                Discover your dream property with prime locations and competitive prices.
              </ListItem>
              <ListItem href="/photography" title="Photography">
                Upgrade your photography gear and capture every moment like a pro.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:grid-cols-2 lg:w-[550px]">
              {categories.map((category) => (
                <ListItem key={category.title} title={category.title} href={category.href}>
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quick Links</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/about-us" className="cursor-pointer">
                    <div className="font-medium">About Us</div>
                    <div className="text-muted-foreground">Learn about NISCALIS</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="cursor-pointer">
                    <div className="font-medium">All Products</div>
                    <div className="text-muted-foreground">Browse our full product catalog.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="cursor-pointer">
                    <div className="font-medium">Contact</div>
                    <div className="text-muted-foreground">Get in touch with our team for any inquiries.</div>
                  </Link>
                </NavigationMenuLink>
                {/* <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">Get inspired by our latest posts.</div>
                  </Link>
                </NavigationMenuLink> */}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
