import React from "react";
import { cn } from "../../../utils";
import type { SpinnerProps } from "./type";
import type { ClassValue } from "clsx";

const Spinner = ({ color = "default", className, ...props }: SpinnerProps) => {
  return <div className={cn("animate-spin rounded-xs", spinnerTailwindSizeMap[props.size ?? "medium"], spinnerTailwindColorMap[color], className)} />;
};

const spinnerTailwindColorMap: Record<Exclude<SpinnerProps["color"], undefined>, ClassValue> = {
  primary: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  default: "bg-white",
};

const spinnerTailwindSizeMap: Record<Exclude<SpinnerProps["size"], undefined>, ClassValue> = {
  small: "size-3",
  medium: "size-6",
  large: "size-8",
};

export default React.memo(Spinner);
