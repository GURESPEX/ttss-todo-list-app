import type { ClassValue } from "clsx";
import { cn } from "../../../utils";
import Spinner from "../Spinner";
import type { ButtonProps } from "./type";
import React from "react";

const Button = ({ size = "medium", variant = "solid", color = "default", icon, iconAlign = "right", className, loading, disabled, ...props }: ButtonProps) => {
  const loadingIcon = loading ? <Spinner color={color} size="small" /> : null;
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded transition-all select-none hover:cursor-pointer",
        buttonTailwindVariantAndColorMap[variant][color],
        buttonTailwindSizeMap[size],
        (loading || disabled) && "pointer-events-none",
        disabled && "opacity-50",
        icon && !props.children && buttonWithIconTailwindSizeMap[size],
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {iconAlign === "left" ? (!loadingIcon ? icon : loadingIcon) : null}
      {props.children}
      {iconAlign === "right" ? (!loadingIcon ? icon : loadingIcon) : null}
    </button>
  );
};

const buttonWithIconTailwindSizeMap: Record<Exclude<ButtonProps["size"], undefined>, ClassValue> = {
  large: "size-10",
  medium: "size-8",
  small: "size-6",
};

const buttonTailwindSizeMap: Record<Exclude<ButtonProps["size"], undefined>, ClassValue> = {
  large: "px-2 h-10  text-lg",
  medium: "px-2 h-8 text-md",
  small: "px-1 h-6  text-sm",
};

const buttonTailwindVariantAndColorMap: Record<Exclude<ButtonProps["variant"], undefined>, Record<Exclude<ButtonProps["color"], undefined>, ClassValue>> = {
  solid: {
    primary: "border border-transparent bg-blue-600 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
    success: "border border-transparent bg-green-600 text-green-100 hover:bg-green-500 active:bg-green-600",
    warning: "border border-transparent bg-amber-600 text-amber-100 hover:bg-amber-500 active:bg-amber-600",
    danger: "border border-transparent bg-red-600 text-red-100 hover:bg-red-500 active:bg-red-600",
    default: "border border-transparent bg-slate-600 text-slate-100 hover:bg-slate-500 active:bg-slate-600",
  },
  outline: {
    primary: "bg-blue-100 text-blue-600 border border-blue-400 hover:bg-blue-200 active:bg-blue-300",
    success: "bg-green-100 text-green-600 border border-green-400 hover:bg-green-200 active:bg-green-300",
    warning: "bg-amber-100 text-amber-600 border border-amber-400 hover:bg-amber-200 active:bg-amber-300",
    danger: "bg-red-100 text-red-600 border border-red-400 hover:bg-red-200 active:bg-red-300",
    default: "bg-slate-100 text-slate-600 border border-slate-400 hover:bg-slate-200 active:bg-slate-300",
  },
  link: {
    primary: "border border-transparent bg-transparent underline text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    success: "border border-transparent bg-transparent underline text-green-600 hover:bg-green-50 active:bg-green-100",
    warning: "border border-transparent bg-transparent underline text-amber-600 hover:bg-amber-50 active:bg-amber-100",
    danger: "border border-transparent bg-transparent underline text-red-600 hover:bg-red-50 active:bg-red-100",
    default: "border border-transparent bg-transparent underline text-slate-600 hover:bg-slate-50 active:bg-slate-100",
  },
  text: {
    primary: "border border-transparent bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    success: "border border-transparent bg-white text-green-600 hover:bg-green-50 active:bg-green-100",
    warning: "border border-transparent bg-white text-amber-600 hover:bg-amber-50 active:bg-amber-100",
    danger: "border border-transparent bg-white text-red-600 hover:bg-red-50 active:bg-red-100",
    default: "border border-transparent bg-white text-slate-600 hover:bg-slate-50 active:bg-slate-100",
  },
};

export default React.memo(Button);
