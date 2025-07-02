import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Анимированный фон ----------
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
      { x: w*0.2, y: h*0.32, r: 260, dx: 0.13, dy: 0.09, color: "#212c4388" },
      { x: w*0.7, y: h*0.15, r: 270, dx: -0.09, dy: 0.12, color: "#192035a2" },
      { x: w*0.44, y: h*0.79, r: 230, dx: 0.09, dy: -0.11, color: "#1c243dc4" },
      { x: w*0.87, y: h*0.71, r: 180, dx: -0.12, dy: 0.07, color: "#2a354b82" },
    ];
    function draw() {
      ctx.clearRect(0,0,w,h);
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, b.r*0.32, b.x, b.y, b.r);
        g.addColorStop(0, b.color.replace("88", "cc"));
        g.addColorStop(1, b.color);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2*Math.PI);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.88;
        ctx.fill();
        ctx.globalAlpha = 1;
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r || b.x > w+b.r) b.dx *= -1;
        if (b.y < -b.r || b.y > h+b.r) b.dy *= -1;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); }
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

// ------------ Данные ------------
const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "rgba(31,38,50,0.72)";
const BORDER = "rgba(120,160,220,0.14)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const PHONE_PLACEHOLDER = "data:image/svg+xml,%3Csvg width='90' height='90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='90' height='90' rx='16' fill='%2323292f'/%3E%3Cpath d='M45 29c-6.627 0-12 5.373-12 12 0 4.418 2.99 8.166 7.092 10.338C40.613 51.736 41 52.859 41 54v2a2 2 0 1 0 4 0v-2c0-1.141.387-2.264 1.908-2.662C54.01 49.166 57 45.418 57 41c0-6.627-5.373-12-12-12zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%23668899'/%3E%3C/svg%3E";

// Тестовые товары для примера (замени своими если нужно)
const test = [
  { id: 1, brand: "Apple", name: "iPhone 15 Pro", price: 120000, img: PHONE_PLACEHOLDER, desc: "128GB, Серый" },
  { id: 2, brand: "Samsung", name: "Galaxy S24 Ultra", price: 95000, img: PHONE_PLACEHOLDER, desc: "256GB, Black" },
  { id: 3, brand: "Xiaomi", name: "Redmi Note 13", price: 34000, img: PHONE_PLACEHOLDER, desc: "Pro 512GB" },
  { id: 4, brand: "Apple", name: "Apple Watch S9", price: 37000, img: PHONE_PLACEHOLDER, desc: "45mm, GPS" },
  { id: 5, brand: "Casio", name: "G-SHOCK DW-5600", price: 9000, img: PHONE_PLACEHOLDER, desc: "Shock Resistant" },
  { id: 6, brand: "Apple", name: "MacBook Air 2024", price: 130000, img: PHONE_PLACEHOLDER, desc: "M3, 16GB RAM" },
  { id: 7, brand: "Apple", name: "AirPods Pro 2", price: 25900, img: PHONE_PLACEHOLDER, desc: "ANC, MagSafe" },
  { id: 8, brand: "Xiaomi", name: "TV A32", price: 16000, img: TV_PLACEHOLDER, desc: "32\" Full HD" },
  { id: 9, brand: "Sony", name: "PlayStation 5", price: 69900, img: PHONE_PLACEHOLDER, desc: "Ultra HD" },
  { id: 10, brand: "Labubu", name: "Игрушка Labubu Pirate", price: 3300, img: PHONE_PLACEHOLDER, desc: "Фигурка" },
];

// --- Товары по категориям ---
const PRODUCTS = {
  "Смартфоны": [test[0], test[1], test[2]],
  "Часы": [test[3], test[4]],
  "Компьютеры и планшеты": [test[5]],
  "Аудио": [test[6]],
  "Телевизоры": [test[7]],
  "Игровые приставки": [test[8]],
  "Игрушки": [test[9]],
  "Электроника": [],
};

