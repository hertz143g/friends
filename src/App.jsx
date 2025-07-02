import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- ТВОИ КАТЕГОРИИ ----
const SECTIONS = [
  { name: "Главная" },
  { name: "iPhone", emoji: "📱", products: [
    { id: 1, brand: "Apple", name: "iPhone 15 Pro", price: 120000, desc: "256GB, Новый" }
  ]},
  { name: "AirPods", emoji: "🎧", products: [
    { id: 2, brand: "Apple", name: "AirPods Pro 2", price: 18500, desc: "MagSafe, Оригинал" }
  ]},
  { name: "MacBook", emoji: "💻", products: [
    { id: 3, brand: "Apple", name: "MacBook Air M2", price: 98000, desc: "2023, Новый" }
  ]},
  { name: "Marshall", emoji: "🎸", products: [
    { id: 4, brand: "Marshall", name: "Marshall Major IV", price: 12500, desc: "Bluetooth Наушники" }
  ]},
  { name: "Игрушки", emoji: "🧸", products: [
    { id: 5, brand: "LEGO", name: "LEGO City", price: 3700, desc: "Конструктор" }
  ]},
  { name: "Наушники", emoji: "🎵", products: [
    { id: 6, brand: "Sony", name: "WH-1000XM5", price: 26000, desc: "Hi-Res, Шумодав" }
  ]},
  { name: "Apple Watch", emoji: "⌚️", products: [
    { id: 7, brand: "Apple", name: "Watch Series 9", price: 46000, desc: "GPS, 45mm" }
  ]},
  { name: "Чехлы", emoji: "📦", products: [
    { id: 8, brand: "UAG", name: "UAG для iPhone 15", price: 2800, desc: "Прочный чехол" }
  ]},
  { name: "AirPods в разборе", emoji: "🛠️", products: [
    { id: 9, brand: "Apple", name: "AirPods Запчасти", price: 5000, desc: "Оригинал" }
  ]},
  { name: "Аксессуары", emoji: "🔌", products: [
    { id: 10, brand: "Apple", name: "MagSafe Зарядка", price: 4500, desc: "Оригинал" }
  ]}
];

// --------- ОСТАЛЬНОЕ ОСТАВЛЯЮ БЕЗ ИЗМЕНЕНИЙ ---------
const ACCENT = "#3ca4ff";
const BG = "#181e28";
const CARD = "rgba(31,38,50,0.83)";
const BORDER = "rgba(120,160,220,0.13)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";

// --- Анимированный фон (не меняю) ---
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

