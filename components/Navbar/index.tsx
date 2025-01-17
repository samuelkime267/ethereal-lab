"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavMenu from "./sub/navMenu";
import { cn } from "@/utils";
import { Arrow, Logo } from "@/components/icons";
import SoundBar from "./sub/soundBar";
import { navLinks } from "@/data/navLinks.data";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-full py-4 px-4 z-[10000] pointer-events-none">
        <div className="w-full md:h-full border border-white/20 flex items-start justify-between rounded-xl nav-menu-holder relative overflow-hidden md:before:hidden">
          <div className="p-2 md:border-b border-b-white/20 md:w-full relative nav-menu-holder md:backdrop-blur-sm rounded-tl-xl overflow-hidden max-md:before:hidden">
            <Link
              href={"/"}
              className="uppercase font-medium text-xl pointer-events-auto block w-fit"
            >
              <Logo className="size-12 text-white" />
            </Link>
          </div>

          <div className="w-fit h-full flex items-center justify-center flex-row-reverse gap-2 md:flex-col md:border-l border-l-white/20 p-2 relative nav-menu-holder overflow-hidden rounded-r-xl backdrop-blur-sm max-md:before:hidden">
            <NavMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <SoundBar />
          </div>
        </div>

        <ul
          className={cn(
            "fixed top-[4.65rem] right-6 p-1.5 grid grid-cols-2 gap-1 w-72 rounded-lg duration-300 pointer-events-none opacity-0 border border-white/20 z-20 bg-bg",
            {
              "opacity-100 pointer-events-auto": isNavOpen,
            }
          )}
        >
          {navLinks.map(({ link, name }, i) => (
            <li
              key={i}
              className="w-full h-auto aspect-square bg-white/10 border border-grayLight/50 hover:bg-pri duration-300 rounded-lg"
            >
              <Link
                href={link}
                onClick={() => setIsNavOpen(false)}
                className="inline-flex flex-col p-2 w-full h-full"
              >
                <div className="flex items-center justify-between">
                  <p>0{i + 1}</p>

                  <Arrow className="size-4 rotate-45 text-white" />
                </div>
                <p className="mt-auto capitalize">{name}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setIsNavOpen(false)}
          className={cn(
            "fixed top-0 left-0 w-full h-full bg-black/30  z-10 pointer-events-none opacity-0 duration-300 backdrop-blur-sm",
            {
              "pointer-events-auto opacity-100": isNavOpen,
            }
          )}
        />
      </nav>
    </>
  );
}
