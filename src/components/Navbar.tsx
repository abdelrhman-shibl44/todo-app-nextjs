"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const pathname = usePathname();

  const Links = [
    { key: "Home", href: "/", name: "Home" },
    { key: "About", href: "/About", name: "About" },
    { key: "Products", href: "/products", name: "Products" },
    { key: "Contact", href: "/Contact", name: "Contact" },
  ];
  return (
    <div className="bg-slate-200 dark:bg-slate-800 flex items-center py-1 min-h-[var(--nav-h)] relative">
      <div className="container flex items-center flex-wrap justify-between gap-4">
        <Link href="/" className="flex-0">
          <h1 className="relative w-[70px] h-[70px]">
            <Image
              className="absolute object-cover dark:backdrop-invert"
              src="/logo.webp"
              fill
              alt="logo"
              loading="eager"
              priority={true}
              sizes="100px"
            />
          </h1>
        </Link>
        <ul className="flex flex-grow md:justify-center items-center gap-12 overflow-y-auto">
          {Links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.key}
                className={
                  "hover:font-semibold transition-all text-black dark:text-slate-100 " +
                  (isActive
                    ? "font-semibold border-b-2 border-black dark:border-slate-50"
                    : "font-normal")
                }
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
