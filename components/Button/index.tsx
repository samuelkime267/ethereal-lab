import { cn } from "@/utils";
import React from "react";

type btnType = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: btnType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ btnType, className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(btnType, className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
