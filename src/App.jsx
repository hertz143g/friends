import React, { useState } from "react";

// --- Цвета и стиль
const ACCENT = "#339DFF";
const BG = "#181D23";
const CARD = "rgba(28,32,42,0.98)";
const BORDER = "rgba(255,255,255,0.08)";
const PLACEHOLDER_IMG = "https://cdn-icons-png.flaticon.com/512/1048/1048314.png";
const LOGO = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";

// --- Категории
const CATEGORIES = [
  { key: "iphone", label: "iPhone" },
  { key: "airpods", label: "AirPods" },
  { key: "imac", label: "iMac" },
  { key: "applewatch", label: "Apple Watch" },
  { key: "airpods-dis", label: "AirPods в разборе" },
  { key: "dyson", label: "Dyson" },
  { key: "gopro", label: "GoPro" },
  { key: "xbox", label: "Xbox" },
  { key: "samsung-s22", label: "Samsung S22/23" },
  { key: "xiaomi", label: "Xiaomi" },
  { key: "poco", label: "Poco" },
  { key: "oneplus", label: "OnePlus" },
  { key: "gshock", label: "Casio G-SHOCK" },
  { key: "marshall", label: "Marshall" },
  { key: "kolonki", label: "Колонки" },
  { key: "macbook", label: "MacBook" },
  { key: "ipad", label: "iPad" },
  { key: "appletv", label: "Apple TV" },
  { key: "accessories", label: "Аксессуары" },
  { key: "pylesos", label: "Пылесос" },
  { key: "ps5", label: "Sony Ps5" },
  { key: "samsung-a", label: "Samsung A / наушники / часы" },
  { key: "samsung-s24", label: "Samsung S24/S25" },
  { key: "redmi", label: "Redmi" },
  { key: "pixel", label: "Google Pixel" },
  { key: "garmin", label: "Часы Garmin" },
  { key: "tv", label: "Телевизоры" },
  { key: "escooter", label: "Электросамокаты" },
  { key: "labubu", label: "Игрушки Labubu" },
];

// --- Пример товаров (замени на свои или подтягивай из БД)
const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro", category: "iphone", price: 120000, img: PLACEHOLDER_IMG },
  { id: 2, name: "AirPods Pro 2", category: "airpods", price: 18000, img: PLACEHOLDER_IMG },
  { id: 3, name: "Apple Watch S9", category: "applewatch", price: 38000, img: PLACEHOLDER_IMG },
  { id: 4, name: "Dyson V15", category: "dyson", price: 67000, img: PLACEHOLDER_IMG },
  { id: 5, name: "Xiaomi Redmi Note", category: "xiaomi", price: 34000, img: PLACEHOLDER_IMG },
  // ... (добавь свои реальные товары!)
];

