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

// ====== Данные ======
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
    { id: 1, name: "iPhone 15 Pro", brand: "iPhone", price: 115000 },
    { id: 2, name: "Galaxy S24 Ultra", brand: "Samsung S24/S25", price: 98000 },
    { id: 3, name: "Xiaomi Redmi Note 13", brand: "Xiaomi", price: 34000 },
    // ...добавь под свои бренды!
  ],
  "Часы": [
    { id: 4, name: "Apple Watch Series 9", brand: "Apple Watch", price: 37000 },
    { id: 5, name: "Casio G-SHOCK", brand: "Casio G-SHOCK", price: 8900 },
    { id: 6, name: "Garmin Forerunner", brand: "Garmin", price: 28500 }
  ],
  "Компьютеры и планшеты": [
    { id: 7, name: "MacBook Air 15", brand: "MacBook", price: 127000 },
    { id: 8, name: "iMac 24", brand: "iMac", price: 159000 },
    { id: 9, name: "iPad Pro 11", brand: "iPad", price: 99000 }
  ],
  "Аудио": [
    { id: 10, name: "AirPods Pro 2", brand: "AirPods", price: 25900 },
    { id: 11, name: "Marshall Emberton", brand: "Marshall", price: 18500 },
    { id: 12, name: "Sony WH-1000XM5", brand: "Аксессуары", price: 29900 }
  ],
  "Телевизоры": [
    { id: 13, name: "Xiaomi TV A32", brand: "Телевизоры", price: 16000 },
    { id: 14, name: "Samsung 4K Crystal", brand: "Телевизоры", price: 37000 }
  ],
  "Игровые приставки": [
    { id: 15, name: "PlayStation 5", brand: "Sony Ps5", price: 68900 },
    { id: 16, name: "Xbox Series X", brand: "Xbox", price: 64800 }
  ],
  "Игрушки": [
    { id: 17, name: "Labubu Pirate", brand: "Игрушки Labubu", price: 3300 }
  ],
  "Электроника": [
    { id: 18, name: "Apple TV 4K", brand: "Apple TV", price: 25900 },
    { id: 19, name: "GoPro Hero", brand: "GoPro", price: 38500 }
  ]
};

const mainBlockWidth = 430;

// ====== Компонент категории ======
function CategoryCard({ cat, onClick, active }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 20px",
        marginBottom: 15,
        background: active ? "rgba(50,125,255,0.16)" : "rgba(31,38,50,0.90)",
        borderRadius: 17,
        cursor: "pointer",
        border: active ? `2px solid ${ACCENT}` : `1.2px solid ${BORDER}`,
        fontWeight: 800,
        fontSize: 18,
        color: "#fff",
        boxShadow: active ? "0 2px 18px #3ca4ff22" : "0 1.5px 7px #17224126",
        transition: "all .17s"
      }}
    >
      <span style={{ fontSize: 28, marginRight: 8 }}>{cat.emoji}</span>
      <span>{cat.name}</span>
    </motion.div>
  );
}

