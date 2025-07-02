import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ======= АНИМИРОВАННЫЙ ФОН =======
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

// ======= КОНСТАНТЫ =======
const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "rgba(31,38,50,0.75)";
const BORDER = "rgba(120,160,220,0.13)";
const MAIN_BLOCK_MAX_WIDTH = 420;
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

  // поиск:
  const [search, setSearch] = useState("");
  // для модалки товара:
  const [modalProduct, setModalProduct] = useState(null);

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
  const blockStyle = {
    width: "100%",
    maxWidth: MAIN_BLOCK_MAX_WIDTH,
    margin: "0 auto",
  };
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

  // фильтруем товары по поиску
  const filteredProducts = search.length > 0
    ? products.filter(
        p =>
          (p.brand + " " + p.name)
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : products;

  // ==== START RENDER ====
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

      <header style={{ textAlign: "center", padding: "18px 0 0 0", position: "relative", zIndex: 2, ...blockStyle }}>
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
            right: 0,
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
          margin: "22px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
      </header>

      {/* Категории */}
      <div style={{ ...blockStyle, display: "flex", justifyContent: "center", gap: 11, margin: "44px auto 10px auto", flexWrap: "wrap", zIndex: 2, position: "relative" }}>
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

      {/* Поиск */}
      {activeSection !== 0 && (
        <div style={{ ...blockStyle, margin: "18px auto 0 auto", position: "relative" }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск товаров..."
            style={{
              width: "100%",
              padding: "12px 14px 12px 38px",
              borderRadius: 13,
              border: `1.3px solid ${BORDER}`,
              background: "rgba(28,35,45,0.83)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 500,
              boxShadow: "0 2px 14px #1d243644",
              outline: "none",
              marginBottom: 8
            }}
          />
          <svg
            width={17}
            height={17}
            fill={ACCENT}
            style={{ position: "absolute", top: 15, left: 15, opacity: 0.8 }}
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.854 4.854a1 1 0 001.415-1.414l-4.854-4.854A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
        </div>
      )}

      {/* Главная страница */}
      {activeSection === 0 && (
        <div style={{
          ...blockStyle,
          display: "flex",
          flexDirection: "column",
          gap: gapY
        }}>
          {/* Карусель */}
          <div style={{
            width: "100%",
            background: CARD,
            borderRadius: 18,
            padding: isMobile ? "13px 6px" : "23px 23px",
            boxShadow: "0 4px 24px #1c223040",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            border: `1.5px solid ${BORDER}`,
            backdropFilter: "blur(7px) saturate(1.1)"
          }}>
            <div style={{ fontWeight: 700, fontSize: isMobile ? 16 : 18, marginBottom: 6, textAlign: "center", letterSpacing: "0.01em" }}>Топовые товары</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              margin: 0,
            }}>
              <button onClick={prevCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>‹</button>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", duration: 0.32 }}
                style={{
                  background: "rgba(25,29,37,0.84)",
                  borderRadius: 13,
                  boxShadow: "0 3px 10px #0004",
                  padding: isMobile ? "17px 10px" : "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: isMobile ? 165 : 210,
                  maxWidth: isMobile ? 215 : 270,
                  width: "100%",
                  border: `1.3px solid ${BORDER}`,
                  backdropFilter: "blur(6px)"
                }}
              >
                <img src={CAROUSEL_PRODUCTS[carouselIndex].img} alt="" style={{
                  width: isMobile ? 60 : 78,
                  height: isMobile ? 60 : 78,
                  borderRadius: 14,
                  objectFit: "cover",
                  marginBottom: 8,
                  background: "#23272f"
                }} />
                <div style={{ fontWeight: 700, fontSize: isMobile ? 14.5 : 16, marginBottom: 4, color: "#fff" }}>{CAROUSEL_PRODUCTS[carouselIndex].brand}</div>
                <div style={{
                  fontSize: isMobile ? 12 : 14,
                  color: "#c2c2c2",
                  marginBottom: 8,
                  textAlign: "center",
                  minHeight: isMobile ? 32 : 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>{CAROUSEL_PRODUCTS[carouselIndex].name}</div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 15, marginBottom: 6 }}>{CAROUSEL_PRODUCTS[carouselIndex].price} ₽</div>
                <button onClick={() => addToCart(CAROUSEL_PRODUCTS[carouselIndex].id)}
                  style={{
                    background: ACCENT,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    padding: isMobile ? "7px 11px" : "9px 17px",
                    cursor: "pointer",
                    fontSize: isMobile ? 13 : 14,
                    boxShadow: "0 2px 10px #278aff2a"
                  }}>В корзину</button>
              </motion.div>
              <button onClick={nextCarousel} style={{ background: "none", border: "none", fontSize: 26, color: ACCENT, cursor: "pointer" }}>›</button>
            </div>
          </div>

          {/* Приветственный блок */}
          <div style={{
            background: CARD,
            borderRadius: 18,
            boxShadow: "0 2px 12px #1a1f2e55",
            padding: isMobile ? "23px 9px" : "38px 32px",
            fontSize: isMobile ? 15.5 : 18,
            textAlign: "center",
            fontWeight: 600,
            color: "#f8f8f8",
            marginTop: 0,
            letterSpacing: "0.02em",
            lineHeight: 1.42,
            border: `1.3px solid ${BORDER}`,
            backdropFilter: "blur(7px) saturate(1.1)"
          }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!
            <br />
            <span style={{ fontWeight: 400, color: "#b8d7ff" }}>Только новые гаджеты по топовым ценам.<br />Выбирайте, сравнивайте, заказывайте!</span>
          </div>

          {/* Кнопка "Перейти в Telegram" */}
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              background: ACCENT,
              color: "#fff",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: isMobile ? 15 : 17,
              textDecoration: "none",
              boxShadow: "0 1.5px 11px #1d7ad580",
              padding: isMobile ? "11px 0" : "14px 0",
              width: "100%",
              maxWidth: MAIN_BLOCK_MAX_WIDTH,
              margin: "0 auto",
              border: "none"
            }}>
            <svg width="25" height="25" viewBox="0 0 240 240" fill="none">
              <circle cx="120" cy="120" r="120" fill="#fff" fillOpacity="0.11"/>
              <path d="M49 122.9c35.5-15.4 59.1-25.6 70-30.5 33.3-13.8 40.2-16.2 44.7-16.3 1 .1 3.2.2 4.7 1.4 1.2 1 1.5 2.3 1.7 3.2.2.9.4 3.1.2 4.8-1.8 18.9-9.6 64.7-13.7 85.9-1.7 8.5-5.1 11.3-8.4 11.6-7.2.7-12.7-4.8-19.7-9.4-11-7.3-17.2-11.9-28-19.1-12.4-8.2-4.4-12.7 2.7-20.1 1.9-1.9 33.7-30.8 34.4-33.4.1-.3.1-1.3-.5-1.8s-1.5-.3-2.2-.2c-.9.2-15.4 9.7-43.6 28.6-4.1 2.8-7.9 4.1-11.4 4-3.8-.1-11-2.1-16.4-3.9-6.6-2.2-11.8-3.4-11.3-7.2.2-1.4 2-2.9 5.6-4.3z" fill="#fff"/>
            </svg>
            Перейти в Telegram
          </a>

          {/* Контакты + адрес */}
          <div style={{
            background: CARD,
            borderRadius: 18,
            padding: isMobile ? "19px 10px" : "30px 24px",
            boxShadow: "0 2px 12px #1d263760",
            color: "#e9f3ff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 12 : 19,
            fontSize: isMobile ? 15 : 17,
            border: `1.3px solid ${BORDER}`,
            backdropFilter: "blur(7px) saturate(1.1)"
          }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 19, letterSpacing: "0.01em", color: ACCENT, marginBottom: 2 }}>
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
            <div style={{ fontSize: isMobile ? 12 : 14, color: "#b5e1ff", marginTop: 2 }}>
              Пишите и звоните — мы всегда на связи!
            </div>
          </div>
        </div>
      )}

      {/* Каталог (разделы) */}
      {activeSection !== 0 && (
        <div
          style={{
            ...blockStyle,
            padding: 0,
            margin: "0 auto 22px auto",
          }}
        >
          <AnimatePresence mode="wait">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: columns,
                gap: 30,
                alignItems: "stretch",
                width: "100%",
                boxSizing: "border-box",
                overflowX: "hidden"
              }}
            >
              {filteredProducts.length === 0 && (
                <div style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  color: "#888",
                  padding: 45,
                  fontSize: 18,
                  fontWeight: 700,
                  opacity: 0.7
                }}>Нет товаров по вашему запросу</div>
              )}
              {filteredProducts.map((product, i) => {
                const qty = getQtyInCart(product.id);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                    transition={{ delay: i * 0.05, duration: 0.35, type: "spring" }}
                    style={{
                      background: CARD,
                      border: `1.3px solid ${BORDER}`,
                      borderRadius: 22,
                      boxShadow: "0 8px 32px #08172b22, 0 1.5px 8px #10192855",
                      padding: 22,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: 380,
                      height: 380,
                      width: "100%",
                      boxSizing: "border-box",
                      margin: "0 auto",
                      justifyContent: "flex-start",
                      position: "relative",
                      overflow: "hidden",
                      transition: "box-shadow .15s",
                      cursor: "pointer"
                    }}
                    whileHover={{
                      boxShadow: "0 16px 42px #278aff2b, 0 2px 10px #091d3c55",
                      scale: 1.025
                    }}
                    onClick={() => setModalProduct(product)}
                  >
                    <motion.img
                      src={product.img || TV_PLACEHOLDER}
                      alt={product.name}
                      style={{
                        width: 128,
                        height: 128,
                        objectFit: "cover",
                        borderRadius: 17,
                        marginBottom: 15,
                        background: "#23272f",
                        boxShadow: "0 2px 12px #18408042",
                        border: `1.2px solid ${BORDER}`,
                        transition: ".17s"
                      }}
                      initial={false}
                      animate={addAnimId === product.id ? { scale: [1, 1.12, 0.97, 1] } : { scale: 1 }}
                      transition={{ duration: 0.37 }}
                      onError={onImgError}
                    />
                    <div style={{
                      fontWeight: 800,
                      fontSize: 16.5,
                      marginBottom: 8,
                      textAlign: "center",
                      width: "100%",
                      letterSpacing: "0.015em",
                      color: "#fff"
                    }}>
                      {product.brand}
                    </div>
                    <div style={{
                      fontSize: 13.5,
                      marginBottom: 12,
                      color: "#c2c2c2",
                      textAlign: "center",
                      width: "85%",
                      margin: "0 auto",
                      lineHeight: 1.4,
                      overflowWrap: "break-word"
                    }}>
                      {product.name}
                    </div>
                    <div style={{
                      color: "#82bfff",
                      fontSize: 13,
                      fontWeight: 500,
                      marginBottom: 16,
                      opacity: 0.75,
                      minHeight: 14,
                    }}>
                      {product.desc || ""}
                    </div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: 18,
                      marginBottom: 19,
                      marginTop: "auto"
                    }}>
                      {product.price} ₽
                    </div>
                    {qty > 0 && (
                      <div style={{
                        position: "absolute",
                        top: 14,
                        right: 18,
                        background: ACCENT,
                        color: "#fff",
                        borderRadius: 9,
                        padding: "2px 10px",
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: "0 1.5px 10px #278aff3a"
                      }}>{qty} в корзине</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* Модалка товара */}
      <AnimatePresence>
        {modalProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#000a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99,
            }}
            onClick={() => setModalProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 44 }}
              transition={{ duration: 0.24, type: "spring" }}
              style={{
                background: CARD,
                borderRadius: 22,
                padding: 28,
                width: "96vw",
                maxWidth: 355,
                boxShadow: "0 8px 32px #0c2340b8",
                border: `1.5px solid ${BORDER}`,
                maxHeight: "98vh",
                overflowY: "auto",
                position: "relative"
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                style={{
                  position: "absolute",
                  top: 9,
                  right: 13,
                  background: "none",
                  border: "none",
                  color: ACCENT,
                  fontSize: 24,
                  cursor: "pointer"
                }}
                onClick={() => setModalProduct(null)}
                aria-label="Закрыть"
              >×</button>
              <img
                src={modalProduct.img || TV_PLACEHOLDER}
                alt={modalProduct.name}
                style={{
                  width: 105,
                  height: 105,
                  objectFit: "cover",
                  borderRadius: 14,
                  margin: "0 auto 15px auto",
                  background: "#23272f",
                  boxShadow: "0 2px 12px #18408042",
                  border: `1.2px solid ${BORDER}`,
                  display: "block"
                }}
                onError={onImgError}
              />
              <div style={{
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 8,
                textAlign: "center",
                color: "#fff"
              }}>{modalProduct.brand}</div>
              <div style={{
                fontSize: 14.5,
                marginBottom: 13,
                color: "#c2c2c2",
                textAlign: "center",
                lineHeight: 1.44,
                fontWeight: 500
              }}>{modalProduct.name}</div>
              <div style={{
                color: "#82bfff",
                fontSize: 13.5,
                fontWeight: 500,
                marginBottom: 18,
                textAlign: "center"
              }}>{modalProduct.desc || ""}</div>
              <div style={{
                fontWeight: 700,
                fontSize: 19,
                marginBottom: 14,
                textAlign: "center"
              }}>{modalProduct.price} ₽</div>
              <button
                style={{
                  width: "100%",
                  background: ACCENT,
                  color: "#fff",
                  padding: "13px 0",
                  borderRadius: 10,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 2px 11px #278aff2a",
                }}
                onClick={() => {
                  addToCart(modalProduct.id);
                  setModalProduct(null);
                }}
              >
                В корзину
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Корзина */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            <motion.div
              initial={{ scale: 0.93, y: 70 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 80 }}
              transition={{ duration: 0.24, type: "spring" }}
              style={{
                background: CARD,
                borderRadius: 20,
                padding: 22,
                width: 340,
                maxWidth: "98vw",
                boxShadow: "0 8px 24px #0c2340b8",
                border: `1.5px solid ${BORDER}`,
                maxHeight: "96vh",
                overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 15, letterSpacing: "0.02em" }}>Корзина</div>
              {cart.length === 0 ? (
                <div style={{ color: "#aaa", marginBottom: 10 }}>Корзина пуста</div>
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
                          marginBottom: 20,
                          borderBottom: "1px solid #4446",
                          paddingBottom: 12,
                          gap: 12
                        }}
                      >
                        <div style={{ flex: 1, textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, letterSpacing: "0.015em" }}>{product.brand}</div>
                          <div style={{ fontSize: 13, color: "#c2c2c2", marginBottom: 5, lineHeight: 1.4 }}>{product.name}</div>
                          <div style={{ color: "#999", fontSize: 13, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                        </div>
                        <div style={{ textAlign: "right", minWidth: 70 }}>
                          <span style={{ fontWeight: 700, fontSize: 16 }}>{product.price * item.qty} ₽</span>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ФУТЕР */}
      <footer style={{
        width: "100vw",
        margin: "0 auto 0 auto",
        padding: isMobile ? "22px 0 38px 0" : "28px 0 44px 0",
        background: "transparent",
        textAlign: "center",
        fontSize: isMobile ? 14 : 16,
        color: "#d5eaffbb",
        letterSpacing: "0.01em",
        fontWeight: 400,
        zIndex: 3
      }}>
        <div>
          <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span> &copy; 2025<br/>
          Все права защищены.<br/>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
             style={{
               color: ACCENT,
               textDecoration: "underline",
               fontWeight: 700,
               letterSpacing: "0.01em"
             }}>Telegram</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
