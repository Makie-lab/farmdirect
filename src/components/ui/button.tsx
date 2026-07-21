import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500": variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500": variant === "secondary",
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500": variant === "outline",
            "text-gray-700 hover:bg-gray-100 focus:ring-gray-500": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
          },
          {
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2.5": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
