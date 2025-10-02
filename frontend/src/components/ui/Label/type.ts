import type { ComponentProps } from "react";

export type LabelProps = Omit<ComponentProps<"label">, "children"> & { label?: string; children: (id: string) => React.ReactNode };
