import React from "react";
import { Section } from "@/components";

export default function Hero() {
  return (
    <Section id="hero" className="opacity-100">
      <div className="w-full overflow-hidden screen-h flex items-center justify-center flex-col gap-4 md:p-4 pt-20">
        <p className="font-light text-right max-w-[25pc] ml-auto hero-desc">
          We’re pioneers in digital storytelling, merging art and technology to
          create unforgettable experiences. Explore our universe, where every
          interaction is designed to spark wonder.
        </p>

        <h2 className="text-left mt-auto mr-auto uppercase font-bold xl:max-w-[65pc] hero-title lg:max-w-[50pc] md:max-w-[40pc]">
          Step Into the Ethereal Dimension
        </h2>
      </div>
    </Section>
  );
}
