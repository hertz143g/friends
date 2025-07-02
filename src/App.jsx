import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== Анимированный фон ======
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
      { x: w*0.2, y: h*0.32, r: 260, dx: 0.13, dy: 0.09, color: "#212c43" },
      { x: w*0.7, y: h*0.15, r: 270, dx: -0.09, dy: 0.12, color: "#192035" },
      { x: w*0.44, y: h*0.79, r: 230, dx: 0.09, dy: -0.11, color: "#1c243d" },
      { x: w*0.87, y: h*0.71, r: 180, dx: -0.12, dy: 0.07, color: "#2a354b" },
    ];
    function draw() {
      ctx.clearRect(0,0,w,h);
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, b.r*0.32, b.x, b.y, b.r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, b.color);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2*Math.PI);
        ctx.fillStyle = g;
        ctx.globalAlpha = 1;
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
        top: 0, left: 0, zIndex: -1,
        width: "100vw", height: "100vh",
        pointerEvents: "none"
      }}
    />
  );
}

// ====== Данные ======
const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "#23293b";
const BORDER = "#27395a";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const PHONE_PLACEHOLDER = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Smartphone_icon_-_Noun_Project_883.png/64px-Smartphone_icon_-_Noun_Project_883.png";

const CATEGORIES = [
  { name: "Смартфоны", emoji: "📱", brands: ["iPhone", "Samsung S22/23", "Samsung S24/S25", "Samsung A / наушники / часы", "Xiaomi", "Redmi", "Poco", "OnePlus", "Google Pixel"] },
  { name: "Часы", emoji: "⌚", brands: ["Apple Watch", "Casio G-SHOCK", "Garmin"] },
  { name: "Компьютеры и планшеты", emoji: "💻", brands: ["MacBook", "iMac", "iPad"] },
  { name: "Аудио", emoji: "🎧", brands: ["AirPods", "AirPods в разборе", "Аксессуары", "Колонки", "Marshall"] },
  { name: "Телевизоры", emoji: "📺", brands: ["Телевизоры", "Электросамокаты"] },
  { name: "Игровые приставки", emoji: "🎮", brands: ["Xbox", "Sony Ps5"] },
  { name: "Игрушки", emoji: "🧸", brands: ["Игрушки Labubu"] },
  { name: "Электроника", emoji: "🔌", brands: ["Apple TV", "GoPro", "Dyson", "Пылесос"] },
];

const PRODUCTS = {
  "Смартфоны": [
    { id: 1, name: "iPhone 15 Pro 128GB Серый", brand: "iPhone", price: 115000, img: PHONE_PLACEHOLDER },
    { id: 2, name: "Galaxy S24 Ultra 256GB", brand: "Samsung S24/S25", price: 98000, img: PHONE_PLACEHOLDER },
    { id: 3, name: "Xiaomi Redmi Note 13 Pro", brand: "Xiaomi", price: 34000, img: PHONE_PLACEHOLDER },
  ],
  "Часы": [
    { id: 4, name: "Apple Watch Series 9", brand: "Apple Watch", price: 37000, img: PHONE_PLACEHOLDER },
    { id: 5, name: "Casio G-SHOCK", brand: "Casio G-SHOCK", price: 8900, img: PHONE_PLACEHOLDER },
    { id: 6, name: "Garmin Forerunner", brand: "Garmin", price: 28500, img: PHONE_PLACEHOLDER }
  ],
  "Компьютеры и планшеты": [
    { id: 7, name: "MacBook Air 15 2024", brand: "MacBook", price: 127000, img: PHONE_PLACEHOLDER },
    { id: 8, name: "iMac 24\" 2024", brand: "iMac", price: 159000, img: PHONE_PLACEHOLDER },
    { id: 9, name: "iPad Pro 11\" 2024", brand: "iPad", price: 99000, img: PHONE_PLACEHOLDER }
  ],
  "Аудио": [
    { id: 10, name: "AirPods Pro 2", brand: "AirPods", price: 25900, img: PHONE_PLACEHOLDER },
    { id: 11, name: "Marshall Emberton II", brand: "Marshall", price: 18500, img: PHONE_PLACEHOLDER },
    { id: 12, name: "Sony WH-1000XM5", brand: "Аксессуары", price: 29900, img: PHONE_PLACEHOLDER }
  ],
  "Телевизоры": [
    { id: 13, name: "Xiaomi TV A32", brand: "Телевизоры", price: 16000, img: TV_PLACEHOLDER },
    { id: 14, name: "Samsung 4K Crystal", brand: "Телевизоры", price: 37000, img: TV_PLACEHOLDER }
  ],
  "Игровые приставки": [
    { id: 15, name: "PlayStation 5", brand: "Sony Ps5", price: 68900, img: PHONE_PLACEHOLDER },
    { id: 16, name: "Xbox Series X", brand: "Xbox", price: 64800, img: PHONE_PLACEHOLDER }
  ],
  "Игрушки": [
    { id: 17, name: "Labubu Pirate", brand: "Игрушки Labubu", price: 3300, img: PHONE_PLACEHOLDER }
  ],
  "Электроника": [
    { id: 18, name: "Apple TV 4K", brand: "Apple TV", price: 25900, img: PHONE_PLACEHOLDER },
    { id: 19, name: "GoPro Hero", brand: "GoPro", price: 38500, img: PHONE_PLACEHOLDER }
  ]
};

