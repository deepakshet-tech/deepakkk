import { useState, useEffect, useCallback } from "react";

const C = {
  bg: "#FDF6F0",
  surface: "#FFFFFF",
  card: "#FFF8F5",
  maroon: "#7B1D2E",
  maroonDk: "#5C1220",
  maroonLt: "#A5294A",
  text: "#2C1015",
  muted: "#7A4050",
  border: "rgba(123,29,46,0.15)",
  borderMd: "rgba(123,29,46,0.3)",
};

const NAV_LINKS = ["Home", "Menu", "About", "Gallery", "Contact", "Help"];

const DISHES = [
  {
    id: 1,
    name: "Saffron Lobster Bisque",
    desc: "House-smoked cream, micro herbs, caviar pearls",
    tag: "Chef's Signature",
    price: 1850,
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Starters",
  },
  {
    id: 2,
    name: "Wagyu Tenderloin A5",
    desc: "Truffle jus, pomme purée, seasonal greens",
    tag: "Most Loved",
    price: 4200,
    img: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    category: "Mains",
  },
  {
    id: 3,
    name: "Black Truffle Risotto",
    desc: "Aged parmesan, wild mushrooms, gold leaf",
    tag: "Vegetarian",
    price: 2400,
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    category: "Mains",
  },
  {
    id: 4,
    name: "Miso Glazed Sea Bass",
    desc: "Dashi broth, pickled radish, yuzu foam",
    tag: "Seasonal",
    price: 2900,
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    category: "Mains",
  },
  {
    id: 5,
    name: "Matcha Lava Cake",
    desc: "White chocolate centre, azuki bean ice cream",
    tag: "New",
    price: 950,
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    category: "Desserts",
  },
  {
    id: 6,
    name: "Burrata & Heirloom",
    desc: "Sun-dried tomatoes, basil oil, aged balsamic",
    tag: "Fresh",
    price: 1200,
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80",
    category: "Starters",
  },
  {
    id: 7,
    name: "Spiced Lamb Chops",
    desc: "Harissa glaze, preserved lemon, couscous",
    tag: "Popular",
    price: 3600,
    img: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&q=80",
    category: "Mains",
  },
  {
    id: 8,
    name: "Crème Brûlée Trio",
    desc: "Vanilla, lavender & rose, dark chocolate",
    tag: "Classic",
    price: 880,
    img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80",
    category: "Desserts",
  },
];

const USPS = [
  {
    icon: "🌿",
    title: "Farm-to-Table Freshness",
    desc: "Every ingredient sourced daily from certified organic farms and local artisan producers.",
  },
  {
    icon: "🏆",
    title: "Award-Winning Chefs",
    desc: "Our team holds 3 Michelin stars and recognized by the World's 50 Best Restaurants.",
  },
  {
    icon: "✨",
    title: "Unmatched Ambience",
    desc: "Every corner designed to transport you — from the lighting to the table linens.",
  },
  {
    icon: "🍷",
    title: "Curated Wine Cellar",
    desc: "Over 800 labels selected by our sommelier from the finest vineyards worldwide.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Food Critic, Condé Nast",
    quote:
      "Fahhhhh!!! doesn't just serve food — it orchestrates an entire sensory performance. A transcendent evening every single time.",
    stars: 5,
  },
  {
    name: "James Whitfield",
    role: "CEO, Whitfield Group",
    quote:
      "We've hosted board dinners here for three years. The consistency of excellence is simply unmatched anywhere in the city.",
    stars: 5,
  },
  {
    name: "Aisha Kapoor",
    role: "Travel Blogger",
    quote:
      "If I could only eat at one restaurant for the rest of my life, it would be Fahhhhh!!! — bold claim, absolutely meant.",
    stars: 5,
  },
];

const TIMELINE = [
  {
    year: "2008",
    title: "The Beginning",
    desc: "Chef Laurent opens as a 30-seat bistro in South Mumbai with a single vision: honest luxury.",
  },
  {
    year: "2012",
    title: "First Michelin Star",
    desc: "Four years of relentless refinement earns the first Michelin star — the first in Maharashtra.",
  },
  {
    year: "2017",
    title: "The Grand Expansion",
    desc: "Full renovation transforms the space into a 120-seat temple of fine dining.",
  },
  {
    year: "2022",
    title: "Third Star Awarded",
    desc: "Joins a rarefied group of three-star establishments in Asia, cementing its global reputation.",
  },
];

const PORTFOLIO_ITEMS = [
  {
    category: "Food",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    title: "Wagyu Elegance",
  },
  {
    category: "Interior",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
    title: "The Main Hall",
  },
  {
    category: "Food",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    title: "Dessert Architecture",
  },
  {
    category: "Events",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    title: "Private Gala Evening",
  },
  {
    category: "Interior",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
    title: "Wine Cellar",
  },
  {
    category: "Food",
    img: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&q=80",
    title: "Garden Harvest",
  },
  {
    category: "Events",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    title: "Corporate Dinner",
  },
  {
    category: "Interior",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    title: "The Lounge Bar",
  },
];

