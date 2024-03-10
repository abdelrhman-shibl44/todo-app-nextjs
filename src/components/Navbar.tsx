"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const Links = [
    { key: "home", href: "/", name: "home" },
    { key: "dashboard", href: "/dashboard", name: "dashboard" },
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
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={
                    "hover:font-semibold transition-all text-black dark:text-slate-100 " +
                    (isActive
                      ? "font-semibold border-b-2 border-black dark:border-slate-50"
                      : "font-normal")
                  }
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {session ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <>
            <Link href={"/Auth/register"}>Register</Link>
            <Link href={"/Auth/login"}>LogIn</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
