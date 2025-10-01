import { cn } from "../../../utils";
import Spinner from "../Spinner";
import type { ButtonProps } from "./type";

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        "flex min-h-8 items-center justify-center gap-2 rounded px-2 transition-all select-none hover:cursor-pointer",
        "bg-slate-600 px-2 text-slate-100 hover:bg-slate-500 active:bg-slate-600",
        props.disabled && "pointer-events-none opacity-50",
        props.color === "primary" ? "bg-blue-600 px-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600" : undefined,
        props.color === "danger" ? "bg-red-600 px-2 text-red-100 hover:bg-red-500 active:bg-red-600" : undefined,
        props.color === "warning" ? "bg-amber-600 px-2 text-amber-100 hover:bg-amber-500 active:bg-amber-600" : undefined,
        props.color === "success" ? "bg-green-600 px-2 text-green-100 hover:bg-green-500 active:bg-green-600" : undefined,
      )}
      {...props}
    >
      {props.children}
      {props.loading ? <Spinner size="small" /> : null}
    </button>
  );
};

export default Button;
