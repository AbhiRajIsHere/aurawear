import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════

const WARDROBE = [
  { id: 1, name: "Navy Oxford Shirt", cat: "Tops", sub: "Formal", color: "#1a2744", colorName: "Navy", brand: "Van Heusen", price: 1899, added: "2024-12-15", wornCount: 12, lastWorn: "2025-03-18", emoji: "👔", occasions: ["Office","Meeting","Date"], season: ["All"] },
  { id: 2, name: "White Linen Shirt", cat: "Tops", sub: "Casual", color: "#f5f0e8", colorName: "White", brand: "Uniqlo", price: 1499, added: "2025-01-20", wornCount: 8, lastWorn: "2025-03-10", emoji: "👕", occasions: ["Casual","Brunch","Travel"], season: ["Summer","Spring"] },
  { id: 3, name: "Black Slim Chinos", cat: "Bottoms", sub: "Formal", color: "#1a1a1a", colorName: "Black", brand: "H&M", price: 1299, added: "2024-11-05", wornCount: 22, lastWorn: "2025-03-20", emoji: "👖", occasions: ["Office","Meeting","Date","Party"], season: ["All"] },
  { id: 4, name: "Blue Denim Jeans", cat: "Bottoms", sub: "Casual", color: "#4a6fa5", colorName: "Blue", brand: "Levi's", price: 2799, added: "2024-09-10", wornCount: 30, lastWorn: "2025-03-21", emoji: "👖", occasions: ["Casual","Travel","Outing"], season: ["All"] },
  { id: 5, name: "Grey Wool Blazer", cat: "Outerwear", sub: "Formal", color: "#6b6b6b", colorName: "Grey", brand: "Zara", price: 4999, added: "2025-02-14", wornCount: 4, lastWorn: "2025-02-28", emoji: "🧥", occasions: ["Meeting","Date","Party","Wedding"], season: ["Winter","Autumn"] },
  { id: 6, name: "Olive Cargo Shorts", cat: "Bottoms", sub: "Casual", color: "#556b2f", colorName: "Olive", brand: "Decathlon", price: 799, added: "2025-01-01", wornCount: 6, lastWorn: "2025-03-05", emoji: "🩳", occasions: ["Casual","Travel","Gym"], season: ["Summer"] },
  { id: 7, name: "Black Oxford Shoes", cat: "Footwear", sub: "Formal", color: "#111", colorName: "Black", brand: "Clarks", price: 5499, added: "2024-08-20", wornCount: 18, lastWorn: "2025-03-19", emoji: "👞", occasions: ["Office","Meeting","Date","Wedding"], season: ["All"] },
  { id: 8, name: "White Sneakers", cat: "Footwear", sub: "Casual", color: "#fafafa", colorName: "White", brand: "Nike", price: 6999, added: "2024-10-10", wornCount: 35, lastWorn: "2025-03-21", emoji: "👟", occasions: ["Casual","Travel","Gym","Outing"], season: ["All"] },
  { id: 9, name: "Maroon Polo Shirt", cat: "Tops", sub: "Casual", color: "#800020", colorName: "Maroon", brand: "US Polo", price: 1199, added: "2025-02-01", wornCount: 5, lastWorn: "2025-03-01", emoji: "👕", occasions: ["Casual","Outing","Brunch"], season: ["All"] },
  { id: 10, name: "Beige Chinos", cat: "Bottoms", sub: "Smart Casual", color: "#d4b896", colorName: "Beige", brand: "Allen Solly", price: 1599, added: "2025-01-15", wornCount: 9, lastWorn: "2025-03-15", emoji: "👖", occasions: ["Office","Casual","Brunch","Date"], season: ["All"] },
  { id: 11, name: "Black Leather Belt", cat: "Accessories", sub: "Formal", color: "#1a1a1a", colorName: "Black", brand: "Tommy Hilfiger", price: 2499, added: "2024-07-01", wornCount: 40, lastWorn: "2025-03-21", emoji: "🪢", occasions: ["Office","Meeting","Date","Party","Wedding"], season: ["All"] },
  { id: 12, name: "Aviator Sunglasses", cat: "Accessories", sub: "Casual", color: "#b8860b", colorName: "Gold", brand: "Ray-Ban", price: 7999, added: "2025-03-01", wornCount: 3, lastWorn: "2025-03-20", emoji: "🕶️", occasions: ["Casual","Travel","Outing","Brunch"], season: ["Summer","Spring"] },
  { id: 13, name: "Charcoal V-Neck Tee", cat: "Tops", sub: "Casual", color: "#36454f", colorName: "Charcoal", brand: "H&M", price: 599, added: "2024-10-20", wornCount: 15, lastWorn: "2025-03-12", emoji: "👕", occasions: ["Casual","Gym","Travel"], season: ["All"] },
  { id: 14, name: "Tan Loafers", cat: "Footwear", sub: "Smart Casual", color: "#c4a47c", colorName: "Tan", brand: "Aldo", price: 3999, added: "2025-02-20", wornCount: 2, lastWorn: "2025-03-02", emoji: "👞", occasions: ["Brunch","Date","Casual","Office"], season: ["Summer","Spring","Autumn"] },
  { id: 15, name: "Navy Bomber Jacket", cat: "Outerwear", sub: "Casual", color: "#1a2744", colorName: "Navy", brand: "Zara", price: 3499, added: "2024-12-01", wornCount: 7, lastWorn: "2025-03-08", emoji: "🧥", occasions: ["Casual","Date","Outing","Travel"], season: ["Winter","Autumn"] },
];

const OCCASIONS = ["Office","Casual","Meeting","Date","Party","Travel","Gym","Wedding","Brunch","Outing"];

const WEATHER = { temp: 32, condition: "Sunny", humidity: 45, city: "Ludhiana", icon: "☀️", suggestion: "Light, breathable fabrics recommended" };

const OUTFIT_HISTORY = [
  { date: "2025-03-21", items: [2, 4, 8, 12], occasion: "Casual", rating: 4 },
  { date: "2025-03-20", items: [1, 3, 7, 11], occasion: "Office", rating: 5 },
  { date: "2025-03-19", items: [9, 10, 14], occasion: "Brunch", rating: 3 },
  { date: "2025-03-18", items: [1, 3, 7, 11, 5], occasion: "Meeting", rating: 5 },
  { date: "2025-03-17", items: [13, 4, 8], occasion: "Casual", rating: 3 },
  { date: "2025-03-16", items: [2, 10, 14, 12], occasion: "Date", rating: 4 },
  { date: "2025-03-15", items: [1, 10, 7, 11], occasion: "Office", rating: 4 },
];

const SHOPPING_ITEMS = [
  { id: 101, name: "Charcoal Wool Trousers", brand: "Marks & Spencer", price: 2499, color: "#36454f", colorName: "Charcoal", cat: "Bottoms", platform: "Myntra", score: 94, reason: "No formal charcoal trousers. Would create 6 new outfit combinations with your existing shirts.", combos: 6 },
  { id: 102, name: "Light Blue Formal Shirt", brand: "Peter England", price: 1299, color: "#b0d4f1", colorName: "Light Blue", cat: "Tops", platform: "Ajio", score: 91, reason: "You only have 1 formal shirt (navy). Light blue is the most versatile formal color.", combos: 8 },
  { id: 103, name: "Tan Leather Watch", brand: "Fossil", price: 8999, color: "#c4a47c", colorName: "Tan", cat: "Accessories", platform: "Flipkart", score: 87, reason: "No watch in your wardrobe. Strongest accessory gap for formal occasions.", combos: 0 },
  { id: 104, name: "Olive Slim Chinos", brand: "GAP", price: 1999, color: "#556b2f", colorName: "Olive", cat: "Bottoms", platform: "Myntra", score: 76, reason: "Olive shorts exist, but no full-length pants. Adds travel and smart-casual versatility.", combos: 4 },
  { id: 105, name: "Pink Linen Shirt", brand: "Uniqlo", price: 1499, color: "#f4c2c2", colorName: "Pink", cat: "Tops", platform: "Ajio", score: 82, reason: "Zero warm tones in your wardrobe. Pink adds variety for dates and brunches.", combos: 5 },
  { id: 106, name: "Navy Sneakers", brand: "Adidas", price: 4999, color: "#1a2744", colorName: "Navy", cat: "Footwear", platform: "Amazon", score: 38, reason: "You already own white sneakers which are more versatile. Low priority duplicate.", combos: 1 },
  { id: 107, name: "Black Crew T-Shirt", brand: "Uniqlo", price: 799, color: "#111", colorName: "Black", cat: "Tops", platform: "Myntra", score: 29, reason: "You have enough dark casual tops. Charcoal V-neck fills this slot already.", combos: 0 },
  { id: 108, name: "Brown Leather Belt", brand: "Woodland", price: 1799, color: "#8b5e3c", colorName: "Brown", cat: "Accessories", platform: "Flipkart", score: 72, reason: "You only have a black belt. Brown pairs better with tan loafers and beige chinos.", combos: 3 },
];

