import React from "react";
import { cn } from "@/utils";

type SectionProps = React.HTMLAttributes<HTMLElement>;

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full p-4 md:pt-20 md:pr-20 opacity-0", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
