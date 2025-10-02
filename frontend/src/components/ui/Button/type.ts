import type React from "react";
import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & { size?: "small" | "medium" | "large"; icon?: React.ReactNode; iconAlign?: "left" | "right"; loading?: boolean; color?: "primary" | "danger" | "warning" | "success" | "default"; variant?: "solid" | "outline" | "link" | "text" };
