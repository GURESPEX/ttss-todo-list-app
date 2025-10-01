import { cn } from "../../../utils";
import type { SpinnerProps } from "./type";

const Spinner = ({ className, ...props }: SpinnerProps) => {
  return <div className={cn(className, "aspect-square animate-spin rounded-xs bg-white", "w-6", props.size === "small" && "w-3", props.size === "large" && "w-8")} />;
};

export default Spinner;
