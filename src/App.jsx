import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#339DFF";
const BG = "#23272f";
const CARD = "#191c20";
const BORDER = "rgba(255,255,255,0.08)";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";
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

const SECTIONS = [
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
  return "repeat(1, 1fr)";
}

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const products = SECTIONS[activeSection].products;
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);
  const [columns, setColumns] = useState(getColumns());

  React.useEffect(() => {
    const onResize = () => setColumns(getColumns());
    window.addEventListener("resize", onResize);
    document.body.style.background = BG;
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.background = BG;
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
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
      <header style={{ textAlign: "center", padding: "15px 0 0 0", position: "relative" }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 55,
            height: 55,
            objectFit: "cover",
            borderRadius: "50%",
            border: `2.5px solid ${ACCENT}`,
            background: "#fff",
            margin: "0 auto 0 auto",
            display: "block",
            boxShadow: "0 0 12px #0006",
          }}
        />
        <motion.button
          animate={cartAnim ? { scale: [1, 1.16, 0.92, 1] } : { scale: 1 }}
          transition={{ duration: 0.39, type: "spring" }}
          onClick={() => setShowCart(true)}
          style={{
            position: "absolute",
            top: 13,
            right: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <span style={{ position: "relative" }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill={ACCENT}>
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
                  top: -10,
                  right: -10,
                  background: ACCENT,
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 8px",
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
          maxWidth: 340,
          margin: "18px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          borderRadius: 2,
        }}></div>
      </header>

      <div style={{
        display: "flex", justifyContent: "center", gap: 10, margin: "24px 0 14px 0"
      }}>
        {SECTIONS.map((section, idx) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(idx)}
            style={{
              background: idx === activeSection ? ACCENT : "transparent",
              color: idx === activeSection ? "#fff" : "#aaa",
              border: "none",
              borderRadius: 12,
              padding: "6px 13px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: idx === activeSection ? "0 2px 8px #2d70ff66" : "none",
              transition: "0.12s",
              letterSpacing: "0.01em"
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: 18,
          maxWidth: 920,
          margin: "0 auto",
          padding: 7,
          width: "100%",
          alignItems: "stretch"
        }}
      >
        <AnimatePresence mode="wait">
        {products.map((product, i) => {
          const qty = getQtyInCart(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ delay: i * 0.04, duration: 0.34, type: "spring" }}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 17,
                boxShadow: "0 4px 16px #08172b19, 0 1.5px 5px #10192822",
                padding: 13,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 270,
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                justifyContent: "flex-start",
                position: "relative",
                overflow: "hidden"
              }}
              whileHover={{
                boxShadow: "0 8px 24px #278aff23, 0 2px 8px #091d3c22",
                scale: window.innerWidth > 700 ? 1.015 : 1
              }}
            >
              <motion.img
                src={product.img}
                alt={product.name}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 14,
                  marginBottom: 10,
                  background: "#23272f",
                  boxShadow: "0 2px 9px #18408022",
                  border: `1px solid ${BORDER}`,
                  transition: ".16s"
                }}
                initial={false}
                animate={addAnimId === product.id ? { scale: [1, 1.11, 0.97, 1] } : { scale: 1 }}
                transition={{ duration: 0.31 }}
                onError={e => { e.target.src = product.img; }}
              />
              <div style={{
                fontWeight: 800,
                fontSize: 15,
                marginBottom: 5,
                textAlign: "center",
                width: "100%",
                letterSpacing: "0.015em",
                color: "#fff"
              }}>
                {product.brand}
              </div>
              <div style={{
                fontSize: 12,
                marginBottom: 13,
                color: "#c2c2c2",
                textAlign: "center",
                width: "90%",
                margin: "0 auto",
                lineHeight: 1.37,
                overflowWrap: "break-word"
              }}>
                {product.name}
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: 14.5,
                marginBottom: 12,
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
                    padding: "9px 0",
                    borderRadius: 8,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 2px 7px #2680d733",
                    position: "relative",
                    letterSpacing: "0.03em",
                    transition: "background .15s"
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
                    borderRadius: 8,
                    padding: "0 5px"
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
                      fontSize: 19,
                      fontWeight: 700,
                      padding: "5px 11px 6px 11px",
                      cursor: "pointer",
                      outline: "none",
                      borderRadius: 6
                    }}
                  >–</motion.button>
                  <div style={{
                    color: "#fff",
                    minWidth: 20,
                    textAlign: "center",
                    fontWeight: 800,
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
                      color: "#fff",
                      fontSize: 19,
                      fontWeight: 700,
                      padding: "5px 11px 6px 11px",
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
                    animate={{ opacity: 1, y: -18, scale: 1.13 }}
                    exit={{ opacity: 0, y: -44, scale: 1.26 }}
                    transition={{ duration: 0.41 }}
                    style={{
                      position: "absolute",
                      top: 26,
                      right: 20,
                      color: ACCENT,
                      fontWeight: 900,
                      fontSize: 18,
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
              borderRadius: 14,
              padding: 15,
              width: 320,
              maxWidth: "99vw",
              boxShadow: "0 8px 24px #0c2340b8",
              border: `1px solid ${BORDER}`,
              maxHeight: "96vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 13, letterSpacing: "0.02em" }}>Корзина</div>
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
                        marginBottom: 15,
                        borderBottom: "1px solid #4446",
                        paddingBottom: 8,
                        gap: 10
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 2, letterSpacing: "0.01em" }}>{product.brand}</div>
                        <div style={{ fontSize: 11.5, color: "#c2c2c2", marginBottom: 5, lineHeight: 1.37 }}>{product.name}</div>
                        <div style={{ color: "#999", fontSize: 11.5, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 52 }}>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{product.price * item.qty} ₽</span>
                        <button
                          style={{
                            display: "block",
                            margin: "6px auto 0 auto",
                            color: ACCENT,
                            background: "none",
                            border: "none",
                            fontSize: 12,
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
                <div style={{ fontWeight: 700, fontSize: 13.5, textAlign: "right", marginTop: 6, marginBottom: 4 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 12,
                    background: ACCENT,
                    color: "#fff",
                    padding: "10px 0",
                    borderRadius: 8,
                    border: "none",
                    fontWeight: 800,
                    fontSize: 13.5,
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
