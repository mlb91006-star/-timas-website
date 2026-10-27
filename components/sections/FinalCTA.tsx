import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-accent-soft py-20 text-center sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {siteConfig.name}
          </h2>
          <p className="mt-3 text-ink-muted">{siteConfig.tagline}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#size-guide">Выбрать размер</Button>
            <Button href="#where-to-buy" variant="secondary">
              Где купить
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
