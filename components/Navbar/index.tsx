"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components";
import NavMenu from "./sub/navMenu";
import { cn } from "@/utils";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full py-4 px-4 z-[10000]">
        <div className="w-full border border-grayLight flex items-center justify-between rounded-xl p-2 bg-bg/50 backdrop-blur-sm">
          <Link href={"/"} className="uppercase font-medium text-xl">
            Ethereal Lab
          </Link>

          <div className="flex items-center justify-center gap-4">
            <Link href={"#contact"} className="hidden md:block">
              <Button btnType="primary">
                <p>contact us</p>
              </Button>
            </Link>
            <NavMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          </div>
        </div>
      </nav>
      <div
        onClick={() => setIsNavOpen(false)}
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-black/30  z-[9999] pointer-events-none opacity-0 duration-300 backdrop-blur-sm",
          {
            "pointer-events-auto opacity-100": isNavOpen,
          }
        )}
      />
    </>
  );
}