const mainBlockWidth = 430;

// ====== Кнопка бренда ======
function BrandButton({ name, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? ACCENT : "#283762",
        color: active ? "#fff" : "#bcd7ff",
        border: "none",
        borderRadius: 11,
        padding: "7px 15px",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        marginRight: 9,
        marginBottom: 6,
        whiteSpace: "nowrap",
        transition: "background .14s"
      }}
    >{name}</button>
  );
}

// ====== Карточка товара ======
function ProductCard({ product, qty, onPlus, onMinus }) {
  return (
    <motion.div
      whileHover={{ scale: 1.012 }}
      style={{
        background: CARD,
        border: `1.2px solid ${BORDER}`,
        borderRadius: 15,
        boxShadow: "0 5px 16px #1d1f2822",
        padding: "13px 10px 15px 10px",
        marginBottom: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 180,
        position: "relative",
        maxWidth: 350,
        margin: "0 auto 17px auto"
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{
          width: 62, height: 62, borderRadius: 10, background: "#212942",
          objectFit: "cover", marginBottom: 6
        }}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        <div style={{ fontWeight: 700, color: "#b1d2ff", fontSize: 11.5, marginBottom: 2, minHeight: 14 }}>{product.brand}</div>
        <div style={{ fontWeight: 900, fontSize: 15.5, color: "#fff", marginBottom: 5, minHeight: 16 }}>{product.name}</div>
        <div style={{ fontWeight: 800, color: ACCENT, fontSize: 14.5, marginBottom: 7 }}>{product.price} ₽</div>
        {qty === 0 ? (
          <button
            onClick={onPlus}
            style={{
              background: ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 800,
              padding: "7px 14px",
              fontSize: 13.5,
              cursor: "pointer",
              width: "100%",
              marginTop: 2
            }}
          >В корзину</button>
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 7,
            background: ACCENT,
            borderRadius: 8,
            marginTop: 3
          }}>
            <button onClick={onMinus}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 20,
                fontWeight: 900,
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: 6
              }}>–</button>
            <div style={{
              color: "#fff",
              minWidth: 21,
              textAlign: "center",
              fontWeight: 900,
              fontSize: 14
            }}>
              {qty}
            </div>
            <button onClick={onPlus}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 20,
                fontWeight: 900,
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: 6
              }}>+</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ====== Основной компонент ======
