import { useId } from "react";
import { cn } from "../../../utils";
import type { CheckboxProps } from "./type";

const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <input id={id} type="checkbox" className={cn(className, "size-4 cursor-pointer border-none")} {...props} />
      <label className="select-none" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
