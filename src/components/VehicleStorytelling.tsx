import React, { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { Reveal, Kicker, ArrowIcon, CheckIcon } from "./ui";

interface StoryItem {
  id: string;
  label: string;
  shortTag: string;
  categoryTag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
}

const STORIES: StoryItem[] = [
  {
    id: "auction",
    label: "Auction Archives",
    shortTag: "10 Photos",
    categoryTag: "Auction Records",
    title: "Wholesale & Salvage Auction Archives",
    description: "Discover whether your automobile ever crossed an auto auction lane. Uncovering prior auction listings lets you see historical bid pricing, physical condition at the time of sale, and seller classifications.",
    highlights: [
      "Final auction bid figures and structural condition grading",
      "Run & drive status and key presence at the auction yard",
      "Title branding and collision damage documented by inspectors",
      "Auction location and consignor type (insurance, fleet, or dealer)",
      "High-resolution auction lot photography, where available",
    ],
    imageSrc: "/Auction Records.webp",
    imageAlt: "Historical Auction Sales Photos and Listing Preview",
  },
  {
    id: "sales",
    label: "Dealer Listings",
    shortTag: "Sale History",
    categoryTag: "Listing History",
    title: "Previous Online Marketplace Records",
    description: "Track where, when, and for how much this vehicle was marketed for sale over time. Analyzing historic dealer pricing trends gives you powerful leverage to set an optimal asking price.",
    highlights: [
      "Historical listing dates and geographic dealer locations",
      "Asking price recorded at each marketplace listing",
      "Odometer mileage logged when advertised for sale",
      "Consignor classifications: franchise dealer, independent, or private",
    ],
    imageSrc: "/Sales Listing.webp",
    imageAlt: "Sales Listing with Photos Preview",
  },
  {
    id: "usage",
    label: "Operational Use",
    shortTag: "Usage Type",
    categoryTag: "Usage Records",
    title: "Commercial vs. Personal Operating History",
    description: "Understanding whether your car served as a personal family commuter, rental vehicle, commercial taxi, or fleet asset provides crucial context regarding long-term component wear.",
    highlights: [
      "Standard private and family registration",
      "Commercial rental and corporate fleet deployment",
      "Taxi, ride-share, or police use",
      "Government or commercial use",
    ],
    imageSrc: "/Vehicle Usage.webp",
    imageAlt: "Vehicle Usage Records Preview",
  },
  {
    id: "ownership",
    label: "Ownership Tenure",
    shortTag: "Tenure & State",
    categoryTag: "Ownership Logs",
    title: "Chronological Ownership Timeline",
    description: "Tracing each owner's tenure illuminates the vehicle's lifespan—how many months each custodian held the title, the states where it operated, and annual mileage accrued under each driver.",
    highlights: [
      "Total number of registered titleholders",
      "Registration dates and tenure length per owner",
      "Geographic states and weather climates of operation",
      "Estimated annual miles driven per ownership chapter",
    ],
    imageSrc: "/Ownership History.webp",
    imageAlt: "Ownership History Record Preview",
  },
  {
    id: "title",
    label: "Title Integrity",
    shortTag: "60+ Checks",
    categoryTag: "Title Verification",
    title: "Multi-State Title Brand Analysis",
    description: "Prior to making a deal, confirm your title is free of damaging federal or state brands. Our automated system searches 60+ critical title categories across every US jurisdiction.",
    highlights: [
      "Salvage, rebuilt, dismantled, and junk designations",
      "Active police theft and subsequent recovery notifications",
      "Tropical storm, hurricane, and floodwater submersion records",
      "Frame damage, structural defects, fire loss, and severe hail",
      "Duplicate title alerts and lienholder verification",
    ],
    imageSrc: "/Title Brand.webp",
    imageAlt: "Title Brand Verification Preview",
  },
  {
    id: "accidents",
    label: "Collision Logs",
    shortTag: "Date & Place",
    categoryTag: "Incident Logs",
    title: "Accident & Incident History",
    description: "Review documented impact and insurance damage reports before buyers uncover them. Having zero accidents is a major selling asset; if an incident exists, transparency protects your credibility.",
    highlights: [
      "Chronological incident dates and police jurisdictions",
      "Point of impact evaluation and frame damage assessments",
      "Airbag deployment flags and insurance repair estimates",
    ],
    imageSrc: "/Accident History.webp",
    imageAlt: "Accident History Records Preview",
  },
  {
    id: "stolen",
    label: "Theft Verification",
    shortTag: "Theft Check",
    categoryTag: "Theft Verification",
    title: "National Stolen Vehicle Registry",
    description: "Ensure the vehicle has zero outstanding theft records with state law enforcement or insurance registries, confirming that clean legal title ownership can be smoothly transferred.",
    highlights: [
      "Real-time validation against FBI and NCIC stolen auto registries",
      "Verification of recovered theft status and clear title status",
      "Guarantees unambiguous ownership transfer eligibility",
    ],
    imageSrc: "/Stolen Vehicle.webp",
    imageAlt: "Stolen Vehicle Database Cross-Check Preview",
  },
  {
    id: "odometer",
    label: "Mileage Audits",
    shortTag: "Mileage Check",
    categoryTag: "Mileage Verification",
    title: "Odometer Rollback & Discrepancy Audit",
    description: "Verifying consistent mileage history is fundamental when proving vehicle value. Our system analyzes odometer recordings across state DMV titles, annual inspections, and certified mechanic shops.",
    highlights: [
      "Chronological mileage trend analysis to identify rollbacks",
      "Tampering indicators and automated discrepancy flagging",
      "Cross-validation across state motor vehicle agencies and service chains",
    ],
    imageSrc: "/Odometer Rollback.webp",
    imageAlt: "Odometer Rollback Verification Preview",
  },
  {
    id: "lien",
    label: "Lien & Security",
    shortTag: "Lender Check",
    categoryTag: "Financial Security",
    title: "Outstanding Loan & Lienholder Verification",
    description: "Before negotiating with buyers, ensure there are no active bank liens or financial encumbrances recorded against your title. Verifying clear financing prevents unexpected delays during transaction closing.",
    highlights: [
      "Active bank, credit union, and commercial lender records",
      "Confirms clear legal standing for vehicle title transfer",
      "Prevents transactional delays or disputed ownership claims",
    ],
    imageSrc: "/Loan and Lien.webp",
    imageAlt: "Loan and Lien Check Preview",
  },
];

export const VehicleStorytelling: React.FC = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>("auction");

  const currentIndex = STORIES.findIndex((s) => s.id === activeStoryId);
  const currentStory = STORIES[currentIndex] || STORIES[0];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % STORIES.length;
    setActiveStoryId(STORIES[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + STORIES.length) % STORIES.length;
    setActiveStoryId(STORIES[prevIndex].id);
  };

  return (
    <section className="py-14 sm:py-20 border-b border-line bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-line">
          <div>
            <Kicker>Vehicle Intelligence Suite</Kicker>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-fg">
              What Discoveries Lie Within Your Vehicle Dossier?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-mut leading-relaxed max-w-2xl">
              Our automated history platform consolidates multi-state title brands, odometer logs, collision damage, and wholesale auction photos into an organized, transparent record to substantiate vehicle worth.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="font-mono text-xs text-mut font-semibold uppercase tracking-[0.14em]">
              <strong className="text-lime">{currentIndex + 1}</strong> / {STORIES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Category Buttons */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-5">
          {STORIES.map((s) => {
            const isActive = activeStoryId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStoryId(s.id)}
                className={cn(
                  "px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] shrink-0 transition-all border cursor-pointer",
                  isActive
                    ? "bg-lime text-bg border-lime shadow-glow"
                    : "bg-surface border-line text-mut hover:text-fg"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Master-Detail Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Category Navigation Dock (lg:col-span-5) */}
          <div className="hidden lg:flex flex-col space-y-1.5 lg:col-span-5">
            {STORIES.map((s) => {
              const isActive = activeStoryId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStoryId(s.id)}
                  className={cn(
                    "w-full px-4 py-3.5 border text-left transition-all cursor-pointer flex items-center justify-between group hud-corners",
                    isActive
                      ? "bg-surface-2 border-lime/80 shadow-glow text-fg"
                      : "bg-surface border-line text-mut hover:border-line-2 hover:text-fg"
                  )}
                >
                  <div className="min-w-0 pr-3">
                    <p className={cn("font-display text-[14px] font-semibold truncate", isActive ? "text-lime" : "text-fg")}>
                      {s.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut truncate mt-0.5">
                      {s.categoryTag}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-[9.5px] uppercase tracking-[0.18em] px-2 py-1 shrink-0 border",
                      isActive
                        ? "border-lime/50 text-lime bg-lime/10"
                        : "border-line text-mut/70"
                    )}
                  >
                    {s.shortTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Inspector Card (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-line-2 shadow-panel hud-corners corners-on overflow-hidden">
              {/* Header Bar */}
              <div className="p-5 sm:p-6 border-b border-line">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-lime font-bold block mb-2">
                  {currentStory.categoryTag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-fg tracking-tight">
                  {currentStory.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-mut leading-relaxed">
                  {currentStory.description}
                </p>
              </div>

              {/* Image Preview Container */}
              <div className="relative w-full overflow-hidden bg-bg-2" style={{ minHeight: "360px" }}>
                <img
                  src={currentStory.imageSrc}
                  alt={currentStory.imageAlt}
                  className="w-full h-full object-contain mx-auto"
                  style={{ maxHeight: "480px" }}
                />
              </div>

              {/* Highlights List Strip */}
              <div className="p-4 sm:p-5 bg-bg-2 border-t border-line space-y-2">
                {currentStory.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-surface border border-line text-xs sm:text-[13px] text-fg/90"
                  >
                    <CheckIcon className="text-lime shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
