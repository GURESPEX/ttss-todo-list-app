import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & { color?: "primary" | "danger" | "warning" | "success" | "default" };
