import React, { useId } from "react";
import type { LabelProps } from "./type";
import { cn } from "../../../utils";

const Label = ({ className, label, ...props }: LabelProps) => {
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-1">
      {label ? (
        <label htmlFor="title" className={cn("text-sm font-semibold text-slate-600", className)} {...props}>
          {label}
        </label>
      ) : null}
      {props.children(id)}
    </div>
  );
};

export default React.memo(Label);