const BRANDS = {
  "Смартфоны": [
    { name: "iPhone", products: [test[0]] },
    { name: "Samsung", products: [test[1]] },
    { name: "Xiaomi", products: [test[2]] },
  ],
  "Часы": [
    { name: "Apple Watch", products: [test[3]] },
    { name: "G-SHOCK", products: [test[4]] },
  ],
  "Компьютеры и планшеты": [
    { name: "MacBook", products: [test[5]] }
  ],
  "Аудио": [
    { name: "AirPods", products: [test[6]] }
  ],
  "Телевизоры": [
    { name: "Xiaomi", products: [test[7]] }
  ],
  "Игровые приставки": [
    { name: "PlayStation", products: [test[8]] }
  ],
  "Игрушки": [
    { name: "Labubu", products: [test[9]] }
  ],
  "Электроника": []
};

// --- Категории с эмодзи ---
const CATEGORIES = [
  { name: "Смартфоны", emoji: "📱" },
  { name: "Часы", emoji: "⌚" },
  { name: "Компьютеры и планшеты", emoji: "💻" },
  { name: "Аудио", emoji: "🎧" },
  { name: "Телевизоры", emoji: "📺" },
  { name: "Игровые приставки", emoji: "🎮" },
  { name: "Игрушки", emoji: "🧸" },
  { name: "Электроника", emoji: "🔌" },
];

