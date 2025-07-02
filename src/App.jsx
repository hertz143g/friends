import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "rgba(31,38,50,0.75)";
const BORDER = "rgba(120,160,220,0.13)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const PHONE_PLACEHOLDER = "data:image/svg+xml,%3Csvg width='90' height='90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='90' height='90' rx='16' fill='%2323292f'/%3E%3Cpath d='M45 29c-6.627 0-12 5.373-12 12 0 4.418 2.99 8.166 7.092 10.338C40.613 51.736 41 52.859 41 54v2a2 2 0 1 0 4 0v-2c0-1.141.387-2.264 1.908-2.662C54.01 49.166 57 45.418 57 41c0-6.627-5.373-12-12-12zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%23668899'/%3E%3C/svg%3E";

const CATEGORIES = [
  { name: "Смартфоны", emoji: "📱" },
  { name: "Часы", emoji: "⌚️" },
  { name: "Компьютеры и планшеты", emoji: "💻" },
  { name: "Аудио", emoji: "🎧" },
  { name: "Телевизоры", emoji: "📺" },
  { name: "Игровые приставки", emoji: "🎮" },
  { name: "Игрушки", emoji: "🧸" },
  { name: "Электроника", emoji: "🔌" }
];

const BRANDS = {
  "Смартфоны": [
    { name: "iPhone", products: [ { id: 1, brand: "Apple", name: "iPhone 15 Pro 128GB", price: 115000, img: PHONE_PLACEHOLDER, desc: "A17 Pro, iOS" } ] },
    { name: "Samsung", products: [ { id: 2, brand: "Samsung", name: "Galaxy S24 Ultra", price: 98000, img: PHONE_PLACEHOLDER, desc: "Snapdragon 8 Gen3" } ] },
    { name: "Xiaomi", products: [ { id: 3, brand: "Xiaomi", name: "Redmi Note 13 Pro", price: 34000, img: PHONE_PLACEHOLDER, desc: "200Мп камера" } ] }
  ],
  "Часы": [
    { name: "Apple Watch", products: [ { id: 11, brand: "Apple", name: "Apple Watch Series 9", price: 37000, img: PHONE_PLACEHOLDER, desc: "GPS, 45mm" } ] },
    { name: "Casio G-SHOCK", products: [ { id: 12, brand: "Casio", name: "Casio G-SHOCK DW-5600", price: 8900, img: PHONE_PLACEHOLDER, desc: "Shock Resistant" } ] }
  ],
  // ... остальные бренды по аналогии
};
const PRODUCTS = {
  "Смартфоны": BRANDS["Смартфоны"].flatMap(b => b.products),
  "Часы": BRANDS["Часы"].flatMap(b => b.products),
};

function getColumns(vw) {
  if (vw > 1024) return "repeat(3, 1fr)";
  if (vw > 650) return "repeat(2, 1fr)";
  return "1fr";
}