/* ─── 10 FAQs ────────────────────────────────────────────── */
const FAQS = [
  {
    category: "Reservations",
    icon: "📅",
    question: "How far in advance should I make a reservation?",
    answer:
      "We recommend booking at least 2–3 weeks in advance, especially for weekend evenings and special occasions. For festive seasons like Diwali, Christmas, or New Year's Eve, reservations often fill up 4–6 weeks ahead. Walk-ins are welcome based on availability, but cannot be guaranteed.",
  },
  {
    category: "Reservations",
    icon: "📅",
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, reservations can be modified or cancelled up to 24 hours before your booking with no charge. Cancellations made within 24 hours may incur a cancellation fee of ₹500 per guest. To make changes, please call us at +91 22 4001 9999 or email reserve@fahhhh.in.",
  },
  {
    category: "Dining",
    icon: "🍽️",
    question: "Do you accommodate dietary restrictions and allergies?",
    answer:
      "Absolutely. Our kitchen team is well-versed in handling all major dietary requirements including vegetarian, vegan, gluten-free, nut-free, and Jain diets. Please inform us of any allergies or restrictions at the time of booking so Chef Laurent's team can prepare accordingly. We take food safety very seriously.",
  },
  {
    category: "Dining",
    icon: "🍽️",
    question: "What is the dress code at Fahhhhh!!!?",
    answer:
      "We maintain a smart-casual to formal dress code to preserve the ambience our guests expect. We kindly request no athletic wear, shorts, or flip-flops. Gentlemen are encouraged to wear collared shirts; formal Indian attire is always welcome and celebrated. Our team may politely decline entry to guests not meeting the dress standard.",
  },
  {
    category: "Dining",
    icon: "🍽️",
    question: "Is the restaurant child-friendly?",
    answer:
      "Fahhhhh!!! is designed primarily as an adult fine-dining experience. Children above the age of 10 are welcome, provided they are comfortable in a formal dining setting. We do not offer a dedicated children's menu but can adapt dishes upon request. We appreciate your understanding in maintaining a tranquil atmosphere for all guests.",
  },
  {
    category: "Orders & Payment",
    icon: "💳",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), UPI payments (GPay, PhonePe, Paytm), and cash in Indian Rupees. A 5% service charge is applied to all bills. GST is applicable as per government regulations. We do not accept foreign currency or traveller's cheques.",
  },
  {
    category: "Orders & Payment",
    icon: "💳",
    question: "Can I pre-order dishes or arrange a set menu for a group?",
    answer:
      "Yes! For groups of 8 or more, we offer bespoke set menus curated by Chef Laurent to suit your preferences and budget. Pre-ordering selected dishes is also available for large parties. Please reach out to our events team at reserve@fahhhh.in at least 5 days prior to your visit to discuss your requirements.",
  },
  {
    category: "Events & Private Dining",
    icon: "🥂",
    question: "Do you host private events and corporate dinners?",
    answer:
      "Yes, we have a dedicated private dining room — The Moreau Suite — that seats up to 30 guests, perfect for corporate dinners, milestone celebrations, product launches, and intimate gatherings. Full AV equipment, customised menus, and a dedicated butler service are available. Enquire via reserve@fahhhh.in for packages and pricing.",
  },
  {
    category: "Events & Private Dining",
    icon: "🥂",
    question: "Can I bring my own cake for a birthday or anniversary?",
    answer:
      "We welcome celebratory cakes brought in from outside, subject to a corkage fee of ₹800. Please inform us in advance so our team can arrange appropriate plating and presentation. We also offer in-house celebration dessert platters and personalised cake orders through our pastry kitchen — ask us for details.",
  },
  {
    category: "General",
    icon: "ℹ️",
    question: "Is there parking available at the restaurant?",
    answer:
      "Yes, we offer complimentary valet parking for all dining guests at our Napean Sea Road location. The valet is available from 11:00 AM to midnight. For guests arriving by cab or auto-rickshaw, our entrance is easily accessible from the main road. Nearby public parking is also available on Carmichael Road.",
  },
];

