import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/i18n";

export function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="border-y border-line bg-paper-soft">
      <Container className="py-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {dict.trustBar.text}
        </p>
      </Container>
    </div>
  );
}
