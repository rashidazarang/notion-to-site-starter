import Link from "next/link";
import { NotionImage } from "notion-to-site/next";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";
import type { Post } from "@/lib/blog";

function formatDate(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

// Flat, editorial post card: a hairline-framed cover, a small-caps kicker, and
// a serif title that warms to the brand on hover. No heavy shadows.
export function PostCard({
  post,
  locale,
  dict,
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
}) {
  const meta = post.frontmatter.meta;
  const href = localePath(locale, `/blog/${post.slug}`);
  const date = formatDate(post.frontmatter.created, locale);
  const cat = meta.category?.[0]?.toLowerCase();
  const catLabel =
    cat && cat in dict.blog.categories
      ? dict.blog.categories[cat as keyof typeof dict.blog.categories]
      : meta.main_tag;

  return (
    <Link href={href} className="group flex flex-col">
      {meta.cover_image && (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-paper-soft ring-1 ring-line">
          <NotionImage
            src={meta.cover_image}
            alt={meta.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex items-center gap-2.5 text-xs">
        {catLabel && (
          <span className="font-semibold uppercase tracking-[0.12em] text-brand-600">
            {catLabel}
          </span>
        )}
        {catLabel && date && <span className="text-muted">·</span>}
        {date && <span className="text-muted">{date}</span>}
      </div>
      <h3 className="mt-2.5 text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brand-700">
        {meta.title}
      </h3>
      {meta.description && (
        <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted">
          {meta.description}
        </p>
      )}
      {meta.reading_time ? (
        <p className="mt-3 text-xs text-muted">
          {meta.reading_time} {dict.blog.minRead}
        </p>
      ) : null}
    </Link>
  );
}
