import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Анимированный фон ---
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

// --- ДАННЫЕ ---
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

// --- КАТЕГОРИИ ---
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

// --- ПРИМЕР ТОВАРОВ/БРЕНДОВ (минимально для теста, расширь сам) ---
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
  // остальные категории (аналогично), чтобы работал поиск и бренды
  // ...
};
const PRODUCTS = {
  "Смартфоны": BRANDS["Смартфоны"].flatMap(b => b.products),
  "Часы": BRANDS["Часы"].flatMap(b => b.products),
  // ...
};

// --- УТИЛИТЫ ---
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

  // Корзина
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
    for (let arr of Object.values(PRODUCTS)) {
      for (let p of arr) if (p.id === id) return p;
    }
    return null;
  }
  const total = cart.reduce((sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty, 0);

  // --- UI ---
  const mainBlockWidth = isMobile ? "96vw" : 420;
  // --- КРАСИВЫЕ КАТЕГОРИИ ---
  function CategoryCard({ cat, onClick }) {
    return (
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
        onClick={onClick}
        style={{
          width: "100%",
          background: "rgba(36,46,67,0.76)",
          borderRadius: 20,
          border: `1.7px solid ${BORDER}`,
          boxShadow: "0 5px 26px #3ca4ff11, 0 2px 8px #091d3c0f",
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: isMobile ? "15px 18px" : "20px 32px",
          margin: 0,
          cursor: "pointer",
          transition: ".17s",
          outline: "none"
        }}
      >
        <div style={{
          background: "linear-gradient(120deg,#395ba3 0%,#2b99ef 100%)",
          width: isMobile ? 43 : 53,
          height: isMobile ? 43 : 53,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 9px #3ca4ff36",
          opacity: 0.97,
          flexShrink: 0
        }}>
          <span style={{ fontSize: isMobile ? 26 : 32 }}>{cat.emoji}</span>
        </div>
        <span style={{
          fontWeight: 800,
          fontSize: isMobile ? 19 : 24,
          letterSpacing: "0.01em",
          color: "#fff",
          textShadow: "0 2px 12px #395ba333"
        }}>{cat.name}</span>
      </motion.button>
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
      {/* --- Хедер + инфо --- */}
      <header style={{
        textAlign: "center",
        padding: isMobile ? "14px 0 0 0" : "30px 0 0 0",
        position: "relative",
        zIndex: 2
      }}>
        <img src={logoUrl} alt="logo"
          style={{
            width: isMobile ? 53 : 72,
            height: isMobile ? 53 : 72,
            objectFit: "cover",
            borderRadius: "50%",
            border: `2.2px solid ${ACCENT}`,
            background: "#fff",
            margin: "0 auto 0 auto",
            display: "block",
            boxShadow: "0 0 18px #0007",
          }}
        />
        {/* --- Welcome / Telegram / Contacts --- */}
        <div style={{
          margin: "17px auto 0 auto",
          maxWidth: isMobile ? "95vw" : 410,
          background: "rgba(32,38,55,0.88)",
          borderRadius: 16,
          boxShadow: "0 3px 15px #14223422",
          border: `1.5px solid ${BORDER}`,
          padding: isMobile ? "18px 8px" : "23px 27px"
        }}>
          <div style={{
            fontWeight: 800, fontSize: isMobile ? 16 : 18,
            marginBottom: 5, color: "#fff"
          }}>
            Добро пожаловать в <span style={{ color: ACCENT }}>4Friends Store!</span>
          </div>
          <div style={{
            color: "#b9d8ff", fontSize: isMobile ? 13 : 15, fontWeight: 500,
            marginBottom: 15, letterSpacing: ".01em"
          }}>
            Только новые товары по лучшим ценам. <br />Прокрутите вниз и выберите свой!
          </div>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
            style={{
              background: ACCENT,
              color: "#fff",
              padding: isMobile ? "10px 0" : "13px 0",
              borderRadius: 9,
              fontWeight: 700,
              fontSize: isMobile ? 15 : 17,
              textDecoration: "none",
              boxShadow: "0 2px 10px #3ca4ff22",
              border: "none",
              margin: "0 auto 0 auto",
              display: "block",
              transition: ".15s",
              outline: "none"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? 17 : 23} width={isMobile ? 17 : 23} viewBox="0 0 24 24" style={{ marginRight: 7, verticalAlign: "middle" }}>
              <circle cx="12" cy="12" r="12" fill="#229ed9"/>
              <path fill="#fff" d="M18.84 7.3a.79.79 0 0 0-.85-.08l-10.44 4.6a.82.82 0 0 0 .05 1.5l2.45.95 1.07 3.17a.8.8 0 0 0 .74.54h.03a.8.8 0 0 0 .74-.57l1.03-3.25 4.06-4.12a.81.81 0 0 0-.13-1.19z"/>
            </svg>
            Перейти в Telegram
          </a>
          <div style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: 10,
            marginTop: 12,
            padding: isMobile ? "7px 6px" : "13px 13px",
            color: "#e9f3ff",
            fontSize: isMobile ? 12.5 : 15
          }}>
            <span style={{ color: ACCENT, fontWeight: 800 }}>Контакты: </span>
            <span>Телефон: <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>{PHONE}</a></span>
            <br />
            <span>Адрес: <span style={{ color: "#fff", fontWeight: 700 }}>{ADDRESS}</span></span>
          </div>
        </div>
      </header>

      {/* --- КАТЕГОРИИ --- */}
      {!activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth, margin: "25px auto 0 auto"
        }}>
          <div style={{
            fontWeight: 900, fontSize: isMobile ? 19 : 25,
            letterSpacing: "0.015em", color: "#b6cafc",
            margin: "20px 0 17px 0",
            textAlign: "center",
            textShadow: "0 3px 22px #252b48cc"
          }}>Категории</div>
          <div style={{
            display: "flex", flexDirection: "column",
            gap: isMobile ? 13 : 19,
            width: "100%"
          }}>
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.name} cat={cat}
                onClick={() => { setActiveCategory(cat.name); setActiveBrandIdx(null); setSearch(""); }}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- СТРАНИЦА КАТЕГОРИИ --- */}
      {activeCategory && (
        <div style={{
          maxWidth: mainBlockWidth, margin: "18px auto 0 auto", position: "relative"
        }}>
          {/* --- КНОПКА НАЗАД --- */}
          <button
            onClick={() => { setActiveCategory(null); setActiveBrandIdx(null); setSearch(""); }}
            style={{
              margin: "0 0 16px 0",
              background: "rgba(40,52,68,0.80)",
              border: "none",
              color: ACCENT,
              fontWeight: 700,
              fontSize: isMobile ? 15 : 18,
              borderRadius: 10,
              padding: isMobile ? "7px 17px" : "10px 26px",
              cursor: "pointer",
              boxShadow: "0 2px 14px #3ca4ff18"
            }}
          >← Назад к категориям</button>

          {/* --- БРЕНДЫ (ПОДКАТЕГОРИИ) --- */}
          {BRANDS[activeCategory] && BRANDS[activeCategory].length > 1 && (
            <div style={{
              display: "flex", gap: 12, marginBottom: 17, marginTop: 5,
              overflowX: "auto", paddingBottom: 2
            }}>
              {BRANDS[activeCategory].map((brand, i) => (
                <button key={brand.name}
                  onClick={() => setActiveBrandIdx(i)}
                  style={{
                    background: i === activeBrandIdx ? ACCENT : "rgba(255,255,255,0.06)",
                    color: i === activeBrandIdx ? "#fff" : "#b6cafc",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: isMobile ? 13.5 : 16,
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
            marginBottom: 17,
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
                padding: isMobile ? "10px 13px" : "13px 18px",
                background: "rgba(36,46,67,0.65)",
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 2px 7px #0c234014"
              }}
            />
          </div>
          {/* --- ТОВАРЫ --- */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 14
          }}>
            {(BRANDS[activeCategory] ? (
              activeBrandIdx !== null
                ? BRANDS[activeCategory][activeBrandIdx].products
                : BRANDS[activeCategory].flatMap(b => b.products)
            ) : PRODUCTS[activeCategory] || []).filter(
              p => !search || p.name.toLowerCase().includes(search.toLowerCase())
            ).map(product => {
              const qty = getQtyInCart(product.id);
              return (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.93 }}
                  transition={{ duration: 0.23, type: "spring" }}
                  style={{
                    background: CARD,
                    border: `1.2px solid ${BORDER}`,
                    borderRadius: 13,
                    boxShadow: "0 3px 14px #08172b15",
                    padding: isMobile ? 10 : 16,
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 13 : 22,
                    position: "relative"
                  }}
                >
                  <img src={product.img} alt={product.name}
                    onError={e => (e.target.src = PHONE_PLACEHOLDER)}
                    style={{
                      width: isMobile ? 55 : 85,
                      height: isMobile ? 55 : 85,
                      objectFit: "cover",
                      borderRadius: 9,
                      background: "#22242d",
                      border: `1.1px solid ${BORDER}`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: isMobile ? 14.5 : 19,
                      color: "#fff"
                    }}>{product.brand}</div>
                    <div style={{
                      fontSize: isMobile ? 12.5 : 15,
                      color: "#b3bfcf",
                      marginBottom: 3
                    }}>{product.name}</div>
                    <div style={{
                      color: "#a6c9fa",
                      fontSize: isMobile ? 11 : 13.2
                    }}>{product.desc}</div>
                    <div style={{
                      fontWeight: 900,
                      fontSize: isMobile ? 13.5 : 17,
                      color: ACCENT,
                      marginTop: 5
                    }}>{product.price} ₽</div>
                  </div>
                  <div style={{ marginLeft: 7 }}>
                    {qty === 0 ? (
                      <button onClick={() => addToCart(product.id)}
                        style={{
                          background: ACCENT, color: "#181B23",
                          border: "none", borderRadius: 8,
                          fontWeight: 800, fontSize: isMobile ? 13 : 16,
                          padding: isMobile ? "7px 9px" : "11px 16px",
                          cursor: "pointer"
                        }}>
                        В корзину
                      </button>
                    ) : (
                      <div style={{
                        background: ACCENT, borderRadius: 8,
                        display: "flex", alignItems: "center"
                      }}>
                        <button onClick={() => removeFromCart(product.id)}
                          style={{
                            background: "none", border: "none", color: "#181B23",
                            fontWeight: 800, fontSize: 19, padding: "5px 8px",
                            cursor: "pointer"
                          }}>–</button>
                        <span style={{ color: "#181B23", fontWeight: 800, fontSize: 15, margin: "0 6px" }}>{qty}</span>
                        <button onClick={() => addToCart(product.id)}
                          style={{
                            background: "none", border: "none", color: "#181B23",
                            fontWeight: 800, fontSize: 19, padding: "5px 8px",
                            cursor: "pointer"
                          }}>+</button>
                      </div>
                    )}
                  </div>
                  {/* Эффект +1 */}
                  <AnimatePresence>
                    {addAnimId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.7 }}
                        animate={{ opacity: 1, y: -22, scale: 1.08 }}
                        exit={{ opacity: 0, y: -52, scale: 1.19 }}
                        transition={{ duration: 0.38 }}
                        style={{
                          position: "absolute", top: isMobile ? 10 : 18, right: isMobile ? 12 : 25,
                          color: ACCENT, fontWeight: 900, fontSize: isMobile ? 15 : 21,
                          pointerEvents: "none"
                        }}
                      >+1</motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- КОРЗИНА (оставил как было, если что стили подправим) --- */}
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