const GAPS = [
  { icon: "🎨", cat: "Color Imbalance", detail: "70% dark colors (black, navy, charcoal). No pink, peach, rust, or pastel tones in 15 items.", severity: "high", fix: "Add 2 light/warm shirts — light blue + pink would unlock 13 new combos", unlocks: 13 },
  { icon: "👔", cat: "Formal Shortage", detail: "Only 1 formal shirt for a 5-day office week. You're repeating every 1-2 days.", severity: "high", fix: "Add 2-3 formal shirts in light blue, white, and pink", unlocks: 18 },
  { icon: "⌚", cat: "Accessory Deficit", detail: "No watch, tie, or pocket square. Your formal outfits look incomplete.", severity: "medium", fix: "Start with a versatile analog watch — biggest impact per rupee", unlocks: 0 },
  { icon: "🧣", cat: "Layering Gap", detail: "Only 2 outerwear pieces. No sweater, cardigan, or vest for transitional weather.", severity: "medium", fix: "Navy or camel crew-neck sweater layers over everything you own", unlocks: 8 },
  { icon: "👟", cat: "Footwear Limitation", detail: "3 pairs total. Missing: sandals for summer, brown formal shoes to pair with lighter outfits.", severity: "low", fix: "Brown brogues would complement beige/olive bottoms", unlocks: 5 },
];

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

const getItem = (id) => WARDROBE.find(w => w.id === id);
const daysSince = (dateStr) => Math.floor((new Date() - new Date(dateStr)) / 86400000);
const costPerWear = (item) => item.wornCount > 0 ? Math.round(item.price / item.wornCount) : item.price;

function generateOutfit(occasion, wardrobe) {
  const tops = wardrobe.filter(w => w.cat === "Tops" && w.occasions.includes(occasion));
  const bottoms = wardrobe.filter(w => w.cat === "Bottoms" && w.occasions.includes(occasion));
  const shoes = wardrobe.filter(w => w.cat === "Footwear" && w.occasions.includes(occasion));
  const acc = wardrobe.filter(w => (w.cat === "Accessories" || w.cat === "Outerwear") && w.occasions.includes(occasion));
  const pick = (arr) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
  return { top: pick(tops), bottom: pick(bottoms), footwear: pick(shoes), extra: pick(acc) };
}

// ═══════════════════════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════════════════════

function AnimNum({ value, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let f = 0;
    const step = Math.max(1, Math.ceil(value / 25));
    const iv = setInterval(() => { f += step; if (f >= value) { setN(value); clearInterval(iv); } else setN(f); }, 25);
    return () => clearInterval(iv);
  }, [value]);
  return <>{prefix}{n.toLocaleString()}{suffix}</>;
}

function Score({ value, size = "md" }) {
  const bg = value >= 80 ? "#16a34a" : value >= 60 ? "#d97706" : "#dc2626";
  const s = size === "lg" ? { fontSize: 16, padding: "5px 14px" } : { fontSize: 11, padding: "3px 9px" };
  return <span style={{ background: bg, color: "#fff", fontWeight: 700, borderRadius: 20, fontFamily: "var(--mono)", ...s }}>{value}</span>;
}

function Tag({ children, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
      background: active ? "rgba(200,170,120,0.14)" : "rgba(255,255,255,0.02)",
      color: active ? "var(--gold)" : "var(--muted)", cursor: "pointer",
      transition: "all 0.25s cubic-bezier(.4,0,.2,1)", fontFamily: "var(--body)",
      whiteSpace: "nowrap", ...(color ? { borderColor: color + "55", color, background: color + "12" } : {})
    }}>{children}</button>
  );
}

function StarRating({ rating, size = 14 }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 1 }}>
      {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= rating ? "#c8aa78" : "#2a2825" }}>★</span>)}
    </span>
  );
}

