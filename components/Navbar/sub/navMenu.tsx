"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components";
import { DotsTwo, Arrow, Bars } from "@/components/icons";
import { navLinks } from "@/data/navLinks.data";
import { cn } from "@/utils";

type NavMenuType = {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavMenu({ isNavOpen, setIsNavOpen }: NavMenuType) {
  return (
    <div className="relative mb-auto">
      <Button
        onClick={() => setIsNavOpen((prev) => !prev)}
        btnType="primary"
        className="flex items-center justify-center gap-2 w-12 h-12 !p-2 pointer-events-auto"
      >
        {/* <p>menu</p> */}
        <Bars className="size-6 text-inherit" />
        {/* <DotsTwo className="size-6 text-pri" /> */}
      </Button>
    </div>
  );
}
