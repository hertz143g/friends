import React, { useState, useEffect, useRef } from "react";
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

const USED = [
  { id: 801, brand: "Apple", name: "iPhone 12 Pro 128GB Б/У", price: 47000, img: PHONE_PLACEHOLDER, desc: "Состояние: Отличное" },
];

const CAROUSEL_PRODUCTS = [
  PHONES[0], TVS[0], MACS[0], WATCHES[0], ACCESSORIES[0],
];

const SECTIONS = [
  { name: "Главная" },
  { name: "Смартфоны", products: PHONES },
  { name: "Часы", products: WATCHES },
  { name: "Компьютеры и планшеты", products: MACS },
  { name: "Аксессуары и аудио", products: ACCESSORIES },
  { name: "Телевизоры и электроника", products: TVS },
  { name: "Игровые приставки", products: CONSOLES },
  { name: "Игрушки", products: TOYS },
  { name: "Б/у", products: USED },
];

function getColumns(vw) {
  if (vw > 1024) return "repeat(3, 1fr)";
  if (vw > 650) return "repeat(2, 1fr)";
  return "1fr";
}

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [columns, setColumns] = useState(getColumns(window.innerWidth));
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [vw, setVw] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const categoryListRef = useRef();

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setColumns(getColumns(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (activeSection !== 0) return;
    const timer = setInterval(() => {
      setCarouselIndex(idx => (idx + 1) % CAROUSEL_PRODUCTS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [activeSection]);

  useEffect(() => {
    if (categoryListRef.current) {
      const btn = categoryListRef.current.querySelector(".category-btn-active");
      if (btn) btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [activeSection]);

  // cart utils
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
    setCarouselIndex((carouselIndex - 1 + CAROUSEL_PRODUCTS.length) % CAROUSEL_PRODUCTS.length);
  }
  function onImgError(e) {
    e.target.src = PHONE_PLACEHOLDER;
  }

  const isMobile = vw < 600;
  const mainBlockWidth = isMobile ? "98vw" : "420px";
  const gapY = isMobile ? 19 : 32;

  // --- Получить товары текущего раздела и применить поиск
  const sectionProducts = SECTIONS[activeSection]?.products || [];
  const filteredProducts = search.trim().length === 0
    ? sectionProducts
    : sectionProducts.filter(
        p =>
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()))
      );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: BG,
        color: "#fff",
        fontFamily: "system-ui,sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <AnimatedBg />

      {/* ---------- Хедер ---------- */}
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

      {/* ---------- КАТЕГОРИИ: bubble bar ---------- */}
      <div
        ref={categoryListRef}
        style={{
          display: "flex",
          gap: isMobile ? 7 : 14,
          margin: isMobile ? "16px 2px 12px 2px" : "40px 0 18px 0",
          padding: isMobile ? "2px 0 2px 0" : "6px 0",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          zIndex: 2,
          scrollbarWidth: "none"
        }}
      >
        {SECTIONS.map((section, idx) => (
          <motion.button
            key={section.name}
            onClick={() => { setActiveSection(idx); setSearch(""); }}
            className={idx === activeSection ? "category-btn-active" : ""}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              background: idx === activeSection
                ? `linear-gradient(100deg, ${ACCENT} 60%, #6ed0ff 100%)`
                : "rgba(255,255,255,0.04)",
              color: idx === activeSection ? "#fff" : "#a2b3d7",
              border: "none",
              borderRadius: 19,
              padding: isMobile ? "11px 19px" : "13px 23px",
              fontWeight: 800,
              fontSize: isMobile ? 14.2 : 16.5,
              cursor: "pointer",
              boxShadow: idx === activeSection
                ? "0 4px 18px #41a2ff22, 0 1.5px 7px #99ddff36"
                : "0 2px 6px #141a2d07",
              transition: "background 0.15s, color 0.13s",
              letterSpacing: "0.01em",
              outline: "none",
              marginBottom: 2,
              borderBottom: idx === activeSection ? `3.5px solid #fff6` : "none",
              whiteSpace: "nowrap",
              position: "relative"
            }}
          >
            {section.name}
            {idx === activeSection && (
              <motion.div
                layoutId="active-cat-bubble"
                style={{
                  position: "absolute",
                  left: 0, top: 0, right: 0, bottom: 0,
                  borderRadius: 19,
                  pointerEvents: "none",
                  boxShadow: "0 2px 16px #4ccaff33",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ----------- Поиск ----------- */}
      <div style={{
        width: "100%",
        maxWidth: isMobile ? "96vw" : 600,
        margin: isMobile ? "0 auto 13px auto" : "0 auto 26px auto",
        padding: "0 6px",
        display: activeSection === 0 ? "none" : "block",
        position: "relative",
        zIndex: 5,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(29,37,51,0.97)",
          borderRadius: 11,
          border: `1.2px solid ${BORDER}`,
          boxShadow: "0 2px 8px #141a2d08",
          padding: isMobile ? "8px 10px" : "11px 16px"
        }}>
          <svg width={isMobile ? 18 : 21} height={isMobile ? 18 : 21} fill="#b0d7ff" style={{ marginRight: 7 }}>
            <path d="M20.71 19.29l-4.388-4.387A7.936 7.936 0 0016 9a8 8 0 10-8 8 7.936 7.936 0 005.903-2.677l4.387 4.388a1 1 0 101.414-1.414zM4 9a5 5 0 115 5 5.006 5.006 0 01-5-5z"/>
          </svg>
          <input
            type="text"
            placeholder="Поиск по товарам..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: isMobile ? 15 : 17,
              fontWeight: 500,
              letterSpacing: ".01em",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{
                background: "none", border: "none", color: "#91caf7",
                fontSize: isMobile ? 16 : 19, cursor: "pointer", marginLeft: 3
              }}>✕</button>
          )}
        </div>
      </div>

      {/* ---------- Главная ---------- */}
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
          alignItems: "center"
        }}>
          {/* Карусель */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07, duration: 0.55, type: "spring" }}
            style={{
              width: "100%",
              background: CARD,
              borderRadius: 21,
              padding: isMobile ? "11px 3px 19px 3px" : "28px 22px",
              boxShadow: "0 4px 30px #1c2d4725, 0 1px 10px #13233044",
              border: `1.3px solid ${BORDER}`,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10
            }}>
            <div style={{
              fontWeight: 800,
              fontSize: isMobile ? 15 : 18,
              marginBottom: 5,
              textAlign: "center",
              letterSpacing: "0.01em",
              color: "#fff"
            }}>Топовые товары</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              margin: 0,
            }}>
              <button onClick={prevCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>‹</button>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ type: "spring", duration: 0.32 }}
                style={{
                  background: "rgba(32,36,47,0.83)",
                  borderRadius: 17,
                  boxShadow: "0 3px 14px #181e281c",
                  padding: isMobile ? "13px 8px" : "18px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: isMobile ? 135 : 195,
                  maxWidth: isMobile ? 210 : 260,
                  width: "100%",
                  border: `1px solid ${BORDER}`
                }}
              >
                <img src={CAROUSEL_PRODUCTS[carouselIndex].img}
                  onError={onImgError}
                  alt="" style={{
                  width: isMobile ? 52 : 82,
                  height: isMobile ? 52 : 82,
                  borderRadius: 11,
                  objectFit: "cover",
                  marginBottom: 7,
                  background: "#21242b",
                  border: `1.2px solid ${BORDER}`,
                }} />
                <div style={{ fontWeight: 800, fontSize: isMobile ? 13.5 : 16, marginBottom: 2 }}>{CAROUSEL_PRODUCTS[carouselIndex].brand}</div>
                <div style={{
                  fontSize: isMobile ? 11 : 13,
                  color: "#b2bfd7",
                  marginBottom: 4,
                  textAlign: "center",
                  minHeight: isMobile ? 18 : 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].name}</div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 12.5 : 15, marginBottom: 5, color: ACCENT }}>{CAROUSEL_PRODUCTS[carouselIndex].price} ₽</div>
                <button onClick={() => addToCart(CAROUSEL_PRODUCTS[carouselIndex].id)}
                  style={{
                    background: ACCENT,
                    color: "#181B23",
                    border: "none",
                    borderRadius: 9,
                    fontWeight: 700,
                    padding: isMobile ? "6px 11px" : "10px 15px",
                    cursor: "pointer",
                    fontSize: isMobile ? 12 : 14,
                  }}>В корзину</button>
              </motion.div>
              <button onClick={nextCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>›</button>
            </div>
          </motion.div>

          {/* Приветственный блок */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.52, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 15,
              boxShadow: "0 2px 9px #1a1f2e15",
              padding: isMobile ? "16px 7px" : "30px 26px",
              fontSize: isMobile ? 15 : 18,
              textAlign: "center",
              fontWeight: 600,
              color: "#f3f6fa",
              marginTop: 0,
              letterSpacing: "0.01em",
              lineHeight: 1.37,
              border: `1.1px solid ${BORDER}`,
              width: "100%"
            }}>
            <span style={{ fontWeight: 700 }}>Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!</span>
            <div style={{ fontWeight: 400, color: "#b8d7ff", marginTop: 7 }}>
              Только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!
            </div>
          </motion.div>

          {/* Кнопка Telegram */}
          <motion.a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 17 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.19, duration: 0.46, type: "spring" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              margin: "0 auto",
              background: ACCENT,
              color: "#fff",
              padding: isMobile ? "10px 14px" : "15px 25px",
              borderRadius: 11,
              fontWeight: 800,
              fontSize: isMobile ? 13.5 : 16,
              textDecoration: "none",
              boxShadow: "0 2px 10px #3ca4ff22",
              border: "none",
              transition: ".18s",
              outline: "none",
              width: "100%",
              maxWidth: "100%"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 17 : 23} width={isMobile ? 17 : 23} viewBox="0 0 24 24" style={{ marginRight: 8, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="12" fill="#229ed9"/>
              <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z"/>
            </svg>
            Telegram
          </motion.a>

          {/* Контакты + адрес */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.48, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 12,
              padding: isMobile ? "15px 7px" : "24px 20px",
              boxShadow: "0 2px 12px #1d26374c",
              color: "#e9f3ff",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 8 : 14,
              fontSize: isMobile ? 13 : 16,
              border: `1px solid ${BORDER}`,
              width: "100%"
            }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 13.5 : 16.5, color: ACCENT, marginBottom: 2 }}>
              Контакты
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Телефон:</span>{" "}
              <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a>
            </div>
            <div>
              <span style={{ color: "#b6cafc" }}>Адрес:</span>{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>{ADDRESS}</span>
            </div>
            <div style={{ fontSize: isMobile ? 10.5 : 13, color: "#b5e1ff", marginTop: 2 }}>
              Пишите и звоните — мы всегда на связи!
            </div>
          </motion.div>
        </div>
      )}

      {/* ---------- Каталог ---------- */}
      {activeSection !== 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: isMobile ? 16 : 32,
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? 6 : 16,
            width: "100%",
            alignItems: "stretch",
            boxSizing: "border-box",
            overflowX: "hidden",
            zIndex: 2,
            position: "relative"
          }}
        >
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <div style={{
                gridColumn: "1 / -1",
                color: "#aad6ff",
                textAlign: "center",
                fontWeight: 700,
                fontSize: isMobile ? 15 : 19,
                padding: "40px 0"
              }}>
                Ничего не найдено 😢
              </div>
            ) : filteredProducts.map((product, i) => {
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
                    padding: isMobile ? 11 : 22,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: isMobile ? 235 : 335,
                    height: isMobile ? 235 : 335,
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "0 auto",
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
                      width: isMobile ? 70 : 110,
                      height: isMobile ? 70 : 110,
                      objectFit: "cover",
                      borderRadius: 11,
                      marginBottom: 9,
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
                    fontSize: isMobile ? 14.5 : 17.5,
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
                    width: "88%",
                    margin: "0 auto",
                    lineHeight: 1.28,
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
                  {/* Эффект "+1" */}
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
          </AnimatePresence>
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
