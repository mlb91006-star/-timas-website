import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-5 pt-16 text-center">
      <span className="font-display text-sm font-bold tracking-[0.15em] text-accent uppercase">
        404
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        Такой страницы не существует или она была перемещена.
      </p>
      <Button href="/" className="mt-8">
        На главную
      </Button>
    </section>
  );
}
