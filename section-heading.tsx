export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? <p className="text-sm font-bold text-rose-500">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-zinc-950 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{description}</p> : null}
    </div>
  );
}
