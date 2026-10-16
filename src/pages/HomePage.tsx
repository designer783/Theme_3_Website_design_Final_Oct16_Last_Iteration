import { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { SAMPLE_VEHICLES, STICKER_LINKS, Report, usd } from "../data";
import { Reveal, Kicker, SectionHead, Ticker, HBadge, Barcode, Btn, ArrowIcon, CheckIcon, LogoMark, Decode } from "../components/ui";
import { CheckoutModal } from "../components/CheckoutModal";
import { VinLookupBox } from "../components/VinLookupBox";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

const ic = "w-5 h-5";
const Icons = {
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9M7.5 5.2l9 4.8" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M3 11.5V4h7.5L21 14.5 14.5 21z" />
      <circle cx="7.6" cy="8.6" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <rect x="2.8" y="9" width="18.4" height="6" />
      <path d="M7 9v3M11 9v2.2M15 9v3M19 9v2.2" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h6A1.5 1.5 0 0 1 14 4.5V21M3.5 21h12" />
      <path d="M6.8 6.5h4.4v4H6.8zM14 10l3.2 1.5V19a1.2 1.2 0 0 0 2.4 0v-7.6L18 9.4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 2.8 20 6v6.2c0 4.6-3.4 7.6-8 9-4.6-1.4-8-4.4-8-9V6z" />
      <path d="m8.6 12 2.3 2.3 4.5-4.6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 3v18M16.5 6.8c-1-1-2.6-1.5-4.5-1.5-2.4 0-4.2 1.2-4.2 3.2 0 4.3 9 2.4 9 6.7 0 2-1.9 3.3-4.8 3.3-2 0-3.7-.6-4.7-1.7" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.6" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M6 2.8h8L19 8v13.2H6z" />
      <path d="M14 2.8V8h5M9 13h6M9 17h6" />
    </svg>
  ),
  story: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 5.5C10 3.9 7.3 3.5 4.5 3.5v14c2.8 0 5.5.4 7.5 2 2-1.6 4.7-2 7.5-2v-14c-2.8 0-5.5.4-7.5 2z" />
      <path d="M12 5.5v14" />
    </svg>
  ),
  unique: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
};

const FIND_CARDS = [
  {
    icon: Icons.gear,
    title: "Factory Assembly & Powertrain Specs",
    copy: "Verify factory-installed powertrain components including engine displacement, transmission gearing, drive wheels, and base mechanical features to write comprehensive and compelling listing descriptions.",
  },
  {
    icon: Icons.package,
    title: "Installed Options & Add-On Packages",
    copy: "Did your vehicle roll off the line with premium driver assistance, adaptive suspension, or tailored leather appointments? Unveil every package to spotlight high-value amenities.",
  },
  {
    icon: Icons.tag,
    title: "Documented Sticker Price (MSRP)",
    copy: "Review original retail window sticker numbers including line-item factory pricing for add-on gear, giving you solid leverage when establishing your fair market asking price.",
  },
  {
    icon: Icons.ruler,
    title: "Manufacturer Engineering Specs",
    copy: "Examine certified factory metrics, genuine exterior color codes, cabin trim schematics, and mechanical dimensions exactly as logged during original vehicle manufacturing.",
  },
  {
    icon: Icons.fuel,
    title: "EPA Fuel Economy Benchmarks",
    copy: "Retrieve official governmental fuel consumption figures across city, highway, and combined commutes. Verified figures instill buyer trust right in your vehicle ad.",
  },
  {
    icon: Icons.shield,
    title: "Crash Safety & Factory Warranty",
    copy: "Inspect original NHTSA/IIHS safety evaluation grades and initial warranty provisions—vital selling points if powertrain or corrosion warranties remain transferable.",
  },
];

const SELLER_CARDS = [
  {
    icon: Icons.search,
    title: "Uncover Hidden Equipment",
    copy: "Most owners miss premium factory options originally equipped on their car. Reveal dealer-installed packages, performance trims, and obscure factory enhancements.",
  },
  {
    icon: Icons.dollar,
    title: "Set an Optimal Asking Price",
    copy: "Knowing initial retail cost plus every installed factory package ensures you never underprice your vehicle or surrender profit during buyer negotiations.",
  },
  {
    icon: Icons.list,
    title: "Draft High-Converting Listings",
    copy: "Ditch repetitive vehicle descriptions. Use precise factory codes and package names that automotive enthusiasts and serious buyers actively search for online.",
  },
  {
    icon: Icons.file,
    title: "Present Hard Proof of Specs",
    copy: "Eliminate second-guessing over interior trim packages or drivetrain choices. Offer authoritative manufacturer documentation that validates every single detail.",
  },
  {
    icon: Icons.story,
    title: "Showcase Complete Provenance",
    copy: "An authentic window sticker acts as the vehicle's official birth certificate, establishing transparency from day one and boosting prospective buyer confidence.",
  },
  {
    icon: Icons.unique,
    title: "Highlight Unique Build Traits",
    copy: "No two factory orders are identical. Show prospective purchasers exactly why your specific vehicle stands out from generic competition across the market.",
  },
];

