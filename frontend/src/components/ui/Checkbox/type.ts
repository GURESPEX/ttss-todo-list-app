import type { ComponentProps } from "react";

export type CheckboxProps = Omit<ComponentProps<"input">, "value" | "onChange"> & {
  value?: boolean;
  onChange: (value: CheckboxProps["value"]) => void;
};
