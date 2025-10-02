import type { ComponentProps } from "react";

export type SpinnerProps = ComponentProps<"div"> & { color?: "primary" | "danger" | "warning" | "success" | "default"; size?: "small" | "medium" | "large" };
