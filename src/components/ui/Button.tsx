import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "emerald" | "outline-white";
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
    "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage active:scale-[0.98] uppercase whitespace-nowrap";

  const variantStyles = {
    // Primary: Sage green - main CTA
    primary: "bg-sage text-offWhite hover:bg-sage-600 hover:shadow-lg",
    // Secondary: Outlined charcoal
    secondary: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-offWhite",
    // Emerald: Legacy support
    emerald: "bg-sage text-offWhite hover:bg-sage-600 hover:shadow-lg",
    // Outline white: For dark/sage backgrounds
    "outline-white": "border-2 border-offWhite/60 text-offWhite bg-transparent hover:bg-offWhite/10 hover:border-offWhite",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-full tracking-wide",
    md: "px-5 py-2.5 text-xs md:text-sm rounded-full tracking-wide",
    lg: "px-6 py-3 text-sm md:text-base rounded-full tracking-wide",
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
