import { useId } from "react";
import { cn } from "../../../utils";
import type { CheckboxProps } from "./type";

const Checkbox = ({ children, ...props }: CheckboxProps) => {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <input id={id} type="checkbox" className={cn("size-4 cursor-pointer border", props.className)} {...props} />
      <label className="select-none" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
