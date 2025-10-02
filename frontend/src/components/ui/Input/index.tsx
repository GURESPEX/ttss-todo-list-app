import React from "react";
import { cn } from "../../../utils";
import type { InputProps } from "./type";

const Input = ({ className, ...props }: InputProps) => {
  return <input className={cn("min-h-8 rounded border border-slate-200 bg-white px-2 outline-none placeholder:text-slate-300", className)} {...props} />;
};

export default React.memo(Input);
