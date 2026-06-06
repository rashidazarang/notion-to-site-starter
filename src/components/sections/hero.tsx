import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";

// Type-led editorial hero: a large serif statement on warm paper, calm and
// uncluttered. No stock imagery required, so it reads well for any site.
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <Container className="flex flex-col items-center py-24 text-center lg:py-32">
        <p className="eyebrow">{dict.hero.eyebrow}</p>

        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
          {dict.hero.title}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {dict.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <Button href={localePath(locale, "/contact")} size="lg">
            {dict.hero.ctaPrimary}
          </Button>
          <Link
            href={localePath(locale, "/services")}
            className="group inline-flex items-center gap-1.5 text-[0.975rem] font-medium text-ink"
          >
            {dict.hero.ctaSecondary}
            <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
