import React from "react";
import { Section } from "@/components";
import { timelines } from "@/data/timelines.data";

export default function About() {
  return (
    <Section id="about" className="opacity-100">
      <div className="p-4 screen-h">
        <h2 className="uppercase mb-8 font-semibold">Our Timeline</h2>

        <div className="w-full flex flex-col items-start justify-start gap-8">
          {timelines.map(({ details, event, title, year }, i) => (
            <div
              key={i}
              className="screen-h py-4 flex items-start justify-start flex-col w-full"
            >
              <div className="flex items-start justify-between flex-row-reverse mb-auto w-full">
                <h4>{year}</h4>
                <h3 className="font-medium max-w-[50pc]">{title}</h3>
              </div>

              <div>
                <p className="text-3xl max-w-[45pc] mb-4">{event}</p>
                <ul>
                  {details.map((detail, i) => (
                    <li key={i} className="font-light max-w-[35pc] text-white">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