const App = () => {
  const [vw, setVw] = useState(window.innerWidth);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrandIdx, setActiveBrandIdx] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 600;
  const addToCart = (id) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === id);
      if (exist) return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      else return [...prev, { id, qty: 1 }];
    });
    setAddAnimId(id);
    setTimeout(() => setAddAnimId(null), 500);
  };
  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));
  const getQtyInCart = id => cart.find(i => i.id === id)?.qty || 0;
  function getProduct(id) {
    for (let arr of Object.values(PRODUCTS)) for (let p of arr) if (p.id === id) return p;
    return null;
  }
  const cartTotalCount = cart.reduce((a, b) => a + b.qty, 0);
  const total = cart.reduce((sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty, 0);
  const mainBlockWidth = isMobile ? "98vw" : 420;

  function CategoryCard({ cat, onClick }) {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        style={{
          width: "100%",
          background: "rgba(36,46,67,0.20)",
          borderRadius: 18,
          border: "none",
          boxShadow: "0 2px 16px #3ca4ff1a, 0 1px 6px #232e441a",
          display: "flex",
          alignItems: "center",
          gap: 17,
          padding: isMobile ? "14px 17px" : "19px 28px",
          cursor: "pointer",
          backdropFilter: "blur(7px)",
          margin: 0,
          transition: ".13s"
        }}
      >
        <div style={{
          background: "rgba(60,164,255,0.07)",
          width: isMobile ? 38 : 48,
          height: isMobile ? 38 : 48,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px #3ca4ff1b",
          fontSize: isMobile ? 22 : 27,
          flexShrink: 0,
        }}>
          {cat.emoji}
        </div>
        <span style={{
          fontWeight: 900,
          fontSize: isMobile ? 16 : 19,
          color: "#f7f9fa",
          letterSpacing: ".01em",
          textShadow: "0 2px 12px #395ba329"
        }}>{cat.name}</span>
      </motion.button>
    );
  }

  function ProductCard({ product, qty, onPlus, onMinus }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 38, scale: 0.93 }}
        transition={{ duration: 0.19, type: "spring" }}
        style={{
          background: CARD,
          border: `1.2px solid ${BORDER}`,
          borderRadius: 13,
          boxShadow: "0 3px 12px #08172b14",
          padding: isMobile ? 9 : 14,
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 8 : 18,
          position: "relative",
          minHeight: isMobile ? 75 : 92,
          marginBottom: isMobile ? 1 : 3,
        }}
      >
        <img src={product.img} alt={product.name}
          onError={e => (e.target.src = PHONE_PLACEHOLDER)}
          style={{
            width: isMobile ? 50 : 72,
            height: isMobile ? 50 : 72,
            objectFit: "cover",
            borderRadius: 9,
            background: "#22242d",
            border: `1.1px solid ${BORDER}`,
            marginRight: 0,
            flexShrink: 0
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 800,
            fontSize: isMobile ? 12 : 14.5,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>{product.brand}</div>
          <div style={{
            fontSize: isMobile ? 10.5 : 12.5,
            color: "#b3bfcf",
            marginBottom: 2,
            lineHeight: 1.18,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>{product.name}</div>
          <div style={{
            color: "#a6c9fa",
            fontSize: isMobile ? 9.5 : 11.5,
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>{product.desc}</div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          marginLeft: isMobile ? 7 : 18,
          height: "100%",
          minWidth: isMobile ? 70 : 90,
          gap: 5
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: isMobile ? 12 : 15.5,
            color: ACCENT,
            textAlign: "right"
          }}>{product.price} ₽</div>
          {qty === 0 ? (
            <button onClick={onPlus}
              style={{
                background: ACCENT, color: "#181B23",
                border: "none", borderRadius: 7,
                fontWeight: 800, fontSize: isMobile ? 10.5 : 13.5,
                padding: isMobile ? "6px 10px" : "7px 16px",
                cursor: "pointer"
              }}>
              В корзину
            </button>
          ) : (
            <div style={{
              background: ACCENT, borderRadius: 8,
              display: "flex", alignItems: "center"
            }}>
              <button onClick={onMinus}
                style={{
                  background: "none", border: "none", color: "#181B23",
                  fontWeight: 800, fontSize: 16, padding: "3px 8px",
                  cursor: "pointer"
                }}>–</button>
              <span style={{ color: "#181B23", fontWeight: 800, fontSize: 13, margin: "0 4px" }}>{qty}</span>
              <button onClick={onPlus}
                style={{
                  background: "none", border: "none", color: "#181B23",
                  fontWeight: 800, fontSize: 16, padding: "3px 8px",
                  cursor: "pointer"
                }}>+</button>
            </div>
          )}
        </div>
        <AnimatePresence>
          {addAnimId === product.id && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.7 }}
              animate={{ opacity: 1, y: -12, scale: 1.08 }}
              exit={{ opacity: 0, y: -22, scale: 1.19 }}
              transition={{ duration: 0.38 }}
              style={{
                position: "absolute", top: 6, right: 14,
                color: ACCENT, fontWeight: 900, fontSize: isMobile ? 12 : 16,
                pointerEvents: "none"
              }}
            >+1</motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        background: BG,
        color: "#fff",
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden",
        position: "relative",
        paddingBottom: 38,
      }}
    >
      <AnimatedBg />

      {/* --- Отступ сверху --- */}
      <div style={{ height: isMobile ? 18 : 28 }} />

      {/* --- Хедер --- */}
      <header style={{
        textAlign: "center",
        padding: 0,
        position: "relative",
        zIndex: 2,
        maxWidth: mainBlockWidth,
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}>
          <img src={logoUrl} alt="logo"
            style={{
              width: isMobile ? 48 : 58,
              height: isMobile ? 48 : 58,
              objectFit: "cover",
              borderRadius: "50%",
              border: `2.2px solid ${ACCENT}`,
              background: "#fff",
              margin: "0 auto 0 auto",
              display: "block",
              boxShadow: "0 0 15px #0006"
            }}
          />
          <motion.button
            animate={cartTotalCount > 0 ? { scale: [1, 1.13, 0.95, 1], rotate: [0, -11, 6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.39, type: "spring" }}
            onClick={() => setShowCart(true)}
            style={{
              position: "absolute",
              right: 0,
              top: isMobile ? 8 : 12,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <span style={{ position: "relative" }}>
              <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 24 24" fill={ACCENT}>
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
        {/* --- Отступ после лого --- */}
        <div style={{ height: isMobile ? 13 : 22 }} />
        {/* --- Полоса --- */}
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
        {/* --- Отступ после полосы --- */}
        <div style={{ height: isMobile ? 10 : 16 }} />
      </header>

      {/* --- Приветствие и инфо --- */}
      {!activeCategory && (
        <div style={{
          background: CARD,
          borderRadius: 19,
          boxShadow: "0 4px 20px #18315711",
          padding: isMobile ? "16px 10px" : "26px 28px",
          fontSize: isMobile ? 14 : 17,
          textAlign: "center",
          fontWeight: 600,
          color: "#f3f6fa",
          margin: "0 auto 15px auto",
          maxWidth: mainBlockWidth
        }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? 15.5 : 18, marginBottom: 6 }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 900 }}>4Friends Store</span>!
          </div>
          <div style={{ color: "#b8d7ff", fontWeight: 400, fontSize: isMobile ? 11.5 : 14 }}>
            Только новые товары по лучшим ценам. Прокрутите вниз и выберите свой!
          </div>
          <a href={TELEGRAM_LINK}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "block",
              margin: "15px auto 10px auto",
              background: ACCENT,
              color: "#fff",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: isMobile ? 13 : 16,
              textDecoration: "none",
              boxShadow: "0 2px 12px #3ca4ff14",
              padding: isMobile ? "9px 0" : "13px 0",
              textAlign: "center"
            }}>
            Перейти в Telegram
          </a>
          <div style={{
            background: "rgba(36,46,67,0.26)",
            borderRadius: 10,
            padding: "8px 11px",
            fontSize: isMobile ? 11 : 13,
            color: "#e9f3ff"
          }}>
            <b style={{ color: ACCENT }}>Контакты:</b> Телефон: <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a>
            <br />
            <b style={{ color: ACCENT }}>Адрес:</b> {ADDRESS}
          </div>
        </div>
      )}

      {/* --- Категории --- */}
      {!activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth,
          margin: "20px auto 0 auto",
          position: "relative"
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: isMobile ? 17.5 : 22,
            letterSpacing: ".02em",
            margin: "0 0 13px 0",
            textAlign: "center",
            color: "#c6daff",
            textShadow: "0 2px 12px #0c2a6122"
          }}>Категории</div>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 17 }}>
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.name} cat={cat} onClick={() => { setActiveCategory(cat.name); setActiveBrandIdx(null); setSearch(""); }} />
            ))}
          </div>
        </div>
      )}

      {/* --- Страница категории --- */}
      {activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth,
          margin: "18px auto 0 auto",
          position: "relative"
        }}>
          {/* --- КНОПКА НАЗАД --- */}
          <button
            onClick={() => { setActiveCategory(null); setActiveBrandIdx(null); setSearch(""); }}
            style={{
              width: "100%",
              margin: "0 0 18px 0",
              background: "rgba(40,52,68,0.88)",
              border: "none",
              color: ACCENT,
              fontWeight: 800,
              fontSize: isMobile ? 15 : 18,
              borderRadius: 11,
              padding: isMobile ? "12px 0" : "14px 0",
              cursor: "pointer",
              boxShadow: "0 2px 15px #3ca4ff13"
            }}
          >← Назад к категориям</button>
          {/* --- БРЕНДЫ (ПОДКАТЕГОРИИ) --- */}
          {BRANDS[activeCategory] && BRANDS[activeCategory].length > 1 && (
            <div style={{
              display: "flex", gap: 10, marginBottom: 15, marginTop: 2,
              overflowX: "auto", paddingBottom: 2
            }}>
              {BRANDS[activeCategory].map((brand, i) => (
                <button key={brand.name}
                  onClick={() => setActiveBrandIdx(i)}
                  style={{
                    background: i === activeBrandIdx ? ACCENT : "rgba(255,255,255,0.09)",
                    color: i === activeBrandIdx ? "#fff" : "#b6cafc",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: isMobile ? 13 : 15,
                    padding: isMobile ? "8px 15px" : "10px 19px",
                    cursor: "pointer",
                    transition: ".13s"
                  }}
                >{brand.name}</button>
              ))}
            </div>
          )}
          {/* --- Поиск --- */}
          <div style={{
            width: "100%",
            marginBottom: 13,
            display: "flex"
          }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск товаров"
              style={{
                width: "100%",
                borderRadius: 10,
                border: "none",
                outline: "none",
                fontSize: isMobile ? 15 : 17,
                padding: isMobile ? "11px 13px" : "13px 18px",
                background: "rgba(36,46,67,0.77)",
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 2px 7px #0c234017"
              }}
            />
          </div>
          {/* --- ТОВАРЫ --- */}
          <div style={{
            display: "flex", flexDirection: "column", gap: isMobile ? 7 : 12
          }}>
            {(BRANDS[activeCategory] ? (
              activeBrandIdx !== null
                ? BRANDS[activeCategory][activeBrandIdx].products
                : BRANDS[activeCategory].flatMap(b => b.products)
            ) : PRODUCTS[activeCategory] || []).filter(
              p => !search || p.name.toLowerCase().includes(search.toLowerCase())
            ).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                qty={getQtyInCart(product.id)}
                onPlus={() => addToCart(product.id)}
                onMinus={() => removeFromCart(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- КОРЗИНА --- */}
      {showCart && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "#000a",
            display: "flex", alignItems: "center", justifyContent: "center",
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
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: isMobile ? 17 : 23, fontWeight: 900, marginBottom: 12, color: ACCENT, textShadow: "0 2px 8px #3ca4ff12" }}>Корзина</div>
            {cart.length === 0 ? (
              <div style={{ color: "#aaa", marginBottom: 10, fontWeight: 600, fontSize: isMobile ? 13 : 16 }}>Корзина пуста</div>
            ) : (
              <>
                {cart.map(item => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id}
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
                        >Удалить</button>
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
                          .map(item => {
                            const p = getProduct(item.id);
                            return p
                              ? `${p.brand} ${p.name} x${item.qty} — ${p.price * item.qty}₽`
                              : "";
                          })
                          .join("\n") +
                        `\n\nИтого: ${total} ₽`
                    );
                  }}
                >Оформить заказ</button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
