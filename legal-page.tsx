import { Card } from "@/components/ui/card";

export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <div className="container-page py-10">
      <Card className="mx-auto max-w-3xl p-6 md:p-8">
        <p className="text-sm font-bold text-rose-500">MIRRORME policy</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-normal text-zinc-950">{title}</h1>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-extrabold">{section.heading}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}