// ====== Компонент товара ======
function ProductCard({ product, qty, onPlus, onMinus }) {
  return (
    <div
      style={{
        background: "rgba(31,38,50,0.94)",
        border: `1.2px solid ${BORDER}`,
        borderRadius: 13,
        boxShadow: "0 3px 12px #1d1f2860",
        padding: "18px 13px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 14,
        minHeight: 90
      }}
    >
      <div style={{
        width: 62, height: 62, borderRadius: 12, background: "#212942",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: ACCENT
      }}>{product.name[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 18, color: "#fff", marginBottom: 6, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{product.name}</div>
        <div style={{ fontSize: 14, color: "#b6cafc", fontWeight: 700, marginBottom: 4 }}>{product.brand}</div>
        <div style={{ fontWeight: 700, color: ACCENT, fontSize: 15 }}>{product.price} ₽</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
        {qty === 0 ? (
          <button
            onClick={onPlus}
            style={{
              background: ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 800,
              padding: "6px 15px",
              fontSize: 15,
              cursor: "pointer"
            }}
          >+</button>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <button onClick={onMinus} style={{
                background: "#23344e", color: "#fff", border: "none", borderRadius: 8,
                fontWeight: 800, fontSize: 15, width: 28, height: 28, cursor: "pointer"
              }}>–</button>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{qty}</span>
              <button onClick={onPlus} style={{
                background: ACCENT, color: "#fff", border: "none", borderRadius: 8,
                fontWeight: 800, fontSize: 15, width: 28, height: 28, cursor: "pointer"
              }}>+</button>
            </div>
          </>
        )}
      </div>
    </div>
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
        padding: `${isMobile ? 30 : 50}px 0 0 0`,
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
              <svg width={isMobile ? 27 : 33} height={isMobile ? 27 : 33} viewBox="0 0 24 24" fill={ACCENT}>
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
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "24px auto 0 auto",
          height: 1.5,
          background: "rgba(255,255,255,0.13)",
          borderRadius: 2
        }}></div>
      </header>

      {/* ----- Главная ----- */}
      {!activeCategory && (
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          marginTop: isMobile ? 16 : 30,
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
              borderRadius: 18,
              padding: isMobile ? "20px 12px 14px 12px" : "30px 25px",
              boxShadow: "0 3px 24px #12192b13",
              marginBottom: isMobile ? 19 : 30,
              border: `1.3px solid ${BORDER}`
            }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 16 : 18, marginBottom: 8 }}>
              Добро пожаловать в <span style={{ color: ACCENT }}>4Friends Store!</span>
            </div>
            <div style={{ fontWeight: 400, color: "#b8d7ff", fontSize: isMobile ? 13.2 : 15, marginBottom: 11 }}>
              Только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!
            </div>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: ACCENT,
                color: "#fff",
                padding: isMobile ? "10px 14px" : "12px 30px",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: isMobile ? 14 : 15.5,
                textDecoration: "none",
                marginBottom: 11,
                marginTop: 7
              }}>
              Перейти в Telegram
            </a>
            <div style={{
              background: "rgba(25,32,47,0.61)",
              borderRadius: 11,
              padding: "9px 11px",
              marginTop: 10,
              fontSize: isMobile ? 12.3 : 14.2,
              color: "#b3c7df"
            }}>
              <b style={{ color: "#63aaff" }}>Контакты:</b> Телефон: <span style={{ color: "#fff" }}>{PHONE}</span><br />
              <b style={{ color: "#9ed6fc" }}>Адрес:</b> <span style={{ color: "#fff" }}>{ADDRESS}</span>
            </div>
          </motion.div>

          <div style={{
            fontWeight: 800, fontSize: 22, textAlign: "center", marginBottom: 21, letterSpacing: "0.01em", color: "#e5eeff"
          }}>Категории</div>

          {/* Список категорий */}
          {CATEGORIES.map(cat =>
            <CategoryCard
              key={cat.name}
              cat={cat}
              active={false}
              onClick={() => { setActiveCategory(cat.name); setActiveBrand(null); setSearch(""); }}
            />
          )}
        </div>
      )}

      {/* ----- Страница категории ----- */}
      {activeCategory && (
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          marginTop: isMobile ? 12 : 26
        }}>
          {/* Кнопка назад */}
          <button
            onClick={() => { setActiveCategory(null); setActiveBrand(null); setSearch(""); }}
            style={{
              display: "block",
              width: "100%",
              background: "rgba(55,90,170,0.17)",
              color: ACCENT,
              border: "none",
              borderRadius: 13,
              fontWeight: 800,
              fontSize: isMobile ? 15.2 : 16,
              padding: "13px 0",
              marginBottom: isMobile ? 13 : 19,
              cursor: "pointer",
              boxShadow: "0 1.5px 10px #3ca4ff0b",
              transition: ".16s"
            }}>← К категориям</button>

          {/* Подкатегории брендов */}
          <div style={{
            display: "flex",
            overflowX: "auto",
            gap: 9,
            marginBottom: 18,
            paddingBottom: 2,
            paddingLeft: 1,
            scrollbarWidth: "thin"
          }}>
            {CATEGORIES.find(c => c.name === activeCategory).brands.map(brand =>
              <button
                key={brand}
                onClick={() => setActiveBrand(brand === activeBrand ? null : brand)}
                style={{
                  background: brand === activeBrand ? ACCENT : "rgba(31,38,50,0.69)",
                  color: brand === activeBrand ? "#fff" : "#b2bedd",
                  border: "none",
                  borderRadius: 11,
                  padding: "8px 17px",
                  fontWeight: 700,
                  fontSize: isMobile ? 13 : 14,
                  cursor: "pointer",
                  boxShadow: brand === activeBrand ? "0 2px 8px #3ca4ff21" : "none",
                  transition: "0.13s"
                }}
              >{brand}</button>
            )}
          </div>

          {/* Поиск */}
          <input
            placeholder="Поиск товаров"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 15px",
              borderRadius: 12,
              border: `1.2px solid ${BORDER}`,
              background: "rgba(28,36,53,0.95)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              outline: "none",
              marginBottom: 18,
              boxSizing: "border-box"
            }}
          />

          {/* Товары */}
          {shownProducts.length === 0 && (
            <div style={{ color: "#bcc5db", fontSize: 17, textAlign: "center", margin: "40px 0 60px 0", fontWeight: 700 }}>
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
          <div style={{ height: 33 }} />
        </div>
      )}

      {/* Корзина */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000b",
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

      <div style={{ height: 25 }} />
    </div>
  );
};

export default App;
