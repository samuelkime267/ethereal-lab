"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components";
import gsap from "gsap";

export default function SoundBar() {
  const bars = [...Array(6)];
  const [isSoundOn, setIsSoundOn] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !isSoundOn) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(buttonRef.current);
      const soundBars = q(".sound-bars");

      soundBars.forEach((el, i) => {
        gsap.to(el, {
          height: "1rem",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2,
          delay: i * 0.2,
          ease: "power2.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, [isSoundOn]);

  return (
    <Button
      ref={buttonRef}
      onClick={() => setIsSoundOn((prev) => !prev)}
      btnType="primary"
      className="border border-white/10 w-12 h-12 rounded-full bg-white/5 !p-2 group pointer-events-auto"
    >
      <div className="flex items-center justify-center gap-0.5">
        {bars.map((_, i) => (
          <div
            key={i}
            className="w-[1px] h-2 bg-white group-hover:bg-pri duration-300 sound-bars"
          />
        ))}
      </div>
    </Button>
  );
}