const FAQ_CATEGORIES = [
  "All",
  "Reservations",
  "Dining",
  "Orders & Payment",
  "Events & Private Dining",
  "General",
];

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lato:wght@300;400;700&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  body { background:#FDF6F0; font-family:'Lato',sans-serif; color:#2C1015; }
  input::placeholder, textarea::placeholder { color:#7A4050; opacity:0.55; }
  input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.5; cursor:pointer; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#FDF6F0; }
  ::-webkit-scrollbar-thumb { background:#7B1D2E; border-radius:3px; }
  @keyframes splashIn  { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
  @keyframes splashOut { from{opacity:1} to{opacity:0;pointer-events:none} }
  @keyframes letterPop { 0%{opacity:0;transform:translateY(16px)} 65%{transform:translateY(-3px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes bounce    { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
  @keyframes fadeSlideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes faqOpen { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  .dish-img { transition:transform 0.55s ease; }
  .dish-card:hover .dish-img { transform:scale(1.06); }
  .dish-card { transition:box-shadow 0.3s,transform 0.3s; }
  .dish-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(123,29,46,0.12); }
  .usp-card { transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
  .usp-card:hover { transform:translateY(-4px); box-shadow:0 10px 28px rgba(123,29,46,0.1); border-color:#7B1D2E !important; }
  .faq-item { transition:box-shadow 0.3s,border-color 0.3s; }
  .faq-item:hover { border-color:rgba(123,29,46,0.35) !important; box-shadow:0 4px 18px rgba(123,29,46,0.08); }
  .btn-primary { transition:background 0.3s,box-shadow 0.3s,transform 0.2s; }
  .btn-primary:hover { background:#A5294A !important; box-shadow:0 6px 20px rgba(123,29,46,0.28); transform:translateY(-1px); }
  .btn-primary:active { transform:translateY(0); }
  .btn-outline { transition:background 0.3s,color 0.3s,border-color 0.3s; }
  .btn-outline:hover { background:#7B1D2E !important; color:#fff !important; }
  @media (max-width:767px) { .desktop-nav,.book-btn { display:none !important; } }
  @media (min-width:768px) { .hamburger { display:none !important; } }
`;

function Logo({ variant = "dark", size = "md" }) {
  const sizes = {
    sm: { emblem: 32, total: 140 },
    md: { emblem: 38, total: 170 },
    lg: { emblem: 56, total: 240 },
  };
  const s = sizes[size];
  const r = s.emblem / 2;
  const textColor = variant === "light" ? "#fff" : C.text;
  const exclamColor = variant === "light" ? "#FFB3C6" : C.maroon;
  const taglineColor = variant === "light" ? "rgba(255,255,255,0.6)" : C.muted;
  const wordmarkX = s.emblem + 10;
  const svgH = s.emblem + 2;
  return (
    <svg
      width={s.total}
      height={svgH}
      viewBox={`0 0 ${s.total} ${svgH}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fahhhhh!!! Fine Dining"
    >
      <circle cx={r + 1} cy={r + 1} r={r} fill={C.maroon} />
      <circle
        cx={r + 1}
        cy={r + 1}
        r={r * 0.78}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.7"
      />
      <line
        x1={r + 1 - r * 0.22}
        y1={r + 1 - r * 0.42}
        x2={r + 1 - r * 0.22}
        y2={r + 1 + r * 0.42}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={r + 1 + r * 0.22}
        y1={r + 1 - r * 0.42}
        x2={r + 1 + r * 0.22}
        y2={r + 1 + r * 0.42}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={r + 1 - r * 0.22}
        y1={r + 1 - r * 0.42}
        x2={r + 1 - r * 0.36}
        y2={r + 1 - r * 0.18}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={r + 1 - r * 0.22}
        y1={r + 1 - r * 0.42}
        x2={r + 1 - r * 0.08}
        y2={r + 1 - r * 0.18}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d={`M${r + 1 + r * 0.22} ${r + 1 - r * 0.42} Q${r + 1 + r * 0.38} ${
          r + 1 - r * 0.1
        } ${r + 1 + r * 0.22} ${r + 1 - r * 0.05}`}
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
      />
      <text
        x={wordmarkX}
        y={r * 0.95 + 1}
        fontFamily="'Playfair Display',Georgia,serif"
        fontWeight="900"
        fontSize={s.emblem * 0.58}
        fill={textColor}
        letterSpacing="0.02em"
      >
        Fahhhhh<tspan fill={exclamColor}>!!!</tspan>
      </text>
      <text
        x={wordmarkX}
        y={r * 1.72 + 1}
        fontFamily="'Lato',Arial,sans-serif"
        fontWeight="700"
        fontSize={s.emblem * 0.2}
        fill={taglineColor}
        letterSpacing="0.28em"
      >
        FINE DINING · MUMBAI
      </text>
    </svg>
  );
}

function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1600);
    const t3 = setTimeout(() => onDone(), 2200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: C.maroon,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation:
          phase === "out"
            ? "splashOut 0.6s ease forwards"
            : "splashIn 0.4s ease forwards",
      }}
    >
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "rotateSlow 18s linear infinite",
          position: "absolute",
        }}
      />
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "absolute",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          position: "relative",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.12)" />
          <circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.06)" />
          <line
            x1="38"
            y1="24"
            x2="38"
            y2="76"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="38"
            y1="24"
            x2="30"
            y2="40"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="38"
            y1="24"
            x2="46"
            y2="40"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="62"
            y1="24"
            x2="62"
            y2="76"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M62 24 Q76 42 62 50"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.2"
          />
        </svg>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1px",
            animation: "letterPop 0.5s ease 0.3s both",
          }}
        >
          {["F", "a", "h", "h", "h", "h", "h"].map((l, i) => (
            <span
              key={i}
              style={{
                color: "#fff",
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "1.7rem",
                fontWeight: 900,
                animation: `letterPop 0.38s ease ${i * 0.05 + 0.3}s both`,
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              {l}
            </span>
          ))}
          {["!", "!", "!"].map((l, i) => (
            <span
              key={`ex-${i}`}
              style={{
                color: "#FFB3C6",
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "2.2rem",
                fontWeight: 900,
                animation: `letterPop 0.38s ease ${(i + 7) * 0.05 + 0.3}s both`,
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.62rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            marginTop: "8px",
            fontFamily: "'Lato',sans-serif",
            animation: "splashIn 0.4s ease 0.8s both",
          }}
        >
          Fine Dining · Mumbai
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          height: "1px",
          width: "52px",
          background: `linear-gradient(to right,transparent,${C.maroon})`,
        }}
      />
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: C.maroon,
        }}
      />
      <div
        style={{
          height: "1px",
          width: "52px",
          background: `linear-gradient(to left,transparent,${C.maroon})`,
        }}
      />
    </div>
  );
}
function SectionLabel({ label }) {
  return (
    <p
      style={{
        color: C.maroonLt,
        fontSize: "0.62rem",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: "10px",
      }}
    >
      {label}
    </p>
  );
}
function Badge({ label }) {
  return (
    <span
      style={{
        background: C.maroon,
        color: "#fff",
        fontSize: "0.58rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "4px 10px",
        fontWeight: 700,
        borderRadius: "3px",
      }}
    >
      {label}
    </span>
  );
}

function CartDrawer({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const service = Math.round(subtotal * 0.05);
  const total = subtotal + service;
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex" }}>
      <div
        onClick={onClose}
        style={{
          flex: 1,
          background: "rgba(44,16,21,0.4)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          width: "min(400px,100vw)",
          background: C.surface,
          borderLeft: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 36px rgba(123,29,46,0.13)",
          animation: "fadeSlideUp 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "22px 28px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: C.card,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.28rem",
                color: C.text,
                fontWeight: 700,
              }}
            >
              Your Order
            </h2>
            <p
              style={{ color: C.muted, fontSize: "0.77rem", marginTop: "2px" }}
            >
              {count} item{count !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.muted,
              fontSize: "1.35rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {cart.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "60px 0", color: C.muted }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🍽️</div>
              <p
                style={{ fontSize: "0.95rem", fontWeight: 600, color: C.text }}
              >
                Your cart is empty
              </p>
              <p style={{ fontSize: "0.78rem", marginTop: "6px" }}>
                Add dishes from our menu
              </p>
            </div>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "cover",
                  borderRadius: "7px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: C.text,
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    color: C.maroon,
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    marginTop: "4px",
                  }}
                >
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: `1px solid ${C.borderMd}`,
                    background: "#fff",
                    color: C.text,
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    color: C.text,
                    fontWeight: 700,
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: `1px solid ${C.maroon}`,
                    background: C.maroon,
                    color: "#fff",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    color: C.muted,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    marginLeft: "2px",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div
            style={{
              padding: "18px 22px 26px",
              borderTop: `1px solid ${C.border}`,
              background: C.card,
            }}
          >
            {[
              ["Subtotal", `₹${subtotal.toLocaleString()}`],
              ["Service Charge (5%)", `₹${service.toLocaleString()}`],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: C.muted, fontSize: "0.85rem" }}>{l}</span>
                <span style={{ color: C.text, fontSize: "0.85rem" }}>{v}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                borderTop: `1px solid ${C.border}`,
                marginTop: "8px",
                marginBottom: "18px",
              }}
            >
              <span
                style={{ color: C.text, fontWeight: 700, fontSize: "1rem" }}
              >
                Total
              </span>
              <span
                style={{ color: C.maroon, fontWeight: 700, fontSize: "1.1rem" }}
              >
                ₹{total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "14px",
                background: C.maroon,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.73rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "8px",
              }}
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderConfirmModal({ order, onClose }) {
  const orderId = `FAH-${Date.now().toString().slice(-6)}`;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(44,16,21,0.5)",
        backdropFilter: "blur(8px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(123,29,46,0.18)",
          animation: "fadeSlideUp 0.4s ease",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg,${C.maroon},${C.maroonDk})`,
            padding: "52px 40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.8rem", marginBottom: "12px" }}>🎉</div>
          <h2
            style={{
              color: "#fff",
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.85rem",
              fontWeight: 900,
            }}
          >
            Order Confirmed!
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              marginTop: "6px",
            }}
          >
            ಇದ್ರೆ ನೆಮ್ಮದಿ ಆಗಿರ್ಬೇಕ 🙏
          </p>
        </div>
        <div style={{ padding: "26px 30px 30px" }}>
          <p
            style={{
              textAlign: "center",
              color: C.maroon,
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.12em",
              marginBottom: "18px",
            }}
          >
            Order ID: {orderId}
          </p>
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: "10px",
              padding: "16px 18px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                color: C.muted,
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "12px",
                fontWeight: 700,
              }}
            >
              Order Summary
            </p>
            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  alignItems: "center",
                }}
              >
                <span style={{ color: C.text, fontSize: "0.86rem" }}>
                  {item.name}{" "}
                  <span style={{ color: C.muted }}>× {item.qty}</span>
                </span>
                <span
                  style={{
                    color: C.maroon,
                    fontWeight: 700,
                    fontSize: "0.86rem",
                  }}
                >
                  ₹{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                marginTop: "10px",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: C.text, fontWeight: 700 }}>Total Paid</span>
              <span
                style={{
                  color: C.maroon,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                ₹{order.total.toLocaleString()}
              </span>
            </div>
          </div>
          <p
            style={{
              color: C.muted,
              fontSize: "0.82rem",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            🕐 Ready in approximately{" "}
            <strong style={{ color: C.text }}>25–35 minutes</strong>
          </p>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "13px",
              background: C.maroon,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "8px",
            }}
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar({ activePage, setActivePage, cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const onHero = activePage === "Home";
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "10px 48px" : "16px 48px",
        background: scrolled ? "rgba(253,246,240,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.35s ease",
      }}
    >
      <button
        onClick={() => setActivePage("Home")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo variant={scrolled || !onHero ? "dark" : "light"} size="sm" />
      </button>
      <ul
        className="desktop-nav"
        style={{
          display: "flex",
          gap: "22px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {NAV_LINKS.map((p) => (
          <li key={p}>
            <button
              onClick={() => setActivePage(p)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.63rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                color:
                  scrolled || !onHero
                    ? activePage === p
                      ? C.maroon
                      : C.muted
                    : activePage === p
                    ? "#fff"
                    : "rgba(255,255,255,0.8)",
                transition: "color 0.3s",
                fontFamily: "'Lato',sans-serif",
                padding: "4px 0",
                paddingBottom: "6px",
              }}
            >
              {p}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: activePage === p ? "100%" : "0",
                  height: "2px",
                  background: activePage === p ? C.maroon : "transparent",
                  transition: "width 0.3s",
                }}
              />
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={onCartOpen}
          style={{
            position: "relative",
            background: scrolled || !onHero ? C.card : "rgba(255,255,255,0.14)",
            border: `1px solid ${
              scrolled || !onHero ? C.borderMd : "rgba(255,255,255,0.45)"
            }`,
            cursor: "pointer",
            padding: "8px 18px",
            color: scrolled || !onHero ? C.text : "#fff",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.78rem",
            fontWeight: 600,
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.maroon;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = C.maroon;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              scrolled || !onHero ? C.card : "rgba(255,255,255,0.14)";
            e.currentTarget.style.color = scrolled || !onHero ? C.text : "#fff";
            e.currentTarget.style.borderColor =
              scrolled || !onHero ? C.borderMd : "rgba(255,255,255,0.45)";
          }}
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                background: C.maroon,
                color: "#fff",
                fontSize: "0.58rem",
                fontWeight: 700,
                borderRadius: "50%",
                width: "17px",
                height: "17px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
          <span>Cart</span>
        </button>
        <button
          onClick={() => setActivePage("Contact")}
          className="btn-outline book-btn"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            border: `1px solid ${
              scrolled || !onHero ? C.maroon : "rgba(255,255,255,0.7)"
            }`,
            color: scrolled || !onHero ? C.maroon : "#fff",
            padding: "9px 20px",
            cursor: "pointer",
            background: "transparent",
            fontWeight: 700,
            borderRadius: "6px",
          }}
        >
          Reserve Table
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled || !onHero ? C.text : "#fff",
            fontSize: "1.45rem",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: C.surface,
            borderTop: `1px solid ${C.border}`,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            boxShadow: "0 8px 24px rgba(123,29,46,0.1)",
          }}
        >
          {NAV_LINKS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setActivePage(p);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activePage === p ? C.maroon : C.muted,
                fontWeight: 700,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function DishCard({ dish, onAddToCart, cartQty }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAddToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <div
      className="dish-card"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{ position: "relative", overflow: "hidden", height: "210px" }}
      >
        <img
          src={dish.img}
          alt={dish.name}
          className="dish-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <Badge label={dish.tag} />
        </div>
        {cartQty > 0 && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: C.maroon,
              color: "#fff",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          >
            {cartQty}
          </div>
        )}
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            color: C.text,
            fontSize: "1.05rem",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          {dish.name}
        </h3>
        <p
          style={{
            color: C.muted,
            fontSize: "0.82rem",
            lineHeight: 1.55,
            marginBottom: "16px",
          }}
        >
          {dish.desc}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ color: C.maroon, fontWeight: 800, fontSize: "1.1rem" }}
          >
            ₹{dish.price.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            className="btn-primary"
            style={{
              padding: "9px 20px",
              background: added ? "#2e7d32" : C.maroon,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "0.7rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "6px",
            }}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ setActivePage, cart, onAddToCart }) {
  const [activeT, setActiveT] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setActiveT((p) => (p + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(t);
  }, []);
  const getQty = (id) => cart.find((i) => i.id === id)?.qty || 0;
  return (
    <div style={{ background: C.bg }}>
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85"
          alt="Fine dining"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(155deg,rgba(92,18,32,0.7) 0%,rgba(92,18,32,0.5) 45%,rgba(44,16,21,0.82) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "38px",
                background: "rgba(255,255,255,0.38)",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "0.62rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Est. 2008 · Mumbai
            </span>
            <div
              style={{
                height: "1px",
                width: "38px",
                background: "rgba(255,255,255,0.38)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Logo variant="light" size="lg" />
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.76)",
              fontSize: "clamp(0.93rem,2vw,1.15rem)",
              fontStyle: "italic",
              fontFamily: "'Playfair Display',serif",
              marginBottom: "14px",
            }}
          >
            Where Every Bite Demands an Exclamation
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "40px",
                background: "rgba(255,255,255,0.28)",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.58)",
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Three Michelin Stars
            </p>
            <div
              style={{
                height: "1px",
                width: "40px",
                background: "rgba(255,255,255,0.28)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setActivePage("Menu")}
              className="btn-primary"
              style={{
                padding: "15px 36px",
                background: C.maroon,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "7px",
                boxShadow: "0 4px 18px rgba(92,18,32,0.45)",
              }}
            >
              Explore Menu
            </button>
            <button
              onClick={() => setActivePage("Contact")}
              style={{
                padding: "15px 36px",
                border: "1px solid rgba(255,255,255,0.58)",
                color: "#fff",
                cursor: "pointer",
                background: "transparent",
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "7px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Reserve a Table
            </button>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            animation: "bounce 2s infinite",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "34px",
                background:
                  "linear-gradient(to bottom,rgba(255,255,255,0.55),transparent)",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.54rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </p>
          </div>
        </div>
      </section>
      <section
        style={{ padding: "88px 40px", maxWidth: "1240px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <SectionLabel label="Chef's Selection" />
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              color: C.text,
              fontSize: "clamp(2rem,5vw,2.8rem)",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            Featured Dishes
          </h2>
          <Divider />
          <p
            style={{
              color: C.muted,
              marginTop: "10px",
              fontSize: "0.92rem",
              maxWidth: "440px",
              margin: "10px auto 0",
              lineHeight: 1.65,
            }}
          >
            Handpicked by Chef Laurent — add to your order tonight
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))",
            gap: "24px",
          }}
        >
          {DISHES.slice(0, 4).map((d) => (
            <DishCard
              key={d.id}
              dish={d}
              onAddToCart={onAddToCart}
              cartQty={getQty(d.id)}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => setActivePage("Menu")}
            className="btn-outline"
            style={{
              padding: "12px 36px",
              border: `1px solid ${C.maroon}`,
              color: C.maroon,
              background: "transparent",
              cursor: "pointer",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "7px",
            }}
          >
            View Full Menu →
          </button>
        </div>
      </section>
      <section
        style={{
          padding: "72px 40px",
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionLabel label="Our Promise" />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                color: C.text,
                fontSize: "clamp(2rem,5vw,2.8rem)",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              Why Fahhhhh!!!
            </h2>
            <Divider />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: "20px",
            }}
          >
            {USPS.map((u, i) => (
              <div
                key={i}
                className="usp-card"
                style={{
                  textAlign: "center",
                  padding: "36px 28px",
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  borderRadius: "12px",
                }}
              >
                <div style={{ fontSize: "2.3rem", marginBottom: "14px" }}>
                  {u.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: C.text,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {u.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.84rem",
                    lineHeight: 1.6,
                  }}
                >
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "88px 40px" }}>
        <div
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <SectionLabel label="Guest Voices" />
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              color: C.text,
              fontSize: "clamp(2rem,5vw,2.6rem)",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            What They Say
          </h2>
          <Divider />
          <div style={{ marginTop: "44px", minHeight: "160px" }}>
            <p
              style={{
                color: C.text,
                fontSize: "clamp(1rem,2.5vw,1.2rem)",
                fontStyle: "italic",
                lineHeight: 1.75,
                fontFamily: "'Playfair Display',serif",
                marginBottom: "22px",
              }}
            >
              "{TESTIMONIALS[activeT].quote}"
            </p>
            <div
              style={{ color: C.maroon, fontSize: "1rem", marginBottom: "8px" }}
            >
              {"★".repeat(TESTIMONIALS[activeT].stars)}
            </div>
            <p style={{ color: C.text, fontWeight: 700, fontSize: "0.92rem" }}>
              {TESTIMONIALS[activeT].name}
            </p>
            <p
              style={{
                color: C.muted,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {TESTIMONIALS[activeT].role}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "28px",
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveT(i)}
                style={{
                  height: "3px",
                  width: i === activeT ? "30px" : "14px",
                  background: i === activeT ? C.maroon : C.border,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Menu({ cart, onAddToCart }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Starters", "Mains", "Desserts"];
  const filtered =
    filter === "All" ? DISHES : DISHES.filter((d) => d.category === filter);
  const getQty = (id) => cart.find((i) => i.id === id)?.qty || 0;
  return (
    <div style={{ background: C.bg, paddingTop: "80px" }}>
      <section
        style={{
          maxWidth: "660px",
          margin: "0 auto",
          padding: "68px 40px 40px",
          textAlign: "center",
        }}
      >
        <SectionLabel label="Full Menu" />
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            color: C.text,
            fontSize: "clamp(2.4rem,7vw,3.8rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          Our <em style={{ color: C.maroon }}>Menu</em>
        </h2>
        <Divider />
        <p
          style={{
            color: C.muted,
            marginTop: "14px",
            lineHeight: 1.7,
            fontSize: "0.95rem",
          }}
        >
          Every dish crafted with passion and the finest seasonal ingredients.
        </p>
      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "44px",
          padding: "0 40px",
          flexWrap: "wrap",
        }}
      >
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "9px 26px",
              border: `1px solid ${filter === cat ? C.maroon : C.border}`,
              background: filter === cat ? C.maroon : C.surface,
              color: filter === cat ? "#fff" : C.muted,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
              borderRadius: "50px",
              transition: "all 0.3s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 40px 96px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "28px",
        }}
      >
        {filtered.map((d) => (
          <DishCard
            key={d.id}
            dish={d}
            onAddToCart={onAddToCart}
            cartQty={getQty(d.id)}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div style={{ background: C.bg, paddingTop: "80px" }}>
      <section
        style={{
          maxWidth: "660px",
          margin: "0 auto",
          padding: "68px 40px 40px",
          textAlign: "center",
        }}
      >
        <SectionLabel label="Our Story" />
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            color: C.text,
            fontSize: "clamp(2.4rem,7vw,3.8rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          About <em style={{ color: C.maroon }}>Us</em>
        </h2>
        <Divider />
      </section>
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "56px",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85"
            alt="Chef"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              width: "80px",
              height: "80px",
              border: `2px solid ${C.maroon}`,
              borderRadius: "8px",
              opacity: 0.35,
            }}
          />
        </div>
        <div>
          <SectionLabel label="Meet the Maestro" />
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              color: C.text,
              fontSize: "clamp(2rem,4vw,2.6rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "6px",
            }}
          >
            Chef Laurent
            <br />
            <em style={{ color: C.maroon }}>Moreau</em>
          </h2>
          <Divider />
          <p
            style={{
              color: C.muted,
              lineHeight: 1.8,
              marginBottom: "18px",
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
            }}
          >
            With over 18 years of mastery across Paris, Tokyo, and New York,
            Chef Laurent brings a philosophy that food is emotion — plated.
          </p>
          <p
            style={{
              color: C.muted,
              lineHeight: 1.8,
              marginBottom: "32px",
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
              fontStyle: "italic",
            }}
          >
            "Cooking is not a profession — it is a conversation between the
            earth and the soul."
          </p>
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              ["18+", "Years of Mastery"],
              ["3", "Michelin Stars"],
              ["12", "Global Awards"],
            ].map(([n, l]) => (
              <div key={l}>
                <p
                  style={{
                    color: C.maroon,
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                  }}
                >
                  {n}
                </p>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "72px 40px",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionLabel label="Our Journey" />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                color: C.text,
                fontSize: "clamp(2rem,5vw,2.8rem)",
                fontWeight: 700,
              }}
            >
              The Story So Far
            </h2>
            <Divider />
          </div>
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "88px 1fr",
                gap: "28px",
              }}
            >
              <div style={{ textAlign: "right", paddingTop: "3px" }}>
                <span
                  style={{
                    color: C.maroon,
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.4rem",
                    fontWeight: 900,
                  }}
                >
                  {item.year}
                </span>
              </div>
              <div
                style={{
                  paddingLeft: "24px",
                  paddingBottom: "36px",
                  borderLeft: `1px solid ${C.border}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "7px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: C.maroon,
                    border: `2px solid ${C.bg}`,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: C.text,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const FILTERS = ["All", "Food", "Interior", "Events"];
  const filtered =
    filter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((i) => i.category === filter);
  return (
    <div style={{ background: C.bg, paddingTop: "80px" }}>
      <section
        style={{
          maxWidth: "660px",
          margin: "0 auto",
          padding: "68px 40px 40px",
          textAlign: "center",
        }}
      >
        <SectionLabel label="Visual Story" />
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            color: C.text,
            fontSize: "clamp(2.4rem,7vw,3.8rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          Our <em style={{ color: C.maroon }}>Gallery</em>
        </h2>
        <Divider />
      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "36px",
          padding: "0 40px",
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 22px",
              border: "none",
              borderBottom: `2px solid ${
                filter === f ? C.maroon : "transparent"
              }`,
              background: "transparent",
              color: filter === f ? C.maroon : C.muted,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 40px 96px",
          columns: "2",
          gap: "16px",
        }}
      >
        {filtered.map((item, i) => (
          <div
            key={`${filter}-${i}`}
            onClick={() => setLightbox(item)}
            style={{
              position: "relative",
              marginBottom: "16px",
              overflow: "hidden",
              cursor: "zoom-in",
              borderRadius: "10px",
              breakInside: "avoid",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.querySelector(".gal-ov").style.opacity = "1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.querySelector(".gal-ov").style.opacity = "0")
            }
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.55s",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
            <div
              className="gal-ov"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(92,18,32,0.6)",
                opacity: 0,
                transition: "opacity 0.3s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                borderRadius: "10px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {item.category}
              </span>
              <p
                style={{
                  color: "#fff",
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 600,
            background: "rgba(44,16,21,0.88)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "32px",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.75rem",
            }}
          >
            ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "820px", width: "100%", textAlign: "center" }}
          >
            <img
              src={lightbox.img}
              alt={lightbox.title}
              style={{
                width: "100%",
                maxHeight: "78vh",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
            <div style={{ marginTop: "14px" }}>
              <span
                style={{
                  color: "rgba(255,179,198,0.9)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {lightbox.category}
              </span>
              <p
                style={{
                  color: "#fff",
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginTop: "4px",
                }}
              >
                {lightbox.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", date: "", message: "" });
  };
  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${C.borderMd}`,
    outline: "none",
    padding: "11px 0",
    color: C.text,
    fontSize: "0.9rem",
    transition: "border-color 0.3s",
    fontFamily: "'Lato',sans-serif",
    boxSizing: "border-box",
  };
  return (
    <div style={{ background: C.bg, paddingTop: "80px" }}>
      <section
        style={{
          maxWidth: "660px",
          margin: "0 auto",
          padding: "68px 40px 40px",
          textAlign: "center",
        }}
      >
        <SectionLabel label="Get In Touch" />
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            color: C.text,
            fontSize: "clamp(2.4rem,7vw,3.8rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          Make a <em style={{ color: C.maroon }}>Reservation</em>
        </h2>
        <Divider />
      </section>
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px 96px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "48px",
        }}
      >
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: "14px",
            padding: "40px 36px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display',serif",
              color: C.text,
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "28px",
            }}
          >
            Reserve Your Table
          </h3>
          {sent && (
            <div
              style={{
                marginBottom: "20px",
                padding: "14px 18px",
                border: `1px solid ${C.maroon}`,
                background: "rgba(123,29,46,0.06)",
                color: C.maroon,
                fontSize: "0.86rem",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              ✓ Reservation received! We'll confirm within 24 hours.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              {[
                ["Full Name", "text", "Priya Mehta", "name"],
                ["Email", "email", "hello@example.com", "email"],
              ].map(([lbl, type, ph, key]) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      color: C.muted,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      fontWeight: 700,
                    }}
                  >
                    {lbl}
                  </label>
                  <input
                    type={type}
                    required
                    placeholder={ph}
                    style={inputStyle}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = C.maroon)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = C.borderMd)
                    }
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              {[
                ["Phone", "tel", "+91 98765 43210", "phone"],
                ["Preferred Date", "date", "", "date"],
              ].map(([lbl, type, ph, key]) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      color: C.muted,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      fontWeight: 700,
                    }}
                  >
                    {lbl}
                  </label>
                  <input
                    type={type}
                    placeholder={ph}
                    style={inputStyle}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = C.maroon)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = C.borderMd)
                    }
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  color: C.muted,
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                Special Requests
              </label>
              <textarea
                rows={4}
                placeholder="Dietary requirements, occasion details, seating preferences..."
                style={{ ...inputStyle, resize: "none" }}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={(e) => (e.target.style.borderBottomColor = C.maroon)}
                onBlur={(e) => (e.target.style.borderBottomColor = C.borderMd)}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                padding: "15px",
                background: C.maroon,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "8px",
              }}
            >
              Confirm Reservation
            </button>
          </form>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              padding: "28px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2rem", marginBottom: "10px" }}>📍</p>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                color: C.text,
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              Fahhhhh!!!
            </p>
            <p
              style={{
                color: C.muted,
                fontSize: "0.85rem",
                marginTop: "6px",
                lineHeight: 1.65,
              }}
            >
              12, Napean Sea Road, Malabar Hill
              <br />
              Mumbai, Maharashtra 400 006
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.maroon,
                textDecoration: "none",
                borderBottom: `1px solid ${C.border}`,
                paddingBottom: "2px",
              }}
            >
              Open in Maps →
            </a>
          </div>
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              padding: "28px 32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                color: C.text,
                fontSize: "1.15rem",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              Opening Hours
            </h3>
            {[
              ["Monday – Friday", "12:00 PM – 11:00 PM"],
              ["Saturday", "11:00 AM – 11:30 PM"],
              ["Sunday", "11:00 AM – 10:00 PM"],
            ].map(([day, time]) => (
              <div
                key={day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ color: C.muted, fontSize: "0.86rem" }}>
                  {day}
                </span>
                <span
                  style={{
                    color: C.text,
                    fontSize: "0.86rem",
                    fontWeight: 600,
                  }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              ["📞", "Reservations", "+91 22 4001 9999"],
              ["✉️", "Email", "reserve@fahhhh.in"],
              ["📸", "Instagram", "@fahhhh.mumbai"],
            ].map(([icon, lbl, val]) => (
              <div
                key={lbl}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: `1px solid ${C.border}`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                    background: C.surface,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {lbl}
                  </p>
                  <p
                    style={{
                      color: C.text,
                      fontSize: "0.9rem",
                      marginTop: "2px",
                      fontWeight: 600,
                    }}
                  >
                    {val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FAQ ACCORDION ITEM ─────────────────────────────────── */
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="faq-item"
      style={{
        border: `1px solid ${open ? C.maroon : C.border}`,
        borderRadius: "12px",
        overflow: "hidden",
        background: open ? C.card : C.surface,
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flex: 1,
          }}
        >
          <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{faq.icon}</span>
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              color: open ? C.maroon : C.text,
              fontSize: "1rem",
              fontWeight: 700,
              lineHeight: 1.4,
              transition: "color 0.3s",
            }}
          >
            {faq.question}
          </span>
        </div>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1.5px solid ${open ? C.maroon : C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: open ? C.maroon : C.muted,
            fontSize: "1.1rem",
            fontWeight: 700,
            transition: "all 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </div>
      </button>
      {open && (
        <div
          style={{
            padding: "0 28px 24px 70px",
            animation: "faqOpen 0.25s ease",
          }}
        >
          <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.8 }}>
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── HELP PAGE ──────────────────────────────────────────── */
function Help({ setActivePage }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ background: C.bg, paddingTop: "80px" }}>
      {/* Hero Banner */}
      <section
        style={{
          background: `linear-gradient(135deg,${C.maroon} 0%,${C.maroonDk} 100%)`,
          padding: "80px 40px 72px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}
        >
          <div style={{ fontSize: "2.8rem", marginBottom: "16px" }}>💬</div>
          <div
            style={{
              color: "rgba(255,179,198,0.9)",
              fontSize: "0.62rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Help & Support
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              color: "#fff",
              fontSize: "clamp(2.4rem,7vw,3.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            How Can We <em style={{ color: "#FFB3C6" }}>Help?</em>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            Find answers to our most frequently asked questions below. Can't
            find what you're looking for? Reach out and we'll be happy to
            assist.
          </p>
          {/* Search */}
          <div
            style={{
              position: "relative",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1rem",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px 16px 50px",
                border: "none",
                borderRadius: "50px",
                fontSize: "0.92rem",
                background: "#fff",
                color: C.text,
                outline: "none",
                boxShadow: "0 8px 28px rgba(44,16,21,0.25)",
                fontFamily: "'Lato',sans-serif",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.muted,
                  fontSize: "1rem",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 22px",
                border: `1px solid ${
                  activeCategory === cat ? C.maroon : C.border
                }`,
                background: activeCategory === cat ? C.maroon : C.surface,
                color: activeCategory === cat ? "#fff" : C.muted,
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                borderRadius: "50px",
                transition: "all 0.3s",
                fontFamily: "'Lato',sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Content */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "60px 40px 80px",
        }}
      >
        {filteredFaqs.length > 0 ? (
          activeCategory === "All" && searchQuery === "" ? (
            FAQ_CATEGORIES.filter((c) => c !== "All").map((cat) => {
              const catFaqs = FAQS.filter((f) => f.category === cat);
              return (
                <div key={cat} style={{ marginBottom: "52px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "22px",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>
                      {catFaqs[0]?.icon}
                    </span>
                    <div>
                      <p
                        style={{
                          color: C.maroonLt,
                          fontSize: "0.58rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          marginBottom: "2px",
                        }}
                      >
                        Category
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          color: C.text,
                          fontSize: "1.35rem",
                          fontWeight: 700,
                        }}
                      >
                        {cat}
                      </h3>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: C.border,
                        marginLeft: "8px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {catFaqs.map((faq, i) => (
                      <FAQItem key={i} faq={faq} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {filteredFaqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          )
        ) : (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: C.muted }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                color: C.text,
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              No results found
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
              We couldn't find a match for "<strong>{searchQuery}</strong>". Try
              a different keyword or browse by category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="btn-primary"
              style={{
                marginTop: "24px",
                padding: "12px 32px",
                background: C.maroon,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "8px",
              }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* CTA block */}
        <div
          style={{
            marginTop: "60px",
            background: `linear-gradient(135deg,${C.maroon} 0%,${C.maroonDk} 100%)`,
            borderRadius: "16px",
            padding: "44px 48px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Still have questions?
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "#fff",
                fontSize: "1.6rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              We're Here for You
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.88rem",
                lineHeight: 1.65,
              }}
            >
              Call us at{" "}
              <strong style={{ color: "#FFB3C6" }}>+91 22 4001 9999</strong> or
              email{" "}
              <strong style={{ color: "#FFB3C6" }}>reserve@fahhhh.in</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePage("Contact")}
              style={{
                padding: "13px 28px",
                background: "#fff",
                color: C.maroon,
                border: "none",
                cursor: "pointer",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "8px",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Contact Us →
            </button>
            <button
              onClick={() => setActivePage("Contact")}
              style={{
                padding: "13px 28px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                borderRadius: "8px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Reserve Table
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Footer({ setActivePage }) {
  return (
    <footer style={{ background: C.maroonDk, padding: "60px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "44px",
            marginBottom: "44px",
          }}
        >
          <div>
            <div style={{ marginBottom: "14px" }}>
              <Logo variant="light" size="sm" />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.86rem",
                lineHeight: 1.7,
                maxWidth: "230px",
              }}
            >
              Three Michelin stars. One unforgettable evening. Mumbai's temple
              of fine dining since 2008.
            </p>
          </div>
          <div>
            <p
              style={{
                color: "rgba(255,179,198,0.75)",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              Navigation
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {NAV_LINKS.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setActivePage(p)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.86rem",
                      padding: 0,
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.55)")
                    }
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              style={{
                color: "rgba(255,179,198,0.75)",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              Contact
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                "12, Napean Sea Road, Malabar Hill",
                "Mumbai, Maharashtra 400 006",
                "+91 22 4001 9999",
                "reserve@fahhhh.in",
              ].map((l, i) => (
                <p
                  key={i}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.86rem",
                  }}
                >
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
            © 2025 Fahhhhh!!! Fine Dining. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
            Crafted with passion in Mumbai 🍷
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [activePage, setActivePage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const navigate = useCallback((page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const addToCart = useCallback((dish) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === dish.id);
      if (ex)
        return prev.map((i) =>
          i.id === dish.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...dish, qty: 1 }];
    });
  }, []);
  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) setCart((p) => p.filter((i) => i.id !== id));
    else setCart((p) => p.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);
  const removeItem = useCallback(
    (id) => setCart((p) => p.filter((i) => i.id !== id)),
    []
  );
  const handleCheckout = useCallback(() => {
    const total = Math.round(
      cart.reduce((s, i) => s + i.price * i.qty, 0) * 1.05
    );
    setConfirmedOrder({ items: [...cart], total });
    setCart([]);
    setCartOpen(false);
  }, [cart]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const PAGE_MAP = { Home, Menu, About, Gallery, Contact, Help };
  const PageComponent = PAGE_MAP[activePage] || Home;
  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <style>{GLOBAL_CSS}</style>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <Navbar
        activePage={activePage}
        setActivePage={navigate}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />
      <main>
        <PageComponent
          setActivePage={navigate}
          cart={cart}
          onAddToCart={addToCart}
        />
      </main>
      <Footer setActivePage={navigate} />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
          onCheckout={handleCheckout}
        />
      )}
      {confirmedOrder && (
        <OrderConfirmModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </div>
  );
}
