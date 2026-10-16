import React from 'react';
import { VinLookupBox } from './VinLookupBox';
import { Reveal, HBadge } from './ui';

interface HeroProps {
  onSearchVin?: (vin: string) => void;
  onOpenSample?: (vin: string) => void;
  onViewStickers?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchVin }) => {
  return (
    <section className="border-b border-line grid-bg relative overflow-hidden">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal variant="pulse">
            <HBadge>Certified Vehicle Dossier · Prior Owners, Title Brands &amp; Mileage</HBadge>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-7 font-display text-[32px] sm:text-5xl xl:text-[54px] leading-[1.06] font-semibold tracking-tight text-fg max-w-[20ch]">
              Uncover Your Car's Complete <span className="text-lime">Heritage</span> Before Selling
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-mut">
              Prior to pricing and advertising your car to the public, arm yourself with authoritative facts. Our vehicle history dossier aggregates cross-state title brands, odometer logs, collision history, and auction records—giving you verified clarity rather than speculative estimates.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 w-full">
              <VinLookupBox vinRedirectPath="/members/vin-check/preview" onSearchVin={onSearchVin} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} className="relative">
          <div className="relative max-w-md mx-auto lg:ml-auto">
            <div className="border border-line-2 bg-surface shadow-panel hud-corners corners-on overflow-hidden">
              <img
                src="/hero-image.webp"
                alt="Vehicle History Documentation Preview"
                className="w-full object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
