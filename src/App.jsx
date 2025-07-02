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

// --- Товары (можешь расширить!)
const PHONES = [
  { id: 101, brand: "iPhone", name: "iPhone 15 Pro 128GB Серый", price: 115000, img: PHONE_PLACEHOLDER, desc: "A17 Pro, 3 камеры, iOS" },
  { id: 102, brand: "Samsung", name: "Samsung Galaxy S24 Ultra 256GB Черный", price: 98000, img: PHONE_PLACEHOLDER, desc: "Snapdragon 8 Gen3, AMOLED" },
  { id: 103, brand: "Xiaomi", name: "Xiaomi Redmi Note 13 Pro 512GB Синий", price: 34000, img: PHONE_PLACEHOLDER, desc: "512ГБ, 200Мп камера" },
];
const WATCHES = [
  { id: 201, brand: "Apple Watch", name: "Apple Watch Series 9", price: 37000, img: PHONE_PLACEHOLDER, desc: "45mm, GPS" },
  { id: 202, brand: "Casio G-SHOCK", name: "Casio G-SHOCK DW-5600", price: 8900, img: PHONE_PLACEHOLDER, desc: "Shock Resistant" },
  { id: 203, brand: "Garmin", name: "Garmin Forerunner 255", price: 28500, img: PHONE_PLACEHOLDER, desc: "Спорт-часы" },
];
const MACS = [
  { id: 301, brand: "MacBook", name: "MacBook Air 15 2024", price: 127000, img: PHONE_PLACEHOLDER, desc: "M3, 16GB RAM" },
  { id: 302, brand: "iMac", name: "iMac 24\" 2024", price: 159000, img: PHONE_PLACEHOLDER, desc: "M3, 512GB SSD" },
  { id: 303, brand: "iPad", name: "iPad Pro 11\" 2024", price: 99000, img: PHONE_PLACEHOLDER, desc: "M4, 256GB" },
];
const ACCESSORIES = [
  { id: 401, brand: "AirPods", name: "AirPods Pro 2", price: 25900, img: PHONE_PLACEHOLDER, desc: "ANC, MagSafe" },
  { id: 402, brand: "Marshall", name: "Marshall Emberton II", price: 18500, img: PHONE_PLACEHOLDER, desc: "Портативная колонка" },
  { id: 403, brand: "Sony", name: "Sony WH-1000XM5", price: 29900, img: PHONE_PLACEHOLDER, desc: "Bluetooth, ANC" },
];
const TVS = [
  { id: 501, brand: "Xiaomi TV", name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный', price: 16000, img: TV_PLACEHOLDER, desc: "Full HD, Smart TV, HDMI" },
  { id: 502, brand: "Samsung TV", name: 'Samsung 4K 43" Crystal', price: 37000, img: TV_PLACEHOLDER, desc: "4K UHD, HDR" },
];
const CONSOLES = [
  { id: 601, brand: "PlayStation", name: "PlayStation 5", price: 68900, img: PHONE_PLACEHOLDER, desc: "Ultra HD Blu-ray" },
  { id: 602, brand: "Xbox", name: "Xbox Series X", price: 64800, img: PHONE_PLACEHOLDER, desc: "1TB SSD" },
];
const TOYS = [
  { id: 701, brand: "Labubu", name: "Игрушка Labubu Pirate", price: 3300, img: PHONE_PLACEHOLDER, desc: "Коллекционная фигурка" },
];

// --------- КАТЕГОРИИ с подкатегориями/брендами ---------
const CATEGORIES = [
  {
    name: "Смартфоны",
    emoji: "📱",
    brands: [
      { name: "iPhone", products: PHONES.filter(x => x.brand === "iPhone") },
      { name: "Samsung", products: PHONES.filter(x => x.brand === "Samsung") },
      { name: "Xiaomi", products: PHONES.filter(x => x.brand === "Xiaomi") },
    ],
    products: PHONES,
  },
  {
    name: "Часы",
    emoji: "⌚️",
    brands: [
      { name: "Apple Watch", products: WATCHES.filter(x => x.brand === "Apple Watch") },
      { name: "Casio G-SHOCK", products: WATCHES.filter(x => x.brand === "Casio G-SHOCK") },
      { name: "Garmin", products: WATCHES.filter(x => x.brand === "Garmin") },
    ],
    products: WATCHES,
  },
  {
    name: "Компьютеры и планшеты",
    emoji: "💻",
    brands: [
      { name: "MacBook", products: MACS.filter(x => x.brand === "MacBook") },
      { name: "iMac", products: MACS.filter(x => x.brand === "iMac") },
      { name: "iPad", products: MACS.filter(x => x.brand === "iPad") },
    ],
    products: MACS,
  },
  {
    name: "Аудио",
    emoji: "🎧",
    brands: [
      { name: "AirPods", products: ACCESSORIES.filter(x => x.brand === "AirPods") },
      { name: "Marshall", products: ACCESSORIES.filter(x => x.brand === "Marshall") },
      { name: "Sony", products: ACCESSORIES.filter(x => x.brand === "Sony") },
    ],
    products: ACCESSORIES,
  },
  {
    name: "Электроника",
    emoji: "🔌",
    brands: [
      { name: "Телевизоры", products: TVS },
    ],
    products: TVS,
  },
  {
    name: "Игровые приставки",
    emoji: "🎮",
    brands: [
      { name: "PlayStation", products: CONSOLES.filter(x => x.brand === "PlayStation") },
      { name: "Xbox", products: CONSOLES.filter(x => x.brand === "Xbox") },
    ],
    products: CONSOLES,
  },
  {
    name: "Телевизоры",
    emoji: "📺",
    brands: [
      { name: "Xiaomi TV", products: TVS.filter(x => x.brand === "Xiaomi TV") },
      { name: "Samsung TV", products: TVS.filter(x => x.brand === "Samsung TV") },
    ],
    products: TVS,
  },
  {
    name: "Игрушки",
    emoji: "🧸",
    brands: [
      { name: "Labubu", products: TOYS },
    ],
    products: TOYS,
  },
];

// -------------- APP ---------------
const App = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrandIdx, setActiveBrandIdx] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [vw, setVw] = useState(window.innerWidth);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 600;
  const mainBlockWidth = isMobile ? "97vw" : "420px";

  // --- CART UTILS ---
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
    for (let c of CATEGORIES) {
      for (let b of c.brands) {
        const found = b.products?.find((p) => p.id === id);
        if (found) return found;
      }
    }
    return null;
  }
  const total = cart.reduce(
    (sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty,
    0
  );
  function onImgError(e) {
    e.target.src = PHONE_PLACEHOLDER;
  }

  // ---------- Рендер ---------
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        background: BG,
        color: "#fff",
        margin: 0,
        padding: 0,
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <AnimatedBg />

      {/* ---------- HEADER ---------- */}
      <header style={{
        textAlign: "center",
        padding: isMobile ? "10px 0 0 0" : "18px 0 0 0",
        position: "relative",
        zIndex: 2
      }}>
        <img
          src={logoUrl}
          alt="logo"
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
          }}
        >
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
              >
                {cartTotalCount}
              </motion.span>
            )}
          </span>
        </motion.button>
      </header>

      {/* --- ИНФОБЛОК --- */}
      <div style={{
        maxWidth: mainBlockWidth,
        margin: isMobile ? "17px auto 11px auto" : "35px auto 22px auto",
        width: "100%",
        background: CARD,
        borderRadius: 15,
        boxShadow: "0 2px 9px #1a1f2e15",
        padding: isMobile ? "16px 7px" : "30px 26px",
        fontSize: isMobile ? 15 : 18,
        textAlign: "center",
        fontWeight: 600,
        color: "#f3f6fa",
        letterSpacing: "0.01em",
        border: `1.1px solid ${BORDER}",
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
            marginTop: 16,
            marginBottom: 7,
            transition: ".18s",
            outline: "none",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 17 : 21} width={isMobile ? 17 : 21} viewBox="0 0 24 24" style={{ marginRight: 7, flexShrink: 0 }}>
            <circle cx="12" cy="12" r="12" fill="#229ed9"/>
            <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z"/>
          </svg>
          Перейти в Telegram
        </a>
        <div style={{
          background: "rgba(255,255,255,0.06)",
          margin: "14px 0 0 0",
          borderRadius: 9,
          padding: isMobile ? "13px 7px" : "18px 13px",
          color: "#b8d7ff",
          fontWeight: 500,
          fontSize: isMobile ? 13.2 : 15,
          lineHeight: 1.3,
        }}>
          <div><span style={{ color: "#b6cafc" }}>Телефон:</span> <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a></div>
          <div><span style={{ color: "#b6cafc" }}>Адрес:</span> <span style={{ color: "#fff", fontWeight: 700 }}>{ADDRESS}</span></div>
        </div>
      </div>

      {/* ---- ЛЕЙБЛ КАТЕГОРИИ ---- */}
      {!activeCategory && (
        <div style={{
          fontWeight: 800,
          fontSize: isMobile ? 21 : 27,
          color: ACCENT,
          margin: isMobile ? "12px 0 13px 7px" : "22px 0 16px 7px",
          letterSpacing: ".01em",
        }}>
          Категории
        </div>
      )}

      {/* ------------- ГЛАВНАЯ: КАТЕГОРИИ ------------ */}
      {!activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          width: "98vw",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 9 : 13,
          zIndex: 2,
        }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={cat.name}
              onClick={() => { setActiveCategory(cat); setActiveBrandIdx(null); setSearch(""); }}
              style={{
                width: "100%",
                background: "rgba(60,164,255,0.13)",
                color: "#fff",
                border: "none",
                borderRadius: 11,
                fontWeight: 800,
                fontSize: isMobile ? 18 : 22,
                cursor: "pointer",
                padding: isMobile ? "16px 4px" : "22px 10px",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 15 : 21,
                boxShadow: "0 2px 12px #3ca4ff1a",
                transition: "background .18s, box-shadow .15s",
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ fontSize: isMobile ? 26 : 32, marginRight: 6 }}>{cat.emoji}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>
      )}

      {/* ----------- СТРАНИЦА ТОВАРОВ КАТЕГОРИИ ---------- */}
      {activeCategory && (
        <div style={{
          maxWidth: isMobile ? "98vw" : "520px",
          margin: isMobile ? "13px auto 0 auto" : "27px auto 0 auto",
          padding: 0,
        }}>
          {/* КНОПКА НАЗАД */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => { setActiveCategory(null); setActiveBrandIdx(null); setSearch(""); }}
            style={{
              width: "100%",
              background: "#212a40",
              color: ACCENT,
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: isMobile ? 15 : 16,
              cursor: "pointer",
              padding: isMobile ? "12px 0" : "14px 0",
              marginBottom: isMobile ? 10 : 18,
            }}>
            ← Назад к категориям
          </motion.button>

          {/* ПОДКАТЕГОРИИ-СКРОЛЛ */}
          {activeCategory.brands?.length > 1 && (
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: 9,
                marginBottom: 13,
                paddingBottom: 2,
              }}
            >
              <button
                onClick={() => { setActiveBrandIdx(null); setSearch(""); }}
                style={{
                  background: activeBrandIdx === null ? ACCENT : "rgba(255,255,255,0.10)",
                  color: activeBrandIdx === null ? "#fff" : "#b5bddb",
                  border: "none",
                  borderRadius: 9,
                  fontWeight: 700,
                  fontSize: isMobile ? 14 : 16,
                  cursor: "pointer",
                  padding: isMobile ? "10px 16px" : "13px 25px",
                  minWidth: 68,
                  letterSpacing: "0.01em",
                  boxShadow: activeBrandIdx === null ? "0 2px 10px #2d70ff22" : "none"
                }}>
                Все
              </button>
              {activeCategory.brands.map((brand, idx) => (
                <button
                  key={brand.name}
                  onClick={() => { setActiveBrandIdx(idx); setSearch(""); }}
                  style={{
                    background: activeBrandIdx === idx ? ACCENT : "rgba(255,255,255,0.10)",
                    color: activeBrandIdx === idx ? "#fff" : "#b5bddb",
                    border: "none",
                    borderRadius: 9,
                    fontWeight: 700,
                    fontSize: isMobile ? 14 : 16,
                    cursor: "pointer",
                    padding: isMobile ? "10px 16px" : "13px 25px",
                    minWidth: 68,
                    letterSpacing: "0.01em",
                    boxShadow: activeBrandIdx === idx ? "0 2px 10px #2d70ff22" : "none"
                  }}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          )}

          {/* --- Поиск --- */}
          <div style={{ marginBottom: isMobile ? 9 : 15 }}>
            <input
              type="text"
              placeholder="Поиск товара…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: isMobile ? "11px 14px" : "15px 20px",
                borderRadius: 10,
                border: "none",
                fontSize: isMobile ? 15 : 17,
                fontWeight: 600,
                outline: "none",
                background: "#222B38",
                color: "#fff",
                boxShadow: "0 2px 12px #0001",
                letterSpacing: ".02em"
              }}
            />
          </div>

          {/* --- Товары --- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 13 : 18
            }}>
            {(activeBrandIdx === null ? activeCategory.products : activeCategory.brands[activeBrandIdx].products)
              .filter((product) =>
                !search ||
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.brand?.toLowerCase().includes(search.toLowerCase())
              )
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
                      borderRadius: 15,
                      boxShadow: "0 8px 22px #08172b15, 0 1.5px 8px #10192840",
                      padding: isMobile ? 10 : 18,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: isMobile ? 180 : 240,
                      width: "100%",
                      boxSizing: "border-box",
                      justifyContent: "flex-start",
                      position: "relative",
                      overflow: "hidden",
                      transition: "box-shadow .13s",
                      backdropFilter: "blur(7px)"
                    }}
                    whileHover={{
                      boxShadow: "0 10px 30px #3ca4ff20, 0 2px 8px #091d3c44",
                      scale: 1.022
                    }}
                  >
                    <motion.img
                      src={product.img || TV_PLACEHOLDER}
                      onError={onImgError}
                      alt={product.name}
                      style={{
                        width: isMobile ? 60 : 86,
                        height: isMobile ? 60 : 86,
                        objectFit: "cover",
                        borderRadius: 11,
                        marginBottom: 6,
                        background: "#23272f",
                        boxShadow: "0 2px 8px #18408032",
                        border: `1.2px solid ${BORDER}`,
                        transition: ".14s"
                      }}
                      initial={false}
                      animate={addAnimId === product.id ? { scale: [1, 1.09, 0.96, 1] } : { scale: 1 }}
                      transition={{ duration: 0.31 }}
                    />
                    <div style={{
                      fontWeight: 800,
                      fontSize: isMobile ? 13 : 16,
                      marginBottom: 3,
                      textAlign: "center",
                      width: "100%",
                      color: "#fff"
                    }}>
                      {product.brand}
                    </div>
                    <div style={{
                      fontSize: isMobile ? 10 : 12,
                      marginBottom: 5,
                      color: "#c2c2c2",
                      textAlign: "center",
                      width: "92%",
                      margin: "0 auto",
                      lineHeight: 1.22,
                    }}>
                      {product.name}
                    </div>
                    {product.desc && (
                      <div style={{
                        color: "#a8c8fa",
                        textAlign: "center",
                        fontWeight: 400,
                        fontSize: isMobile ? 9 : 11,
                        marginBottom: 5,
                        textShadow: "0 1px 7px #1978e622"
                      }}>{product.desc}</div>
                    )}
                    <div style={{
                      fontWeight: 800,
                      fontSize: isMobile ? 10.5 : 13,
                      marginBottom: 7,
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
                          padding: isMobile ? "6px 0" : "10px 0",
                          borderRadius: 10,
                          border: "none",
                          fontWeight: 800,
                          fontSize: isMobile ? 11 : 13,
                          cursor: "pointer",
                          width: "100%",
                          boxShadow: "0 2px 10px #2680d72a",
                          position: "relative",
                          transition: "background .16s"
                        }}
                      >
                        В корзину
                      </motion.button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          gap: 6,
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
                            fontSize: 18,
                            fontWeight: 900,
                            padding: "6px 10px 7px 10px",
                            cursor: "pointer",
                            outline: "none",
                            borderRadius: 6
                          }}
                        >–</motion.button>
                        <div style={{
                          color: "#181B23",
                          minWidth: 15,
                          textAlign: "center",
                          fontWeight: 900,
                          fontSize: 12
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
                            fontSize: 18,
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
                            fontSize: isMobile ? 12 : 17,
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

      {/* ---------- Корзина ---------- */}
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
