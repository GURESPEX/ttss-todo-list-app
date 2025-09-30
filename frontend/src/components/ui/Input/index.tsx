import { cn } from "../../../utils";
import type { InputProps } from "./type";

const Input = (props: InputProps) => {
  return <input className={cn("min-h-8 rounded border border-slate-200 px-2 outline-none placeholder:text-black/25", props.className)} {...props} />;
};

export default Input;
