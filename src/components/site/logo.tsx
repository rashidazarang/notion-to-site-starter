import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Editorial wordmark: the site name set in the serif display face with a single
 * brand-colored dot. It inherits the current text color, so it works on light
 * and dark backgrounds. Change siteConfig.name (and the dot color) to rebrand.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-xl font-medium tracking-tight",
        className,
      )}
    >
      {siteConfig.name}
      <span className="text-brand-600">.</span>
    </span>
  );
}