// ---- Корзина и утилиты ----
function getColumns(vw) {
  if (vw > 1024) return "repeat(3, 1fr)";
  if (vw > 650) return "repeat(2, 1fr)";
  return "1fr";
}

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [vw, setVw] = useState(window.innerWidth);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrandIdx, setActiveBrandIdx] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Корзина
  const cartTotalCount = cart.reduce((a, b) => a + b.qty, 0);
  const addToCart = (id) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === id);
      if (exist) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
    setCartAnim(true);
    setAddAnimId(id);
    setTimeout(() => setCartAnim(false), 400);
    setTimeout(() => setAddAnimId(null), 550);
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const getQtyInCart = (id) => {
    const found = cart.find(item => item.id === id);
    return found ? found.qty : 0;
  };
  function getProduct(id) {
    for (let arr of Object.values(PRODUCTS)) {
      const found = arr.find((p) => p.id === id);
      if (found) return found;
    }
    return null;
  }
  const total = cart.reduce(
    (sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty,
    0
  );
  function onImgError(e) { e.target.src = PHONE_PLACEHOLDER; }
  const isMobile = vw < 600;
  const mainBlockWidth = isMobile ? "97vw" : "430px";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: BG,
        color: "#fff",
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <AnimatedBg />

      {/* --- Хедер --- */}
      <header style={{ textAlign: "center", padding: isMobile ? "10px 0 0 0" : "18px 0 0 0", position: "relative", zIndex: 2 }}>
        <img src={logoUrl} alt="logo"
          style={{
            width: isMobile ? 48 : 62,
            height: isMobile ? 48 : 62,
            objectFit: "cover",
            borderRadius: "50%",
            border: `2.5px solid ${ACCENT}`,
            background: "#fff",
            margin: "0 auto",
            display: "block",
            boxShadow: "0 0 18px #0007",
          }}
        />
        <motion.button
          animate={cartAnim ? { scale: [1, 1.22, 0.9, 1], rotate: [0, -13, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          onClick={() => setShowCart(true)}
          style={{
            position: "absolute",
            top: isMobile ? 10 : 18,
            right: isMobile ? 12 : 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}>
          <span style={{ position: "relative" }}>
            <svg width={isMobile ? 23 : 28} height={isMobile ? 23 : 28} viewBox="0 0 24 24" fill={ACCENT}>
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
              >{cartTotalCount}</motion.span>
            )}
          </span>
        </motion.button>
      </header>

      {/* --- ИНФОБЛОК --- */}
      <div style={{
        maxWidth: mainBlockWidth,
        margin: isMobile ? "16px auto 11px auto" : "32px auto 20px auto",
        background: CARD,
        borderRadius: 15,
        boxShadow: "0 2px 9px #1a1f2e15",
        padding: isMobile ? "14px 7px" : "28px 22px",
        fontSize: isMobile ? 15 : 18,
        textAlign: "center",
        fontWeight: 600,
        color: "#f3f6fa",
        letterSpacing: "0.01em",
        border: `1.1px solid ${BORDER}`,
        lineHeight: 1.37,
      }}>
        <span style={{ fontWeight: 700 }}>
          Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!
        </span>
        <div style={{ fontWeight: 400, color: "#b8d7ff", marginTop: 7 }}>
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
            gap: 10,
            background: ACCENT,
            color: "#fff",
            padding: isMobile ? "10px 14px" : "13px 21px",
            borderRadius: 11,
            fontWeight: 800,
            fontSize: isMobile ? 13.5 : 16,
            textDecoration: "none",
            boxShadow: "0 2px 10px #3ca4ff22",
            border: "none",
            margin: "15px auto 0 auto"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 17 : 23} width={isMobile ? 17 : 23} viewBox="0 0 24 24" style={{ marginRight: 7, flexShrink: 0 }}>
            <circle cx="12" cy="12" r="12" fill="#229ed9"/>
            <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z"/>
          </svg>
          Перейти в Telegram
        </a>
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: 10,
          marginTop: 13,
          padding: isMobile ? "9px 5px" : "13px 14px",
          color: "#e9f3ff",
          fontSize: isMobile ? 13 : 15
        }}>
          <span style={{ color: ACCENT, fontWeight: 800 }}>Контакты: </span>
          <span>Телефон: <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a></span>
          <br />
          <span>Адрес: <span style={{ color: "#fff", fontWeight: 700 }}>{ADDRESS}</span></span>
        </div>
      </div>

      {/* --- КАТЕГОРИИ НА ГЛАВНОЙ --- */}
      {!activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth,
          margin: "0 auto",
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: isMobile ? 18 : 22,
            letterSpacing: "0.015em",
            color: "#b6cafc",
            margin: "10px 0 12px 0"
          }}>
            Категории
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 10 : 14,
            marginBottom: isMobile ? 20 : 28,
          }}>
            {CATEGORIES.map((cat, i) => (
              <motion.button
                whileTap={{ scale: 0.97, backgroundColor: ACCENT + "11" }}
                whileHover={{ scale: 1.035 }}
                key={cat.name}
                onClick={() => { setActiveCategory(cat.name); setActiveBrandIdx(null); setSearch(""); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: isMobile ? "12px 16px" : "18px 28px",
                  fontSize: isMobile ? 17 : 20,
                  fontWeight: 800,
                  color: "#fff",
                  background: CARD,
                  border: `1.2px solid ${BORDER}`,
                  borderRadius: 14,
                  boxShadow: "0 3px 17px #3ca4ff09, 0 2px 8px #091d3c16",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "0.18s",
                  outline: "none"
                }}>
                <span style={{ fontSize: isMobile ? 23 : 27, marginRight: 5 }}>{cat.emoji}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* --- СТРАНИЦА КАТЕГОРИИ (ТОВАРЫ + ПОДКАТЕГОРИИ) --- */}
      {activeCategory && (
        <div style={{
          maxWidth: 1200, margin: isMobile ? "0 auto" : "20px auto 0 auto", padding: isMobile ? "0 3px" : "0 12px"
        }}>
          {/* Назад + Категории (бренды) */}
          <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 9 }}>
            <button
              onClick={() => { setActiveCategory(null); setActiveBrandIdx(null); setSearch(""); }}
              style={{
                background: "none", border: "none", color: ACCENT, fontWeight: 800,
                fontSize: isMobile ? 22 : 27, cursor: "pointer", marginRight: 7, padding: 0,
              }}>←</button>
            <div style={{
              fontWeight: 900, fontSize: isMobile ? 18 : 23, letterSpacing: "0.01em", color: "#fff"
            }}>
              {activeCategory}
            </div>
          </div>
          {/* Подкатегории (бренды) */}
          {BRANDS[activeCategory]?.length > 0 && (
            <div style={{
              display: "flex",
              gap: 7,
              margin: "0 0 12px 0",
              overflowX: "auto",
              paddingBottom: 2,
            }}>
              {BRANDS[activeCategory].map((brand, idx) => (
                <motion.button
                  key={brand.name}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setActiveBrandIdx(idx)}
                  style={{
                    background: activeBrandIdx === idx ? ACCENT : "#21284a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    fontWeight: 700,
                    fontSize: isMobile ? 13.5 : 15,
                    padding: isMobile ? "8px 15px" : "10px 22px",
                    cursor: "pointer",
                    boxShadow: activeBrandIdx === idx ? "0 1px 8px #3ca4ff36" : "none",
                    transition: "0.13s"
                  }}
                >{brand.name}</motion.button>
              ))}
            </div>
          )}
          {/* Поиск */}
          <div style={{ marginBottom: 12 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск товара..."
              style={{
                width: "100%",
                maxWidth: 410,
                fontSize: isMobile ? 14.5 : 17,
                padding: isMobile ? "10px 13px" : "13px 18px",
                borderRadius: 10,
                border: `1.3px solid ${BORDER}`,
                background: "#202a38",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                boxShadow: "0 2px 10px #1d7ad50c",
                margin: "0 auto",
                display: "block"
              }}
            />
          </div>
          {/* Товары */}
          <div style={{
            display: "grid",
            gridTemplateColumns: getColumns(vw),
            gap: isMobile ? 13 : 24,
            alignItems: "stretch",
            marginBottom: 22
          }}>
            {(activeBrandIdx !== null ? BRANDS[activeCategory][activeBrandIdx]?.products : PRODUCTS[activeCategory] || [])
              .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
              .map((product, i) => {
                const qty = getQtyInCart(product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 32, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 42, scale: 0.95 }}
                    transition={{ delay: i * 0.03, duration: 0.32, type: "spring" }}
                    style={{
                      background: CARD,
                      border: `1.2px solid ${BORDER}`,
                      borderRadius: 13,
                      boxShadow: "0 8px 18px #08172b11, 0 1.5px 8px #10192824",
                      padding: isMobile ? 9 : 17,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: isMobile ? 185 : 235,
                      height: isMobile ? 185 : 235,
                      width: "100%",
                      boxSizing: "border-box",
                      margin: "0 auto",
                      justifyContent: "flex-start",
                      position: "relative",
                      overflow: "hidden",
                      transition: "box-shadow .13s",
                      backdropFilter: "blur(6px)"
                    }}
                    whileHover={{
                      boxShadow: "0 10px 30px #3ca4ff13, 0 2px 8px #091d3c13",
                      scale: 1.017
                    }}
                  >
                    <motion.img
                      src={product.img || TV_PLACEHOLDER}
                      onError={onImgError}
                      alt={product.name}
                      style={{
                        width: isMobile ? 54 : 74,
                        height: isMobile ? 54 : 74,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 7,
                        background: "#23272f",
                        boxShadow: "0 2px 8px #18408020",
                        border: `1.2px solid ${BORDER}`,
                        transition: ".14s"
                      }}
                      initial={false}
                      animate={addAnimId === product.id ? { scale: [1, 1.09, 0.96, 1] } : { scale: 1 }}
                      transition={{ duration: 0.31 }}
                    />
                    <div style={{
                      fontWeight: 800,
                      fontSize: isMobile ? 13.5 : 16.5,
                      marginBottom: 3,
                      textAlign: "center",
                      width: "100%",
                      color: "#fff"
                    }}>
                      {product.brand}
                    </div>
                    <div style={{
                      fontSize: isMobile ? 12 : 13.7,
                      marginBottom: 7,
                      color: "#c2c2c2",
                      textAlign: "center",
                      width: "94%",
                      margin: "0 auto",
                      lineHeight: 1.19,
                    }}>
                      {product.name}
                    </div>
                    {product.desc && (
                      <div style={{
                        color: "#a8c8fa",
                        textAlign: "center",
                        fontWeight: 400,
                        fontSize: isMobile ? 10.5 : 13.1,
                        marginBottom: 7,
                        textShadow: "0 1px 7px #1978e622"
                      }}>{product.desc}</div>
                    )}
                    <div style={{
                      fontWeight: 800,
                      fontSize: isMobile ? 14 : 18.5,
                      marginBottom: 10,
                      color: "#fff",
                    }}>
                      {product.price} ₽
                    </div>
                    {qty === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.93, backgroundColor: "#197ad2" }}
                        onClick={() => addToCart(product.id)}
                        style={{
                          background: ACCENT,
                          color: "#181B23",
                          padding: isMobile ? "7px 0" : "13px 0",
                          borderRadius: 10,
                          border: "none",
                          fontWeight: 800,
                          fontSize: isMobile ? 13 : 16,
                          cursor: "pointer",
                          width: "100%",
                          boxShadow: "0 2px 10px #2680d72a",
                          position: "relative",
                          transition: "background .16s"
                        }}
                      >В корзину</motion.button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          gap: 7,
                          background: ACCENT,
                          borderRadius: 10,
                          padding: "0 7px",
                          boxShadow: "0 1px 6px #3ca4ff18"
                        }}
                      >
                        <motion.button
                          whileTap={{ scale: 0.89 }}
                          onClick={() => {
                            if (qty === 1) removeFromCart(product.id);
                            else setCart(prev => prev.map(item => item.id === product.id ? { ...item, qty: item.qty - 1 } : item));
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#191c23",
                            fontSize: 21,
                            fontWeight: 900,
                            padding: "6px 10px 7px 10px",
                            cursor: "pointer",
                            outline: "none",
                            borderRadius: 6
                          }}
                        >–</motion.button>
                        <div style={{
                          color: "#181B23",
                          minWidth: 23,
                          textAlign: "center",
                          fontWeight: 900,
                          fontSize: 15
                        }}>
                          {qty}
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.89 }}
                          onClick={() => addToCart(product.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#191c23",
                            fontSize: 21,
                            fontWeight: 900,
                            padding: "6px 10px 7px 10px",
                            cursor: "pointer",
                            outline: "none",
                            borderRadius: 6
                          }}
                        >+</motion.button>
                      </div>
                    )}
                    <AnimatePresence>
                      {addAnimId === product.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.7 }}
                          animate={{ opacity: 1, y: -22, scale: 1.12 }}
                          exit={{ opacity: 0, y: -52, scale: 1.25 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            position: "absolute",
                            top: isMobile ? 17 : 32,
                            right: isMobile ? 18 : 34,
                            color: ACCENT,
                            fontWeight: 900,
                            fontSize: isMobile ? 16 : 23,
                            textShadow: "0 2px 13px #3ca4ff13",
                            pointerEvents: "none"
                          }}
                        >
                          +1
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>
        </div>
      )}

      {/* --- КОРЗИНА --- */}
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
            <div style={{ fontSize: isMobile ? 17 : 23, fontWeight: 900, marginBottom: 12, color: ACCENT, textShadow: "0 2px 8px #3ca4ff12" }}>Корзина</div>
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
                        marginBottom: 15,
                        borderBottom: "1px solid #44f6",
                        paddingBottom: 7,
                        gap: 7
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile ? 12.5 : 16.5, marginBottom: 1, color: ACCENT }}>{product.brand}</div>
                        <div style={{ fontSize: isMobile ? 11.5 : 14, color: "#c2c2c2", marginBottom: 4, lineHeight: 1.2 }}>{product.name}</div>
                        <div style={{ color: "#999", fontSize: isMobile ? 10 : 13, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 60 }}>
                        <span style={{ fontWeight: 800, fontSize: isMobile ? 11.5 : 16, color: "#fff" }}>{product.price * item.qty} ₽</span>
                        <button
                          style={{
                            display: "block",
                            margin: "6px auto 0 auto",
                            color: ACCENT,
                            background: "none",
                            border: "none",
                            fontSize: isMobile ? 10 : 13,
                            cursor: "pointer",
                            padding: 0,
                            fontWeight: 700,
                          }}
                          onClick={() => removeFromCart(item.id)}
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
                              ? `${p.brand} ${p.name} x${item.qty} — ${p.price * item.qty}₽`
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
      <div style={{ height: 20 }} />
    </div>
  );
};

export default App;
