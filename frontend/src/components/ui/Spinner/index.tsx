import React from "react";
import { cn } from "../../../utils";
import type { SpinnerProps } from "./type";
import type { ClassValue } from "clsx";

const Spinner = ({ color = "default", className, ...props }: SpinnerProps) => {
  return <div className={cn("aspect-square animate-spin rounded-xs", "w-6", props.size === "small" && "w-3", props.size === "large" && "w-8", spinnerTailwindColorMap[color], className)} />;
};

const spinnerTailwindColorMap: Record<Exclude<SpinnerProps["color"], undefined>, ClassValue> = {
  primary: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  default: "bg-white",
};

export default React.memo(Spinner);
