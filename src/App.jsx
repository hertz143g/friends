import React, { useState, useEffect } from "react";

// ---- Категории и товары ----
const CATEGORIES = [
  {
    name: "Безопасный Интернет",
    emoji: "🛡️",
    products: [
      { name: "VPN PRO", desc: "Высокая скорость" },
      { name: "VPN LITE", desc: "Для браузера" },
      { name: "Adblock", desc: "Блокировка рекламы" },
      { name: "Proxy", desc: "Анонимность" },
      { name: "Антивирус", desc: "Для Windows" }
    ]
  },
  {
    name: "Steam",
    emoji: "🎮",
    products: [
      { name: "Steam Gift" },
      { name: "Steam Key" },
      { name: "Скидки Steam" },
      { name: "Steam Wallet" },
      { name: "Steam аккаунт" }
    ]
  },
  {
    name: "Игровые сервисы",
    emoji: "🕹️",
    products: Array.from({ length: 7 }, (_, i) => ({ name: `Game Service ${i+1}` }))
  },
  {
    name: "Сервисы",
    emoji: "💡",
    products: Array.from({ length: 5 }, (_, i) => ({ name: `Сервис ${i+1}` }))
  },
  {
    name: "Marvel Rivals",
    emoji: "🦸",
    products: Array.from({ length: 6 }, (_, i) => ({ name: `Marvel Rivals #${i+1}` }))
  },
  {
    name: "PUBG",
    emoji: "🔫",
    products: Array.from({ length: 3 }, (_, i) => ({ name: `PUBG товар ${i+1}` }))
  },
  {
    name: "AXUAI (ИИ)",
    emoji: "🤖",
    products: Array.from({ length: 4 }, (_, i) => ({ name: `AXUAI Product ${i+1}` }))
  }
];

const BG = "radial-gradient(115% 80% at 50% 20%, #22243c 80%, #161723 100%)";
const CARD = "rgba(33,35,55,0.93)";
const SHADOW = "0 2px 22px #1b143928, 0 1.5px 6px #3f299d14";
const ACCENT = "#fff";

// ---- App ----
export default function App() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState("");
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 600;

  // --- Категории по поиску
  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- Товары по поиску
  const filteredProducts = selectedCat
    ? selectedCat.products.filter(prod => prod.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div style={{
      minHeight: "100vh",
      background: BG,
      color: ACCENT,
      fontFamily: "Inter, system-ui, sans-serif",
      padding: isMobile ? "24px 0 0 0" : "44px 0 0 0"
    }}>
      <div style={{
        maxWidth: 410,
        margin: "0 auto",
        padding: isMobile ? "0 8px" : "0 18px"
      }}>

        {/* ----------- Категории ----------- */}
        {!selectedCat && (
          <>
            <div style={{
              fontWeight: 800,
              fontSize: isMobile ? 23 : 27,
              letterSpacing: "0.01em",
              marginBottom: 18
            }}>Категории</div>

            <div style={{
              background: "rgba(33,35,53,0.93)",
              borderRadius: 16,
              marginBottom: 27,
              padding: isMobile ? "10px 13px" : "13px 17px",
              display: "flex",
              alignItems: "center",
              boxShadow: SHADOW
            }}>
              <svg width={22} height={22} style={{ opacity: 0.5, marginRight: 8 }}>
                <circle cx={11} cy={11} r={9} stroke="#fff8" strokeWidth={2} fill="none"/>
                <path d="M17 17L21 21" stroke="#fff8" strokeWidth={2} strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск товаров"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 500,
                  outline: "none",
                  width: "100%"
                }}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  style={{
                    background: "none", border: "none", color: "#aaa",
                    fontSize: 18, cursor: "pointer", marginLeft: 3
                  }}>✕</button>
              )}
            </div>

            {/* ---- Сетка категорий ---- */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: isMobile ? 17 : 24
            }}>
              {(search.trim() === "" ? CATEGORIES : filteredCategories).map(cat => (
                <button
                  key={cat.name}
                  onClick={() => { setSelectedCat(cat); setSearch(""); }}
                  style={{
                    background: CARD,
                    borderRadius: 16,
                    boxShadow: SHADOW,
                    border: "none",
                    padding: isMobile ? "17px 7px 14px 7px" : "25px 10px 17px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "box-shadow .15s, transform .13s"
                  }}
                >
                  <span style={{
                    fontSize: isMobile ? 32 : 39,
                    marginBottom: 7
                  }}>{cat.emoji}</span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: isMobile ? 14.2 : 16.4,
                    marginBottom: 3,
                    color: "#fff",
                    textAlign: "center"
                  }}>{cat.name}</span>
                  <span style={{
                    color: "#b8bece",
                    fontSize: isMobile ? 12.5 : 14.2,
                    fontWeight: 500
                  }}>{cat.products.length} товаров</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ----------- Товары категории ----------- */}
        {selectedCat && (
          <>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 18,
              marginTop: isMobile ? 6 : 10
            }}>
              <button onClick={() => { setSelectedCat(null); setSearch(""); }} style={{
                background: "rgba(39,41,60,0.88)",
                border: "none",
                borderRadius: 11,
                marginRight: 12,
                cursor: "pointer",
                fontSize: isMobile ? 18 : 22,
                color: "#fff",
                padding: isMobile ? "7px 13px" : "11px 17px",
                boxShadow: SHADOW,
                transition: ".15s"
              }}>←</button>
              <span style={{
                fontWeight: 800,
                fontSize: isMobile ? 18 : 22,
                letterSpacing: ".01em"
              }}>{selectedCat.emoji} {selectedCat.name}</span>
            </div>

            <div style={{
              background: "rgba(34,36,60,0.96)",
              borderRadius: 13,
              marginBottom: 17,
              padding: isMobile ? "10px 13px" : "13px 17px",
              display: "flex",
              alignItems: "center",
              boxShadow: SHADOW
            }}>
              <svg width={20} height={20} style={{ opacity: 0.5, marginRight: 8 }}>
                <circle cx={10} cy={10} r={8} stroke="#fff8" strokeWidth={2} fill="none"/>
                <path d="M15 15L19 19" stroke="#fff8" strokeWidth={2} strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск по товарам"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 500,
                  outline: "none",
                  width: "100%"
                }}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  style={{
                    background: "none", border: "none", color: "#aaa",
                    fontSize: 18, cursor: "pointer", marginLeft: 3
                  }}>✕</button>
              )}
            </div>

            {/* ---- Список товаров ---- */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 13 : 17
            }}>
              {filteredProducts.length === 0
                ? <div style={{
                    color: "#b8bece",
                    fontWeight: 500,
                    fontSize: isMobile ? 14 : 16,
                    textAlign: "center",
                    marginTop: 30
                  }}>Товары не найдены</div>
                : filteredProducts.map((prod, i) => (
                  <div key={prod.name} style={{
                    background: "rgba(32,35,58,0.99)",
                    borderRadius: 11,
                    padding: isMobile ? "15px 12px" : "17px 18px",
                    boxShadow: SHADOW,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: isMobile ? 15 : 17
                  }}>
                    {prod.name}
                    {prod.desc && (
                      <span style={{ color: "#b8bece", fontWeight: 400, fontSize: isMobile ? 12 : 13, marginLeft: 8 }}>
                        — {prod.desc}
                      </span>
                    )}
                  </div>
                ))
              }
            </div>
          </>
        )}

        <div style={{ height: 36 }} />
      </div>
    </div>
  );
}