// --- Категорийная иконка (плейсхолдер)
function CategoryIcon({ category }) {
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: 11,
      background: "#252B34",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width={18} height={18} fill={ACCENT} style={{ opacity: 0.77 }}>
        <circle cx={9} cy={9} r={8} />
      </svg>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [search, setSearch] = useState("");

  // фильтрация
  const filteredProducts = PRODUCTS.filter(
    p =>
      (activeCategory === CATEGORIES[0].key || p.category === activeCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const isMobile = window.innerWidth < 600;
  const mainWidth = isMobile ? "99vw" : 410;
  const sectionGap = isMobile ? 22 : 30;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        fontFamily: "system-ui,sans-serif",
        color: "#fff",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {/* Header */}
      <header style={{
        width: mainWidth,
        margin: "32px auto 18px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <img
          src={LOGO}
          alt="logo"
          style={{
            width: 53,
            height: 53,
            borderRadius: "50%",
            border: `2.5px solid ${ACCENT}`,
            background: "#fff",
            objectFit: "cover",
            boxShadow: "0 0 18px #0007"
          }}
        />
        {/* Меню справа */}
        <button style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          marginRight: 2
        }}>
          <svg width={27} height={27} fill="#fff" style={{ opacity: 0.7 }}>
            <rect x="4" y="8" width="19" height="2.6" rx="1.3" />
            <rect x="4" y="16" width="19" height="2.6" rx="1.3" />
          </svg>
        </button>
      </header>

      {/* Приветствие */}
      <div style={{
        width: mainWidth,
        fontSize: isMobile ? 21 : 25,
        fontWeight: 800,
        lineHeight: 1.16,
        marginBottom: 13,
        letterSpacing: "0.01em"
      }}>
        Hey, buy the best <br />
        <span style={{ color: ACCENT }}>Electronic Gadgets</span>
      </div>

      {/* Поиск */}
      <div style={{
        width: mainWidth,
        margin: "0 0 17px 0",
        position: "relative"
      }}>
        <input
          type="text"
          placeholder="Search any product"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            background: "#232731",
            color: "#fff",
            fontSize: 16,
            fontWeight: 500,
            padding: "15px 18px 15px 45px",
            border: "none",
            borderRadius: 16,
            boxShadow: "0 2px 12px #121e3125",
            outline: "none"
          }}
        />
        <svg
          width={18}
          height={18}
          fill={ACCENT}
          style={{ position: "absolute", top: 15, left: 15, opacity: 0.8 }}
          viewBox="0 0 24 24"
        >
          <path d="M10 2a8 8 0 105.293 14.293l4.854 4.854a1 1 0 001.415-1.414l-4.854-4.854A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </svg>
      </div>

      {/* Категории */}
      <div style={{
        width: mainWidth,
        marginBottom: sectionGap,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch"
      }}>
        <div style={{
          display: "flex",
          gap: 11,
          padding: "4px 0 2px 0",
          minWidth: "100%",
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "7px 7px",
                background: activeCategory === cat.key ? ACCENT : "rgba(37,43,52,0.98)",
                color: activeCategory === cat.key ? "#fff" : "#aac9ff",
                border: "none",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 12.5,
                cursor: "pointer",
                minWidth: 70,
                boxShadow: activeCategory === cat.key ? "0 2px 10px #2370ef22" : "none",
                transition: ".13s"
              }}
            >
              <CategoryIcon category={cat.key} />
              <span style={{ marginTop: 7 }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Товары */}
      <div style={{
        width: mainWidth,
        display: "flex",
        flexDirection: "column",
        gap: 17,
        marginBottom: sectionGap
      }}>
        {filteredProducts.length === 0 && (
          <div style={{
            color: "#aab7ca",
            background: CARD,
            borderRadius: 17,
            padding: "37px 7px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 16
          }}>
            Нет товаров по вашему запросу
          </div>
        )}
        {filteredProducts.map(prod => (
          <div key={prod.id} style={{
            display: "flex",
            alignItems: "center",
            background: CARD,
            borderRadius: 21,
            padding: "16px 18px",
            gap: 18,
            boxShadow: "0 2px 11px #10162833",
            border: `1.5px solid ${BORDER}`,
            position: "relative"
          }}>
            <img src={prod.img} alt={prod.name} style={{
              width: 62,
              height: 62,
              borderRadius: 16,
              objectFit: "cover",
              background: "#222"
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15.8, marginBottom: 4, color: "#fff" }}>{prod.name}</div>
              <div style={{ fontSize: 13.2, color: "#b6cae3", marginBottom: 4 }}>{prod.price} ₽</div>
              <div style={{ fontSize: 12, color: "#6bb9ff" }}>{CATEGORIES.find(c => c.key === prod.category)?.label || ""}</div>
            </div>
            <button style={{
              background: ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              padding: "10px 13px",
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 1px 7px #278aff2a"
            }}>Купить</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        width: mainWidth,
        textAlign: "center",
        fontSize: 14,
        color: "#aac6e6",
        margin: "40px 0 20px 0",
        opacity: 0.8,
        borderTop: `1px solid ${BORDER}`,
        paddingTop: 20,
        letterSpacing: "0.01em"
      }}>
        <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span> &copy; 2025
      </footer>
    </div>
  );
}
