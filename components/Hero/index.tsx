import React from "react";
import Button from "../Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full h-screen p-4 flex items-center justify-center flex-col gap-8"
    >
      <h2 className="text-center max-w-screen-lg">
        Step Into the Ethereal Dimension
      </h2>
      <p className="max-w-screen-md text-center font-light">
        We’re pioneers in digital storytelling, merging art and technology to
        create unforgettable experiences. Explore our universe, where every
        interaction is designed to spark wonder.
      </p>
      <Button btnType="primary">Step Into the Portal</Button>
    </section>
  );
}
