import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Фон ----------
function AnimatedBg() {
  useEffect(() => {
    let animId;
    const canvas = document.getElementById("smoke-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);
    const blobs = [
      { x: w * 0.2, y: h * 0.32, r: 260, dx: 0.13, dy: 0.09, color: "#212c4388" },
      { x: w * 0.7, y: h * 0.15, r: 270, dx: -0.09, dy: 0.12, color: "#192035a2" },
      { x: w * 0.44, y: h * 0.79, r: 230, dx: 0.09, dy: -0.11, color: "#1c243dc4" },
      { x: w * 0.87, y: h * 0.71, r: 180, dx: -0.12, dy: 0.07, color: "#2a354b82" },
    ];
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, b.r * 0.32, b.x, b.y, b.r);
        g.addColorStop(0, b.color.replace("88", "cc"));
        g.addColorStop(1, b.color);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.88;
        ctx.fill();
        ctx.globalAlpha = 1;
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r || b.x > w + b.r) b.dx *= -1;
        if (b.y < -b.r || b.y > h + b.r) b.dy *= -1;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      id="smoke-bg"
      style={{
        position: "fixed",
        top: 0, left: 0, zIndex: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        filter: "blur(13px) brightness(1.02) saturate(1.07)"
      }}
    />
  );
}

// ---------- Данные ----------
const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "rgba(31,38,50,0.80)";
const BORDER = "rgba(120,160,220,0.13)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const IMG_PLACEHOLDER = "data:image/svg+xml,%3Csvg width='90' height='90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='90' height='90' rx='16' fill='%2323292f'/%3E%3Cpath d='M45 29c-6.627 0-12 5.373-12 12 0 4.418 2.99 8.166 7.092 10.338C40.613 51.736 41 52.859 41 54v2a2 2 0 1 0 4 0v-2c0-1.141.387-2.264 1.908-2.662C54.01 49.166 57 45.418 57 41c0-6.627-5.373-12-12-12zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%23668899'/%3E%3C/svg%3E";

const PRODUCTS = {
  "Смартфоны": [
    { id: 101, name: "iPhone 15 Pro 128GB", brand: "Apple", price: 115000, img: IMG_PLACEHOLDER },
    { id: 102, name: "Galaxy S24 Ultra", brand: "Samsung", price: 98000, img: IMG_PLACEHOLDER },
    { id: 103, name: "Redmi Note 13 Pro", brand: "Xiaomi", price: 34000, img: IMG_PLACEHOLDER },
    { id: 104, name: "Google Pixel 8", brand: "Google", price: 46000, img: IMG_PLACEHOLDER },
  ],
  "Часы": [
    { id: 201, name: "Apple Watch Series 9", brand: "Apple", price: 37000, img: IMG_PLACEHOLDER },
    { id: 202, name: "G-SHOCK DW-5600", brand: "Casio", price: 8900, img: IMG_PLACEHOLDER },
    { id: 203, name: "Garmin Forerunner 255", brand: "Garmin", price: 28500, img: IMG_PLACEHOLDER },
  ],
  "Компьютеры и планшеты": [
    { id: 301, name: "MacBook Air 15 2024", brand: "Apple", price: 127000, img: IMG_PLACEHOLDER },
    { id: 302, name: "iMac 24 2024", brand: "Apple", price: 159000, img: IMG_PLACEHOLDER },
    { id: 303, name: "iPad Pro 11 2024", brand: "Apple", price: 99000, img: IMG_PLACEHOLDER },
  ],
  "Аудио": [
    { id: 401, name: "AirPods Pro 2", brand: "Apple", price: 25900, img: IMG_PLACEHOLDER },
    { id: 402, name: "Marshall Emberton II", brand: "Marshall", price: 18500, img: IMG_PLACEHOLDER },
    { id: 403, name: "Sony WH-1000XM5", brand: "Sony", price: 29900, img: IMG_PLACEHOLDER },
  ],
  "Телевизоры": [
    { id: 501, name: 'Xiaomi TV A32', brand: "Xiaomi", price: 16000, img: TV_PLACEHOLDER },
    { id: 502, name: 'Samsung 4K 43" Crystal', brand: "Samsung", price: 37000, img: TV_PLACEHOLDER },
  ],
  "Игровые приставки": [
    { id: 601, name: "PlayStation 5", brand: "Sony", price: 68900, img: IMG_PLACEHOLDER },
    { id: 602, name: "Xbox Series X", brand: "Microsoft", price: 64800, img: IMG_PLACEHOLDER },
  ],
  "Игрушки": [
    { id: 701, name: "Labubu Pirate", brand: "Labubu", price: 3300, img: IMG_PLACEHOLDER },
  ],
  "Электроника": [
    { id: 801, name: "Электросамокат Xiaomi", brand: "Xiaomi", price: 26500, img: IMG_PLACEHOLDER },
    { id: 802, name: "Пылесос Dyson", brand: "Dyson", price: 42000, img: IMG_PLACEHOLDER },
    { id: 803, name: "GoPro Hero 12", brand: "GoPro", price: 41000, img: IMG_PLACEHOLDER },
  ],
};

