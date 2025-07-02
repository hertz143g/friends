import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Премиальный анимированный фон ----------
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
const CARD = "rgba(31,38,50,0.70)";
const BORDER = "rgba(120,160,220,0.13)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const FALLBACK_IMG = "data:image/svg+xml,%3Csvg width='90' height='90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='90' height='90' rx='16' fill='%2323292f'/%3E%3Cpath d='M45 29c-6.627 0-12 5.373-12 12 0 4.418 2.99 8.166 7.092 10.338C40.613 51.736 41 52.859 41 54v2a2 2 0 1 0 4 0v-2c0-1.141.387-2.264 1.908-2.662C54.01 49.166 57 45.418 57 41c0-6.627-5.373-12-12-12zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%23668899'/%3E%3C/svg%3E";
const PHONE_PLACEHOLDER = FALLBACK_IMG;

const TVS = [
  { id: 396940, brand: "Xiaomi", name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный', price: 16000, desc: "Full HD, Smart TV, HDMI" },
  { id: 394946, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 FHD 2025 RU черный', price: 23100, desc: "4K, Dolby Audio, Android TV" },
  { id: 395792, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 4K 2025 RU черный', price: 23300, desc: "4K UHD, HDR10+" },
  { id: 398100, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 Pro 4K 2025 RU черный', price: 26500, desc: "Pro Series, 4K, Wi-Fi 5G" },
  { id: 394448, brand: "Xiaomi", name: 'Телевизор ЖК 50" Xiaomi TV A50 2025 RU RU черный', price: 27800, desc: "50'', Bluetooth, Ultra Slim" },
  { id: 394966, brand: "Xiaomi", name: 'Телевизор ЖК 55" Xiaomi TV A55 2025 RU черный', price: 32800, desc: "55'', Frameless, HDR" }
];

const PHONES = [
  { id: 101, brand: "Apple", name: "iPhone 15 Pro 128GB Серый", price: 115000, img: PHONE_PLACEHOLDER, desc: "A17 Pro, 3 камеры, iOS" },
  { id: 102, brand: "Samsung", name: "Samsung Galaxy S24 Ultra 256GB Черный", price: 98000, img: PHONE_PLACEHOLDER, desc: "Snapdragon 8 Gen3, AMOLED" },
  { id: 103, brand: "Xiaomi", name: "Xiaomi Redmi Note 13 Pro 512GB Синий", price: 34000, img: PHONE_PLACEHOLDER, desc: "512ГБ, 200Мп камера" }
];

const CAROUSEL_PRODUCTS = [
  { ...TVS[0], img: TV_PLACEHOLDER },
  { ...PHONES[0] },
  { ...TVS[3], img: TV_PLACEHOLDER },
  { ...PHONES[2] },
];

const SECTIONS = [
  { name: "Главная" },
  {
    name: "Телевизоры",
    products: TVS.map(tv => ({
      ...tv,
      img: TV_PLACEHOLDER
    })),
  },
  {
    name: "Телефоны",
    products: PHONES
  }
];

function getColumns() {
  if (window.innerWidth > 950) return "repeat(3, 1fr)";
  if (window.innerWidth > 650) return "repeat(2, 1fr)";
  return "1fr";
}

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const products = SECTIONS[activeSection]?.products || [];
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [columns, setColumns] = useState(getColumns());
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 375);

  useEffect(() => {
    const onResize = () => {
      setColumns(getColumns());
      setVw(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    onResize();
    document.body.style.background = BG;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.background = BG;
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.overflowX = "hidden";
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (activeSection !== 0) return;
    const timer = setInterval(() => {
      setCarouselIndex(idx => (idx + 1) % CAROUSEL_PRODUCTS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [activeSection]);

  const isMobile = vw < 550;
  // ---------- Все блоки одной ширины ----------
  const mainBlockWidth = isMobile ? "calc(100vw - 16px)" : "420px";
  const gapY = isMobile ? 25 : 32;

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
    setTimeout(() => setAddAnimId(null), 500);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getQtyInCart = (id) => {
    const found = cart.find(item => item.id === id);
    return found ? found.qty : 0;
  };

  function getProduct(id) {
    for (let section of SECTIONS) {
      if (!section.products) continue;
      const found = section.products.find((p) => p.id === id);
      if (found) return found;
    }
    return null;
  }

  const total = cart.reduce(
    (sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty,
    0
  );

  function nextCarousel() {
    setCarouselIndex((carouselIndex + 1) % CAROUSEL_PRODUCTS.length);
  }
  function prevCarousel() {
    setCarouselIndex(
      (carouselIndex - 1 + CAROUSEL_PRODUCTS.length) % CAROUSEL_PRODUCTS.length
    );
  }

  function onImgError(e) {
    e.target.src = FALLBACK_IMG;
  }

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
        boxSizing: "border-box",
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <AnimatedBg />

      <header style={{ textAlign: "center", padding: "18px 0 0 0", position: "relative", zIndex: 2 }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 62,
            height: 62,
            objectFit: "cover",
            borderRadius: "50%",
            border: `2.5px solid ${ACCENT}`,
            background: "#fff",
            margin: "0 auto 0 auto",
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
            top: 18,
            right: 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <span style={{ position: "relative" }}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill={ACCENT}>
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
          margin: "22px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
      </header>

      {/* Категории */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 11, margin: "44px 0 16px 0", flexWrap: "wrap", zIndex: 2, position: "relative"
      }}>
        {SECTIONS.map((section, idx) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(idx)}
            style={{
              background: idx === activeSection ? ACCENT : "transparent",
              color: idx === activeSection ? "#fff" : "#aaa",
              border: "none",
              borderRadius: 12,
              padding: "8px 15px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: idx === activeSection ? "0 2px 10px #2d70ff33" : "none",
              transition: "0.15s",
              letterSpacing: "0.01em"
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Главная страница */}
      {activeSection === 0 && (
        <div style={{
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          width: "100%",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: gapY,
          zIndex: 2,
          position: "relative",
          alignItems: "center" // Центрируем всё по центру
        }}>
          {/* Карусель */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
            style={{
              width: "100%",
              background: CARD,
              borderRadius: 23,
              padding: isMobile ? "14px 7px 22px 7px" : "28px 26px",
              boxShadow: "0 4px 38px #1c2d471c, 0 1px 10px #13233077",
              backdropFilter: "blur(12px) saturate(1.06)",
              border: `1.7px solid ${BORDER}`,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12
            }}>
            <div style={{
              fontWeight: 800,
              fontSize: isMobile ? 16 : 18,
              marginBottom: 8,
              textAlign: "center",
              letterSpacing: "0.01em",
              color: "#fff"
            }}>Топовые товары</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              margin: 0,
            }}>
              <button onClick={prevCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>‹</button>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ type: "spring", duration: 0.37 }}
                style={{
                  background: "rgba(32,36,47,0.83)",
                  borderRadius: 19,
                  boxShadow: "0 3px 16px #181e2827",
                  padding: isMobile ? "18px 11px" : "19px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: isMobile ? 168 : 225,
                  maxWidth: isMobile ? 240 : 290,
                  width: "100%",
                  border: `1.2px solid ${BORDER}`,
                  backdropFilter: "blur(7px)"
                }}
              >
                <img src={CAROUSEL_PRODUCTS[carouselIndex].img}
                  onError={onImgError}
                  alt="" style={{
                  width: isMobile ? 62 : 86,
                  height: isMobile ? 62 : 86,
                  borderRadius: 13,
                  objectFit: "cover",
                  marginBottom: 8,
                  background: "#21242b",
                  border: `1.5px solid ${BORDER}`,
                }} />
                <div style={{ fontWeight: 800, fontSize: isMobile ? 15.5 : 16.7, marginBottom: 3 }}>{CAROUSEL_PRODUCTS[carouselIndex].brand}</div>
                <div style={{
                  fontSize: isMobile ? 12 : 14,
                  color: "#b2bfd7",
                  marginBottom: 6,
                  textAlign: "center",
                  minHeight: isMobile ? 28 : 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].name}</div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 13.8 : 16, marginBottom: 7, color: ACCENT }}>{CAROUSEL_PRODUCTS[carouselIndex].price} ₽</div>
                <button onClick={() => addToCart(CAROUSEL_PRODUCTS[carouselIndex].id)}
                  style={{
                    background: ACCENT,
                    color: "#181B23",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 700,
                    padding: isMobile ? "8px 13px" : "11px 19px",
                    cursor: "pointer",
                    fontSize: isMobile ? 13.3 : 14.7,
                    boxShadow: "0 2px 8px #3ca4ff1a"
                  }}>В корзину</button>
              </motion.div>
              <button onClick={nextCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>›</button>
            </div>
          </motion.div>

          {/* Приветственный блок */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 20,
              boxShadow: "0 2px 12px #1a1f2e22",
              padding: isMobile ? "22px 10px" : "34px 32px",
              fontSize: isMobile ? 16.2 : 18.7,
              textAlign: "center",
              fontWeight: 600,
              color: "#f3f6fa",
              marginTop: 0,
              letterSpacing: "0.02em",
              lineHeight: 1.42,
              border: `1.4px solid ${BORDER}`,
              backdropFilter: "blur(10px)",
              width: "100%" // Одинаковая ширина
            }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!
            <br />
            <span style={{ fontWeight: 400, color: "#b8d7ff" }}>У нас только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!</span>
          </motion.div>

          {/* Кнопка Telegram с лого */}
          <motion.a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, type: "spring" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              margin: "0 auto",
              background: ACCENT,
              color: "#fff",
              padding: isMobile ? "13px 20px" : "16px 34px",
              borderRadius: 13,
              fontWeight: 800,
              fontSize: isMobile ? 15 : 17,
              textDecoration: "none",
              boxShadow: "0 2px 18px #3ca4ff22",
              border: "none",
              transition: ".18s",
              letterSpacing: "0.05em",
              outline: "none",
              width: "100%", // ширина блока!
              maxWidth: "100%"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 22 : 26} width={isMobile ? 22 : 26} viewBox="0 0 24 24" style={{ marginRight: 8, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="12" fill="#229ed9"/>
              <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z"/>
            </svg>
            Перейти в Telegram
          </motion.a>

          {/* Контакты + адрес */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 17,
              padding: isMobile ? "21px 11px" : "28px 24px",
              boxShadow: "0 2px 12px #1d263760",
              color: "#e9f3ff",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 12 : 17,
              fontSize: isMobile ? 15.2 : 16.7,
              border: `1.3px solid ${BORDER}`,
              backdropFilter: "blur(7px)",
              width: "100%" // одинаковая ширина
            }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 15.7 : 18, letterSpacing: "0.01em", color: ACCENT, marginBottom: 2 }}>
              Контакты магазина
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Телефон:</span>{" "}
              <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a>
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Адрес:</span>{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>{ADDRESS}</span>
            </div>
            <div style={{ fontSize: isMobile ? 12.4 : 14.2, color: "#b5e1ff", marginTop: 2 }}>
              Пишите и звоните — мы всегда на связи!
            </div>
          </motion.div>
        </div>
      )}

      {/* Каталог (остальное не меняется) */}
      {activeSection !== 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: 30,
            maxWidth: 1200,
            margin: "0 auto",
            padding: 16,
            width: "100%",
            alignItems: "stretch",
            boxSizing: "border-box",
            overflowX: "hidden",
            zIndex: 2,
            position: "relative"
          }}
        >
          <AnimatePresence mode="wait">
            {products.map((product, i) => {
              const qty = getQtyInCart(product.id);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 42, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.36, type: "spring" }}
                  style={{
                    background: CARD,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 23,
                    boxShadow: "0 8px 32px #08172b22, 0 1.5px 8px #10192855",
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 375,
                    height: 375,
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "0 auto",
                    justifyContent: "flex-start",
                    position: "relative",
                    overflow: "hidden",
                    transition: "box-shadow .15s",
                    backdropFilter: "blur(7px)"
                  }}
                  whileHover={{
                    boxShadow: "0 16px 42px #3ca4ff27, 0 2px 10px #091d3c66",
                    scale: 1.025
                  }}
                >
                  <motion.img
                    src={product.img || TV_PLACEHOLDER}
                    onError={onImgError}
                    alt={product.name}
                    style={{
                      width: 128,
                      height: 128,
                      objectFit: "cover",
                      borderRadius: 18,
                      marginBottom: 16,
                      background: "#23272f",
                      boxShadow: "0 2px 12px #18408042",
                      border: `1.5px solid ${BORDER}`,
                      transition: ".17s"
                    }}
                    initial={false}
                    animate={addAnimId === product.id ? { scale: [1, 1.12, 0.97, 1] } : { scale: 1 }}
                    transition={{ duration: 0.37 }}
                  />
                  <div style={{
                    fontWeight: 800,
                    fontSize: 17.5,
                    marginBottom: 6,
                    textAlign: "center",
                    width: "100%",
                    letterSpacing: "0.015em",
                    color: "#fff"
                  }}>
                    {product.brand}
                  </div>
                  <div style={{
                    fontSize: 13.7,
                    marginBottom: 13,
                    color: "#c2c2c2",
                    textAlign: "center",
                    width: "85%",
                    margin: "0 auto",
                    lineHeight: 1.4,
                    overflowWrap: "break-word"
                  }}>
                    {product.name}
                  </div>
                  {product.desc && (
                    <div style={{
                      color: "#a8c8fa",
                      textAlign: "center",
                      fontWeight: 400,
                      letterSpacing: ".01em",
                      fontSize: 13.1,
                      marginBottom: 8,
                      textShadow: "0 1px 7px #1978e622"
                    }}>{product.desc}</div>
                  )}
                  <div style={{
                    fontWeight: 800,
                    fontSize: 18.5,
                    marginBottom: 15,
                    color: "#fff",
                    textShadow: "0 2px 10px #3ca4ff12"
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
                        padding: "13px 0",
                        borderRadius: 11,
                        border: "none",
                        fontWeight: 900,
                        fontSize: 16.5,
                        cursor: "pointer",
                        width: "100%",
                        boxShadow: "0 2px 12px #2680d733",
                        position: "relative",
                        letterSpacing: "0.04em",
                        transition: "background .18s"
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
                        gap: 9,
                        background: ACCENT,
                        borderRadius: 11,
                        padding: "0 7px",
                        boxShadow: "0 1px 8px #3ca4ff11"
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
                          fontSize: 25,
                          fontWeight: 900,
                          padding: "9px 13px 10px 13px",
                          cursor: "pointer",
                          outline: "none",
                          borderRadius: 6
                        }}
                      >–</motion.button>
                      <div style={{
                        color: "#181B23",
                        minWidth: 28,
                        textAlign: "center",
                        fontWeight: 900,
                        fontSize: 19
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
                          fontSize: 25,
                          fontWeight: 900,
                          padding: "9px 13px 10px 13px",
                          cursor: "pointer",
                          outline: "none",
                          borderRadius: 6
                        }}
                      >+</motion.button>
                    </div>
                  )}
                  {/* Эффект "+1" */}
                  <AnimatePresence>
                    {addAnimId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.7 }}
                        animate={{ opacity: 1, y: -32, scale: 1.13 }}
                        exit={{ opacity: 0, y: -70, scale: 1.38 }}
                        transition={{ duration: 0.53 }}
                        style={{
                          position: "absolute",
                          top: 32,
                          right: 34,
                          color: ACCENT,
                          fontWeight: 900,
                          fontSize: 26,
                          textShadow: "0 2px 13px #3ca4ff22",
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
          </AnimatePresence>
        </div>
      )}

      {/* Корзина */}
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
              borderRadius: 22,
              padding: 28,
              width: 350,
              maxWidth: "98vw",
              boxShadow: "0 8px 28px #0c2340d8",
              border: `2px solid ${BORDER}`,
              maxHeight: "96vh",
              overflowY: "auto",
              zIndex: 999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 23, fontWeight: 900, marginBottom: 17, letterSpacing: "0.02em", color: ACCENT, textShadow: "0 2px 8px #3ca4ff33" }}>Корзина</div>
            {cart.length === 0 ? (
              <div style={{ color: "#aaa", marginBottom: 10, fontWeight: 600 }}>Корзина пуста</div>
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
                        marginBottom: 22,
                        borderBottom: "1px solid #44f6",
                        paddingBottom: 14,
                        gap: 14
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 2, letterSpacing: "0.015em", color: ACCENT }}>{product.brand}</div>
                        <div style={{ fontSize: 14, color: "#c2c2c2", marginBottom: 5, lineHeight: 1.4 }}>{product.name}</div>
                        <div style={{ color: "#999", fontSize: 13, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 70 }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>{product.price * item.qty} ₽</span>
                        <button
                          style={{
                            display: "block",
                            margin: "7px auto 0 auto",
                            color: ACCENT,
                            background: "none",
                            border: "none",
                            fontSize: 13,
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
                <div style={{ fontWeight: 700, fontSize: 17, textAlign: "right", marginTop: 9, marginBottom: 5 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 15,
                    background: ACCENT,
                    color: "#fff",
                    padding: "13px 0",
                    borderRadius: 10,
                    border: "none",
                    fontWeight: 800,
                    fontSize: 15.5,
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
      <div style={{ height: 28 }} />
    </div>
  );
};

export default App;
