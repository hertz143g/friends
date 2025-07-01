import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#339DFF";
const BG = "#23272f";
const CARD = "#18181b";
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

const CARD_HEIGHT = 330;

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const products = SECTIONS[activeSection].products;
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [addAnimId, setAddAnimId] = useState(null);

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

  React.useEffect(() => {
    document.body.style.background = BG;
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.background = BG;
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
  }, []);

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
      }}
    >
      <header style={{ textAlign: "center", padding: "18px 0 0 0", position: "relative" }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 60,
            height: 60,
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
          animate={cartAnim ? { scale: [1, 1.22, 0.9, 1], rotate: [0, -13, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          onClick={() => setShowCart(true)}
          style={{
            position: "absolute",
            top: 18,
            right: 32,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <span style={{ position: "relative" }}>
            <svg width={27} height={27} viewBox="0 0 24 24" fill={ACCENT}>
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
          maxWidth: 380,
          margin: "24px auto 0 auto",
          height: 1,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 2,
        }}></div>
      </header>

      <div style={{
        display: "flex", justifyContent: "center", gap: 12, margin: "34px 0 16px 0"
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
              padding: "7px 16px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          maxWidth: 340,
          margin: "0 auto",
          padding: 12,
          width: "100%",
        }}
      >
        <AnimatePresence mode="wait">
        {products.map((product, i) => {
          const qty = getQtyInCart(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.38, type: "spring" }}
              style={{
                background: CARD,
                borderRadius: 17,
                boxShadow: "0 4px 16px #0005",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: CARD_HEIGHT,
                height: CARD_HEIGHT,
                width: "100%",
                boxSizing: "border-box",
                margin: "0 auto",
                justifyContent: "flex-start",
                position: "relative"
              }}
            >
              <motion.img
                src={product.img}
                alt={product.name}
                style={{
                  width: 125,
                  height: 125,
                  objectFit: "cover",
                  borderRadius: 16,
                  marginBottom: 18,
                  background: "#222",
                  boxShadow: "0 2px 10px #0003",
                }}
                initial={false}
                animate={addAnimId === product.id ? { scale: [1, 1.12, 0.95, 1] } : { scale: 1 }}
                transition={{ duration: 0.37 }}
                onError={e => { e.target.src = product.img; }}
              />
              <div style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 8,
                textAlign: "center",
                width: "100%",
                overflowWrap: "break-word"
              }}>
                {product.brand}
              </div>
              <div style={{
                fontSize: 13,
                marginBottom: 28,
                color: "#c2c2c2",
                textAlign: "center",
                width: "68%",
                margin: "0 auto",
                overflowWrap: "break-word"
              }}>
                {product.name}
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 18,
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
                    padding: "11px 0",
                    borderRadius: 9,
                    border: "none",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 1px 4px #0002",
                    position: "relative"
                  }}
                >
                  В корзину
                </motion.button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 8,
                    background: ACCENT,
                    borderRadius: 9,
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
                      fontSize: 22,
                      fontWeight: 700,
                      padding: "7px 13px",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >–</motion.button>
                  <div style={{ color: "#fff", minWidth: 24, textAlign: "center", fontWeight: 700, fontSize: 16 }}>
                    {qty}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.89 }}
                    onClick={() => addToCart(product.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                      padding: "7px 13px",
                      cursor: "pointer",
                      outline: "none"
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
                      top: 30,
                      right: 32,
                      color: ACCENT,
                      fontWeight: 900,
                      fontSize: 22,
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
              borderRadius: 13,
              padding: 18,
              width: 330,
              maxWidth: "96vw",
              boxShadow: "0 6px 24px #000a",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 13 }}>Корзина</div>
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
                        marginBottom: 18,
                        borderBottom: "1px solid #4446",
                        paddingBottom: 12,
                        gap: 12
                      }}
                    >
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{product.brand}</div>
                        <div style={{ fontSize: 13, color: "#c2c2c2", marginBottom: 5 }}>{product.name}</div>
                        <div style={{ color: "#999", fontSize: 13, marginBottom: 2 }}>Кол-во: <b>{item.qty}</b></div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 70 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{product.price * item.qty} ₽</span>
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
                <div style={{ fontWeight: 700, fontSize: 16, textAlign: "right", marginTop: 6 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 13,
                    background: ACCENT,
                    color: "#fff",
                    padding: "12px 0",
                    borderRadius: 7,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 15,
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
