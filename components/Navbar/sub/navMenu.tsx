"use client";

import React from "react";
import { Button } from "@/components";
import { Bars } from "@/components/icons";

type NavMenuType = {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavMenu({ setIsNavOpen }: NavMenuType) {
  return (
    <div className="relative mb-auto">
      <Button
        onClick={() => setIsNavOpen((prev) => !prev)}
        btnType="primary"
        className="flex items-center justify-center gap-2 w-12 h-12 !p-2 pointer-events-auto"
      >
        <Bars className="size-6 text-inherit" />
      </Button>
    </div>
  );
}
