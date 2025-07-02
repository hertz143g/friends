import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// НЕОНОВЫЙ ФОН (canvas)
function NeonBg() {
  useEffect(() => {
    let animId;
    const canvas = document.getElementById("neon-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);

    // Параметры неоновых “пятен”
    const blobs = Array.from({length: 5}).map((_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 160 + Math.random()*80,
      dx: (Math.random()-0.5)*0.7,
      dy: (Math.random()-0.5)*0.6,
      color: [
        "#39f8ff33", "#2b3bff33", "#e23bff28", "#41f1b025", "#fff33a20"
      ][i]
    }));

    function draw() {
      ctx.clearRect(0,0,w,h);
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, b.r*0.17, b.x, b.y, b.r);
        g.addColorStop(0, b.color.replace("33", "c5"));
        g.addColorStop(1, b.color);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2*Math.PI);
        ctx.fillStyle = g;
        ctx.fill();
        // движение
        b.x += b.dx; b.y += b.dy;
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
      id="neon-bg"
      style={{
        position: "fixed",
        top: 0, left: 0, zIndex: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        transition: "filter .6s",
        filter: "blur(8px) brightness(1.04) saturate(1.12)",
      }}
    />
  );
}

const ACCENT = "#39f8ff";
const BG = "#181B23";
const CARD = "rgba(22,24,32,0.64)";
const BORDER = "rgba(51, 250, 255, 0.18)";
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
    }, 3000);
    return () => clearInterval(timer);
  }, [activeSection]);

  const isMobile = vw < 550;
  const blockWidth = isMobile ? "calc(100vw - 12px)" : "430px";
  const gapY = isMobile ? 28 : 36;

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
      <NeonBg />

      <header style={{ textAlign: "center", padding: "24px 0 0 0", position: "relative", zIndex: 2 }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 68,
            height: 68,
            objectFit: "cover",
            borderRadius: "50%",
            border: `3px solid ${ACCENT}`,
            background: "#fff",
            margin: "0 auto 0 auto",
            display: "block",
            boxShadow: "0 0 38px #25faff44",
          }}
        />
        <motion.button
          animate={cartAnim ? { scale: [1, 1.15, 0.93, 1], rotate: [0, -11, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          onClick={() => setShowCart(true)}
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            zIndex: 5
          }}
        >
          <span style={{ position: "relative" }}>
            <svg width={29} height={29} viewBox="0 0 24 24" fill={ACCENT}>
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
                  color: "#191c23",
                  borderRadius: "50%",
                  padding: "2.5px 8px",
                  fontSize: 12,
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #00e2ffc0"
                }}
              >
                {cartTotalCount}
              </motion.span>
            )}
          </span>
        </motion.button>
        <div style={{
          width: "100%",
          maxWidth: blockWidth,
          margin: "32px auto 0 auto",
          height: 2,
          background: "linear-gradient(90deg,#232934 10%, #39f8ff77 40%, #232934 90%)",
          borderRadius: 3,
          boxShadow: "0 2px 22px #39f8ff09",
        }}></div>
      </header>

      {/* Категории */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 13,
        margin: "44px 0 34px 0",
        flexWrap: "wrap",
        zIndex: 2,
        position: "relative"
      }}>
        {SECTIONS.map((section, idx) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(idx)}
            style={{
              background: idx === activeSection
                ? "linear-gradient(93deg,#27e8ff 30%,#2540ff 120%)"
                : "rgba(41,66,80,0.19)",
              color: idx === activeSection ? "#fff" : "#b8d5ff",
              border: "none",
              borderRadius: 14,
              padding: "12px 22px",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: idx === activeSection
                ? "0 3px 18px #39f8ff44"
                : "0 2px 10px #232c3c22",
              transition: "0.16s",
              letterSpacing: "0.01em",
              textShadow: idx === activeSection ? "0 2px 8px #19c8d4" : "none"
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Главная страница */}
      {activeSection === 0 && (
        <div style={{
          maxWidth: blockWidth,
          margin: "0 auto",
          width: "100%",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: gapY,
          zIndex: 2,
          position: "relative"
        }}>
          {/* Карусель */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
            style={{
              width: "100%",
              background: "rgba(20,26,36,0.64)",
              borderRadius: 23,
              padding: isMobile ? "14px 7px 22px 7px" : "28px 26px",
              boxShadow: "0 4px 38px #39f8ff1c, 0 1px 10px #13233077",
              backdropFilter: "blur(12px) saturate(1.2)",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 9,
              border: `1.7px solid ${BORDER}`,
              position: "relative"
            }}>
            <div style={{
              fontWeight: 900,
              fontSize: isMobile ? 18 : 22,
              marginBottom: 14,
              textAlign: "center",
              letterSpacing: "0.01em",
              color: "#fff",
              textShadow: "0 2px 10px #0ef8ff24"
            }}>🔥 Топовые товары</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 13,
              width: "100%",
              margin: 0,
              position: "relative"
            }}>
              {/* Стрелка влево */}
              <button
                onClick={prevCarousel}
                style={{
                  position: "absolute",
                  left: 3,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(39,232,255,0.13)",
                  border: "none",
                  borderRadius: "50%",
                  width: 46,
                  height: 46,
                  color: ACCENT,
                  cursor: "pointer",
                  zIndex: 3,
                  fontSize: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px #39f8ff2d"
                }}
              >‹</button>
              {/* Карточка */}
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", duration: 0.34 }}
                style={{
                  background: "rgba(22,27,38,0.78)",
                  borderRadius: 23,
                  boxShadow: "0 6px 32px #39f8ff25, 0 1px 12px #1c183c26",
                  padding: isMobile ? "18px 10px" : "23px 29px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: isMobile ? 188 : 230,
                  maxWidth: isMobile ? 228 : 300,
                  width: "100%",
                  border: `1.4px solid ${BORDER}`,
                  transition: "box-shadow .2s"
                }}
              >
                <motion.img
                  src={CAROUSEL_PRODUCTS[carouselIndex].img}
                  alt=""
                  style={{
                    width: isMobile ? 70 : 98,
                    height: isMobile ? 70 : 98,
                    borderRadius: 16,
                    objectFit: "cover",
                    marginBottom: 14,
                    background: "#222",
                    boxShadow: "0 2px 18px #39f8ff1c, 0 1px 8px #2b39ff21"
                  }}
                  onError={onImgError}
                  initial={false}
                  animate={addAnimId === CAROUSEL_PRODUCTS[carouselIndex].id ? { scale: [1, 1.09, 0.96, 1] } : { scale: 1 }}
                  transition={{ duration: 0.38 }}
                />
                <div style={{
                  fontWeight: 900,
                  fontSize: isMobile ? 17 : 19,
                  marginBottom: 6,
                  color: "#39f8ff",
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 8px #0ef8ff28"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].brand}</div>
                <div style={{
                  fontSize: isMobile ? 13.5 : 15.5,
                  color: "#e0e9f7",
                  marginBottom: 10,
                  textAlign: "center",
                  minHeight: isMobile ? 30 : 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  textShadow: "0 1px 7px #212a4c11"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].name}</div>
                <div style={{
                  fontSize: isMobile ? 12 : 13.5,
                  color: "#96f6fa",
                  marginBottom: 9,
                  fontWeight: 400,
                  letterSpacing: ".01em",
                  textShadow: "0 1px 7px #19f8e622"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].desc}</div>
                <div style={{
                  fontWeight: 900,
                  fontSize: isMobile ? 17 : 20,
                  marginBottom: 8,
                  color: "#fff",
                  textShadow: "0 2px 10px #39f8ff33"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].price} ₽</div>
                <motion.button
                  whileTap={{ scale: 0.94, backgroundColor: "#197ad2" }}
                  onClick={() => addToCart(CAROUSEL_PRODUCTS[carouselIndex].id)}
                  style={{
                    background: "linear-gradient(91deg,#39f8ff,#284bff 85%)",
                    color: "#181B23",
                    border: "none",
                    borderRadius: 13,
                    fontWeight: 900,
                    padding: isMobile ? "11px 0" : "13px 0",
                    cursor: "pointer",
                    fontSize: isMobile ? 15 : 17,
                    width: "100%",
                    maxWidth: isMobile ? 180 : 240,
                    boxShadow: "0 1px 12px #39f8ff3e, 0 1px 5px #1c183c11"
                  }}>В корзину</motion.button>
              </motion.div>
              {/* Стрелка вправо */}
              <button
                onClick={nextCarousel}
                style={{
                  position: "absolute",
                  right: 3,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(39,232,255,0.13)",
                  border: "none",
                  borderRadius: "50%",
                  width: 46,
                  height: 46,
                  color: ACCENT,
                  cursor: "pointer",
                  zIndex: 3,
                  fontSize: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px #39f8ff2d"
                }}
              >›</button>
            </div>
          </motion.div>

          {/* Приветственный блок */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17, duration: 0.56, type: "spring" }}
            style={{
              background: "rgba(30,38,54,0.78)",
              borderRadius: 23,
              boxShadow: "0 2px 18px #39f8ff29, 0 2px 10px #0ef8ff13",
              padding: isMobile ? "25px 9px" : "42px 36px",
              fontSize: isMobile ? 17.5 : 21,
              textAlign: "center",
              fontWeight: 800,
              color: "#eafaff",
              marginTop: 0,
              letterSpacing: "0.02em",
              lineHeight: 1.39,
              border: `1.4px solid ${BORDER}`,
              backdropFilter: "blur(7px) saturate(1.08)"
            }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 900, textShadow: "0 2px 10px #0ef8ff69" }}>4Friends Store</span>!
            <br />
            <span style={{ fontWeight: 400, color: "#b9fff8", textShadow: "0 2px 8px #19f8e629" }}>
              У нас только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!
            </span>
          </motion.div>

          {/* Кнопка Telegram */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.52, type: "spring" }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                background: "linear-gradient(91deg,#39f8ff,#254aff 85%)",
                color: "#181B23",
                padding: isMobile ? "18px 0" : "24px 0",
                width: isMobile ? "98vw" : "390px",
                maxWidth: "100vw",
                borderRadius: 15,
                fontWeight: 900,
                fontSize: isMobile ? 18 : 22,
                textDecoration: "none",
                boxShadow: "0 2px 28px #278aff31, 0 1px 8px #0ef8ff1e",
                justifyContent: "center",
                border: `1.5px solid #26e8fa`,
                letterSpacing: "0.04em",
                transition: ".17s"
              }}>
              <svg width="32" height="32" viewBox="0 0 240 240" fill="none" style={{ display: "block", filter: "drop-shadow(0 0 6px #39f8ff99)" }}>
                <circle cx="120" cy="120" r="120" fill="#229ED9"/>
                <path d="M55 123.6L168.7 78.7C173.5 76.8 178 79.7 176.6 86.2L157.6 171.5C156.4 176.6 153.2 177.9 148.7 175.5L126.6 159.6L115.6 170.1C114.1 171.6 112.8 172.9 110 172.9L111.5 150.2L159.5 104.6C161.5 102.8 159.1 101.7 156.5 103.5L98.5 144.1L76.7 136.6C71.9 135.1 71.8 131.9 77.2 129.7Z" fill="#fff"/>
              </svg>
              Перейти в канал
            </a>
          </motion.div>

          {/* Контакты + адрес */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.31, duration: 0.49, type: "spring" }}
            style={{
              background: "rgba(24,32,44,0.79)",
              borderRadius: 19,
              padding: isMobile ? "26px 13px" : "38px 31px",
              boxShadow: "0 2px 18px #0ef8ff24, 0 2px 10px #1d263740",
              color: "#e9f3ff",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 14 : 22,
              fontSize: isMobile ? 16 : 19,
              border: `1.2px solid ${BORDER}`,
              backdropFilter: "blur(7px) saturate(1.09)"
            }}>
            <div style={{
              fontWeight: 900,
              fontSize: isMobile ? 16 : 22,
              letterSpacing: "0.01em",
              color: ACCENT,
              marginBottom: 2,
              textShadow: "0 2px 9px #19f8ff39"
            }}>
              Контакты магазина
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Телефон:</span>{" "}
              <a href={`tel:${PHONE}`} style={{
                color: "#fff", textDecoration: "none", fontWeight: 800,
                textShadow: "0 2px 8px #19f8e622"
              }}>{PHONE}</a>
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Адрес:</span>{" "}
              <span style={{
                color: "#fff", fontWeight: 800, textShadow: "0 2px 8px #19f8e622"
              }}>{ADDRESS}</span>
            </div>
            <div style={{
              fontSize: isMobile ? 12.5 : 14.5,
              color: "#b5e1ff",
              marginTop: 2,
              textShadow: "0 1px 4px #19f8e622"
            }}>
              Пишите и звоните — мы всегда на связи!
            </div>
          </motion.div>
        </div>
      )}

      {/* Каталог */}
      {activeSection !== 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: 34,
            maxWidth: 1200,
            margin: "0 auto",
            padding: 18,
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
                  initial={{ opacity: 0, y: 26, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 36, scale: 0.94 }}
                  transition={{ delay: i * 0.07, duration: 0.36, type: "spring" }}
                  style={{
                    background: "rgba(30,38,54,0.78)",
                    border: `1.6px solid ${BORDER}`,
                    borderRadius: 26,
                    boxShadow: "0 12px 42px #39f8ff17, 0 2px 12px #19f8e61c",
                    padding: 26,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 355,
                    height: 355,
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "0 auto",
                    justifyContent: "flex-start",
                    position: "relative",
                    overflow: "hidden",
                    transition: "box-shadow .18s",
                    backdropFilter: "blur(8px) saturate(1.11)"
                  }}
                  whileHover={{
                    boxShadow: "0 26px 64px #39f8ff3c, 0 4px 22px #0ef8ff1c",
                    scale: 1.027
                  }}
                >
                  <motion.img
                    src={product.img || FALLBACK_IMG}
                    alt={product.name}
                    style={{
                      width: 112,
                      height: 112,
                      objectFit: "cover",
                      borderRadius: 20,
                      marginBottom: 15,
                      background: "#23272f",
                      boxShadow: "0 2px 16px #39f8ff1c, 0 1px 8px #19f8e626",
                      border: `1.2px solid ${BORDER}`,
                      transition: ".17s"
                    }}
                    onError={onImgError}
                    initial={false}
                    animate={addAnimId === product.id ? { scale: [1, 1.13, 0.96, 1] } : { scale: 1 }}
                    transition={{ duration: 0.37 }}
                  />
                  <div style={{
                    fontWeight: 900,
                    fontSize: 17,
                    marginBottom: 8,
                    textAlign: "center",
                    width: "100%",
                    letterSpacing: ".03em",
                    color: ACCENT,
                    textShadow: "0 2px 10px #0ef8ff22"
                  }}>
                    {product.brand}
                  </div>
                  <div style={{
                    fontSize: 15.5,
                    marginBottom: 10,
                    color: "#eafaff",
                    textAlign: "center",
                    width: "90%",
                    margin: "0 auto",
                    lineHeight: 1.45,
                    fontWeight: 500,
                    textShadow: "0 1px 6px #212a4c10"
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    fontSize: 13.5,
                    marginBottom: 12,
                    color: "#96f6fa",
                    textAlign: "center",
                    fontWeight: 400,
                    letterSpacing: ".01em",
                    textShadow: "0 1px 7px #19f8e622"
                  }}>{product.desc}</div>
                  <div style={{
                    fontWeight: 800,
                    fontSize: 19,
                    marginBottom: 17,
                    color: "#fff",
                    textShadow: "0 2px 10px #39f8ff44"
                  }}>
                    {product.price} ₽
                  </div>
                  {qty === 0 ? (
                    <motion.button
                      whileTap={{ scale: 0.93, backgroundColor: "#197ad2" }}
                      onClick={() => addToCart(product.id)}
                      style={{
                        background: "linear-gradient(93deg,#39f8ff 30%,#2b3bff 120%)",
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
                        boxShadow: "0 1px 8px #39f8ff11"
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
                          textShadow: "0 2px 13px #19f8e622",
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
            <div style={{ fontSize: 23, fontWeight: 900, marginBottom: 17, letterSpacing: "0.02em", color: ACCENT, textShadow: "0 2px 8px #0ef8ff33" }}>Корзина</div>
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
                <div style={{ fontWeight: 800, fontSize: 17, textAlign: "right", marginTop: 9, marginBottom: 5, color: ACCENT }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 15,
                    background: "linear-gradient(93deg,#39f8ff 30%,#2b3bff 120%)",
                    color: "#181B23",
                    padding: "14px 0",
                    borderRadius: 13,
                    border: "none",
                    fontWeight: 900,
                    fontSize: 17.5,
                    cursor: "pointer",
                    boxShadow: "0 2px 18px #39f8ff44"
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

      <div style={{ height: 36 }} />
    </div>
  );
};

export default App;
