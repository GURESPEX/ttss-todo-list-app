import { cn } from "../../../utils";
import type { CheckboxProps } from "./type";

const Checkbox = ({ value, onChange, children, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        onChange={(event) => {
          onChange(event.target.checked);
        }}
        checked={value}
        className={cn(props.className)}
        {...props}
      />
      {children}
    </div>
  );
};

export default Checkbox;
