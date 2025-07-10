import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";

const ACCENT = "#3ca4ff";
const CARD = "#23293b";
const BORDER = "#27395a";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/forfriendsstore";
const PHONE = "+7(926)591-21-65";
const ADDRESS = "Клин, ул. Победы, д. 9, «Ок’ей»";
const PHONE_PLACEHOLDER = "https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png";
const mainBlockWidth = 430;

const CATEGORIES = [
  { name: "Смартфоны", emoji: "📱", brands: ["Apple", "Samsung", "Xiaomi", "Redmi", "Poco", "OnePlus", "Google Pixel"] },
  { name: "Часы", emoji: "⌚", brands: ["Apple", "Casio", "Garmin", "Samsung"] },
  { name: "Компьютеры и планшеты", emoji: "💻", brands: ["MacBook", "iMac", "iPad"] },
  { name: "Аудио", emoji: "🎧", brands: ["Apple", "Колонки", "Marshall"] },
  { name: "Телевизоры и самокаты", emoji: "📺", brands: ["Телевизоры", "Электросамокаты"] },
  { name: "Игровые приставки", emoji: "🎮", brands: ["Xbox", "Sony Ps5"] },
  { name: "Игрушки", emoji: "🧸", brands: ["Игрушки Labubu"] },
  { name: "Электроника", emoji: "🔌", brands: ["Аксессуары", "Apple TV", "GoPro", "Dyson"] },
];

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

function ProductCard({ product, qty, onPlus, onMinus }) {
  const [addAnim, setAddAnim] = useState(false);

  const handlePlus = () => {
    setAddAnim(true);
    onPlus();
  };

  useEffect(() => {
    if (addAnim) {
      const t = setTimeout(() => setAddAnim(false), 350);
      return () => clearTimeout(t);
    }
  }, [addAnim]);

  return (
    <motion.div
      whileHover={{ scale: 1.022 }}
      style={{
        background: CARD,
        borderRadius: 28,
        boxShadow: "0 8px 32px #20293a33",
        padding: "28px 18px 22px 18px",
        margin: "0 auto 26px auto",
        maxWidth: 390,
        minWidth: 230,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{
        width: 140, height: 140, background: "#222b3d",
        borderRadius: 25, display: "flex",
        alignItems: "center", justifyContent: "center",
        marginBottom: 12, boxShadow: "0 2px 16px #1e2b4730"
      }}>
        <img
          src={product.img || PHONE_PLACEHOLDER}
          alt={product.name}
          style={{
            width: 120, height: 120, objectFit: "contain", borderRadius: 16
          }}
          onError={e => { e.target.src = PHONE_PLACEHOLDER; }}
        />
      </div>
      <div style={{
        fontWeight: 700,
        fontSize: 15,
        color: "#fff",
        marginBottom: 2,
        textAlign: "center",
        letterSpacing: "0.01em",
        lineHeight: 1.18
      }}>{product.name}</div>
      <div style={{
        fontWeight: 400,
        fontSize: 12,
        color: "#a9b8ce",
        marginBottom: 9,
        textAlign: "center",
        lineHeight: 1.18
      }}>{product.brand}</div>
      <div style={{
  fontWeight: 800,
  fontSize: 19,
  color: ACCENT,
  marginBottom: 14,
  textAlign: "center",
  letterSpacing: "0.01em",
}}>
  {product.price > 0 ? (
    <>
      {Number(product.price).toLocaleString()} <span style={{
        fontWeight: 600, fontSize: 15, color: "#a9cfff"
      }}>₽</span>
    </>
  ) : (
    <span style={{ color: "#ccc", fontWeight: 600, fontSize: 15 }}>Запрос</span>
  )}
</div>

      {qty === 0 ? (
        <motion.button
          onClick={handlePlus}
          animate={addAnim ? { scale: [1, 1.08, 0.97, 1] } : { scale: 1 }}
          transition={{ duration: 0.36, times: [0, 0.4, 0.8, 1], type: "spring" }}
          style={{
            background: ACCENT,
            color: "#fff",
            border: "none",
            borderRadius: 19,
            fontWeight: 600,
            fontSize: 15,
            padding: "11px 0",
            cursor: "pointer",
            width: "100%",
            outline: "none",
            boxShadow: "0 2px 12px #3ca4ff27",
            transition: ".17s"
          }}
        >В корзину</motion.button>
      ) : (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          background: ACCENT, borderRadius: 19, width: "100%",
          minHeight: 38, marginTop: 3
        }}>
          <button onClick={onMinus}
            style={{
              background: "none", border: "none", color: "#fff",
              fontSize: 18, fontWeight: 700, padding: "6px 16px 6px 11px",
              cursor: "pointer", borderRadius: 8
            }}>–</button>
          <div style={{
            color: "#fff", minWidth: 22, textAlign: "center",
            fontWeight: 800, fontSize: 14
          }}>
            {qty}
          </div>
          <button onClick={onPlus}
            style={{
              background: "none", border: "none", color: "#fff",
              fontSize: 18, fontWeight: 700, padding: "6px 11px 6px 16px",
              cursor: "pointer", borderRadius: 8
            }}>+</button>
        </div>
      )}
    </motion.div>
  );
}

function AnimatedBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = w < 600 ? 60 : 110;
    const SPEED = w < 600 ? 0.6 : 1.1;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.7 + Math.random() * 2.2,
        dx: (Math.random() - 0.5) * SPEED * (0.8 + Math.random()*0.6),
        dy: (Math.random() - 0.5) * SPEED * (0.8 + Math.random()*0.6),
        opacity: 0.22 + Math.random() * 0.19
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#181e28";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,180,255,${p.opacity})`;
        ctx.shadowColor = "#3980f8";
        ctx.shadowBlur = 13;
        ctx.fill();
        ctx.shadowBlur = 0;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i], p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(70,170,255,${0.11 - dist/700})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: "#181e28"
      }}
    />
  );
}

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRtT-9yQsf2f0mY01Hkcg_711efC99-ZBqzhO_j8nUJWcP3HCZFzXTGCkEKXtqL8FF4IHmFUM_34TM/pub?output=csv";

const TELEGRAM_BOT_API = "https://script.google.com/macros/s/ВАШ_АППС_СКРИПТ_ID/exec";

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = vw < 600;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory, showCart]);

  // Загрузка товаров
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CSV_URL);
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      setProducts(parsed.data.map(prod => ({
        ...prod,
        price: Number((prod.price || "").replace(/[^\d]/g, "")) || 0,
        rawPrice: prod.price || "",
        id: prod.id?.toString() || Math.random().toString(36).slice(2)
      })));
    } catch (e) {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cartTotalCount = cart.reduce((a, b) => a + b.qty, 0);
  const getQtyInCart = (id) => cart.find(i => String(i.id) === String(id))?.qty || 0;
  const addToCart = (id) => setCart(prev => {
    const found = prev.find(i => String(i.id) === String(id));
    if (found) return prev.map(i => String(i.id) === String(id) ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { id, qty: 1 }];
  });
  const removeOneFromCart = (id) => setCart(prev => {
    const found = prev.find(i => String(i.id) === String(id));
    if (!found) return prev;
    if (found.qty === 1) return prev.filter(i => String(i.id) !== String(id));
    return prev.map(i => String(i.id) === String(id) ? { ...i, qty: i.qty - 1 } : i);
  });
  const getProduct = (id) => products.find(p => String(p.id) === String(id));
  const total = cart.reduce((sum, item) => (Number(getProduct(item.id)?.price) || 0) * item.qty + sum, 0);

  let shownProducts = [];
  if (activeCategory) {
    shownProducts = products.filter(p => p.category === activeCategory);
    if (activeBrand) shownProducts = shownProducts.filter(p => p.brand === activeBrand);
    if (search.trim()) {
      shownProducts = shownProducts.filter(
        p => (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
          (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }

  // Отправка заказа в Telegram через Apps Script
  const sendOrderToTelegram = async () => {
    if (cart.length === 0) {
      alert("Корзина пуста");
      return;
    }
    const message = cart.map(item => {
      const p = getProduct(item.id);
      return p ? `${p.brand} ${p.name} x${item.qty} — ${Number(p.price) * item.qty} ₽` : "";
    }).join("\n") + `\n\nИтого: ${total} ₽`;

    try {
      const res = await fetch(TELEGRAM_BOT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        alert("Заказ отправлен в Telegram!");
        setCart([]);
        setShowCart(false);
      } else {
        alert("Ошибка отправки заказа");
      }
    } catch (e) {
      alert("Ошибка сети при отправке заказа");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
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

      {/* ----- Хедер ----- */}
<header
  style={{
    position: "relative",
    zIndex: 2,
    paddingTop: isMobile ? 32 : 48,
    width: mainBlockWidth,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  }}
>
  {/* Левая пустая область для центрирования */}
  <div style={{ width: isMobile ? 58 : 72 }}></div>

  {/* Лого по центру */}
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
      display: "block",
      boxShadow: "0 0 16px #0006",
    }}
  />

  {/* Кнопка корзины справа */}
<motion.button
  animate={cartTotalCount > 0 ? { scale: [1, 1.13, 0.95, 1] } : { scale: 1 }}
  transition={{ duration: 0.23, type: "spring" }}
  onClick={() => setShowCart(true)}
  style={{
    background: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: isMobile ? "10px" : "12px", // добавь немного padding для удобства клика
  }}
  aria-label="Открыть корзину"
>
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
        top: 6,
        right: 6,
        background: ACCENT,
        color: "#fff",
        borderRadius: "50%",
        padding: "2.5px 8px",
        fontSize: 13,
        fontWeight: 700,
        boxShadow: "0 2px 8px #1d7ad5c0",
      }}
    >
      {cartTotalCount}
    </motion.span>
  )}
</motion.button>

</header>



      <AnimatePresence>
        {!activeCategory && !showCart && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13, type: "tween", ease: "easeInOut" }}
            style={{ maxWidth: 480, margin: "32px auto 0" }}
          >
            <div
              style={{
                padding: 24,
                borderRadius: 16,
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05, duration: 0.3, type: "spring" }}
                  style={{
                    background: CARD,
                    borderRadius: 17,
                    padding: isMobile ? "17px 10px 13px 10px" : "26px 22px",
                    boxShadow: "0 3px 22px #12192b14",
                    marginBottom: isMobile ? 18 : 30,
                    border: `1.3px solid ${BORDER}`
                  }}>
                  <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 17, marginBottom: 8 }}>
                    Добро пожаловать в <span style={{ color: ACCENT }}>4FriendsStore!</span>
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
          </motion.div>
        )}

        {activeCategory && !showCart && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13, type: "tween", ease: "easeInOut" }}
          >
            <div
              style={{
                maxWidth: "480px",
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
                <div style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 0,
                  marginBottom: 15,
                  paddingBottom: 2,
                  paddingLeft: 1,
                  scrollbarWidth: "thin"
                }}>
                  {(CATEGORIES.find(c => c.name === activeCategory)?.brands || []).map(brand =>
                    <BrandButton
                      key={brand}
                      name={brand}
                      active={brand === activeBrand}
                      onClick={() => setActiveBrand(brand === activeBrand ? null : brand)}
                    />
                  )}
                </div>
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
          </motion.div>
        )}

        {showCart && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.13, type: "tween", ease: "easeInOut" }}
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
                          <span style={{ fontWeight: 800, fontSize: isMobile ? 11 : 16, color: "#fff" }}>{Number(product.price) * item.qty} ₽</span>
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
                            onClick={() => setCart(prev => prev.filter(i => String(i.id) !== String(item.id)))}
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
    const messageLines = [
      "Здравствуйте! Я хочу заказать в вашем магазине:",
      "",
      ...cart.map((item) => {
        const p = getProduct(item.id);
        return p
          ? `${p.brand} ${p.name} x${item.qty}`
          : "";
      }),
      "",
      `Итого товаров: ${cart.reduce((sum, item) => sum + item.qty, 0)}`
    ];

    const message = messageLines.join("\n");
    const encodedMessage = encodeURIComponent(message);
    const telegramUsername = "frsr4fs"; // поменяй на ник менеджера без @

    const telegramLink = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
    window.open(telegramLink, "_blank");
  }}
>
  Оформить заказ
</button>



                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 18 }} />
    </div>
  );
};

export default App;
