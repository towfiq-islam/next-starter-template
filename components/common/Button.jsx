import React from "react";
import { cn } from "@/lib/utils";

const Button = ({
  type,
  text,
  onClick,
  variant = "primary_btn",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "text-black text-lg font-bold", // Default/Common Class
        variant === "primary_btn" && "text-red-500",
        variant === "secondary_btn" && "text-green-500",
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
