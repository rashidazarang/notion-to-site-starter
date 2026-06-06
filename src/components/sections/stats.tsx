import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/i18n";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
            {dict.stats.title}
          </h2>
          <p className="mt-3 text-brand-100/70">{dict.stats.subtitle}</p>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
          {dict.stats.items.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-display text-4xl font-medium tracking-tight text-brand-300 sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm text-slate-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
