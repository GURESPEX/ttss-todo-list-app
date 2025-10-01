import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & { loading?: boolean; color?: "primary" | "danger" | "warning" | "success" | "default" };