// --- Категории главной страницы ---
const CATEGORIES = [
  { name: "Смартфоны", icon: "📱" },
  { name: "Часы", icon: "⌚" },
  { name: "Компьютеры и планшеты", icon: "💻" },
  { name: "Аудио", icon: "🎧" },
  { name: "Телевизоры", icon: "📺" },
  { name: "Игровые приставки", icon: "🎮" },
  { name: "Игрушки", icon: "🧸" },
  { name: "Электроника", icon: "🔌" }
];

// --- "Бренды" (подкатегории, если нужно) ---
const BRANDS = {
  "Смартфоны": ["Apple", "Samsung", "Xiaomi", "Google"],
  "Часы": ["Apple", "Casio", "Garmin"],
  "Компьютеры и планшеты": ["Apple"],
  "Аудио": ["Apple", "Marshall", "Sony"],
  "Телевизоры": ["Xiaomi", "Samsung"],
  "Игровые приставки": ["Sony", "Microsoft"],
  "Игрушки": ["Labubu"],
  "Электроника": ["Xiaomi", "Dyson", "GoPro"]
};

// --- Карточка товара ---
function ProductCard({ product, qty, onPlus, onMinus }) {
  const isMobile = window.innerWidth < 600;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 11 : 16,
        padding: isMobile ? 8 : 13,
        background: "rgba(31,38,50,0.92)",
        borderRadius: 14,
        border: "1.2px solid rgba(120,160,220,0.12)",
        boxShadow: "0 2px 16px #18315714",
        minHeight: isMobile ? 70 : 98,
        marginBottom: 1
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{
          width: isMobile ? 44 : 63,
          height: isMobile ? 44 : 63,
          objectFit: "cover",
          borderRadius: 11,
          background: "#222",
          border: "1px solid #22386022"
        }}
        onError={e => { e.target.src = IMG_PLACEHOLDER }}
      />
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: 0
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: isMobile ? 14 : 16.2,
          color: "#fff",
          marginBottom: 2,
          lineHeight: 1.19,
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{product.name}</div>
        <div style={{
          fontWeight: 600,
          fontSize: isMobile ? 11.2 : 13,
          color: "#99b5d8",
          marginBottom: 2,
          letterSpacing: ".01em",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{product.brand}</div>
        <div style={{
          fontWeight: 900,
          color: ACCENT,
          fontSize: isMobile ? 13.5 : 15.3,
          marginTop: 5
        }}>{product.price} ₽</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        {qty === 0 ? (
          <button
            onClick={onPlus}
            style={{
              background: ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: isMobile ? 12 : 14,
              padding: isMobile ? "7px 11px" : "9px 17px",
              cursor: "pointer",
              marginTop: 0
            }}
          >В корзину</button>
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: ACCENT,
            borderRadius: 7,
            padding: "2px 8px",
            marginTop: 0
          }}>
            <button
              onClick={onMinus}
              style={{
                background: "none",
                border: "none",
                color: "#222",
                fontWeight: 900,
                fontSize: 17,
                cursor: "pointer",
                padding: "2px 7px"
              }}
            >–</button>
            <span style={{ color: "#222", fontWeight: 900, fontSize: 14 }}>{qty}</span>
            <button
              onClick={onPlus}
              style={{
                background: "none",
                border: "none",
                color: "#222",
                fontWeight: 900,
                fontSize: 17,
                cursor: "pointer",
                padding: "2px 7px"
              }}
            >+</button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Категория на главной ---
function CategoryCard({ cat, onClick }) {
  const isMobile = window.innerWidth < 600;
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "rgba(31,38,50,0.92)",
        border: `1.2px solid ${BORDER}`,
        borderRadius: 13,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 15 : 24,
        padding: isMobile ? "16px 12px" : "20px 26px",
        fontWeight: 800,
        fontSize: isMobile ? 15.5 : 19,
        color: "#fff",
        boxShadow: "0 3px 16px #17307518",
        marginBottom: isMobile ? 13 : 18,
        cursor: "pointer",
        outline: "none",
        borderBottom: "none",
        transition: ".12s"
      }}>
      <span style={{ fontSize: isMobile ? 21 : 26, marginRight: 8 }}>{cat.icon}</span>
      <span style={{
        letterSpacing: ".01em",
        textAlign: "left",
        flex: 1
      }}>{cat.name}</span>
    </button>
  );
}

