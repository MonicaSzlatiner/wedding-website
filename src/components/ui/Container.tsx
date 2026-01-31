import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "content" | "wide";
}

export function Container({ children, className = "", size = "wide" }: ContainerProps) {
  const sizeClass = size === "content" ? "max-w-content" : "max-w-wide";

  return (
    <div className={`${sizeClass} mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
