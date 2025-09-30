import { cn } from "../../../utils";
import type { ButtonProps } from "./type";

const Button = (props: ButtonProps) => {
  return (
    <button className={cn("border px-2", props.className)} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
