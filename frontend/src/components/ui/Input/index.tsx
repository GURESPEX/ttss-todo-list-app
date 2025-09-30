import { cn } from "../../../utils";
import type { InputProps } from "./type";

const Input = ({ value, onChange, ...props }: InputProps) => {
  return (
    <input
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={cn("min-h-8", props.className)}
      {...props}
    />
  );
};

export default Input;
