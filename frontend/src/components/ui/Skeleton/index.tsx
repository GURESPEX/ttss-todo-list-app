import React from "react";
import { cn } from "../../../utils";
import type { SkeletonProps } from "./type";

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={cn("h-8 animate-pulse rounded bg-slate-200", className)} {...props} />;
};

export default React.memo(Skeleton);
