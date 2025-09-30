import { cn } from "../../../utils";
import type { ButtonProps } from "./type";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        "min-h-8 rounded border px-2 transition-all select-none hover:cursor-pointer",
        "border-slate-200 bg-slate-100 px-2 text-slate-600 hover:bg-slate-50 hover:text-slate-500 active:bg-slate-200 active:text-slate-700",
        props.color === "primary" ? "border-blue-200 bg-blue-100 px-2 text-blue-600 hover:bg-blue-50 hover:text-blue-500 active:bg-blue-200 active:text-blue-700" : undefined,
        props.color === "danger" ? "border-red-200 bg-red-100 px-2 text-red-600 hover:bg-red-50 hover:text-red-500 active:bg-red-200 active:text-red-700" : undefined,
        props.color === "warning" ? "border-amber-200 bg-amber-100 px-2 text-amber-600 hover:bg-amber-50 hover:text-amber-500 active:bg-amber-200 active:text-amber-700" : undefined,
        props.color === "success" ? "border-green-200 bg-green-100 px-2 text-green-600 hover:bg-green-50 hover:text-green-500 active:bg-green-200 active:text-green-700" : undefined,
        props.className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
