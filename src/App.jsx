import React, { useState, useEffect } from "react";

// --- Категории (с эмодзи, названия и количество товаров) ---
const CATEGORIES = [
  {
    name: "Безопасный Интернет",
    emoji: "🛡️",
    products: [ { name: "VPN PRO" }, { name: "VPN LITE" }, { name: "Adblock" }, { name: "Proxy" }, { name: "Антивирус" } ]
  },
  {
    name: "Steam",
    emoji: "🎮",
    products: [ { name: "Steam Gift" }, { name: "Steam Key" }, { name: "Скидки Steam" }, { name: "Steam Wallet" }, { name: "Steam аккаунт" } ]
  },
  {
    name: "Игровые сервисы",
    emoji: "🕹️",
    products: Array.from({ length: 146 }, (_, i) => ({ name: `Game Service ${i+1}` }))
  },
  {
    name: "Сервисы",
    emoji: "💡",
    products: Array.from({ length: 18 }, (_, i) => ({ name: `Сервис ${i+1}` }))
  },
  {
    name: "Marvel Rivals",
    emoji: "🦸",
    products: Array.from({ length: 6 }, (_, i) => ({ name: `Marvel Rivals #${i+1}` }))
  },
  {
    name: "PUBG",
    emoji: "🔫",
    products: Array.from({ length: 19 }, (_, i) => ({ name: `PUBG товар ${i+1}` }))
  },
  {
    name: "AXUAI (ИИ)",
    emoji: "🤖",
    products: Array.from({ length: 4 }, (_, i) => ({ name: `AXUAI Product ${i+1}` }))
  }
];

const ACCENT = "#fff";
const BG = "radial-gradient(115% 80% at 50% 20%, #22243c 80%, #161723 100%)";
const CARD = "rgba(30,34,54,0.98)";
const SHADOW = "0 2px 22px #1b143928, 0 1.5px 6px #3f299d14";

const App = () => {
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState("");
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const f = () => setVw(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  const isMobile = vw < 600;

  // --- Категории, отфильтрованные по поиску
  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- Товары, отфильтрованные по поиску (если уже внутри категории)
  const filteredProducts = selectedCat
    ? selectedCat.products.filter(prod => prod.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  // --- Возврат к категориям
  const goBack = () => { setSelectedCat(null); setSearch(""); };

  return (
    <div style={{
      minHeight: "100vh",
      background: BG,
      color: ACCENT,
      fontFamily: "Inter, system-ui, sans-serif",
      padding: isMobile ? "22px 0 0 0" : "34px 0 0 0"
    }}>
      <div style={{
        maxWidth: 400,
        margin: "0 auto",
        padding: isMobile ? "0 6px" : "0 18px"
      }}>
        {/* Заголовок + поиск */}
        {!selectedCat && (
          <>
            <div style={{
              fontWeight: 800,
              fontSize: isMobile ? 22 : 27,
              letterSpacing: "0.01em",
              marginBottom: 18
            }}>Категории</div>
            <div style={{
              background: "rgba(33,35,53,0.92)",
              borderRadius: 15,
              marginBottom: 25,
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
          </>
        )}

        {/* --- Сетка категорий --- */}
        {!selectedCat && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: isMobile ? 17 : 24
          }}>
            {(search.trim() === "" ? CATEGORIES : filteredCategories).map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => { setSelectedCat(cat); setSearch(""); }}
                style={{
                  background: CARD,
                  borderRadius: 15,
                  boxShadow: SHADOW,
                  border: "none",
                  padding: isMobile ? "16px 5px 13px 5px" : "22px 8px 18px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "box-shadow .17s, transform .17s",
                  cursor: "pointer"
                }}
              >
                <span style={{
                  fontSize: isMobile ? 30 : 38,
                  marginBottom: 7
                }}>{cat.emoji}</span>
                <span style={{
                  fontWeight: 700,
                  fontSize: isMobile ? 14.2 : 16.4,
                  marginBottom: 3,
                  color: "#fff"
                }}>{cat.name}</span>
                <span style={{
                  color: "#b8bece",
                  fontSize: isMobile ? 13.2 : 14.2,
                  fontWeight: 500
                }}>{cat.products.length} товаров</span>
              </button>
            ))}
          </div>
        )}

        {/* --- Окно товаров категории --- */}
        {selectedCat && (
          <>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 14
            }}>
              <button onClick={goBack} style={{
                background: "rgba(39,41,60,0.88)",
                border: "none",
                borderRadius: 10,
                marginRight: 12,
                cursor: "pointer",
                fontSize: isMobile ? 18 : 22,
                color: "#fff",
                padding: isMobile ? "7px 12px" : "9px 15px",
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
              background: "rgba(34,36,60,0.93)",
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

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 13 : 15
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
                  </div>
                ))
              }
            </div>
          </>
        )}

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
};

export default App;
