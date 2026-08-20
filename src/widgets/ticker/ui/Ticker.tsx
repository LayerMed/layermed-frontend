'use client';

export interface TickerProps {
  title?: string;
  icon?: React.ReactNode;
  repeatCount?: number;
}

export const Ticker = ({
  title = 'LAYERMED',
  icon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="5" y1="8" x2="19" y2="16" />
      <line x1="5" y1="16" x2="19" y2="8" />
    </svg>
  ),

  repeatCount = 10,
}: TickerProps) => {
  const items = Array.from({ length: repeatCount });

  return (
    <section className="overflow-hidden w-screen relative left-1/2 right-1/2 -mx-[50vw] py-4 bg-primary text-white whitespace-nowrap [font-family:var(--font-space-grotesk)] my-4">
      <div className="inline-flex animate-marquee">
        <div className="inline-flex items-center">
          {items.map((_, idx) => (
            <div key={`a-${idx}`} className="inline-flex items-center gap-x-10 px-5 shrink-0 font-bold">
              <span className="text-xl uppercase tracking-wider font-black">{title}</span>
              {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
            </div>
          ))}
        </div>

        <div className="inline-flex items-center">
          {items.map((_, idx) => (
            <div key={`b-${idx}`} className="inline-flex items-center gap-x-10 px-5 shrink-0 font-bold">
              <span className="text-xl uppercase tracking-wider font-bold">{title}</span>
              {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};