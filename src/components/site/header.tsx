import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { navItems, siteConfig } from "@/lib/site";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = navItems.map((item) => ({
    href: localePath(locale, item.href),
    label: dict.nav[item.key as keyof typeof dict.nav],
  }));
  const ctaHref = localePath(locale, "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link
          href={localePath(locale, "/")}
          className="flex shrink-0 items-center text-ink"
          aria-label={siteConfig.name}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />
          <Button href={ctaHref} size="sm" className="hidden lg:inline-flex">
            {dict.nav.cta}
          </Button>
          <MobileNav
            links={links}
            ctaLabel={dict.nav.cta}
            ctaHref={ctaHref}
            locale={locale}
            openLabel={dict.common.openMenu}
            closeLabel={dict.common.closeMenu}
          />
        </div>
      </Container>
    </header>
  );
}
