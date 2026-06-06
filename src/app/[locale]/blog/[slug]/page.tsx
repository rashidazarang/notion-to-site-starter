import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { NotionContent, NotionImage } from "notion-to-site/next";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getAllPostSlugs } from "@/lib/blog";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(locale, slug);
  if (!post) return {};
  const meta = post.frontmatter.meta;
  return buildMetadata({
    locale,
    title: meta.seo_title || meta.title,
    description: meta.description || "",
    path: `/blog/${slug}`,
    images: meta.cover_image ? [meta.cover_image] : undefined,
  });
}

function formatDate(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const post = await getPost(l, slug);
  if (!post) notFound();

  const meta = post.frontmatter.meta;
  const date = formatDate(post.frontmatter.created, l);
  const url = `${siteConfig.domain}${localePath(l, `/blog/${slug}`)}`;
  const cat = meta.category?.[0]?.toLowerCase();
  const catLabel =
    cat && cat in dict.blog.categories
      ? dict.blog.categories[cat as keyof typeof dict.blog.categories]
      : meta.main_tag;

  return (
    <article className="py-12 lg:py-16">
      <JsonLd
        data={articleJsonLd({
          title: meta.seo_title || meta.title,
          description: meta.description || "",
          url,
          datePublished: post.frontmatter.created,
          dateModified: post.frontmatter.last_updated,
          author: meta.author,
          image: meta.cover_image ? `${siteConfig.domain}${meta.cover_image}` : undefined,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${siteConfig.domain}/${l}` },
          { name: dict.blog.title, url: `${siteConfig.domain}/${l}/blog` },
          { name: meta.title, url },
        ])}
      />

      <Container className="max-w-3xl">
        <Link
          href={localePath(l, "/blog")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.blog.backToList}
        </Link>

        <header className="mt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
            {catLabel && (
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                {catLabel}
              </span>
            )}
            {catLabel && date && <span aria-hidden>·</span>}
            {date && <time>{date}</time>}
            {meta.reading_time ? (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {meta.reading_time} {dict.blog.minRead}
                </span>
              </>
            ) : null}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {meta.title}
          </h1>
          {meta.author && (
            <p className="mt-4 text-sm text-muted">
              {dict.blog.by} {meta.author}
            </p>
          )}
        </header>

        {meta.cover_image && (
          <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-line">
            <NotionImage
              src={meta.cover_image}
              alt={meta.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <NotionContent body={post.content} className="prose mt-12 max-w-none" />
      </Container>
    </article>
  );
}
