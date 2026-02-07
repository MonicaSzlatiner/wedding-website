import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "terracotta" | "outline-white";
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
  // Luxury editorial button style:
  // - 0.25s color transitions
  // - Very subtle scale on click (0.98)
  // - NO scale on hover (only color changes)
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-bold transition-colors duration-[250ms] ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta active:scale-[0.98] active:transition-transform active:duration-100 uppercase whitespace-nowrap";

  const variantStyles = {
    // Primary: Espresso background - main CTA
    primary: "bg-espresso text-white hover:opacity-90 hover:shadow-lg",
    // Secondary: Outlined espresso
    secondary: "border border-espresso/20 text-espresso hover:bg-espresso hover:text-white",
    // Terracotta: Terracotta accent outline
    terracotta: "border border-terracotta/20 text-terracotta hover:bg-terracotta hover:text-white",
    // Outline white: For dark backgrounds
    "outline-white": "border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/60",
  };

  const sizeStyles = {
    sm: "px-5 py-2 text-[10px] rounded-full tracking-[0.3em]",
    md: "px-8 py-3 text-[10px] md:text-[11px] rounded-full tracking-[0.3em]",
    lg: "px-10 py-4 text-[11px] md:text-xs rounded-full tracking-[0.3em]",
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
