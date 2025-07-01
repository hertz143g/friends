import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#339DFF";
const BG = "#23272f";
const CARD = "#191c20";
const BORDER = "rgba(255,255,255,0.08)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
const TELEGRAM_LINK = "https://t.me/your_channel"; // <-- Вставь свою ссылку!
const PHONE = "+7 (999) 123-45-67";
const ADDRESS = "г. Москва, ТЦ Сити, пав. 123";

const TV_PLACEHOLDER = "https://tech-iq.ru/upload/iblock/324/ixntoljx6r6lclbh3pfr0ve261z3ocn2.webp";
const PHONE_PLACEHOLDER = "https://avatars.mds.yandex.net/get-mpic/1865853/img_id3034328595286431407.png/orig";

const TVS = [
  { id: 396940, brand: "Xiaomi", name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный', price: 16000 },
  { id: 394946, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 FHD 2025 RU черный', price: 23100 },
  { id: 395792, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 4K 2025 RU черный', price: 23300 },
  { id: 398100, brand: "Xiaomi", name: 'Телевизор ЖК 43" Xiaomi TV A43 Pro 4K 2025 RU черный', price: 26500 },
  { id: 394448, brand: "Xiaomi", name: 'Телевизор ЖК 50" Xiaomi TV A50 2025 RU RU черный', price: 27800 },
  { id: 394966, brand: "Xiaomi", name: 'Телевизор ЖК 55" Xiaomi TV A55 2025 RU черный', price: 32800 }
];

const PHONES = [
  { id: 101, brand: "Apple", name: "iPhone 15 Pro 128GB Серый", price: 115000, img: PHONE_PLACEHOLDER },
  { id: 102, brand: "Samsung", name: "Samsung Galaxy S24 Ultra 256GB Черный", price: 98000, img: PHONE_PLACEHOLDER },
  { id: 103, brand: "Xiaomi", name: "Xiaomi Redmi Note 13 Pro 512GB Синий", price: 34000, img: PHONE_PLACEHOLDER }
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

  React.useEffect(() => {
    const onResize = () => setColumns(getColumns());
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

  // Адаптивные размеры блоков (для мобилки и десктопа)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 540;
  const mainBlockWidth = isMobile ? "98vw" : 430;
  const blockPad = isMobile ? 13 : 26;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#fff",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "system-ui,sans-serif",
        overflowX: "hidden"
      }}
    >
      <header style={{ textAlign: "center", padding: "18px 0 0 0", position: "relative" }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 66,
            height: 66,
            objectFit: "cover",
            borderRadius: "50%",
            border: `3px solid ${ACCENT}`,
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
            top: 20,
            right: 35,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <span style={{ position: "relative" }}>
            <svg width={30} height={30} viewBox="0 0 24 24" fill={ACCENT}>
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
                  top: -11,
                  right: -13,
                  background: ACCENT,
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "3px 9px",
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
        <div style={{
          width: "100%",
          maxWidth: mainBlockWidth,
          margin: "28px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
      </header>

      {/* Категории */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 14, margin: "38px 0 24px 0", flexWrap: "wrap"
      }}>
        {SECTIONS.map((section, idx) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(idx)}
            style={{
              background: idx === activeSection ? ACCENT : "transparent",
              color: idx === activeSection ? "#fff" : "#aaa",
              border: "none",
              borderRadius: 14,
              padding: "9px 18px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: idx === activeSection ? "0 2px 10px #2d70ff66" : "none",
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
        <div style={{ maxWidth: mainBlockWidth, margin: "0 auto", width: "100vw", padding: "0 2vw" }}>
          {/* Карусель */}
          <div style={{
            width: "100%",
            background: "#15181d",
            borderRadius: 19,
            padding: blockPad,
            boxShadow: "0 4px 24px #1c223040",
            marginBottom: 18,
            maxWidth: mainBlockWidth,
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 15, textAlign: "center", letterSpacing: "0.01em" }}>Топовые товары</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11 }}>
              <button onClick={prevCarousel} style={{ background: "none", border: "none", fontSize: 27, color: ACCENT, cursor: "pointer" }}>‹</button>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", duration: 0.32 }}
                style={{
                  background: CARD,
                  borderRadius: 14,
                  boxShadow: "0 3px 10px #0004",
                  padding: isMobile ? 12 : 17,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: isMobile ? 148 : 180,
                  maxWidth: isMobile ? 230 : 250,
                  width: isMobile ? "68vw" : "90vw"
                }}
              >
                <img src={CAROUSEL_PRODUCTS[carouselIndex].img} alt="" style={{ width: isMobile ? 62 : 70, height: isMobile ? 62 : 70, borderRadius: 12, objectFit: "cover", marginBottom: 8, background: "#222" }} />
                <div style={{ fontWeight: 700, fontSize: isMobile ? 15 : 16, marginBottom: 6 }}>{CAROUSEL_PRODUCTS[carouselIndex].brand}</div>
                <div style={{ fontSize: isMobile ? 12.2 : 13.5, color: "#c2c2c2", marginBottom: 8, textAlign: "center" }}>{CAROUSEL_PRODUCTS[carouselIndex].name}</div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 15, marginBottom: 6 }}>{CAROUSEL_PRODUCTS[carouselIndex].price} ₽</div>
                <button onClick={() => addToCart(CAROUSEL_PRODUCTS[carouselIndex].id)}
                  style={{
                    background: ACCENT, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, padding: "8px 13px", cursor: "pointer", fontSize: isMobile ? 13 : 14
                  }}>В корзину</button>
              </motion.div>
              <button onClick={nextCarousel} style={{ background: "none", border: "none", fontSize: 27, color: ACCENT, cursor: "pointer" }}>›</button>
            </div>
          </div>

          {/* Приветственный блок */}
          <div style={{
            background: "#191c22",
            borderRadius: 15,
            boxShadow: "0 1.5px 8px #222a",
            padding: isMobile ? 14 : 22,
            marginBottom: 18,
            maxWidth: mainBlockWidth,
            width: "100%",
            margin: "0 auto",
            fontSize: isMobile ? 15 : 16.5,
            textAlign: "center",
            fontWeight: 600,
            letterSpacing: "0.01em",
            color: "#f8f8f8"
          }}>
            Добро пожаловать в <span style={{ color: ACCENT, fontWeight: 800 }}>4Friends Store</span>!  
            Мы рады видеть вас — у нас только новые, честные товары по отличным ценам.<br />
            <span style={{ fontWeight: 400, color: "#b8d7ff" }}>Прокрутите вниз, чтобы увидеть каталог и лучшие предложения.</span>
          </div>

          {/* Ссылка на канал */}
          <div style={{
            background: "#191c22",
            borderRadius: 15,
            boxShadow: "0 2px 10px #1c223030",
            padding: isMobile ? 13 : 22,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 13 : 22,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: mainBlockWidth,
            width: "100%",
            margin: "0 auto"
          }}>
            <img src={logoUrl} alt="logo" style={{ width: isMobile ? 38 : 55, height: isMobile ? 38 : 55, borderRadius: "50%", background: "#fff", border: `2.5px solid ${ACCENT}` }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: isMobile ? 13.5 : 15.5, marginBottom: 6 }}>Наш магазин в Telegram</div>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: ACCENT,
                  color: "#fff",
                  padding: isMobile ? "7px 12px" : "8px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: isMobile ? 12.5 : 14,
                  textDecoration: "none",
                  boxShadow: "0 1px 6px #278aff3a"
                }}>Перейти в канал</a>
            </div>
          </div>

          {/* Контакты + адрес — теперь как единый блок, красиво, крупно */}
          <div style={{
            background: "#162030",
            borderRadius: 15,
            padding: isMobile ? 14 : 24,
            boxShadow: "0 2px 12px #1d263760",
            marginBottom: 22,
            maxWidth: mainBlockWidth,
            width: "100%",
            margin: "0 auto",
            color: "#e9f3ff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 11,
            fontSize: isMobile ? 14.5 : 16.5
          }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 15.5 : 17.5, marginBottom: 4, letterSpacing: "0.02em", color: ACCENT }}>
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
            <div style={{ fontSize: isMobile ? 12.2 : 13.5, color: "#b5e1ff", marginTop: 6 }}>
              Пишите и звоните — мы всегда на связи!
            </div>
          </div>
        </div>
      )}

      {/* Каталог — как было */}
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
            overflowX: "hidden"
          }}
        >
          <AnimatePresence mode="wait">
            {products.map((product, i) => {
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
                    transition: "box-shadow .15s"
                  }}
                  whileHover={{
                    boxShadow: "0 16px 42px #278aff2b, 0 2px 10px #091d3c55",
                    scale: 1.025
                  }}
                >
                  <motion.img
                    src={product.img}
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
                    onError={e => { e.target.src = product.img; }}
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
                    fontSize: 13.2,
                    marginBottom: 22,
                    color: "#c2c2c2",
                    textAlign: "center",
                    width: "75%",
                    margin: "0 auto",
                    lineHeight: 1.4,
                    overflowWrap: "break-word"
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 19,
                    marginTop: "auto"
                  }}>
                    {product.price} ₽
                  </div>
                  {qty === 0 ? (
                    <motion.button
                      whileTap={{ scale: 0.93, backgroundColor: "#197ad2" }}
                      onClick={() => addToCart(product.id)}
                      style={{
                        background: ACCENT,
                        color: "#fff",
                        padding: "13px 0",
                        borderRadius: 10,
                        border: "none",
                        fontWeight: 700,
                        fontSize: 15.5,
                        cursor: "pointer",
                        width: "100%",
                        boxShadow: "0 2px 10px #2680d733",
                        position: "relative",
                        letterSpacing: "0.04em",
                        transition: "background .17s"
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
                        borderRadius: 10,
                        padding: "0 7px"
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
                          color: "#fff",
                          fontSize: 25,
                          fontWeight: 700,
                          padding: "9px 13px 10px 13px",
                          cursor: "pointer",
                          outline: "none",
                          borderRadius: 6
                        }}
                      >–</motion.button>
                      <div style={{
                        color: "#fff",
                        minWidth: 28,
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: 17.5
                      }}>
                        {qty}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.89 }}
                        onClick={() => addToCart(product.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#fff",
                          fontSize: 25,
                          fontWeight: 700,
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
                        initial={{ opacity: 0, y: 16, scale: 0.7 }}
                        animate={{ opacity: 1, y: -32, scale: 1.15 }}
                        exit={{ opacity: 0, y: -70, scale: 1.4 }}
                        transition={{ duration: 0.55 }}
                        style={{
                          position: "absolute",
                          top: 32,
                          right: 34,
                          color: ACCENT,
                          fontWeight: 900,
                          fontSize: 24,
                          textShadow: "0 2px 7px #18181b",
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

      {/* Корзина — как было */}
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
          </div>
        </div>
      )}
      <div style={{ height: 28 }} />
    </div>
  );
};

export default App;
