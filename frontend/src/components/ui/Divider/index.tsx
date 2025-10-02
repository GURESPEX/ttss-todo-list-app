import React from "react";
import { cn } from "../../../utils";
import type { DividerProps } from "./type";

const Divider = ({ align = "horizontal", className, ...props }: DividerProps) => {
  return <div className={cn("bg-black", align === "vertical" ? "h-full w-px" : "h-px w-full", className)} {...props} />;
};

export default React.memo(Divider);
