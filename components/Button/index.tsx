import { cn } from "@/utils";
import React from "react";

type btnType = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: btnType;
}

export default function Button({
  btnType,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(btnType, className)} {...props}>
      {children}
    </button>
  );
}
