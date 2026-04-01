interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section>
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-12 h-px bg-stone-300"></div>
        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400">{title}</h2>
      </div>
      <div className="text-[15px] text-stone-600 leading-[1.8]">
        {children}
      </div>
    </section>
  );
}
