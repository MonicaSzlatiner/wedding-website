import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline-white";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-600";

  const variantStyles = {
    primary: "bg-sage-600 text-white hover:bg-sage-700",
    secondary: "border border-stone-400 text-stone-700 hover:bg-stone-100",
    "outline-white": "border border-white text-white bg-transparent hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 rounded-full",
    lg: "px-8 py-4 text-lg rounded-full",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
