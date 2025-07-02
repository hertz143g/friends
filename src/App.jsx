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
  { id: 101, brand: "Apple", name: "iPhone 15 Pro 128GB Серый", price: 115000, img: PHONE_PLACEHOLDER, desc: "A17 Pro, 3 камеры, iOS" },
  { id: 102, brand: "Samsung", name: "Samsung Galaxy S24 Ultra 256GB Черный", price: 98000, img: PHONE_PLACEHOLDER, desc: "Snapdragon 8 Gen3, AMOLED" },
  { id: 103, brand: "Xiaomi", name: "Xiaomi Redmi Note 13 Pro 512GB Синий", price: 34000, img: PHONE_PLACEHOLDER, desc: "512ГБ, 200Мп камера" },
];
const WATCHES = [
  { id: 201, brand: "Apple", name: "Apple Watch Series 9", price: 37000, img: PHONE_PLACEHOLDER, desc: "45mm, GPS" },
  { id: 202, brand: "Casio", name: "Casio G-SHOCK DW-5600", price: 8900, img: PHONE_PLACEHOLDER, desc: "Shock Resistant" },
  { id: 203, brand: "Garmin", name: "Garmin Forerunner 255", price: 28500, img: PHONE_PLACEHOLDER, desc: "Спорт-часы" },
];
const MACS = [
  { id: 301, brand: "Apple", name: "MacBook Air 15 2024", price: 127000, img: PHONE_PLACEHOLDER, desc: "M3, 16GB RAM" },
  { id: 302, brand: "Apple", name: "iMac 24\" 2024", price: 159000, img: PHONE_PLACEHOLDER, desc: "M3, 512GB SSD" },
  { id: 303, brand: "Apple", name: "iPad Pro 11\" 2024", price: 99000, img: PHONE_PLACEHOLDER, desc: "M4, 256GB" },
];
const ACCESSORIES = [
  { id: 401, brand: "Apple", name: "AirPods Pro 2", price: 25900, img: PHONE_PLACEHOLDER, desc: "ANC, MagSafe" },
  { id: 402, brand: "Marshall", name: "Marshall Emberton II", price: 18500, img: PHONE_PLACEHOLDER, desc: "Портативная колонка" },
  { id: 403, brand: "Sony", name: "Sony WH-1000XM5", price: 29900, img: PHONE_PLACEHOLDER, desc: "Bluetooth, ANC" },
];
const TVS = [
  { id: 501, brand: "Xiaomi", name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный', price: 16000, img: TV_PLACEHOLDER, desc: "Full HD, Smart TV, HDMI" },
  { id: 502, brand: "Samsung", name: 'Samsung 4K 43" Crystal', price: 37000, img: TV_PLACEHOLDER, desc: "4K UHD, HDR" },
];
const CONSOLES = [
  { id: 601, brand: "Sony", name: "PlayStation 5", price: 68900, img: PHONE_PLACEHOLDER, desc: "Ultra HD Blu-ray" },
  { id: 602, brand: "Microsoft", name: "Xbox Series X", price: 64800, img: PHONE_PLACEHOLDER, desc: "1TB SSD" },
];
const TOYS = [
  { id: 701, brand: "Labubu", name: "Игрушка Labubu Pirate", price: 3300, img: PHONE_PLACEHOLDER, desc: "Коллекционная фигурка" },
];

// --------- СТРУКТУРА КАТЕГОРИЙ с ЭМОДЗИ и БРЕНДАМИ ---------
const CATEGORIES = [
  {
    name: "Смартфоны",
    emoji: "📱",
    brands: [
      { name: "iPhone", emoji: "🍏", products: PHONES.filter(x => x.brand === "Apple") },
      { name: "Samsung", emoji: "📱", products: PHONES.filter(x => x.brand === "Samsung") },
      { name: "Xiaomi", emoji: "📱", products: PHONES.filter(x => x.brand === "Xiaomi") },
      // Можно добавить другие бренды, если будут товары!
    ],
  },
  {
    name: "Часы",
    emoji: "⌚️",
    brands: [
      { name: "Apple Watch", emoji: "🍏", products: WATCHES.filter(x => x.brand === "Apple") },
      { name: "Casio G-SHOCK", emoji: "⏱️", products: WATCHES.filter(x => x.brand === "Casio") },
      { name: "Garmin", emoji: "⌚️", products: WATCHES.filter(x => x.brand === "Garmin") },
    ],
  },
  {
    name: "Компьютеры и планшеты",
    emoji: "💻",
    brands: [
      { name: "MacBook", emoji: "💻", products: MACS.filter(x => x.name.includes("MacBook")) },
      { name: "iMac", emoji: "🖥️", products: MACS.filter(x => x.name.includes("iMac")) },
      { name: "iPad", emoji: "📱", products: MACS.filter(x => x.name.includes("iPad")) },
    ],
  },
  {
    name: "Аудио",
    emoji: "🎧",
    brands: [
      { name: "AirPods", emoji: "🎧", products: ACCESSORIES.filter(x => x.name.includes("AirPods")) },
      { name: "Marshall", emoji: "🔊", products: ACCESSORIES.filter(x => x.brand === "Marshall") },
      { name: "Sony", emoji: "🎶", products: ACCESSORIES.filter(x => x.brand === "Sony") },
    ],
  },
  {
    name: "Электроника",
    emoji: "🔌",
    brands: [
      { name: "Телевизоры", emoji: "📺", products: TVS },
    ],
  },
  {
    name: "Игровые приставки",
    emoji: "🎮",
    brands: [
      { name: "PlayStation", emoji: "🎮", products: CONSOLES.filter(x => x.brand === "Sony") },
      { name: "Xbox", emoji: "🎮", products: CONSOLES.filter(x => x.brand === "Microsoft") },
    ],
  },
  {
    name: "Телевизоры",
    emoji: "📺",
    brands: [
      { name: "Xiaomi TV", emoji: "📺", products: TVS.filter(x => x.brand === "Xiaomi") },
      { name: "Samsung TV", emoji: "📺", products: TVS.filter(x => x.brand === "Samsung") },
    ],
  },
  {
    name: "Игрушки",
    emoji: "🧸",
    brands: [
      { name: "Labubu", emoji: "🧸", products: TOYS },
    ],
  },
];

// -------------- APP ---------------
const App = () => {
  const [activeCategory, setActiveCategory] = useState(null); // категория
  const [activeBrand, setActiveBrand] = useState(null);       // подкатегория
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const isMobile = vw < 600;
  const mainBlockWidth = isMobile ? "97vw" : "420px";

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
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: isMobile ? "13px auto 0 auto" : "22px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.13)",
          borderRadius: 2,
        }}></div>
      </header>

      {/* ------------- ГЛАВНАЯ: КАТЕГОРИИ ------------ */}
      {!activeCategory && (
        <div style={{
          margin: isMobile ? "17px 0" : "37px 0",
          maxWidth: 440,
          width: "98vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 9 : 13,
          zIndex: 2,
          position: "relative",
        }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={cat.name}
              onClick={() => setActiveCategory(cat)}
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

      {/* ----------- СТРАНИЦА БРЕНДОВ ВНУТРИ КАТЕГОРИИ ---------- */}
      {activeCategory && !activeBrand && (
        <div style={{
          margin: isMobile ? "15px 0 0 0" : "27px 0 0 0",
          maxWidth: 440,
          width: "98vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 10 : 15,
          zIndex: 2,
          position: "relative",
        }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(null)}
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
              marginBottom: isMobile ? 7 : 12,
            }}>
            ← Назад к категориям
          </motion.button>
          {activeCategory.brands.map((brand) => (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={brand.name}
              onClick={() => setActiveBrand(brand)}
              style={{
                width: "100%",
                background: "rgba(60,164,255,0.10)",
                color: "#fff",
                border: "none",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: isMobile ? 17 : 20,
                cursor: "pointer",
                padding: isMobile ? "13px 4px" : "18px 10px",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 15 : 20,
                boxShadow: "0 2px 9px #3ca4ff13",
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ fontSize: isMobile ? 23 : 28, marginRight: 5 }}>{brand.emoji}</span>
              {brand.name}
            </motion.button>
          ))}
        </div>
      )}

      {/* ------------ ТОВАРЫ ВНУТРИ БРЕНДА ----------- */}
      {activeCategory && activeBrand && (
        <div style={{
          margin: isMobile ? "13px 0 0 0" : "22px 0 0 0",
          maxWidth: 540,
          width: "98vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 10 : 16,
          zIndex: 2,
          position: "relative",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: isMobile ? 6 : 10 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveBrand(null)}
              style={{
                background: "#212a40",
                color: ACCENT,
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: isMobile ? 14 : 15,
                cursor: "pointer",
                padding: isMobile ? "8px 0" : "10px 0",
                marginRight: 8,
                minWidth: 82,
              }}>
              ← Назад
            </motion.button>
            <div style={{ fontSize: isMobile ? 17 : 22, fontWeight: 800, color: "#fff", letterSpacing: ".02em" }}>
              {activeBrand.emoji} {activeBrand.name}
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 11 : 18
          }}>
            {activeBrand.products.map((product, i) => {
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