const App = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = vw < 600;

  // Корзина
  const cartTotalCount = cart.reduce((a, b) => a + b.qty, 0);
  const getQtyInCart = (id) => cart.find(i => i.id === id)?.qty || 0;
  const addToCart = (id) => setCart(prev => {
    const found = prev.find(i => i.id === id);
    if (found) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { id, qty: 1 }];
  });
  const removeOneFromCart = (id) => setCart(prev => {
    const found = prev.find(i => i.id === id);
    if (!found) return prev;
    if (found.qty === 1) return prev.filter(i => i.id !== id);
    return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
  });
  const getProduct = (id) => {
    for (let cat in PRODUCTS) {
      const found = PRODUCTS[cat].find(p => p.id === id);
      if (found) return found;
    }
    return null;
  };
  const total = cart.reduce((sum, item) => (getProduct(item.id)?.price || 0) * item.qty + sum, 0);

  // Фильтрация товаров
  let shownProducts = [];
  if (activeCategory) {
    shownProducts = PRODUCTS[activeCategory] || [];
    if (activeBrand) shownProducts = shownProducts.filter(p => p.brand === activeBrand);
    if (search.trim()) {
      shownProducts = shownProducts.filter(
        p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

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

      {/* -------- Хедер -------- */}
      <header style={{
        textAlign: "center",
        padding: `${isMobile ? 32 : 48}px 0 0 0`,
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
              width: isMobile ? 58 : 72,
              height: isMobile ? 58 : 72,
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
              top: isMobile ? 9 : 17,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <span style={{ position: "relative" }}>
              <svg width={isMobile ? 27 : 31} height={isMobile ? 27 : 31} viewBox="0 0 24 24" fill={ACCENT}>
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
                    fontSize: 13,
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
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "17px auto 0 auto",
          height: 2,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2
        }}></div>
      </header>

      {/* -------- Главная (категории) -------- */}
      {!activeCategory && (
        <div
  style={{
    maxWidth: "480px", // или сколько тебе нужно (например 360px, 400px и т.п.)
    margin: "32px auto 0 auto",
    padding: "24px",
    borderRadius: "16px",
    background: "#1c2333",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
  }}
>


        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          marginTop: isMobile ? 16 : 23,
          zIndex: 2,
          position: "relative"
        }}>
          {/* Инфо-блок */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, type: "spring" }}
            style={{
              background: CARD,
              borderRadius: 17,
              padding: isMobile ? "17px 10px 13px 10px" : "26px 22px",
              boxShadow: "0 3px 22px #12192b14",
              marginBottom: isMobile ? 18 : 30,
              border: `1.3px solid ${BORDER}`
            }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 17, marginBottom: 8 }}>
              Добро пожаловать в <span style={{ color: ACCENT }}>4Friends Store!</span>
            </div>
            <div style={{ fontWeight: 400, color: "#b8d7ff", fontSize: isMobile ? 13 : 14, marginBottom: 10 }}>
              Только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!
            </div>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: ACCENT,
                color: "#fff",
                padding: isMobile ? "9px 14px" : "11px 26px",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: isMobile ? 13 : 14.5,
                textDecoration: "none",
                marginBottom: 9,
                marginTop: 6
              }}>
              Перейти в Telegram
            </a>
            <div style={{
              background: "#1c2333",
              borderRadius: 10,
              padding: "8px 11px",
              marginTop: 11,
              fontSize: isMobile ? 12 : 13.5,
              color: "#b3c7df"
            }}>
              <b style={{ color: "#63aaff" }}>Контакты:</b> Телефон: <span style={{ color: "#fff" }}>{PHONE}</span><br />
              <b style={{ color: "#9ed6fc" }}>Адрес:</b> <span style={{ color: "#fff" }}>{ADDRESS}</span>
            </div>
          </motion.div>

          <div style={{
            fontWeight: 800, fontSize: 20, textAlign: "center", marginBottom: 18, letterSpacing: "0.01em", color: "#e5eeff"
          }}>Категории</div>
