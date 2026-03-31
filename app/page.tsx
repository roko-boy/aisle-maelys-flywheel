"use client";

import { useEffect, useRef } from "react";

const STAGES = [
  { id: 1, icon: "🎯", label: "Paid / Creator\n/ TikTok", short: "Paid & Creator" },
  { id: 2, icon: "📱", label: "SMS\nOpt-In", short: "SMS Opt-In" },
  { id: 3, icon: "🌐", label: "Branded\nLanding Page", short: "Landing Page" },
  { id: 4, icon: "🗺️", label: "Store\nLocator", short: "Store Locator" },
  { id: 5, icon: "🛍️", label: "In-Store\nPurchase", short: "In-Store Purchase" },
  { id: 6, icon: "🧾", label: "Receipt\nVerified", short: "Receipt Verified" },
  { id: 7, icon: "✨", label: "Instant\nIncentive", short: "Instant Incentive" },
  { id: 8, icon: "📊", label: "First-Party\nData", short: "First-Party Data" },
  { id: 9, icon: "🔄", label: "Retargeting\nLoop", short: "Retargeting Loop" },
];

const RETAILERS = [
  "Ulta Beauty",
  "Ulta at Target",
  "TikTok Shop",
  "Shoppers Drug Mart",
  "Amazon",
];

const STATS = [
  { value: "< 60 sec", label: "Receipt Validation" },
  { value: "2,881+", label: "Retail Doors Covered" },
  { value: "100%", label: "Brand-Owned Data" },
];

