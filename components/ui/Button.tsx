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
    "inline-flex items-center justify-center rounded-button px-6 py-3 text-sm font-semibold transition-colors";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "border border-line text-ink hover:border-accent hover:text-accent",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

/**
 * Honest stand-in for a Button when there's no real destination yet (no
 * confirmed marketplace link, no confirmed contact). Renders as a disabled
 * <button>, never a clickable "#" link.
 */
export function DisabledButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled
      className={`inline-flex cursor-not-allowed items-center justify-center rounded-button border border-line bg-paper-soft px-6 py-3 text-sm font-semibold text-ink-muted ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