</div>
          {/* Список категорий */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 11
          }}>
            {CATEGORIES.map(cat =>
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveCategory(cat.name); setActiveBrand(null); setSearch(""); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#222a38",
                  border: `1.2px solid ${BORDER}`,
                  borderRadius: 13,
                  padding: isMobile ? "11px 10px" : "14px 16px",
                  fontWeight: 800,
                  fontSize: isMobile ? 16.5 : 18,
                  color: "#fff",
                  gap: 18,
                  cursor: "pointer",
                  marginBottom: 0,
                  transition: ".14s",
                  boxShadow: "0 2px 12px #1721440a"
                }}>
                <span style={{ fontSize: isMobile ? 22 : 26, marginRight: 8 }}>{cat.emoji}</span>
                <span>{cat.name}</span>
              </motion.button>
            )}
          </div>
        </div>
      )}
      

      {/* -------- Страница категории -------- */}




      {activeCategory && (
     
                  <div
  style={{
    maxWidth: "480px", // или сколько тебе нужно (например 360px, 400px и т.п.)
    margin: "32px auto 0 auto",
    padding: "15px",
    borderRadius: "16px",
    background: "#1c2333",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
  }}
>


     <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          marginTop: isMobile ? 15 : 22
        }}>
          {/* Кнопка назад */}
          <button
            onClick={() => { setActiveCategory(null); setActiveBrand(null); setSearch(""); }}
            style={{
              display: "block",
              width: "100%",
              background: "#283762",
              color: ACCENT,
              border: "none",
              borderRadius: 13,
              fontWeight: 800,
              fontSize: isMobile ? 15 : 16,
              padding: "11px 0",
              marginBottom: isMobile ? 13 : 19,
              cursor: "pointer",
              boxShadow: "0 1.5px 10px #3ca4ff0b",
              transition: ".16s"
            }}>← К категориям</button>

          {/* Подкатегории брендов */}
          <div style={{
            display: "flex",
            overflowX: "auto",
            gap: 0,
            marginBottom: 15,
            paddingBottom: 2,
            paddingLeft: 1,
            scrollbarWidth: "thin"
          }}>
            {CATEGORIES.find(c => c.name === activeCategory).brands.map(brand =>
              <BrandButton
                key={brand}
                name={brand}
                active={brand === activeBrand}
                onClick={() => setActiveBrand(brand === activeBrand ? null : brand)}
              />
            )}
          </div>

          {/* Поиск */}
          <input
            placeholder="Поиск товаров"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: 11,
              border: `1.2px solid ${BORDER}`,
              background: "#20294a",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              outline: "none",
              marginBottom: 16,
              boxSizing: "border-box"
            }}
          />
          </div>

          {/* Товары */}
          {shownProducts.length === 0 && (
            <div style={{ color: "#bcc5db", fontSize: 16, textAlign: "center", margin: "32px 0 55px 0", fontWeight: 700 }}>
              Нет товаров в этой категории.
            </div>
          )}
          {shownProducts.map(product =>
            <ProductCard
              key={product.id}
              product={product}
              qty={getQtyInCart(product.id)}
              onPlus={() => addToCart(product.id)}
              onMinus={() => removeOneFromCart(product.id)}
            />
          )}
          <div style={{ height: 22 }} />
        </div>
      )}

      {/* -------- Корзина -------- */}
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
              borderRadius: 17,
              padding: isMobile ? 13 : 27,
              width: isMobile ? "96vw" : 370,
              maxWidth: "99vw",
              boxShadow: "0 8px 28px #0c2340c5",
              border: `1.6px solid ${BORDER}`,
              maxHeight: "95vh",
              overflowY: "auto",
              zIndex: 999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: isMobile ? 17 : 22, fontWeight: 900, marginBottom: 10, color: ACCENT, textShadow: "0 2px 8px #3ca4ff12" }}>Корзина</div>
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
                        borderBottom: "1px solid #44f5",
                        paddingBottom: 6,
                        gap: 6
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile ? 12 : 16.5, marginBottom: 1, color: ACCENT }}>{product.brand}</div>
                        <div style={{ fontSize: isMobile ? 11 : 14, color: "#c2c2c2", marginBottom: 2, lineHeight: 1.22 }}>{product.name}</div>
                        <div style={{ color: "#999", fontSize: isMobile ? 10 : 13, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 58 }}>
                        <span style={{ fontWeight: 800, fontSize: isMobile ? 11 : 16, color: "#fff" }}>{product.price * item.qty} ₽</span>
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

      <div style={{ height: 18 }} />
    </div>
  );
};

export default App;
