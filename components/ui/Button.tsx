import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors";
  const variants = {
    primary: "bg-champagne-500 text-black hover:bg-champagne-400",
    secondary:
      "border border-white/15 text-bone-100 hover:border-champagne-500/60 hover:text-champagne-300",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
