"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components";
import { DotsTwo, Arrow } from "@/components/icons";
import { navLinks } from "@/data/navLinks.data";
import { cn } from "@/utils";

type NavMenuType = {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavMenu({ isNavOpen, setIsNavOpen }: NavMenuType) {
  return (
    <div className="relative">
      <Button
        onClick={() => setIsNavOpen((prev) => !prev)}
        btnType="secondary"
        className="flex items-center justify-center gap-2"
      >
        <p>menu</p>
        <DotsTwo className="size-6" />
      </Button>

      <ul
        className={cn(
          "absolute right-0 bottom-0 translate-y-[calc(100%+1rem)] bg-bg p-1.5 grid grid-cols-2 gap-1 w-72 rounded-lg opacity-0 duration-300 pointer-events-none border border-grayLight",
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

                <Arrow className="size-4 rotate-45" />
              </div>
              <p className="mt-auto capitalize">{name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
