import type { ReactNode } from "react";
import { Breadcrumbs, PageGlow } from "./ui";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="relative pb-24 pt-32 sm:pt-40">
      <PageGlow />
      <div className="container-x max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: title }]} />
        <h1 className="h-section text-platinum">{title}</h1>
        <p className="mt-3 text-sm text-white/40">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/65 [&_a]:text-[#67e8f9] [&_a:hover]:underline [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}
