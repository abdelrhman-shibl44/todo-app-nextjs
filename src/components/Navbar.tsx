import Link from "next/link";
import React from "react";
import Image from "next/image";
const Navbar = () => {
  const Links = [
    { key: "Home", href: "/", name: "Home" },
    { key: "About", href: "/", name: "About" },
    { key: "Products", href: "/", name: "Products" },
    { key: "Contact", href: "/", name: "Contact" },
  ];
  return (
    <div className="bg-slate-200 flex items-center py-1 min-h-[var(--nav-h)]">
      <div className="container flex items-center flex-wrap justify-between gap-4">
        <Link href="/" className="flex-0">
          <h1 className="relative w-[70px] h-[70px]">
            <Image
              className="absolute object-cover"
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
            return (
              <li key={link.key} className="hover:font-semibold transition-all">
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
