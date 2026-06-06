import Link from "next/link";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";
import type { BlogCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

function chip(active: boolean): string {
  return cn(
    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-ink text-paper"
      : "text-muted ring-1 ring-inset ring-line hover:text-ink hover:ring-muted",
  );
}

export function CategoryNav({
  locale,
  dict,
  categories,
  active,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: BlogCategory[];
  active?: BlogCategory;
}) {
  if (categories.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link href={localePath(locale, "/blog")} className={chip(!active)}>
        {dict.blog.allCategories}
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={localePath(locale, `/blog/category/${c}`)}
          className={chip(active === c)}
        >
          {dict.blog.categories[c]}
        </Link>
      ))}
    </div>
  );
}