export const TIERS = [
  {
    name: "1 Sticker",
    blurb: "Generate a certified original Monroney window sticker for an individual vehicle.",
    price: "$35",
    priceNote: "one-time payment",
    popular: false,
    cta: "Get Started",
    bullets: [
      "Official Factory Monroney Window Sticker Document",
      "Line-Item Equipment & Package Pricing with MSRP",
      "Factory Powertrain & Assembly Engineering Specs",
      "Government Crash Test & EPA Economy Ratings",
      "Permanent Report Access (Never Expires in Portal)",
      "High-Resolution Print-Ready PDF Download",
      "Immediate Digital Delivery & Email Archive",
      "24/7 Dedicated Client Support Desk",
    ],
  },
  {
    name: "5 Stickers",
    per: "$10/sticker",
    blurb: "Ideal for evaluating multiple prospects or private sellers listing multiple cars.",
    price: "$50",
    priceNote: "one-time payment",
    popular: true,
    cta: "Get Started",
    bullets: [
      "5 Certified Monroney Window Stickers for Any Makes",
      "Compare Factory Equipment & MSRP Head-to-Head",
      "Detailed Line-Item Options & Add-On Packages",
      "OEM Mechanical & Assembly Blueprint Records",
      "EPA Mileage Estimates & Federal Safety Ratings",
      "Unrestricted Credits (Redeem anytime without expiration)",
      "Printable High-Definition PDF Formats",
      "Priority Concierge Support Access",
    ],
  },
  {
    name: "Unlimited Window Stickers",
    blurb: "Built for independent dealerships, wholesalers, and active automotive professionals.",
    price: "$29.99",
    priceNote: "subscription",
    popular: false,
    cta: "Subscribe",
    bullets: [
      "Unlimited Access to OEM Monroney Window Stickers",
      "Full Options Breakdown with Itemized Factory Pricing",
      "Comprehensive Mechanical & Regional Assembly Specs",
      "EPA Consumption Scores & Crash Test Ratings",
      "Lifetime Document Storage inside Dealer Portal",
      "Commercial High-Resolution Printable PDFs",
      "Instant Cloud Dashboard & Dispatch via Email",
      "Round-the-Clock Priority Technician Support",
    ],
  },
];