const App = () => {
  // --- State
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  // --- Для мобильного вида
  const [vw, setVw] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 600;
  const mainBlockWidth = isMobile ? "97vw" : "410px";

  // --- Корзина
  const cartTotalCount = cart.reduce((a, b) => a + b.qty, 0);
  const addToCart = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, qty: 1 }];
    });
  };
  const removeOneFromCart = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };
  const getQtyInCart = (id) => {
    const found = cart.find(item => item.id === id);
    return found ? found.qty : 0;
  };
  function getProduct(id) {
    for (const key in PRODUCTS) {
      const found = PRODUCTS[key].find(p => p.id === id);
      if (found) return found;
    }
    return null;
  }
  const total = cart.reduce((sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty, 0);

  // --- Поиск
  let shownProducts = [];
  if (activeCategory) {
    shownProducts = PRODUCTS[activeCategory];
    if (activeBrand) shownProducts = shownProducts.filter(p => p.brand === activeBrand);
    if (search.trim()) {
      shownProducts = shownProducts.filter(
        p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  // --- Контент ---
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: BG,
        color: "#fff",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <AnimatedBg />

      {/* ------ Хедер ------ */}
      <header style={{
        textAlign: "center",
        padding: `${isMobile ? 20 : 40}px 0 0 0`, // БОЛЬШОЙ отступ сверху!
        position: "relative",
        zIndex: 2
      }}>
        <div style={{
          position: "relative",
          maxWidth: mainBlockWidth,
          margin: "0 auto"
        }}>
          <img
            src={logoUrl}
            alt="logo"
            style={{
              width: isMobile ? 52 : 66,
              height: isMobile ? 52 : 66,
              objectFit: "cover",
              borderRadius: "50%",
              border: `2.5px solid ${ACCENT}`,
              background: "#fff",
              margin: "0 auto",
              display: "block",
              boxShadow: "0 0 16px #0006"
            }}
          />
          <motion.button
            animate={cartTotalCount > 0 ? { scale: [1, 1.13, 0.95, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, type: "spring" }}
            onClick={() => setShowCart(true)}
            style={{
              position: "absolute",
              right: 0,
              top: isMobile ? 8 : 14,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <span style={{ position: "relative" }}>
              <svg width={isMobile ? 22 : 27} height={isMobile ? 22 : 27} viewBox="0 0 24 24" fill={ACCENT}>
                <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm2-3H7.42l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H6.21l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H5.42l-.94-2H2V4h2l3.6 7.59-1.35 2.44C5.16 14.37 5.92 16 7.22 16H19c.553 0 1-.447 1-1s-.447-1-1-1z" />
              </svg>
              {cartTotalCount > 0 && (
                <motion.span
                  key={cartTotalCount}
                  initial={{ scale: 0.5, opacity: 0, y: -12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  style={{
                    position: "absolute",
                    top: -9,
                    right: -13,
                    background: ACCENT,
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2.5px 8px",
                    fontSize: 12,
                    fontWeight: 700,
                    boxShadow: "0 2px 8px #1d7ad5c0"
                  }}
                >
                  {cartTotalCount}
                </motion.span>
              )}
            </span>
          </motion.button>
        </div>
        <div style={{ height: isMobile ? 14 : 26 }} />
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
        <div style={{ height: isMobile ? 12 : 18 }} />
      </header>

      {/* ------ Главная страница ------ */}
      {!activeCategory && (
        <div style={{ width: "100%", maxWidth: mainBlockWidth, margin: "0 auto", padding: isMobile ? "0 2vw" : "0" }}>
          {/* Блок приветствия */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11, duration: 0.48, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 17,
              boxShadow: "0 2px 10px #13243826",
              padding: isMobile ? "19px 7px 15px 7px" : "32px 22px 21px 22px",
              margin: isMobile ? "0 0 18px 0" : "0 0 24px 0"
            }}>
            <div style={{
              fontWeight: 700,
              fontSize: isMobile ? 15.6 : 18.2,
              color: "#fff",
              marginBottom: 7
            }}>
              Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!
            </div>
            <div style={{ color: "#b8d7ff", fontSize: isMobile ? 13.1 : 15, fontWeight: 400 }}>
              Только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!
            </div>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                margin: "15px auto 0 auto",
                background: ACCENT,
                color: "#fff",
                padding: isMobile ? "10px 16px" : "13px 23px",
                borderRadius: 11,
                fontWeight: 800,
                fontSize: isMobile ? 13 : 15,
                textDecoration: "none",
                boxShadow: "0 2px 12px #3ca4ff22",
                border: "none",
                outline: "none"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 17 : 20} width={isMobile ? 17 : 20} viewBox="0 0 24 24" style={{ marginRight: 6, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="12" fill="#229ed9" />
                <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z" />
              </svg>
              Перейти в Telegram
            </a>
            <div style={{
              marginTop: 12,
              background: "rgba(23,32,41,0.82)",
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: isMobile ? 11.7 : 13,
              color: "#b8d7ff"
            }}>
              <span style={{ fontWeight: 700, color: ACCENT }}>Контакты:</span> Телефон: <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none" }}>{PHONE}</a><br />
              <span style={{ fontWeight: 700, color: ACCENT }}>Адрес:</span> <span style={{ color: "#fff" }}>{ADDRESS}</span>
            </div>
          </motion.div>

          {/* Категории */}
          <div style={{ marginTop: isMobile ? 19 : 28, marginBottom: 0 }}>
            <div style={{
              fontWeight: 900,
              fontSize: isMobile ? 18 : 22,
              color: "#e3edfc",
              textAlign: "center",
              marginBottom: isMobile ? 8 : 14,
              letterSpacing: ".02em"
            }}>Категории</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CATEGORIES.map((cat) =>
                <CategoryCard key={cat.name} cat={cat} onClick={() => { setActiveCategory(cat.name); setActiveBrand(null); setSearch(""); }} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------ Страница категории ------ */}
      {activeCategory && (
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          padding: isMobile ? "0 2vw" : "0"
        }}>
          {/* Назад */}
          <button
            onClick={() => { setActiveCategory(null); setActiveBrand(null); setSearch(""); }}
            style={{
              width: "100%",
              background: "rgba(42,60,96,0.84)",
              color: "#fff",
              border: "none",
              borderRadius: 11,
              padding: isMobile ? "14px 0" : "17px 0",
              fontWeight: 800,
              fontSize: isMobile ? 15 : 17,
              marginBottom: isMobile ? 13 : 17,
              marginTop: isMobile ? 12 : 18,
              boxShadow: "0 2px 8px #3ca4ff11",
              cursor: "pointer"
            }}>
            ← К категориям
          </button>
          {/* Подкатегории (бренды) */}
          <div style={{ marginBottom: 13, overflowX: "auto", whiteSpace: "nowrap", display: "flex", gap: 8 }}>
            {BRANDS[activeCategory].map((brand) =>
              <button
                key={brand}
                onClick={() => setActiveBrand(brand === activeBrand ? null : brand)}
                style={{
                  background: brand === activeBrand ? ACCENT : "rgba(30,40,65,0.55)",
                  color: brand === activeBrand ? "#fff" : "#c5dbfc",
                  border: "none",
                  borderRadius: 7,
                  padding: isMobile ? "7px 15px" : "9px 18px",
                  fontWeight: 700,
                  fontSize: isMobile ? 13 : 15,
                  cursor: "pointer",
                  transition: ".14s"
                }}
              >
                {brand}
              </button>
            )}
          </div>
          {/* Поиск */}
          <input
            type="text"
            placeholder="Поиск товаров"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(31,38,50,0.80)",
              border: `1.1px solid ${BORDER}`,
              borderRadius: 10,
              color: "#fff",
              fontWeight: 600,
              fontSize: isMobile ? 14 : 16,
              padding: isMobile ? "11px 13px" : "14px 17px",
              outline: "none",
              marginBottom: isMobile ? 14 : 19,
              boxShadow: "0 1px 5px #222b",
              letterSpacing: ".01em"
            }}
          />
          {/* Список товаров */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 8 : 12 }}>
            {shownProducts.length === 0 &&
              <div style={{ color: "#c1cbe3", textAlign: "center", fontWeight: 600, marginTop: 18 }}>Нет товаров</div>
            }
            {shownProducts.map(product =>
              <ProductCard
                key={product.id}
                product={product}
                qty={getQtyInCart(product.id)}
                onPlus={() => addToCart(product.id)}
                onMinus={() => removeOneFromCart(product.id)}
              />
            )}
          </div>
        </div>
      )}

      {/* ------ Корзина ------ */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99,
          }}
          onClick={() => setShowCart(false)}
        >
          <div
            style={{
              background: CARD,
              borderRadius: 18,
              padding: isMobile ? 13 : 28,
              width: isMobile ? "95vw" : 350,
              maxWidth: "99vw",
              boxShadow: "0 8px 28px #0c2340d8",
              border: `1.6px solid ${BORDER}`,
              maxHeight: "96vh",
              overflowY: "auto",
              zIndex: 999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: isMobile ? 17 : 23, fontWeight: 900, marginBottom: 12, color: ACCENT }}>Корзина</div>
            {cart.length === 0 ? (
              <div style={{ color: "#aaa", marginBottom: 10, fontWeight: 600, fontSize: isMobile ? 13 : 16 }}>Корзина пуста</div>
            ) : (
              <>
                {cart.map((item) => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                        borderBottom: "1px solid #44f6",
                        paddingBottom: 5,
                        gap: 7
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile ? 12.5 : 15.5, color: ACCENT }}>{product.name}</div>
                        <div style={{ fontSize: isMobile ? 10.5 : 13, color: "#99b5d8", marginBottom: 2, }}>{product.brand}</div>
                        <div style={{ color: "#999", fontSize: isMobile ? 10 : 12 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 60 }}>
                        <span style={{ fontWeight: 800, fontSize: isMobile ? 12 : 16, color: "#fff" }}>{product.price * item.qty} ₽</span>
                        <button
                          style={{
                            display: "block",
                            margin: "5px auto 0 auto",
                            color: ACCENT,
                            background: "none",
                            border: "none",
                            fontSize: isMobile ? 11 : 14,
                            cursor: "pointer",
                            padding: 0,
                            fontWeight: 700,
                          }}
                          onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontWeight: 700, fontSize: isMobile ? 13 : 17, textAlign: "right", marginTop: 9, marginBottom: 5 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 10,
                    background: ACCENT,
                    color: "#fff",
                    padding: isMobile ? "9px 0" : "13px 0",
                    borderRadius: 8,
                    border: "none",
                    fontWeight: 800,
                    fontSize: isMobile ? 12.5 : 15.5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    alert(
                      "Ваш заказ:\n" +
                      cart
                        .map((item) => {
                          const p = getProduct(item.id);
                          return p
                            ? `${p.name} x${item.qty} — ${p.price * item.qty}₽`
                            : "";
                        })
                        .join("\n") +
                      `\n\nИтого: ${total} ₽`
                    );
                  }}
                >
                  Оформить заказ
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div style={{ height: 30 }} />
    </div>
  );
};

export default App;