function ClothCard({ item, compact, onWear }) {
  const cpw = costPerWear(item);
  const dormant = daysSince(item.lastWorn) > 20;
  return (
    <div style={{
      background: dormant ? "rgba(220,38,38,0.03)" : "rgba(255,255,255,0.025)",
      border: `1px solid ${dormant ? "rgba(220,38,38,0.12)" : "var(--border)"}`,
      borderRadius: 16, padding: compact ? "10px 12px" : "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      transition: "all 0.25s cubic-bezier(.4,0,.2,1)", cursor: "default", position: "relative"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.borderColor = "var(--gold-dim)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = dormant ? "rgba(220,38,38,0.12)" : "var(--border)"; }}
    >
      {dormant && <div style={{ position: "absolute", top: 8, right: 10, fontSize: 9, color: "#f87171", fontWeight: 600, fontFamily: "var(--mono)", letterSpacing: 0.5 }}>💤 {daysSince(item.lastWorn)}d ago</div>}
      <div style={{
        width: compact ? 40 : 50, height: compact ? 40 : 50, borderRadius: 12,
        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
        border: "2px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: compact ? 18 : 22, flexShrink: 0,
        boxShadow: `0 4px 12px ${item.color}33`
      }}>{item.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: compact ? 13 : 14, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, display: "flex", gap: 8, alignItems: "center" }}>
          <span>{item.brand}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--muted)" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: 3, background: item.color, border: item.colorName === "White" ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
            {item.colorName}
          </span>
        </div>
      </div>
      {!compact && (
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--mono)" }}>{item.wornCount}×</div>
          <div style={{ fontSize: 9, color: "var(--dim)", fontFamily: "var(--mono)" }}>₹{cpw}/wear</div>
        </div>
      )}
      {onWear && !compact && (
        <button onClick={() => onWear(item.id)} style={{
          width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)",
          background: "transparent", color: "var(--muted)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
          transition: "all 0.2s", flexShrink: 0
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#0f0e0c"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}
        >+</button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION: OUTFIT CARD
// ═══════════════════════════════════════════════════════════

function OutfitCard({ outfit, occasion, onShuffle, weather }) {
  const items = [outfit.top, outfit.bottom, outfit.footwear, outfit.extra].filter(Boolean);
  return (
    <div style={{
      background: "linear-gradient(160deg, rgba(200,170,120,0.07) 0%, rgba(200,170,120,0.01) 100%)",
      border: "1px solid rgba(200,170,120,0.18)", borderRadius: 20, padding: 20, position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: "radial-gradient(circle, rgba(200,170,120,0.08), transparent)", borderRadius: "50%" }} />

      {/* Weather bar */}
      {weather && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
          padding: "8px 12px", borderRadius: 10, background: "rgba(0,0,0,0.2)",
          fontSize: 12, color: "var(--muted)"
        }}>
          <span style={{ fontSize: 20 }}>{weather.icon}</span>
          <span style={{ fontWeight: 600, color: "var(--text)" }}>{weather.temp}°C</span>
          <span>{weather.condition} · {weather.city}</span>
          <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--gold-dim)", fontStyle: "italic" }}>{weather.suggestion}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, fontWeight: 600, fontFamily: "var(--mono)" }}>TODAY'S LOOK</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--display)", marginTop: 2 }}>{occasion}</div>
        </div>
        <button onClick={onShuffle} style={{
          width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(200,170,120,0.25)",
          background: "rgba(200,170,120,0.08)", color: "var(--gold)", cursor: "pointer",
          fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s"
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "rotate(180deg)"; e.currentTarget.style.background = "rgba(200,170,120,0.18)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "rotate(0deg)"; e.currentTarget.style.background = "rgba(200,170,120,0.08)"; }}
        >↻</button>
      </div>

      {/* Outfit items as horizontal visual */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, justifyContent: "center" }}>
        {items.map((item, i) => (
          <div key={item.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            padding: "12px 10px", borderRadius: 14, flex: 1,
            background: "rgba(0,0,0,0.15)", border: "1px solid var(--border)",
            animation: `fadeUp 0.4s ease-out ${i * 0.08}s both`
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: `0 6px 16px ${item.color}44`,
              border: "2px solid rgba(255,255,255,0.08)"
            }}>{item.emoji}</div>
            <div style={{ fontSize: 10, color: "var(--text)", fontWeight: 600, textAlign: "center", lineHeight: 1.2, maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.name}</div>
            <div style={{ fontSize: 9, color: "var(--dim)", fontFamily: "var(--mono)" }}>{item.wornCount}× worn</div>
          </div>
        ))}
      </div>

      {/* Combination Stats */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 10, color: "var(--muted)" }}>
        <span>🎨 {new Set(items.map(i => i.colorName)).size} colors</span>
        <span>💰 ₹{items.reduce((s,i) => s + costPerWear(i), 0)} total cost/wear</span>
        <span>📅 Last full combo: 5d ago</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION: OUTFIT CALENDAR
// ═══════════════════════════════════════════════════════════

function OutfitCalendar({ history, wardrobe }) {
  const [selected, setSelected] = useState(null);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = history.find(h => h.date === dateStr);
    days.push({ date: d, dateStr, entry });
  }
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 600, letterSpacing: 1.5, fontFamily: "var(--mono)" }}>LAST 7 DAYS</div>
      <div style={{ display: "flex", gap: 6 }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 12, cursor: "pointer",
            border: selected === i ? "1px solid var(--gold)" : "1px solid var(--border)",
            background: selected === i ? "rgba(200,170,120,0.1)" : d.entry ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            transition: "all 0.2s", fontFamily: "var(--body)"
          }}>
            <span style={{ fontSize: 9, color: "var(--dim)", fontWeight: 600 }}>{dayNames[d.date.getDay()]}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: d.entry ? "var(--text)" : "var(--dim)" }}>{d.date.getDate()}</span>
            {d.entry ? (
              <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                {d.entry.items.slice(0, 3).map(id => {
                  const item = getItem(id);
                  return item ? <div key={id} style={{ width: 8, height: 8, borderRadius: 3, background: item.color, border: item.colorName === "White" ? "1px solid rgba(255,255,255,0.15)" : "none" }} /> : null;
                })}
              </div>
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1px dashed var(--border)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Expanded day detail */}
      {selected !== null && days[selected].entry && (
        <div style={{
          marginTop: 10, padding: 14, borderRadius: 14,
          background: "rgba(200,170,120,0.04)", border: "1px solid rgba(200,170,120,0.12)",
          animation: "fadeUp 0.3s ease-out"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>{days[selected].entry.occasion}</span>
            <StarRating rating={days[selected].entry.rating} size={12} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {days[selected].entry.items.map(id => {
              const item = getItem(id);
              return item ? (
                <div key={id} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "5px 10px",
                  borderRadius: 8, background: "rgba(0,0,0,0.2)", fontSize: 11
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                  <span style={{ color: "var(--text)" }}>{item.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION: ANALYTICS
// ═══════════════════════════════════════════════════════════

function Analytics({ wardrobe }) {
  const totalValue = wardrobe.reduce((s, w) => s + w.price, 0);
  const totalWears = wardrobe.reduce((s, w) => s + w.wornCount, 0);
  const avgCPW = Math.round(totalValue / Math.max(totalWears, 1));
  const mostWorn = [...wardrobe].sort((a, b) => b.wornCount - a.wornCount).slice(0, 3);
  const leastWorn = [...wardrobe].sort((a, b) => a.wornCount - b.wornCount).slice(0, 3);
  const catCount = {};
  const colorCount = {};
  wardrobe.forEach(w => {
    catCount[w.cat] = (catCount[w.cat] || 0) + 1;
    colorCount[w.colorName] = (colorCount[w.colorName] || 0) + 1;
  });
  const maxCat = Math.max(...Object.values(catCount));
  const maxColor = Math.max(...Object.values(colorCount));

  const utilization = Math.round((wardrobe.filter(w => w.wornCount > 5).length / wardrobe.length) * 100);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Hero Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "WARDROBE VALUE", value: `₹${totalValue.toLocaleString()}`, sub: `${wardrobe.length} items`, icon: "💎" },
          { label: "AVG COST/WEAR", value: `₹${avgCPW}`, sub: `${totalWears} total wears`, icon: "📉" },
          { label: "UTILIZATION", value: `${utilization}%`, sub: `${wardrobe.filter(w => w.wornCount <= 2).length} neglected`, icon: utilization > 70 ? "✅" : "⚠️" },
          { label: "VERSATILITY", value: `${OCCASIONS.filter(o => wardrobe.some(w => w.occasions.includes(o))).length}/${OCCASIONS.length}`, sub: "occasions covered", icon: "🔄" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)", animation: `fadeUp 0.4s ease-out ${i * 0.06}s both`
          }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1.5, fontWeight: 600, fontFamily: "var(--mono)", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)", fontFamily: "var(--display)" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
        <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 1.5, fontWeight: 600, fontFamily: "var(--mono)", marginBottom: 12 }}>CATEGORY BREAKDOWN</div>
        {Object.entries(catCount).sort((a,b) => b[1] - a[1]).map(([cat, count]) => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 70, fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>{cat}</div>
            <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${(count / maxCat) * 100}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, var(--gold-dim), var(--gold))", transition: "width 0.6s ease-out" }} />
            </div>
            <div style={{ width: 20, fontSize: 12, fontWeight: 700, color: "var(--text)", fontFamily: "var(--mono)", textAlign: "right" }}>{count}</div>
          </div>
        ))}
      </div>

      {/* Color Wheel */}
      <div style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
        <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 1.5, fontWeight: 600, fontFamily: "var(--mono)", marginBottom: 12 }}>COLOR PALETTE</div>
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
          {Object.entries(colorCount).sort((a,b) => b[1] - a[1]).map(([name]) => {
            const item = wardrobe.find(w => w.colorName === name);
            const pct = (colorCount[name] / wardrobe.length) * 100;
            return <div key={name} style={{ flex: pct, height: 10, borderRadius: 5, background: item?.color, border: name === "White" ? "1px solid rgba(255,255,255,0.15)" : "none", minWidth: 6, transition: "flex 0.4s ease-out" }} title={`${name}: ${colorCount[name]}`} />;
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(colorCount).sort((a,b) => b[1] - a[1]).map(([name, count]) => {
            const item = wardrobe.find(w => w.colorName === name);
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--muted)" }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: item?.color, border: name === "White" ? "1px solid rgba(255,255,255,0.15)" : "none" }} />
                {name} <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--dim)" }}>({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most & Least Worn */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: 14, borderRadius: 16, background: "rgba(22,163,106,0.04)", border: "1px solid rgba(22,163,106,0.12)" }}>
          <div style={{ fontSize: 10, color: "#4ade80", letterSpacing: 1, fontWeight: 600, fontFamily: "var(--mono)", marginBottom: 10 }}>🏆 MOST WORN</div>
          {mostWorn.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                <div style={{ fontSize: 9, color: "var(--dim)", fontFamily: "var(--mono)" }}>₹{costPerWear(item)}/wear</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", fontFamily: "var(--mono)" }}>{item.wornCount}×</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 14, borderRadius: 16, background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.1)" }}>
          <div style={{ fontSize: 10, color: "#f87171", letterSpacing: 1, fontWeight: 600, fontFamily: "var(--mono)", marginBottom: 10 }}>😴 LEAST WORN</div>
          {leastWorn.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                <div style={{ fontSize: 9, color: "var(--dim)", fontFamily: "var(--mono)" }}>₹{costPerWear(item)}/wear</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#f87171", fontFamily: "var(--mono)" }}>{item.wornCount}×</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════

export default function AuraWear() {
  const [tab, setTab] = useState("home");
  const [wardrobe] = useState(WARDROBE);
  const [occasion, setOccasion] = useState("Office");
  const [outfit, setOutfit] = useState(() => generateOutfit("Office", WARDROBE));
  const [filterCat, setFilterCat] = useState("All");
  const [filterSub, setFilterSub] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [addMode, setAddMode] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [shopSort, setShopSort] = useState("score");
  const [analyzeLink, setAnalyzeLink] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [fbName, setFbName] = useState("");
  const [fbRating, setFbRating] = useState(0);
  const [fbText, setFbText] = useState("");
  const [fbFeatures, setFbFeatures] = useState([]);
  const [fbSubmitted, setFbSubmitted] = useState(false);
  const scrollRef = useRef(null);

  const toggleFbFeature = (f) => setFbFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const submitFeedback = () => {
    const data = { name: fbName, rating: fbRating, features: fbFeatures, feedback: fbText, timestamp: new Date().toISOString() };
    // In production: send to your backend / Google Sheets / Firebase
    console.log("FEEDBACK:", JSON.stringify(data, null, 2));
    // Copy to clipboard as backup
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2)).catch(() => {});
    setFbSubmitted(true);
    setTimeout(() => { setFbSubmitted(false); setShowFeedback(false); setFbName(""); setFbRating(0); setFbText(""); setFbFeatures([]); }, 2500);
  };

  const shuffle = () => setOutfit(generateOutfit(occasion, wardrobe));
  const changeOccasion = (o) => { setOccasion(o); setOutfit(generateOutfit(o, wardrobe)); };

  const categories = ["All", ...new Set(wardrobe.map(w => w.cat))];
  const subs = ["All", ...new Set(wardrobe.map(w => w.sub))];

  const filtered = useMemo(() => {
    let items = wardrobe;
    if (filterCat !== "All") items = items.filter(w => w.cat === filterCat);
    if (filterSub !== "All") items = items.filter(w => w.sub === filterSub);
    if (searchQ) items = items.filter(w => w.name.toLowerCase().includes(searchQ.toLowerCase()) || w.brand.toLowerCase().includes(searchQ.toLowerCase()));
    if (sortBy === "recent") items = [...items].sort((a,b) => new Date(b.lastWorn) - new Date(a.lastWorn));
    if (sortBy === "worn") items = [...items].sort((a,b) => b.wornCount - a.wornCount);
    if (sortBy === "neglected") items = [...items].sort((a,b) => a.wornCount - b.wornCount);
    if (sortBy === "value") items = [...items].sort((a,b) => a.price/Math.max(a.wornCount,1) - b.price/Math.max(b.wornCount,1));
    return items;
  }, [wardrobe, filterCat, filterSub, searchQ, sortBy]);

  const handleImport = () => {
    if (!linkInput.trim()) return;
    setImporting(true);
    setTimeout(() => { setImporting(false); setImportDone(true); setTimeout(() => { setImportDone(false); setLinkInput(""); setAddMode(false); }, 2000); }, 2500);
  };

  const handleAnalyze = () => {
    if (!analyzeLink.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed({
        name: "Sage Green Linen Shirt", brand: "Uniqlo", price: 1499, color: "#8fae80", colorName: "Sage Green",
        score: 89, verdict: "BUY",
        reasons: ["No green tones in your wardrobe — fills a color gap", "Pairs with 4 existing bottoms (chinos, jeans, beige, olive)", "Linen fabric ideal for 32°C Ludhiana weather", "Price-to-versatility ratio: excellent"],
        combos: [
          { items: ["Sage Green Shirt", "Black Slim Chinos", "Tan Loafers"], style: "Smart Casual" },
          { items: ["Sage Green Shirt", "Blue Denim Jeans", "White Sneakers"], style: "Weekend" },
          { items: ["Sage Green Shirt", "Beige Chinos", "Black Oxford Shoes"], style: "Office" },
        ]
      });
    }, 3000);
  };

  const sortedShop = useMemo(() =>
    [...SHOPPING_ITEMS].sort((a, b) => shopSort === "score" ? b.score - a.score : a.price - b.price),
  [shopSort]);

  const tabs = [
    { id: "home", label: "Today", icon: "◉" },
    { id: "closet", label: "Closet", icon: "◧" },
    { id: "shop", label: "Advisor", icon: "◈" },
    { id: "gaps", label: "Gaps", icon: "◇" },
    { id: "stats", label: "Stats", icon: "◬" },
    { id: "vision", label: "Vision", icon: "◎" },
  ];

  return (
    <div style={{
      "--gold": "#c8aa78", "--gold-dim": "rgba(200,170,120,0.4)", "--text": "#f0ebe3",
      "--muted": "#8a8278", "--dim": "#5a5650", "--bg": "#0c0b09", "--surface": "rgba(255,255,255,0.025)",
      "--border": "rgba(255,255,255,0.07)", "--body": "'Outfit', 'Instrument Sans', sans-serif",
      "--display": "'Playfair Display', Georgia, serif", "--mono": "'DM Mono', 'Courier New', monospace",
      fontFamily: "var(--body)", background: "var(--bg)", color: "var(--text)",
      minHeight: "100vh", maxWidth: 460, margin: "0 auto", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,170,120,0.25); border-radius: 3px; }
        input:focus, button:focus { outline: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes scanLine { 0% { top: 0; } 100% { top: 100%; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(200,170,120,0.2); } 50% { box-shadow: 0 0 20px rgba(200,170,120,0.4); } }
        .fu { animation: fadeUp 0.4s ease-out both; }
        .fi { animation: fadeIn 0.5s ease-out both; }
        .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.1s; } .d3 { animation-delay: 0.15s; }
        .d4 { animation-delay: 0.2s; } .d5 { animation-delay: 0.25s; }
      `}</style>

      {/* Grain overlay */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <div style={{
        padding: "14px 18px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--border)", position: "relative", zIndex: 2,
        background: "rgba(12,11,9,0.9)", backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #c8aa78, #a08960)", fontSize: 15, fontWeight: 800, color: "#0c0b09",
            fontFamily: "var(--display)", boxShadow: "0 2px 12px rgba(200,170,120,0.3)"
          }}>A</div>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 17, fontWeight: 800, letterSpacing: 0.5, background: "linear-gradient(135deg, #c8aa78, #e8d5b5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AURAWEAR</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)", textAlign: "right" }}>
            <span>{WEATHER.icon} {WEATHER.temp}°C</span>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--gold-dim)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--mono)"
          }}>T</div>
        </div>
      </div>

      {/* Prototype Banner */}
      <div style={{
        padding: "8px 18px", background: "linear-gradient(90deg, rgba(200,170,120,0.1), rgba(200,170,120,0.05))",
        borderBottom: "1px solid rgba(200,170,120,0.1)", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "relative", zIndex: 2
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#0c0b09", padding: "2px 7px",
            borderRadius: 4, background: "var(--gold)", fontFamily: "var(--mono)"
          }}>PROTOTYPE</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Tap 💬 to share your thoughts</span>
        </div>
        <button onClick={() => setShowFeedback(true)} style={{
          padding: "4px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700,
          background: "rgba(200,170,120,0.15)", border: "1px solid rgba(200,170,120,0.25)",
          color: "var(--gold)", cursor: "pointer", fontFamily: "var(--body)"
        }}>Give Feedback</button>
      </div>

      {/* Content Scroll Area */}
      <div ref={scrollRef} style={{ height: "calc(100vh - 140px)", overflowY: "auto", padding: "16px 14px 20px", position: "relative", zIndex: 1 }}>

        {/* ═══════ HOME ═══════ */}
        {tab === "home" && (
          <div key="home">
            {/* Greeting */}
            <div className="fu" style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Good morning,</div>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--display)", color: "var(--text)", lineHeight: 1.2 }}>
                What are we wearing<br/><span style={{ color: "var(--gold)" }}>today?</span>
              </div>
            </div>

            {/* Occasion Pills */}
            <div className="fu d1" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {OCCASIONS.slice(0, 8).map(o => <Tag key={o} active={occasion === o} onClick={() => changeOccasion(o)}>{o}</Tag>)}
            </div>

            {/* Outfit Card */}
            <div className="fu d2" style={{ marginBottom: 20 }}>
              <OutfitCard outfit={outfit} occasion={occasion} onShuffle={shuffle} weather={WEATHER} />
            </div>

            {/* Outfit History Calendar */}
            <div className="fu d3" style={{ marginBottom: 20 }}>
              <OutfitCalendar history={OUTFIT_HISTORY} wardrobe={wardrobe} />
            </div>

            {/* Quick Insights */}
            <div className="fu d4" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8
            }}>
              {[
                { v: wardrobe.length, l: "Items", icon: "👔", c: "var(--gold)" },
                { v: wardrobe.filter(w => w.wornCount <= 2).length, l: "Neglected", icon: "😴", c: "#f87171" },
                { v: `₹${Math.round(wardrobe.reduce((s,w) => s + w.price, 0) / Math.max(wardrobe.reduce((s,w) => s + w.wornCount, 0), 1))}`, l: "Avg ₹/Wear", icon: "📉", c: "#4ade80" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "14px 10px", borderRadius: 14, textAlign: "center",
                  background: "var(--surface)", border: "1px solid var(--border)"
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.c, fontFamily: "var(--display)" }}>
                    {typeof s.v === "number" ? <AnimNum value={s.v} /> : s.v}
                  </div>
                  <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1, fontFamily: "var(--mono)", marginTop: 2 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════ CLOSET ═══════ */}
        {tab === "closet" && (
          <div key="closet">
            <div className="fu" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 800 }}>Your Closet</div>
              <button onClick={() => setAddMode(!addMode)} style={{
                padding: "7px 16px", borderRadius: 20, fontWeight: 700, fontSize: 12,
                background: addMode ? "transparent" : "linear-gradient(135deg, var(--gold), #a08960)",
                color: addMode ? "var(--muted)" : "#0c0b09", border: addMode ? "1px solid var(--border)" : "none",
                cursor: "pointer", fontFamily: "var(--body)", transition: "all 0.2s"
              }}>{addMode ? "✕ Cancel" : "+ Add Item"}</button>
            </div>

            {/* Import Section */}
            {addMode && (
              <div className="fu" style={{
                borderRadius: 16, padding: 18, marginBottom: 16,
                background: "linear-gradient(135deg, rgba(200,170,120,0.06), rgba(200,170,120,0.02))",
                border: "1px solid rgba(200,170,120,0.2)"
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>Smart Import</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14 }}>Paste any shopping link — we'll extract everything automatically</div>

                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <input value={linkInput} onChange={e => setLinkInput(e.target.value)}
                    placeholder="myntra.com/product/... or ajio.com/..."
                    style={{
                      flex: 1, padding: "11px 14px", borderRadius: 12, fontSize: 13,
                      background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--body)"
                    }} />
                  <button onClick={handleImport} disabled={importing || importDone} style={{
                    padding: "11px 20px", borderRadius: 12, fontWeight: 700, fontSize: 12,
                    background: importDone ? "#16a34a" : importing ? "#333" : "var(--gold)",
                    color: importDone ? "#fff" : "#0c0b09", border: "none", cursor: importing ? "wait" : "pointer",
                    fontFamily: "var(--body)", whiteSpace: "nowrap", transition: "all 0.3s"
                  }}>
                    {importDone ? "✓ Added!" : importing ? "Scanning..." : "Import"}
                  </button>
                </div>

                {importing && (
                  <div style={{ position: "relative", padding: "12px 14px", borderRadius: 10, background: "rgba(0,0,0,0.3)", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, width: "100%", height: 1, background: "var(--gold)", animation: "scanLine 1.5s linear infinite", opacity: 0.4 }} />
                    <div style={{ fontSize: 11, color: "var(--gold)", animation: "pulse 1.5s ease-in-out infinite", fontFamily: "var(--mono)" }}>
                      ⟳ Extracting product data — name, color, brand, category, price...
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {["📧 Forward order email", "📸 Photo upload", "🛒 Browser extension"].map((m, i) => (
                    <span key={i} style={{
                      padding: "5px 10px", borderRadius: 8, fontSize: 10, fontWeight: 500,
                      background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "var(--dim)"
                    }}>{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="fu d1" style={{ marginBottom: 12 }}>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search by name or brand..."
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 13,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  color: "var(--text)", fontFamily: "var(--body)"
                }} />
            </div>

            {/* Filters */}
            <div className="fu d1" style={{ display: "flex", gap: 6, marginBottom: 8, overflowX: "auto", paddingBottom: 2 }}>
              {categories.map(c => <Tag key={c} active={filterCat === c} onClick={() => setFilterCat(c)}>{c}{c !== "All" ? ` (${wardrobe.filter(w => w.cat === c).length})` : ""}</Tag>)}
            </div>
            <div className="fu d2" style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 2 }}>
              {[
                { key: "recent", label: "Recent" },
                { key: "worn", label: "Most Worn" },
                { key: "neglected", label: "Neglected" },
                { key: "value", label: "Best Value" },
              ].map(s => <Tag key={s.key} active={sortBy === s.key} onClick={() => setSortBy(s.key)}>{s.label}</Tag>)}
            </div>

            {/* Color Strip */}
            <div className="fu d2" style={{ display: "flex", gap: 3, marginBottom: 14, padding: "8px 10px", background: "var(--surface)", borderRadius: 10 }}>
              {Object.entries(wardrobe.reduce((acc, w) => { acc[w.colorName] = (acc[w.colorName] || { count: 0, color: w.color }); acc[w.colorName].count++; return acc; }, {})).sort((a,b) => b[1].count - a[1].count).map(([name, { count, color }]) => (
                <div key={name} title={`${name}: ${count}`} style={{
                  flex: count, height: 8, borderRadius: 4, background: color,
                  border: name === "White" ? "1px solid rgba(255,255,255,0.15)" : "none",
                  minWidth: 6, transition: "flex 0.4s"
                }} />
              ))}
            </div>

            {/* Items */}
            <div style={{ display: "grid", gap: 8 }}>
              {filtered.map((item, i) => (
                <div key={item.id} className={`fu d${Math.min(i % 5 + 1, 5)}`}>
                  <ClothCard item={item} />
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: "var(--dim)" }}>No items found</div>
              )}
            </div>
          </div>
        )}

        {/* ═══════ SHOPPING ADVISOR ═══════ */}
        {tab === "shop" && (
          <div key="shop">
            <div className="fu" style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 800 }}>Shopping Advisor</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>AI scores every item against your existing wardrobe</div>
            </div>

            {/* Link Analyzer */}
            <div className="fu d1" style={{
              borderRadius: 16, padding: 18, marginBottom: 18,
              background: "linear-gradient(135deg, rgba(200,170,120,0.06), rgba(200,170,120,0.02))",
              border: "1px solid rgba(200,170,120,0.2)"
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>🔍 Analyze Before You Buy</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>Paste any product link — get an instant buy/skip verdict</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={analyzeLink} onChange={e => setAnalyzeLink(e.target.value)}
                  placeholder="Paste product URL here..."
                  style={{
                    flex: 1, padding: "11px 14px", borderRadius: 12, fontSize: 13,
                    background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--body)"
                  }} />
                <button onClick={handleAnalyze} disabled={analyzing} style={{
                  padding: "11px 20px", borderRadius: 12, fontWeight: 700, fontSize: 12,
                  background: analyzing ? "#333" : "var(--gold)", color: "#0c0b09",
                  border: "none", cursor: analyzing ? "wait" : "pointer", fontFamily: "var(--body)",
                  whiteSpace: "nowrap"
                }}>{analyzing ? "Analyzing..." : "Analyze"}</button>
              </div>

              {analyzing && (
                <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, width: "100%", height: 1, background: "var(--gold)", animation: "scanLine 2s linear infinite", opacity: 0.4 }} />
                  {["Extracting product data...", "Comparing with your wardrobe...", "Calculating outfit combinations...", "Generating verdict..."].map((step, i) => (
                    <div key={i} style={{ fontSize: 10, color: "var(--muted)", fontFamily: "var(--mono)", marginBottom: 3, animation: `fadeIn 0.3s ease-out ${i * 0.6}s both` }}>▸ {step}</div>
                  ))}
                </div>
              )}

              {/* Analysis Result */}
              {analyzed && !analyzing && (
                <div style={{ marginTop: 14, animation: "fadeUp 0.4s ease-out" }}>
                  <div style={{
                    padding: 16, borderRadius: 14,
                    background: analyzed.verdict === "BUY" ? "rgba(22,163,106,0.06)" : "rgba(220,38,38,0.06)",
                    border: `1px solid ${analyzed.verdict === "BUY" ? "rgba(22,163,106,0.2)" : "rgba(220,38,38,0.2)"}`
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{analyzed.name}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{analyzed.brand} · ₹{analyzed.price}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <Score value={analyzed.score} size="lg" />
                        <div style={{
                          marginTop: 4, fontSize: 11, fontWeight: 800, letterSpacing: 1, fontFamily: "var(--mono)",
                          color: analyzed.verdict === "BUY" ? "#4ade80" : "#f87171"
                        }}>{analyzed.verdict === "BUY" ? "✓ BUY" : "✕ SKIP"}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      {analyzed.reasons.map((r, i) => (
                        <div key={i} style={{
                          fontSize: 11, color: "var(--muted)", padding: "4px 0",
                          display: "flex", gap: 6, alignItems: "start"
                        }}>
                          <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span> {r}
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 1, fontFamily: "var(--mono)", marginBottom: 8, fontWeight: 600 }}>OUTFIT COMBINATIONS UNLOCKED</div>
                    {analyzed.combos.map((c, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 10px", borderRadius: 8, background: "rgba(0,0,0,0.2)", marginBottom: 4, fontSize: 11
                      }}>
                        <span style={{ color: "var(--text)" }}>{c.items.join(" + ")}</span>
                        <span style={{ color: "var(--gold)", fontSize: 10, fontFamily: "var(--mono)" }}>{c.style}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setAnalyzed(null)} style={{
                    marginTop: 8, width: "100%", padding: 8, borderRadius: 8, fontSize: 11,
                    background: "transparent", border: "1px solid var(--border)", color: "var(--muted)",
                    cursor: "pointer", fontFamily: "var(--body)"
                  }}>Analyze another item</button>
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="fu d2" style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <Tag active={shopSort === "score"} onClick={() => setShopSort("score")}>Best Match</Tag>
              <Tag active={shopSort === "price"} onClick={() => setShopSort("price")}>Price: Low→High</Tag>
            </div>

            {/* Shopping Items */}
            <div style={{ display: "grid", gap: 12 }}>
              {sortedShop.map((item, i) => {
                const good = item.score >= 70;
                return (
                  <div key={item.id} className={`fu d${Math.min(i % 5 + 1, 5)}`} style={{
                    borderRadius: 16, padding: 16, position: "relative", overflow: "hidden",
                    background: good ? "rgba(200,170,120,0.03)" : "var(--surface)",
                    border: `1px solid ${good ? "rgba(200,170,120,0.15)" : "var(--border)"}`,
                  }}>
                    {good && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                          border: "2px solid rgba(255,255,255,0.06)", flexShrink: 0,
                          boxShadow: good ? `0 4px 16px ${item.color}33` : "none"
                        }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)" }}>{item.brand} · {item.platform}</div>
                        </div>
                      </div>
                      <Score value={item.score} />
                    </div>

                    <div style={{
                      fontSize: 12, color: good ? "var(--muted)" : "var(--dim)", lineHeight: 1.6,
                      padding: "10px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 10, marginBottom: 12,
                      borderLeft: `3px solid ${good ? "var(--gold-dim)" : "rgba(220,38,38,0.2)"}`
                    }}>
                      {item.reason}
                      {item.combos > 0 && <div style={{ marginTop: 4, fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>🔗 Unlocks {item.combos} new outfit combos</div>}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "var(--gold)", fontFamily: "var(--mono)" }}>₹{item.price.toLocaleString()}</div>
                      <span style={{
                        padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                        background: good ? "rgba(22,163,106,0.12)" : "rgba(220,38,38,0.08)",
                        color: good ? "#4ade80" : "#f87171",
                        border: `1px solid ${good ? "rgba(22,163,106,0.25)" : "rgba(220,38,38,0.15)"}`
                      }}>{good ? "✓ RECOMMENDED" : "✕ SKIP"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════ GAPS ═══════ */}
        {tab === "gaps" && (
          <div key="gaps">
            <div className="fu" style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 800 }}>Wardrobe Gaps</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>What's missing for a complete, versatile wardrobe</div>
            </div>

            {/* Gap Score */}
            <div className="fu d1" style={{
              textAlign: "center", padding: 24, borderRadius: 18,
              background: "linear-gradient(135deg, rgba(200,170,120,0.06), rgba(200,170,120,0.02))",
              border: "1px solid rgba(200,170,120,0.15)", marginBottom: 18
            }}>
              <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, fontFamily: "var(--mono)", fontWeight: 600, marginBottom: 6 }}>WARDROBE COMPLETENESS</div>
              <div style={{ fontSize: 52, fontWeight: 900, fontFamily: "var(--display)", color: "var(--gold)", lineHeight: 1 }}>
                <AnimNum value={62} suffix="%" />
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
                Fix the top 2 gaps to reach <span style={{ color: "var(--gold)", fontWeight: 700 }}>85%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 12 }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} style={{ width: "8%", height: 4, borderRadius: 2, background: i < 6 ? "var(--gold)" : "rgba(255,255,255,0.06)" }} />
                ))}
              </div>
            </div>

            {/* Gap Cards */}
            <div style={{ display: "grid", gap: 12 }}>
              {GAPS.map((gap, i) => (
                <div key={i} className={`fu d${Math.min(i + 1, 5)}`} style={{
                  borderRadius: 16, padding: 16, position: "relative",
                  background: gap.severity === "high" ? "rgba(220,38,38,0.03)" : "var(--surface)",
                  border: `1px solid ${gap.severity === "high" ? "rgba(220,38,38,0.12)" : gap.severity === "medium" ? "rgba(202,138,4,0.12)" : "var(--border)"}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{gap.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{gap.cat}</span>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: "var(--mono)", padding: "3px 8px", borderRadius: 6,
                      color: gap.severity === "high" ? "#f87171" : gap.severity === "medium" ? "#fbbf24" : "var(--dim)",
                      background: gap.severity === "high" ? "rgba(220,38,38,0.1)" : gap.severity === "medium" ? "rgba(202,138,4,0.1)" : "rgba(255,255,255,0.04)",
                      textTransform: "uppercase"
                    }}>{gap.severity}</span>
                  </div>

                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginBottom: 12 }}>{gap.detail}</div>

                  <div style={{
                    padding: "10px 14px", borderRadius: 10,
                    background: "rgba(200,170,120,0.05)", borderLeft: "3px solid var(--gold-dim)"
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", marginBottom: 2 }}>→ {gap.fix}</div>
                    {gap.unlocks > 0 && (
                      <div style={{ fontSize: 10, color: "var(--dim)", fontFamily: "var(--mono)" }}>🔗 Unlocks {gap.unlocks} new outfit combinations</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════ STATS ═══════ */}
        {tab === "stats" && (
          <div key="stats">
            <div className="fu" style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 800 }}>Wardrobe Analytics</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Deep insights into your clothing habits</div>
            </div>
            <Analytics wardrobe={wardrobe} />
          </div>
        )}

        {/* ═══════ VISION ═══════ */}
        {tab === "vision" && (
          <div key="vision">
            {/* Hero */}
            <div className="fu" style={{
              textAlign: "center", padding: "28px 16px 24px", marginBottom: 20,
              borderRadius: 20, position: "relative", overflow: "hidden",
              background: "linear-gradient(160deg, rgba(200,170,120,0.1) 0%, rgba(200,170,120,0.02) 50%, rgba(200,170,120,0.06) 100%)",
              border: "1px solid rgba(200,170,120,0.15)"
            }}>
              <div style={{ position: "absolute", top: -60, left: -60, width: 180, height: 180, background: "radial-gradient(circle, rgba(200,170,120,0.08), transparent)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: -40, right: -40, width: 140, height: 140, background: "radial-gradient(circle, rgba(200,170,120,0.06), transparent)", borderRadius: "50%" }} />
              <div style={{ fontSize: 36, marginBottom: 8 }}>🚀</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 900, color: "var(--gold)", lineHeight: 1.2, marginBottom: 6, position: "relative" }}>
                The Full Vision
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto", position: "relative" }}>
                You're seeing a prototype. Here's everything AURAWEAR will become — your complete wardrobe intelligence platform.
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
                {[
                  { n: "5", l: "Current" },
                  { n: "22", l: "Planned" },
                  { n: "3", l: "Phases" },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", fontFamily: "var(--display)" }}>{s.n}</div>
                    <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1, fontFamily: "var(--mono)" }}>{s.l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Live Now */}
            <div className="fu d1" style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#0c0b09", padding: "3px 10px",
                  borderRadius: 6, background: "#4ade80", fontFamily: "var(--mono)"
                }}>LIVE NOW</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>What You're Seeing Today</span>
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {[
                  { icon: "👔", title: "Smart Outfit Suggestions", desc: "AI picks daily outfits based on your occasion — office, date, party, travel, and more" },
                  { icon: "☀️", title: "Weather-Aware Recommendations", desc: "Outfit picks factor in today's weather so you're always comfortable" },
                  { icon: "📅", title: "Outfit Calendar & History", desc: "Track what you wore each day with ratings — never repeat last week's look" },
                  { icon: "🔍", title: "Shopping Link Analyzer", desc: "Paste any product URL, get instant buy/skip verdict with wardrobe match score" },
                  { icon: "📊", title: "Wardrobe Gap Analysis", desc: "See exactly what's missing — color gaps, category gaps, occasion gaps — with fix suggestions" },
                  { icon: "💰", title: "Cost-Per-Wear Analytics", desc: "Know which clothes give you the best value and which are wasting money in your closet" },
                  { icon: "🛒", title: "AI Shopping Advisor", desc: "Every potential purchase scored 0-100 against your wardrobe — with outfit combos it unlocks" },
                  { icon: "🎨", title: "Color Palette Analysis", desc: "Visual breakdown of your wardrobe's color distribution revealing imbalances" },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "12px 14px", borderRadius: 12,
                    background: "rgba(22,163,106,0.04)", border: "1px solid rgba(22,163,106,0.1)"
                  }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{f.title}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, fontFamily: "var(--mono)", fontWeight: 600 }}>COMING NEXT</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* Phase 1 */}
            <div className="fu d2" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#0c0b09", padding: "3px 10px",
                  borderRadius: 6, background: "var(--gold)", fontFamily: "var(--mono)"
                }}>PHASE 1</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Zero-Effort Wardrobe Building</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5, paddingLeft: 4 }}>
                The #1 problem with wardrobe apps — nobody wants to photograph 100 clothes. We're solving this completely.
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { icon: "📸", title: "Quick Capture Mode", desc: "Hold up any garment for 2 seconds — AI auto-detects type, color, pattern, and style. Background removed instantly. Scan your entire wardrobe in minutes, not hours. No typing, no manual tagging. ~85-90% accuracy on single items.", tag: "GAME CHANGER" },
                  { icon: "📧", title: "Email Receipt Auto-Import", desc: "Connect your Gmail — every online purchase from Myntra, Ajio, Amazon, Flipkart, Zara gets auto-added with full product data, images, and price.", tag: null },
                  { icon: "🔗", title: "Browser Extension", desc: "Install our Chrome extension. Every time you buy something online, it silently adds to your wardrobe. Zero effort after setup.", tag: null },
                  { icon: "🏷️", title: "Brand API Integration", desc: "Direct partnerships with major brands — your purchase history syncs automatically. Buy a shirt at Zara? It appears in your closet instantly.", tag: "FUTURE" },
                  { icon: "📱", title: "UPI/Bank SMS Parsing", desc: "Detect clothing purchases from UPI and bank transaction SMS. Auto-suggest adding items when a fashion spend is detected.", tag: null },
                ].map((f, i) => (
                  <div key={i} style={{
                    padding: "14px 16px", borderRadius: 14,
                    background: "rgba(200,170,120,0.04)", border: "1px solid rgba(200,170,120,0.1)",
                    position: "relative"
                  }}>
                    {f.tag && <span style={{
                      position: "absolute", top: 10, right: 10, fontSize: 8, fontWeight: 700,
                      letterSpacing: 1, color: f.tag === "GAME CHANGER" ? "#4ade80" : "var(--gold)",
                      padding: "2px 7px", borderRadius: 4,
                      background: f.tag === "GAME CHANGER" ? "rgba(22,163,106,0.15)" : "rgba(200,170,120,0.12)",
                      fontFamily: "var(--mono)"
                    }}>{f.tag}</span>}
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{f.title}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div className="fu d3" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#0c0b09", padding: "3px 10px",
                  borderRadius: 6, background: "#818cf8", fontFamily: "var(--mono)"
                }}>PHASE 2</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>AI Stylist Intelligence</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5, paddingLeft: 4 }}>
                Your personal AI stylist that learns your body, your taste, and your life.
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { icon: "🪞", title: "Virtual Try-On (Basic)", desc: "Upload a full-body photo. Using third-party APIs (like Google's Virtual Try-On or Fashn.ai), see approximate overlays of clothing on your body shape. Not perfect — but useful for color/silhouette preview before buying. Full AR try-on is a Phase 3 moonshot.", color: "#818cf8" },
                  { icon: "📐", title: "Body Measurement Profile", desc: "Input your measurements once. Get size recommendations across brands — no more returns because the medium was too small. We'll build a brand-size database from user-reported data.", color: "#818cf8" },
                  { icon: "🧠", title: "Style Learning AI", desc: "The more you rate outfits, the smarter it gets. After 2 weeks, it knows your style better than you do — subtle pattern matching on colors, fits, and combinations you love. Built on collaborative filtering + your personal preference model.", color: "#818cf8" },
                  { icon: "🌡️", title: "Live Weather Integration", desc: "Real-time OpenWeatherMap API — suggestions adapt to temperature, rain probability, UV index. Tells you to grab a jacket before you leave. Fully buildable in a week.", color: "#818cf8" },
                  { icon: "📆", title: "Calendar Integration", desc: "Syncs with Google Calendar. Got a board meeting at 10 AM and a dinner date at 7 PM? Get outfits planned for both, with a smart transition piece.", color: "#818cf8" },
                  { icon: "🧺", title: "Laundry Tracking", desc: "Mark clothes as 'in the wash.' Suggestions only include what's clean and available right now. Integrates with laundry services like UClean.", color: "#818cf8" },
                ].map((f, i) => (
                  <div key={i} style={{
                    padding: "14px 16px", borderRadius: 14,
                    background: "rgba(129,140,248,0.04)", border: "1px solid rgba(129,140,248,0.1)"
                  }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{f.title}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 3 */}
            <div className="fu d4" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#0c0b09", padding: "3px 10px",
                  borderRadius: 6, background: "#f472b6", fontFamily: "var(--mono)"
                }}>PHASE 3</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Social & Commerce Platform</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5, paddingLeft: 4 }}>
                Turn AURAWEAR into a platform — where people share, sell, shop, and discover fashion together.
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { icon: "👨‍👩‍👧‍👦", title: "Family Wardrobe Sharing", desc: "Shared closet for families. Plan wedding outfits together — no color clashes. Maa can see everyone's clothes and coordinate. Trip packing becomes collaborative." },
                  { icon: "♻️", title: "Sell & Swap Marketplace", desc: "Haven't worn something in 6 months? One-tap list on our marketplace. Earn money from your neglected clothes. Think 'Poshmark for India' powered by wardrobe data." },
                  { icon: "🛍️", title: "In-App Shopping with Affiliate", desc: "Buy recommended items directly in-app. We earn commissions from Myntra, Ajio, Amazon — so the app stays free for users. Shopping links open pre-scored in your browser." },
                  { icon: "💬", title: "Outfit Social Feed", desc: "Post your daily outfits. Get likes, comments, and style tips from the community. Discover how others style the same shirt you own." },
                  { icon: "👗", title: "Professional Stylist Marketplace", desc: "Connect with real stylists who can see your wardrobe and create custom lookbooks. Pay per session — perfect for events, interviews, or a total style overhaul." },
                  { icon: "🎯", title: "Capsule Wardrobe Mode", desc: "AI identifies the optimal 30 pieces from your 100+ items that create maximum outfit combinations. Minimalist living, maximized style. Shows exactly what to keep and what to donate." },
                  { icon: "🏆", title: "Style Challenges", desc: "Weekly community challenges — 'Style one item 5 ways' or 'Best office look under ₹5000.' Gamified engagement with badges and leaderboards." },
                  { icon: "📦", title: "Subscription Styling Boxes", desc: "Based on your gap analysis, receive monthly curated clothing boxes. Try items at home, keep what you love, return the rest. Each item pre-scored for your wardrobe." },
                ].map((f, i) => (
                  <div key={i} style={{
                    padding: "14px 16px", borderRadius: 14,
                    background: "rgba(244,114,182,0.03)", border: "1px solid rgba(244,114,182,0.1)"
                  }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{f.title}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Model */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, fontFamily: "var(--mono)", fontWeight: 600 }}>BUSINESS MODEL</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div className="fu" style={{ marginBottom: 24 }}>
              <div style={{
                padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)"
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>💰</span> How AURAWEAR Makes Money
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    { title: "Free Tier", desc: "Core wardrobe management, basic outfit suggestions, limited gap analysis. Always free.", price: "₹0", accent: "#4ade80" },
                    { title: "AURAWEAR Pro", desc: "Unlimited AI styling, virtual try-on, calendar sync, advanced analytics, priority support.", price: "₹149/mo", accent: "var(--gold)" },
                    { title: "Affiliate Revenue", desc: "Commission on shopping recommendations — Myntra, Ajio, Amazon partnerships. User buys through our scored links.", price: "3-8%", accent: "#818cf8" },
                    { title: "Brand Partnerships", desc: "Brands pay for targeted, wardrobe-aware ads. 'This user needs a white formal shirt' = highest intent advertising.", price: "B2B", accent: "#f472b6" },
                    { title: "Marketplace Commission", desc: "10-15% on every sale in the sell/swap marketplace between users.", price: "10-15%", accent: "#fbbf24" },
                    { title: "Subscription Boxes", desc: "Curated monthly clothing boxes based on wardrobe gaps. Revenue per box + brand partnerships.", price: "₹2-5K/box", accent: "#f97316" },
                  ].map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "start", gap: 12, padding: "12px 14px",
                      borderRadius: 12, background: "rgba(0,0,0,0.2)",
                      borderLeft: `3px solid ${r.accent}`
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginTop: 2 }}>{r.desc}</div>
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: 700, color: r.accent, fontFamily: "var(--mono)",
                        padding: "4px 10px", borderRadius: 8, background: `${r.accent}15`,
                        whiteSpace: "nowrap", flexShrink: 0
                      }}>{r.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="fu" style={{ marginBottom: 24 }}>
              <div style={{
                padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)"
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>⚙️</span> Tech Under the Hood
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Frontend", value: "React Native", sub: "iOS + Android" },
                    { label: "Backend", value: "Node.js + NestJS", sub: "API + Real-time" },
                    { label: "AI/ML", value: "TensorFlow + GPT", sub: "Vision + Language" },
                    { label: "Database", value: "PostgreSQL", sub: "Relational" },
                    { label: "AR Engine", value: "ARKit / ARCore", sub: "Virtual Try-On" },
                    { label: "Cloud", value: "AWS / Firebase", sub: "Scalable Infra" },
                    { label: "Auth", value: "Firebase Auth", sub: "Google / Phone" },
                    { label: "Payments", value: "Razorpay", sub: "UPI / Cards" },
                  ].map((t, i) => (
                    <div key={i} style={{
                      padding: "10px 12px", borderRadius: 10, background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border)"
                    }}>
                      <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1, fontFamily: "var(--mono)", fontWeight: 600 }}>{t.label.toUpperCase()}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 2 }}>{t.value}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)" }}>{t.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA - How Quick Capture Works */}
            <div className="fu" style={{ marginBottom: 24 }}>
              <div style={{
                padding: 18, borderRadius: 16,
                background: "linear-gradient(160deg, rgba(22,163,106,0.06), rgba(22,163,106,0.01))",
                border: "1px solid rgba(22,163,106,0.15)"
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>📸</span> How Quick Capture Actually Works
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>
                  Our core wardrobe-building feature — here's the real technical pipeline
                </div>

                {/* Pipeline visual */}
                <div style={{ display: "grid", gap: 6 }}>
                  {[
                    { step: "1", title: "Hold Up Garment", desc: "User holds any clothing item in front of the camera. Any background — bed, wall, floor.", time: "0s", tech: "Camera API" },
                    { step: "2", title: "Auto-Detect & Segment", desc: "AI isolates the garment from background using Segment Anything Model or rembg library.", time: "0.5s", tech: "SAM / rembg" },
                    { step: "3", title: "Classify Type", desc: "MobileNet-based classifier identifies: shirt, pants, jacket, shoes, etc. with sub-categories.", time: "0.3s", tech: "TFLite / MobileNet" },
                    { step: "4", title: "Extract Attributes", desc: "Dominant color extraction, pattern detection (solid/striped/checked/floral), fabric estimation.", time: "0.4s", tech: "OpenCV + CNN" },
                    { step: "5", title: "Clean Photo Created", desc: "Background removed, image cropped and saved as a clean product-style photo for your closet.", time: "0.3s", tech: "Image Processing" },
                    { step: "6", title: "User Confirms", desc: "Quick confirmation screen — tap to accept or adjust. One tap and it's in your wardrobe.", time: "User", tech: "UI" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "start", gap: 10, padding: "10px 12px",
                      borderRadius: 10, background: "rgba(0,0,0,0.2)"
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        background: "rgba(22,163,106,0.15)", border: "1px solid rgba(22,163,106,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, color: "#4ade80", fontFamily: "var(--mono)"
                      }}>{s.step}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{s.title}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4, marginTop: 1 }}>{s.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#4ade80", fontFamily: "var(--mono)" }}>{s.time}</div>
                        <div style={{ fontSize: 8, color: "var(--dim)", fontFamily: "var(--mono)", marginTop: 1 }}>{s.tech}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 12, padding: "10px 14px", borderRadius: 10,
                  background: "rgba(22,163,106,0.08)", borderLeft: "3px solid rgba(22,163,106,0.4)",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#4ade80" }}>Total time per item: ~1.5 seconds AI + 2s user</div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>50 items ≈ 4 minutes vs 60+ minutes manual entry</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "var(--mono)" }}>15×</div>
                </div>
              </div>
            </div>

            {/* Feature Feasibility Matrix */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, fontFamily: "var(--mono)", fontWeight: 600 }}>HONEST FEASIBILITY</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div className="fu" style={{ marginBottom: 24 }}>
              <div style={{
                padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)"
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🎯</span> Technical Reality Check
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>
                  Every feature rated honestly — difficulty, timeline, and what it depends on.
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {[
                    { feature: "Quick Capture Mode", diff: "Medium", time: "2-3 months", doable: "YES", api: "rembg + MobileNet + Google Vision", note: "Core tech proven, needs fine-tuning for Indian clothing styles", color: "#4ade80" },
                    { feature: "Gmail Receipt Import", diff: "Easy", time: "2-4 weeks", doable: "YES", api: "Gmail API + regex parsers", note: "Well-documented API. Main work is parsing 20+ retailer email formats", color: "#4ade80" },
                    { feature: "Browser Extension", diff: "Easy", time: "2-3 weeks", doable: "YES", api: "Chrome Extension API", note: "Standard tech. Detect checkout pages, scrape product data", color: "#4ade80" },
                    { feature: "Weather-Based Outfits", diff: "Easy", time: "1 week", doable: "YES", api: "OpenWeatherMap API", note: "Free tier covers 1M calls/month. Map temp ranges to clothing weights", color: "#4ade80" },
                    { feature: "Google Calendar Sync", diff: "Easy", time: "1-2 weeks", doable: "YES", api: "Google Calendar API", note: "Read events, detect keywords (meeting, dinner, gym), suggest outfits", color: "#4ade80" },
                    { feature: "Style Learning AI", diff: "Hard", time: "3-6 months", doable: "YES*", api: "Collaborative filtering + embeddings", note: "Needs 500+ outfit ratings to train. Cold start problem — use rule-based until enough data", color: "#fbbf24" },
                    { feature: "Laundry Tracking", diff: "Easy", time: "1 week", doable: "YES", api: "Local state + optional UClean API", note: "Simple toggle per item. Laundry service integration needs partnership", color: "#4ade80" },
                    { feature: "Virtual Try-On", diff: "Very Hard", time: "6-12 months", doable: "PARTIAL", api: "Google VTO API / Fashn.ai", note: "Third-party APIs exist but quality varies. Full AR needs dedicated CV team + massive budget", color: "#f87171" },
                    { feature: "Body Size Recommendations", diff: "Medium", time: "2-3 months", doable: "YES", api: "User input + brand size DB", note: "Build size database from user-reported data. Not ML — just lookup tables per brand", color: "#fbbf24" },
                    { feature: "Family Wardrobe Sharing", diff: "Medium", time: "1-2 months", doable: "YES", api: "Firebase Realtime DB / Firestore", note: "Standard multi-user auth + shared collections. Indian wedding planning is killer use case", color: "#4ade80" },
                    { feature: "Sell/Swap Marketplace", diff: "Hard", time: "3-4 months", doable: "YES", api: "Stripe/Razorpay + image hosting", note: "Full e-commerce flow. Payments, listings, chat, disputes. Consider partnering with OLX API first", color: "#fbbf24" },
                    { feature: "UPI/SMS Parsing", diff: "Medium", time: "1-2 months", doable: "YES*", api: "SMS Permission + NLP", note: "Android only. iOS blocks SMS access. Privacy concerns — needs careful user consent flow", color: "#fbbf24" },
                    { feature: "Brand API Partnerships", diff: "Hard", time: "6+ months", doable: "SLOW", api: "Partner negotiations", note: "Not a tech problem — it's a business development problem. Need traction first (100K+ users)", color: "#f87171" },
                    { feature: "Subscription Boxes", diff: "Very Hard", time: "6-12 months", doable: "LATE", api: "Full logistics + inventory", note: "Requires physical operations — warehousing, inventory, returns. Phase 3 minimum", color: "#f87171" },
                  ].map((f, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "start", gap: 10, padding: "10px 12px",
                      borderRadius: 10, background: "rgba(0,0,0,0.15)",
                      borderLeft: `3px solid ${f.color}`
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{f.feature}</span>
                          <span style={{
                            fontSize: 8, fontWeight: 700, letterSpacing: 0.5, padding: "2px 6px", borderRadius: 4,
                            background: `${f.color}18`, color: f.color, fontFamily: "var(--mono)"
                          }}>{f.doable}</span>
                        </div>
                        <div style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.4, marginBottom: 3 }}>{f.note}</div>
                        <div style={{ display: "flex", gap: 8, fontSize: 9, color: "var(--dim)", fontFamily: "var(--mono)" }}>
                          <span>⏱ {f.time}</span>
                          <span>📊 {f.diff}</span>
                          <span style={{ color: "var(--muted)" }}>🔧 {f.api}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: 14, marginTop: 14, justifyContent: "center" }}>
                  {[
                    { color: "#4ade80", label: "Fully Buildable" },
                    { color: "#fbbf24", label: "Buildable with Caveats" },
                    { color: "#f87171", label: "Hard / Needs Scale" },
                  ].map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: "var(--muted)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 3, background: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="fu" style={{
              textAlign: "center", padding: "28px 20px", borderRadius: 20,
              background: "linear-gradient(160deg, rgba(200,170,120,0.1), rgba(200,170,120,0.03))",
              border: "1px solid rgba(200,170,120,0.2)", marginBottom: 12
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 800, color: "var(--gold)", marginBottom: 6 }}>
                What Do You Think?
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16, maxWidth: 300, margin: "0 auto 16px" }}>
                This is just the beginning. Your feedback decides which features we build first. Tap below and be brutally honest.
              </div>
              <button onClick={() => setShowFeedback(true)} style={{
                padding: "14px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700,
                background: "linear-gradient(135deg, var(--gold), #a08960)", color: "#0c0b09",
                border: "none", cursor: "pointer", fontFamily: "var(--body)",
                boxShadow: "0 4px 20px rgba(200,170,120,0.3)", transition: "transform 0.2s",
                letterSpacing: 0.5
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Share Your Feedback →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════ FEEDBACK FLOATING BUTTON ═══════ */}
      {!showFeedback && (
        <button onClick={() => setShowFeedback(true)} style={{
          position: "fixed", bottom: 70, right: 16, zIndex: 20,
          width: 48, height: 48, borderRadius: 16, border: "none",
          background: "linear-gradient(135deg, var(--gold), #a08960)",
          color: "#0c0b09", fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(200,170,120,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", animation: "glow 3s ease-in-out infinite",
          transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >💬</button>
      )}

      {/* ═══════ FEEDBACK PANEL ═══════ */}
      {showFeedback && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          animation: "fadeIn 0.2s ease-out"
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowFeedback(false); }}>
          <div style={{
            width: "100%", maxWidth: 460, maxHeight: "85vh", overflowY: "auto",
            background: "#141310", borderRadius: "24px 24px 0 0",
            border: "1px solid rgba(200,170,120,0.15)", borderBottom: "none",
            padding: "24px 20px 32px", animation: "fadeUp 0.3s ease-out"
          }}>
            {fbSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🙏</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 800, color: "var(--gold)", marginBottom: 6 }}>Thank You!</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Your feedback is incredibly valuable to us.</div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 800, color: "var(--gold)" }}>Share Feedback</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Help us build the perfect wardrobe app</div>
                  </div>
                  <button onClick={() => setShowFeedback(false)} style={{
                    width: 32, height: 32, borderRadius: 10, border: "1px solid var(--border)",
                    background: "transparent", color: "var(--muted)", cursor: "pointer", fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>✕</button>
                </div>

                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: 0.5, marginBottom: 6, display: "block" }}>YOUR NAME</label>
                  <input value={fbName} onChange={e => setFbName(e.target.value)} placeholder="Enter your name..."
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: 12, fontSize: 14,
                      background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)",
                      color: "var(--text)", fontFamily: "var(--body)"
                    }} />
                </div>

                {/* Rating */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: 0.5, marginBottom: 8, display: "block" }}>OVERALL IMPRESSION</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1,2,3,4,5].map(i => (
                      <button key={i} onClick={() => setFbRating(i)} style={{
                        flex: 1, padding: "12px 0", borderRadius: 12, fontSize: 22,
                        border: fbRating >= i ? "1px solid var(--gold)" : "1px solid var(--border)",
                        background: fbRating >= i ? "rgba(200,170,120,0.12)" : "rgba(0,0,0,0.2)",
                        cursor: "pointer", transition: "all 0.2s"
                      }}>
                        {fbRating >= i ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 11, color: "var(--gold)", marginTop: 6, fontWeight: 600, minHeight: 16 }}>
                    {fbRating === 1 && "Needs a lot of work"}
                    {fbRating === 2 && "Has potential"}
                    {fbRating === 3 && "Pretty good concept"}
                    {fbRating === 4 && "Really impressive!"}
                    {fbRating === 5 && "I would use this daily!"}
                  </div>
                </div>

                {/* Feature Rating */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: 0.5, marginBottom: 8, display: "block" }}>MOST USEFUL FEATURES (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[
                      "Daily Outfit Suggestions", "Weather-Based Picks", "Shopping Advisor",
                      "Link Analyzer (Buy/Skip)", "Wardrobe Gap Analysis", "Outfit Calendar",
                      "Cost Per Wear Stats", "Smart Import", "Color Analytics"
                    ].map(f => (
                      <button key={f} onClick={() => toggleFbFeature(f)} style={{
                        padding: "7px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                        border: fbFeatures.includes(f) ? "1px solid var(--gold)" : "1px solid var(--border)",
                        background: fbFeatures.includes(f) ? "rgba(200,170,120,0.14)" : "transparent",
                        color: fbFeatures.includes(f) ? "var(--gold)" : "var(--dim)",
                        cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--body)"
                      }}>{fbFeatures.includes(f) ? "✓ " : ""}{f}</button>
                    ))}
                  </div>
                </div>

                {/* Open Feedback */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: 0.5, marginBottom: 6, display: "block" }}>SUGGESTIONS & IDEAS</label>
                  <textarea value={fbText} onChange={e => setFbText(e.target.value)}
                    placeholder="What would make you download this app? Any features you'd add or change? Be brutally honest — we want the truth!"
                    rows={4}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12, fontSize: 13,
                      background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)",
                      color: "var(--text)", fontFamily: "var(--body)", resize: "vertical",
                      lineHeight: 1.5
                    }} />
                </div>

                {/* Submit */}
                <button onClick={submitFeedback} disabled={!fbRating} style={{
                  width: "100%", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 700,
                  background: fbRating ? "linear-gradient(135deg, var(--gold), #a08960)" : "#333",
                  color: fbRating ? "#0c0b09" : "#666", border: "none",
                  cursor: fbRating ? "pointer" : "not-allowed", fontFamily: "var(--body)",
                  transition: "all 0.3s", letterSpacing: 0.5
                }}>
                  Submit Feedback →
                </button>

                <div style={{ textAlign: "center", fontSize: 10, color: "var(--dim)", marginTop: 10 }}>
                  Built with ♠ by AURAWEAR · Feedback is anonymous
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════ BOTTOM NAV ═══════ */}
      <div style={{
        position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 10,
        background: "rgba(12,11,9,0.92)", backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-around", padding: "6px 0 10px",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: tab === t.id ? "var(--gold)" : "var(--dim)",
            transition: "all 0.25s", fontFamily: "var(--body)", padding: "4px 8px",
            position: "relative"
          }}>
            {tab === t.id && <div style={{ position: "absolute", top: -7, width: 16, height: 2, borderRadius: 1, background: "var(--gold)", animation: "glow 2s ease-in-out infinite" }} />}
            <span style={{ fontSize: 18, lineHeight: 1, transition: "transform 0.25s", transform: tab === t.id ? "scale(1.1)" : "scale(1)" }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