export function HomePage({
  onSearchVin,
  onOpenSticker,
  setSelectedPackage,
  selectedPackage,
  onNavigate,
}: {
  onSearchVin: (vin: string) => void;
  onOpenSticker: (vin: string) => void;
  setSelectedPackage: (p: string | null) => void;
  selectedPackage: string | null;
  onNavigate?: (p: Page) => void;
}) {
  const [lookupMode, setLookupMode] = useState<"vin" | "plate">("vin");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [plateState, setPlateState] = useState("CA");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [checkoutPkg, setCheckoutPkg] = useState<{
    name: string;
    price: string;
    code?: string;
  } | null>(null);

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");

    if (lookupMode === "vin") {
      const v = vin.trim().toUpperCase();
      if (!v) {
        setLookupError("Please enter a vehicle identification number.");
        return;
      }
      if (v.length < 3) {
        setLookupError("A standard VIN is between 11 and 17 characters.");
        return;
      }
      onSearchVin(v);
    } else {
      const cleanPlate = plate.trim().toUpperCase();
      if (!cleanPlate) {
        setLookupError("Please enter your license plate number.");
        return;
      }
      setIsSearchingPlate(true);
      try {
        const res = await fetch(`${SITE.appUrl}/landing/no_get_license`, {
          method: "POST",
          body: new URLSearchParams({
            email: email.trim(),
            mobile: phone.trim(),
            plate: cleanPlate,
            state: plateState,
          }),
        });
        const data = await res.json();
        if (data?.status === "success" && data.encrypted_vin) {
          const params = new URLSearchParams({
            vin: data.encrypted_vin,
            email: email.trim(),
            mobile: phone.trim(),
          });
          window.location.href = `${SITE.url}/members/vin-check/license-preview?${params.toString()}`;
          return;
        }
        setLookupError("License plate not found in database. Try looking up by VIN directly.");
      } catch {
        setLookupError("Could not connect to plate registration database. Please enter your VIN directly.");
      } finally {
        setIsSearchingPlate(false);
      }
    }
  };

  const scrollToLookup = () => document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-line grid-bg overflow-hidden">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal variant="pulse">
              <HBadge>Certified OEM Build Documentation</HBadge>
            </Reveal>
            <h1 className="mt-7 font-display text-[32px] sm:text-5xl xl:text-[54px] leading-[1.06] font-semibold tracking-tight text-fg max-w-[20ch]">
              Before You <span className="text-lime">List It</span>, Know Its Exact True Build
            </h1>
            <Reveal delay={350}>
              <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-mut">
                Your vehicle likely carries valuable factory equipment you haven't realized. Decode your 17-digit VIN to access the authentic window sticker and production build sheet—complete with line-item packages, mechanical configurations, and documented original MSRP. Never negotiate in the dark.
              </p>
            </Reveal>

            {/* Centered Embedded VIN Lookup Box */}
            <div className="mt-8 w-full">
              <VinLookupBox onSearchVin={onSearchVin} />
            </div>

            <Reveal delay={480}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["Manufacturer-Verified Data", "Rapid Cloud Generation", "Printable PDF & Web View", "Universal VIN Coverage"].map((b) => (
                  <span
                    key={b}
                    className="border border-line bg-surface/80 px-3 py-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-fg/90 flex items-center gap-2"
                  >
                    <CheckIcon className="text-lime shrink-0" />
                    <span className="leading-tight">{b}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="relative">
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="relative border border-line-2 bg-surface shadow-panel hud-corners corners-on">
                <div className="flex items-center justify-between border-b border-line bg-bg-2 px-4 py-3">
                  <span className="flex items-center gap-2.5 text-fg">
                    <LogoMark size={22} invert />
                    <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-mut">Window Sticker · Build Sheet</span>
                  </span>
                  <span className="font-mono text-[9px] text-lime">NO. 001</span>
                </div>
                <div className="scanline">
                  <img
                    src="https://digitalbuildsheetsep282026.vercel.app/window-sticker-hero.webp"
                    alt="Original Window Sticker and Build Sheet Preview"
                    className="w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5 border-t border-line">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mut">Monroney Act Label · EPA Rated</span>
                  <Barcode className="!text-line-2" label="SHEET-001" />
                </div>
              </div>
              <div className="absolute -left-4 sm:-left-10 top-16 border border-lime/40 bg-bg-2/95 backdrop-blur px-3.5 py-2.5 shadow-glow">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mut">MSRP Documented</p>
                <p className="font-display text-lg font-semibold text-lime">$103,190</p>
              </div>
              <div className="absolute -right-3 sm:-right-8 bottom-20 border border-line-2 bg-bg-2/95 backdrop-blur px-3.5 py-2.5">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mut">VIN Decoded</p>
                <p className="font-mono text-[11px] font-semibold text-cyan tracking-[0.08em]">WAUFFAFC·5HN·7408</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Ticker items={["OEM-Certified Engineering", "Instant Cloud PDF", "High-Resolution Assets", "Universal VIN Support", "Documented Original MSRP"]} />
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
          <div className="self-start">
            <SectionHead
              index="01"
              kicker="What's Contained on Your Window Sticker"
              title="Unlock Your Vehicle's Genuine Assembly Line Specs"
              lede="Every vehicle leaves the factory with an individualized array of optional packages and mechanical specifications. An authentic Monroney window sticker proves its authentic origins and exact factory DNA."
            />
            <Reveal delay={200} className="mt-9 hidden lg:flex items-center gap-6">
              <Barcode className="!text-line-2" label="REF: MON-1984" />
              <HBadge tone="cyan">Monroney Compliant</HBadge>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5">
            {FIND_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="h-full">
                <article className="group h-full border border-line bg-surface p-5 flex flex-col gap-4 hud-corners transition-all duration-300 hover:-translate-y-1 hover:border-line-2">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-line-2 text-mut transition-colors group-hover:text-lime group-hover:border-lime/60">
                      {c.icon}
                    </span>
                    <span className="font-mono text-[9.5px] text-mut/70">SEC_{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display text-[15.5px] font-semibold leading-tight tracking-tight text-fg">{c.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-mut">{c.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE BUILD DOCUMENTATION */}
      <section id="sample-docs" className="border-b border-line bg-bg-2/50 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <SectionHead
            index="02"
            kicker="Database Demonstration Records"
            title="Inspect Real OEM Documentation Records"
            lede="Explore the sample window stickers below to examine how comprehensive factory build records look for your vehicle prior to generating your document."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-4 items-stretch">
            {SAMPLE_VEHICLES.map((v, i) => (
              <Reveal key={v.vin} delay={i * 90} className="h-full">
                <SampleCard v={v} onOpenSticker={onOpenSticker} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSIC & OLDER + SELLERS (lime band) */}
      <section className="border-b border-line bg-lime text-doc-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <Kicker tone="ink">Enthusiast &amp; Vintage Vehicle Archives</Kicker>
              <Reveal variant="feed" delay={100}>
                <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.03] font-semibold tracking-tight text-doc-ink">Capture Your Car's Full Value</h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-doc-ink/75">
                  When dealing with collector models, sports packages, and older generations, authentic build sheets are nearly impossible to track down. Untold numbers of private owners sell their vehicles unaware of rare option packages, surrendering thousands in equity. An official window sticker confirms every factory option so you can price and negotiate with ironclad assurance.
                </p>
              </Reveal>
              <Reveal delay={340}>
                <blockquote className="mt-9 border-l-4 border-doc-ink pl-6 relative">
                  <svg viewBox="0 0 24 24" className="absolute -left-3 -top-3 h-7 w-7 bg-lime p-1.5 text-doc-ink" fill="currentColor" aria-hidden="true">
                    <path d="M4 6h7v7H7c0 2.2 1.3 3.5 4 4v3c-4.6-.6-7-3.4-7-8.4zM13 6h7v7h-4c0 2.2 1.3 3.5 4 4v3c-4.6-.6-7-3.4-7-8.4z" />
                  </svg>
                  <p className="font-display text-xl sm:text-[23px] font-semibold leading-snug text-doc-ink">
                    &ldquo;You cannot accurately value an automobile without knowing its exact original factory spec. Authentic documentation is your greatest advantage.&rdquo;
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 border-2 border-doc-ink px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                    <span className="h-1.5 w-1.5 bg-doc-ink" aria-hidden="true" /> Official Factory Heritage
                  </span>
                </blockquote>
              </Reveal>
            </div>

            <div>
              <Kicker tone="ink">Built for Vehicle Sellers</Kicker>
              <Reveal variant="feed" delay={100}>
                <h2 className="mt-4 font-display text-2xl sm:text-4xl leading-[1.08] font-semibold tracking-tight text-doc-ink">Why Invest in Official Documentation?</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 max-w-lg text-[15px] font-medium leading-relaxed text-doc-ink/85">
                  The more certified facts you present, the more confident buyers become in paying top dollar.
                </p>
              </Reveal>
              <div className="mt-7 grid sm:grid-cols-2 gap-3.5">
                {SELLER_CARDS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 60} className="h-full">
                    <article className="group h-full border-2 border-doc-ink/70 bg-lime p-5 flex flex-col gap-3.5 transition-all duration-300 hover:bg-doc hover:border-doc-ink">
                      <span className="flex h-10 w-10 items-center justify-center border-2 border-doc-ink/50 text-doc-ink group-hover:border-doc-ink transition-colors">
                        {c.icon}
                      </span>
                      <div className="mt-auto">
                        <h3 className="font-display text-[15px] font-semibold tracking-tight text-doc-ink">{c.title}</h3>
                        <p className="mt-2 text-[12.5px] leading-relaxed text-doc-ink/70">{c.copy}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              index="03"
              kicker="Flexible Credit Bundles"
              title="Transparent, Upfront Pricing"
              lede="Pick the volume tier suited to your vehicle project. Credits carry zero expiration limits—unlock vehicle documentation whenever your transaction requires it."
            />
            <Reveal delay={150} className="hidden md:block">
              <Barcode className="!text-line-2" label="CREDITS NEVER EXPIRE" />
            </Reveal>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-4 items-stretch">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    "relative h-full flex flex-col border transition-all duration-300",
                    t.popular ? "border-lime/80 bg-surface shadow-glow lg:-translate-y-2" : "border-line bg-surface/70 hover:border-line-2 hover:-translate-y-1"
                  )}
                >
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime border border-lime px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-bg whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <div className={cn("px-6 pt-7 pb-5 border-b border-line", t.popular && "bg-lime/5")}>
                    {t.per && <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">{t.per}</p>}
                    <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight text-fg">{t.name}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-mut">{t.blurb}</p>
                    <div className="mt-5 flex items-baseline gap-2.5">
                      <span className={cn("font-display text-4xl font-semibold tracking-tight", t.popular ? "text-lime" : "text-fg")}>{t.price}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut/80">{t.priceNote}</span>
                    </div>
                  </div>
                  <ul className="flex-1 px-6 py-5 space-y-2.5">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[13px] leading-snug text-fg/80">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-line-2 bg-bg-2">
                          <CheckIcon className="text-lime w-2.5 h-2.5" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-6">
                    <Btn
                      variant={t.popular ? "lime" : "solid"}
                      className="w-full"
                      onClick={() => {
                        setSelectedPackage(t.name);
                        setCheckoutPkg({
                          name: t.name,
                          price: t.price,
                          code: t.name.toLowerCase().includes("unlimited")
                            ? "BUILDSHEETSTICKERSTUN"
                            : t.name.includes("5")
                            ? "BUILDSHEETSTICKERST2"
                            : "BUILDSHEETSTICKERST1",
                        });
                      }}
                    >
                      {t.cta}
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-3.5">
            {[
              { t: "Permanent Credit Balance", c: "Lock in bundle discounts now and decode vehicles anytime down the road." },
              { t: "Instant Web & PDF Output", c: "Instantly create high-definition window stickers and vehicle dossiers ready for buyers." },
              { t: "Federal & State Certified", c: "Direct integrations with NMVTIS registry, 50-state motor vehicle agencies, and factory databases." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="h-full border border-line bg-surface/70 px-5 py-4 flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="font-display text-[14px] font-semibold text-fg">{f.t}</h4>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-mut">{f.c}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / VIN LOOKUP */}
      <section id="vin-lookup-container" className="relative bg-bg-2 grid-bg overflow-hidden scroll-mt-24">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <Reveal variant="pulse" className="flex justify-center">
            <HBadge>Instant Verification Console</HBadge>
          </Reveal>
          <h2 className="mt-7 font-display text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-tight text-fg">
            <Decode text="What Factory Options Are On Your Car?" delay={150} />
          </h2>
          <Reveal delay={300}>
            <p className="mt-5 text-base sm:text-lg text-mut">Enter any 17-digit VIN below to retrieve its certified OEM window sticker.</p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10 mx-auto max-w-2xl text-left">
              <VinLookupBox onSearchVin={onSearchVin} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Checkout Modal when triggered */}
      {checkoutPkg && (
        <CheckoutModal
          pkgName={checkoutPkg.name}
          pkgPrice={checkoutPkg.price}
          pkgCode={checkoutPkg.code}
          onClose={() => setCheckoutPkg(null)}
          onSuccess={(vinCode) => {
            setCheckoutPkg(null);
            if (vinCode) onSearchVin(vinCode);
          }}
        />
      )}
    </>
  );
}

function SampleCard({ v, onOpenSticker }: { v: Report; onOpenSticker: (vin: string) => void }) {
  const link = STICKER_LINKS[v.vin];
  return (
    <article
      className="group h-full border border-line bg-surface flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-line-2 hover:shadow-panel cursor-pointer hud-corners"
      onClick={() => {
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        } else {
          onOpenSticker(v.vin);
        }
      }}
    >
      <figure className="relative border-b border-line overflow-hidden">
        <img
          src={v.imageUrl}
          alt={`${v.year} ${v.make} ${v.model}`}
          loading="lazy"
          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/70 to-transparent" aria-hidden="true" />
        <span className="absolute top-2.5 left-2.5 bg-bg-2/90 backdrop-blur text-lime border border-lime/40 font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1">
          {v.year} · {v.make}
        </span>
      </figure>
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-display text-[17px] font-semibold tracking-tight leading-tight text-fg">
          {v.year} {v.make} {v.model}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-mut">VIN: {v.vin}</p>
        <div className="mt-4 flex items-end justify-between border-y border-dashed border-line-2/60 py-3">
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">MSRP</p>
            <p className="font-display text-xl font-semibold text-lime">{usd(v.originalMsrp)}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">Exterior</p>
            <p className="font-body text-[11.5px] font-semibold leading-tight text-fg/90">{v.exteriorColor}</p>
            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">Interior</p>
            <p className="font-body text-[11.5px] font-semibold leading-tight text-fg/90 max-w-[190px]">{v.interiorColor}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2.5">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-hud flex-1 inline-flex items-center justify-center gap-2 border border-lime/70 bg-lime/10 text-lime px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] hover:bg-lime hover:text-bg"
            >
              View Window Sticker <ArrowIcon />
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSticker(v.vin);
              }}
              className="btn-hud flex-1 inline-flex items-center justify-center gap-2 border border-lime/70 bg-lime/10 text-lime px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] hover:bg-lime hover:text-bg cursor-pointer"
            >
              View Window Sticker <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default HomePage;