function Flywheel() {
  const cx = 300;
  const cy = 300;
  const r = 210;
  const n = STAGES.length;

  const points = STAGES.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
    };
  });

  // Arrow paths between nodes
  const arrows = points.map((p, i) => {
    const next = points[(i + 1) % n];
    const midAngle = (p.angle + next.angle) / 2;
    const cr = r * 0.82;
    const mx = cx + cr * Math.cos(midAngle);
    const my = cy + cr * Math.sin(midAngle);
    const nodeR = 38;
    const dx1 = p.x - cx, dy1 = p.y - cy;
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const sx = p.x - (dx1 / len1) * nodeR;
    const sy = p.y - (dy1 / len1) * nodeR;
    const dx2 = next.x - cx, dy2 = next.y - cy;
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const ex = next.x - (dx2 / len2) * nodeR;
    const ey = next.y - (dy2 / len2) * nodeR;
    return { sx, sy, ex, ey, mx, my };
  });

  return (
    <div className="relative flex items-center justify-center w-full py-8">
      {/* Outer spinning ring */}
      <div
        className="absolute rounded-full border-2 border-dashed animate-spin-slow"
        style={{
          width: 560,
          height: 560,
          borderColor: "#C4626B",
          opacity: 0.25,
        }}
      />
      {/* Inner reverse ring */}
      <div
        className="absolute rounded-full border animate-spin-reverse"
        style={{
          width: 440,
          height: 440,
          borderColor: "#C9A96E",
          opacity: 0.15,
          borderStyle: "dotted",
        }}
      />

      <svg
        viewBox="0 0 600 600"
        width={580}
        height={580}
        className="relative z-10"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#C4626B" opacity="0.7" />
          </marker>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4C8C8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FAF7F4" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center glow */}
        <circle cx={cx} cy={cy} r={100} fill="url(#centerGrad)" />

        {/* Arrows */}
        {arrows.map((a, i) => (
          <path
            key={i}
            d={`M ${a.sx} ${a.sy} Q ${a.mx} ${a.my} ${a.ex} ${a.ey}`}
            fill="none"
            stroke="#C4626B"
            strokeWidth={1.8}
            strokeOpacity={0.55}
            markerEnd="url(#arrow)"
            strokeDasharray="6 3"
          />
        ))}

        {/* Stage nodes */}
        {points.map((p, i) => {
          const isEven = i % 2 === 0;
          const fill = isEven ? "#C4626B" : "#2D2D2D";
          const lines = STAGES[i].label.split("\n");
          return (
            <g key={i} filter="url(#glow)">
              <circle
                cx={p.x}
                cy={p.y}
                r={38}
                fill={fill}
                opacity={0.92}
              />
              <text
                x={p.x}
                y={p.y - (lines.length > 1 ? 8 : 3)}
                textAnchor="middle"
                fontSize={13}
                fontWeight="bold"
                fill="white"
                fontFamily="var(--font-inter)"
              >
                {STAGES[i].icon}
              </text>
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={p.x}
                  y={p.y + 8 + li * 13}
                  textAnchor="middle"
                  fontSize={9}
                  fill="white"
                  fontFamily="var(--font-inter)"
                  opacity={0.9}
                >
                  {line}
                </text>
              ))}
              {/* Stage number badge */}
              <circle cx={p.x + 26} cy={p.y - 26} r={10} fill="#C9A96E" />
              <text
                x={p.x + 26}
                y={p.y - 22}
                textAnchor="middle"
                fontSize={9}
                fontWeight="bold"
                fill="white"
                fontFamily="var(--font-inter)"
              >
                {STAGES[i].id}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={72} fill="#FAF7F4" stroke="#F4C8C8" strokeWidth={2} />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fontSize={28}
          fontWeight="bold"
          fill="#C4626B"
          fontFamily="var(--font-playfair)"
          letterSpacing="3"
        >
          AISLE
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize={8}
          fill="#2D2D2D"
          fontFamily="var(--font-inter)"
          opacity={0.6}
          letterSpacing="2"
        >
          RETAIL INTELLIGENCE
        </text>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F4", color: "#2D2D2D" }}>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #F4C8C8 0%, #FAF7F4 50%, #F9EFE8 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Brand lockup */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className="text-sm font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#C4626B", fontFamily: "var(--font-inter)" }}
            >
              MAËLYS
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "#C9A96E" }} />
            <span
              className="text-sm font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              AISLE
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#2D2D2D" }}
          >
            The Retail Intelligence Layer
            <br />
            <span style={{ color: "#C4626B" }}>for MAËLYS</span>
          </h1>

          <p
            className="text-xl md:text-2xl tracking-wide mb-10"
            style={{ color: "#2D2D2D", opacity: 0.65, fontFamily: "var(--font-inter)" }}
          >
            Convert. Attribute. Retain.
            <span className="mx-2" style={{ color: "#C9A96E" }}>·</span>
            At every store, every shelf.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm" style={{ color: "#2D2D2D", opacity: 0.5, fontFamily: "var(--font-inter)" }}>
            <span>TikTok Shop</span>
            <span style={{ color: "#C9A96E" }}>·</span>
            <span>Ulta Beauty</span>
            <span style={{ color: "#C9A96E" }}>·</span>
            <span>Ulta at Target</span>
            <span style={{ color: "#C9A96E" }}>·</span>
            <span>Shoppers Drug Mart</span>
            <span style={{ color: "#C9A96E" }}>·</span>
            <span>Amazon</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C4626B, transparent)" }}
        />
        <div
          className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A96E, transparent)" }}
        />
      </section>

      {/* THE PROBLEM */}
      <section className="px-6 py-16" style={{ backgroundColor: "#2D2D2D" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-2xl md:text-3xl leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F4" }}
          >
            "Your TikTok creators drive massive awareness. But there's no way to know which buyers
            walk into Ulta and buy B-FLAT off the shelf."
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ backgroundColor: "#C9A96E" }} />
            <span className="text-sm tracking-widest" style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}>
              THAT'S THE PROBLEM AISLE SOLVES
            </span>
            <div className="h-px w-16" style={{ backgroundColor: "#C9A96E" }} />
          </div>
        </div>
      </section>

      {/* FLYWHEEL */}
      <section className="px-6 py-20" style={{ backgroundColor: "#FAF7F4" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#C4626B", fontFamily: "var(--font-inter)" }}
            >
              The Aisle Flywheel
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2D2D" }}
            >
              Every Purchase Fuels the Next
            </h2>
            <p className="mt-4 text-lg opacity-60" style={{ fontFamily: "var(--font-inter)" }}>
              9 stages. One continuous loop. Zero data left on the table.
            </p>
          </div>

          <Flywheel />

          {/* Stage legend */}
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mt-8">
            {STAGES.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-xs font-semibold mb-1"
                  style={{
                    color: i % 2 === 0 ? "#C4626B" : "#2D2D2D",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {s.id}
                </div>
                <div
                  className="text-xs leading-tight opacity-60"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px" }}
                >
                  {s.short}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="px-6 py-20"
        style={{
          background: "linear-gradient(135deg, #F4C8C8 0%, #F9EFE8 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#C4626B", fontFamily: "var(--font-inter)" }}
            >
              What You Get
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2D2D" }}
            >
              Built for Brands at Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)" }}
              >
                <div
                  className="text-5xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#C4626B" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-sm tracking-widest uppercase opacity-60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RETAILERS */}
      <section className="px-6 py-16" style={{ backgroundColor: "#FAF7F4" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-8 opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Works Across Every MAËLYS Retail Channel
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {RETAILERS.map((r, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full text-sm font-medium"
                style={{
                  border: "1.5px solid #C4626B",
                  color: "#C4626B",
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "transparent",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        className="px-6 py-20"
        style={{
          background: "linear-gradient(135deg, #F9EFE8 0%, #FAF7F4 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#C4626B", fontFamily: "var(--font-inter)" }}
            >
              Simple Pricing
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2D2D" }}
            >
              Start Growing. Pay for What Works.
            </h2>
            <p className="mt-4 text-base opacity-60" style={{ fontFamily: "var(--font-inter)" }}>
              No hidden fees. No revenue share. Full platform access from Day 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* MTM Plan */}
            <div
              className="rounded-3xl p-10 border-2 flex flex-col"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                borderColor: "#C4626B",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6">
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2 opacity-50"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Flexible
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span
                    className="text-5xl font-bold"
                    style={{ fontFamily: "var(--font-playfair)", color: "#C4626B" }}
                  >
                    $499
                  </span>
                  <span className="text-base opacity-50 mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                    / mo
                  </span>
                </div>
                <p className="text-sm opacity-60" style={{ fontFamily: "var(--font-inter)" }}>
                  Month-to-month · Cancel anytime
                </p>
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-40" style={{ fontFamily: "var(--font-inter)" }}>
                  Everything included
                </p>
                <ul className="space-y-3">
                  {[
                    "SMS opt-in & campaigns",
                    "First-party data capture",
                    "Unlimited campaigns",
                    "Geo-targeted offers",
                    "Branded landing pages",
                    "Surveys & reviews",
                    "Community engagement",
                    "Dedicated brand support",
                    "Store locator widget",
                    "Receipt-validated redemptions",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      <span style={{ color: "#C4626B" }}>✓</span>
                      <span style={{ opacity: 0.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3-Month Plan */}
            <div
              className="rounded-3xl p-10 flex flex-col relative overflow-hidden"
              style={{
                backgroundColor: "#2D2D2D",
                border: "2px solid #C9A96E",
              }}
            >
              {/* Best value badge */}
              <div
                className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#C9A96E",
                  color: "#2D2D2D",
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.05em",
                }}
              >
                BEST VALUE
              </div>

              <div className="mb-6">
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-inter)", color: "#C9A96E", opacity: 0.7 }}
                >
                  Committed
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span
                    className="text-5xl font-bold"
                    style={{ fontFamily: "var(--font-playfair)", color: "#C9A96E" }}
                  >
                    $199
                  </span>
                  <span className="text-base mb-2" style={{ fontFamily: "var(--font-inter)", color: "#FAF7F4", opacity: 0.5 }}>
                    / mo
                  </span>
                </div>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#FAF7F4", opacity: 0.5 }}>
                  3-month contract · 60% savings
                </p>
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-inter)", color: "#FAF7F4", opacity: 0.3 }}>
                  Everything included
                </p>
                <ul className="space-y-3">
                  {[
                    "SMS opt-in & campaigns",
                    "First-party data capture",
                    "Unlimited campaigns",
                    "Geo-targeted offers",
                    "Branded landing pages",
                    "Surveys & reviews",
                    "Community engagement",
                    "Dedicated brand support",
                    "Store locator widget",
                    "Receipt-validated redemptions",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      <span style={{ color: "#C9A96E" }}>✓</span>
                      <span style={{ color: "#FAF7F4", opacity: 0.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://gotoaisle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 rounded-full text-white font-semibold text-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: "#C4626B",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.02em",
              }}
            >
              Create Your Account → gotoaisle.com
            </a>
            <p className="mt-4 text-sm opacity-40" style={{ fontFamily: "var(--font-inter)" }}>
              Live in under 2 weeks from account creation.
            </p>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="px-6 py-20" style={{ backgroundColor: "#2D2D2D" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              What Happens Next
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F4" }}
            >
              Live in Under 2 Weeks
            </h2>
          </div>

          <div className="space-y-8 mb-16">
            {[
              {
                n: "01",
                title: "Create Your Account",
                sub: "5 minutes at gotoaisle.com — implementation begins immediately",
              },
              {
                n: "02",
                title: "Onboarding + Implementation",
                sub: "Our team configures your store locator, SMS opt-in, and receipt validation flow for MAËLYS — tuned to Ulta, Shoppers, and every door you're in",
              },
              {
                n: "03",
                title: "Launch",
                sub: "Go live across creators, CRM, and social. Verified purchases and first-party data flowing from Day 1",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-6 items-start">
                <div
                  className="text-4xl font-bold shrink-0 w-14"
                  style={{ fontFamily: "var(--font-playfair)", color: "#C9A96E", opacity: 0.4 }}
                >
                  {step.n}
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F4" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#FAF7F4", opacity: 0.55, fontFamily: "var(--font-inter)" }}>
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://gotoaisle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full text-white font-semibold text-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: "#C4626B",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.02em",
              }}
            >
              Get Started at gotoaisle.com →
            </a>
            <p className="mt-4 text-sm opacity-30" style={{ color: "#FAF7F4", fontFamily: "var(--font-inter)" }}>
              The decision is yours. We're ready when you are.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-6 py-8 text-center text-xs"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FAF7F4",
          opacity: 0.6,
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.05em",
        }}
      >
        <p>Aisle × MAËLYS &nbsp;|&nbsp; Confidential &nbsp;|&nbsp; March 2026 &nbsp;|&nbsp; hello@gotoaisle.com</p>
      </footer>
    </main>
  );
}