const CATEGORY_ICONS = {
  "iPhone": "📱",
  "AirPods": "🎧",
  "MacBook": "💻",
  "Marshall": "🎸",
  "Игрушки": "🧸",
  "Наушники": "🎵",
  "Apple Watch": "⌚️",
  "Чехлы": "📦",
  "AirPods в разборе": "🛠️",
  "Аксессуары": "🔌"
};

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [vw, setVw] = useState(window.innerWidth);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 650;
  const mainBlockWidth = isMobile ? "98vw" : "430px";

  // Поиск по товарам
  const sectionProducts = SECTIONS[activeSection]?.products || [];
  const filteredProducts = search.trim().length === 0
    ? sectionProducts
    : sectionProducts.filter(
        p =>
          (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())) ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()))
      );

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

  return (
    <div style={{
      minHeight: "100vh",
      background: BG,
      color: "#fff",
      fontFamily: "system-ui,sans-serif",
      position: "relative",
      overflowX: "hidden"
    }}>
      <AnimatedBg />

      {/* ---------- Хедер ---------- */}
      <header style={{ textAlign: "center", padding: isMobile ? "13px 0 2px 0" : "22px 0 0 0", position: "relative" }}>
        <img src={logoUrl} alt="logo"
          style={{
            width: isMobile ? 52 : 66, height: isMobile ? 52 : 66,
            objectFit: "cover", borderRadius: "50%",
            border: `2.5px solid ${ACCENT}`,
            background: "#fff", margin: "0 auto", boxShadow: "0 0 18px #0007"
          }} />
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
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s-.896 2 2 2 2-.896 2-2-.896-2-2-2zm2-3H7.42l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H6.21l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H5.42l-.94-2H2V4h2l3.6 7.59-1.35 2.44C5.16 14.37 5.92 16 7.22 16H19c.553 0 1-.447 1-1s-.447-1-1-1z" />
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

      {/* ---------- Категории ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)",
          gap: isMobile ? 11 : 18,
          width: isMobile ? "97vw" : "88vw",
          margin: "24px auto 16px auto",
          maxWidth: isMobile ? 420 : 1100,
        }}>
        {SECTIONS.slice(1).map((section, idx) => (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={isMobile ? {} : { scale: 1.04, boxShadow: "0 4px 26px #59b4ff31" }}
            key={section.name}
            onClick={() => { setActiveSection(idx+1); setSearch(""); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: idx+1 === activeSection
                ? "linear-gradient(98deg, #3ca4ff 30%, #69d2fa 100%)"
                : "rgba(34,42,57,0.86)",
              color: idx+1 === activeSection ? "#fff" : "#bedbfa",
              border: "none", borderRadius: 15,
              fontWeight: 800,
              fontSize: isMobile ? 14.5 : 16.7,
              height: isMobile ? 48 : 54,
              boxShadow: idx+1 === activeSection
                ? "0 8px 26px #3ca4ff17, 0 1px 7px #1671ff21"
                : "0 2px 8px #1a253949",
              transition: "all .13s",
              outline: "none",
              cursor: "pointer",
              margin: 0,
              padding: 0,
              minWidth: isMobile ? 0 : 108,
              position: "relative",
              overflow: "hidden",
              zIndex: 3
            }}
          >
            <span style={{
              fontSize: isMobile ? 22 : 27,
              marginRight: 6,
              filter: idx+1 === activeSection ? "drop-shadow(0 1px 5px #6bdcff60)" : "none"
            }}>{section.emoji || CATEGORY_ICONS[section.name]}</span>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {section.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ---------- Поиск ---------- */}
      <div style={{
        width: "100%",
        maxWidth: isMobile ? "98vw" : 600,
        margin: isMobile ? "0 auto 12px auto" : "0 auto 22px auto",
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
              letterSpacing: ".01em"
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{
                background: "none", border: "none", color: "#b2c4e2",
                fontSize: 19, cursor: "pointer", marginLeft: 2
              }}>✕</button>
          )}
        </div>
      </div>

      {/* ---------- Главная ---------- */}
      {activeSection === 0 && (
        <div style={{
          width: mainBlockWidth,
          margin: "0 auto",
          padding: isMobile ? "12px 0" : "28px 0 0 0",
        }}>
          <div style={{
            width: "100%",
            background: CARD,
            borderRadius: 20,
            boxShadow: "0 4px 24px #1c2d471c",
            border: `1.6px solid ${BORDER}`,
            padding: isMobile ? "16px 8px" : "32px 28px",
            fontSize: isMobile ? 16 : 18,
            textAlign: "center",
            fontWeight: 600,
            color: "#f3f6fa",
            letterSpacing: "0.01em",
            lineHeight: 1.45,
            margin: 0,
          }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!<br />
            <span style={{ fontWeight: 400, color: "#b8d7ff" }}>Только новые товары по лучшим ценам.<br />Прокрутите вниз и выберите свой!</span>
          </div>
        </div>
      )}

      {/* ---------- Каталог ---------- */}
      {activeSection !== 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: isMobile ? 13 : 25,
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? 6 : 18,
          width: "100%",
        }}>
          <AnimatePresence>
            {filteredProducts.length === 0 ? (
              <div style={{
                gridColumn: "1 / -1",
                color: "#aad6ff",
                textAlign: "center",
                fontWeight: 700,
                fontSize: isMobile ? 14 : 18,
                padding: "40px 0"
              }}>
                Товары скоро появятся!
              </div>
            ) : filteredProducts.map((product, i) => {
              const qty = getQtyInCart(product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.32, type: "spring" }}
                  style={{
                    background: CARD,
                    border: `1.2px solid ${BORDER}`,
                    borderRadius: 15,
                    boxShadow: "0 8px 18px #08172b13",
                    padding: isMobile ? 12 : 18,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: isMobile ? 170 : 215,
                    width: "100%",
                    margin: "0 auto",
                    position: "relative",
                    transition: "box-shadow .13s"
                  }}
                >
                  <div style={{
                    fontWeight: 800,
                    fontSize: isMobile ? 14.5 : 17.5,
                    marginBottom: 3,
                    color: "#fff"
                  }}>
                    {product.brand}
                  </div>
                  <div style={{
                    fontSize: isMobile ? 12 : 14.2,
                    marginBottom: 6,
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
              )})}
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
      <div style={{ height: 30 }} />
    </div>
  );
};

export default App;
