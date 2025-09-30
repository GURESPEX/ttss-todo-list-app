import type { ComponentProps } from "react";

export type InputProps = Omit<ComponentProps<"input">, "value" | "onChange"> & {
  value?: string;
  onChange: (value: InputProps["value"]) => void;
};
