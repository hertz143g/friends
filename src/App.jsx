import React, { useState } from "react";

const ACCENT = "#339DFF";
const BG = "#18181b";
const CARD = "#23272f";
const logoUrl = "https://i.ibb.co/5MkhR8D/4friendsstore-logo.png";

// Гарантированные картинки (imgur, github или свои)
// Если хочешь можешь загрузить свои на imgur.com (или другой свободный хостинг)
const SECTIONS = [
  {
    name: "Телевизоры",
    products: [
      {
        id: 1,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный',
        price: 16000,
        img: "https://i.imgur.com/nHhkF1n.jpg",
      },
      {
        id: 2,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 43" Xiaomi TV A43 FHD 2025 RU черный',
        price: 23100,
        img: "https://i.imgur.com/BfqZmkt.jpg",
      },
      {
        id: 3,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 43" Xiaomi TV A43 4K 2025 RU черный',
        price: 23300,
        img: "https://i.imgur.com/x9z1nFi.jpg",
      },
    ],
  },
  {
    name: "Телефоны",
    products: [
      {
        id: 101,
        brand: "Apple",
        name: "iPhone 15 Pro Max 256GB",
        price: 142000,
        img: "https://i.imgur.com/31lOYYb.jpg",
      },
      {
        id: 102,
        brand: "Samsung",
        name: "Samsung Galaxy S24 Ultra",
        price: 135000,
        img: "https://i.imgur.com/F7k1P2d.jpg",
      },
      {
        id: 103,
        brand: "Xiaomi",
        name: "Xiaomi 14 Ultra 12/256GB",
        price: 89900,
        img: "https://i.imgur.com/6BQ0ObX.jpg",
      },
    ],
  },
  {
    name: "Компьютеры",
    products: [
      {
        id: 201,
        brand: "Apple",
        name: "MacBook Air 15” M3",
        price: 145000,
        img: "https://i.imgur.com/nbpRIJL.jpg",
      },
      {
        id: 202,
        brand: "MSI",
        name: "MSI Modern 15 i5/16GB/512GB SSD",
        price: 75000,
        img: "https://i.imgur.com/jhy6vUI.jpg",
      },
    ],
  },
];

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const products = SECTIONS[activeSection].products;

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getProduct = (id) => {
    for (let section of SECTIONS) {
      const found = section.products.find((p) => p.id === id);
      if (found) return found;
    }
    return null;
  };

  const total = cart.reduce(
    (sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty,
    0
  );

  // Фикс для body-стилей в мини-аппе
  React.useEffect(() => {
    document.body.style.background = BG;
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.height = "100%";
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#fff",
        overflow: "auto",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "system-ui,sans-serif",
      }}
    >
      {/* Логотип + корзина */}
      <header style={{ textAlign: "center", padding: 20, position: "relative" }}>
        <img src={logoUrl} alt="logo" style={{ maxWidth: 110, margin: "0 auto" }} />
        <button
          onClick={() => setShowCart(true)}
          style={{
            position: "absolute",
            top: 22,
            right: 32,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ position: "relative" }}>
            <svg
              width={30}
              height={30}
              viewBox="0 0 24 24"
              fill={ACCENT}
              style={{ marginRight: 2 }}
            >
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm2-3H7.42l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H6.21l-.94-2H20c.553 0 1-.447 1-1s-.447-1-1-1H5.42l-.94-2H2V4h2l3.6 7.59-1.35 2.44C5.16 14.37 5.92 16 7.22 16H19c.553 0 1-.447 1-1s-.447-1-1-1z" />
            </svg>
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  background: ACCENT,
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: 12,
                }}
              >
                {cart.length}
              </span>
            )}
          </span>
        </button>
      </header>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
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
              fontSize: 16,
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Каталог товаров — адаптивная сетка */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          maxWidth: 750,
          margin: "0 auto",
          padding: 8,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: CARD,
              borderRadius: 16,
              boxShadow: "0 4px 16px #0003",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 320,
              minWidth: 0,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: 160,
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 8,
                background: "#222",
              }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/160?text=No+Image"; }}
            />
            <div style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 4,
              textAlign: "center",
              width: "100%",
              overflowWrap: "break-word"
            }}>
              {product.brand}
            </div>
            <div style={{
              fontSize: 13,
              marginBottom: 4,
              color: "#e5e5e5",
              textAlign: "center",
              width: "100%",
              minHeight: 36,
              overflowWrap: "break-word"
            }}>
              {product.name}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{product.price} ₽</div>
            <button
              onClick={() => addToCart(product.id)}
              style={{
                marginTop: "auto",
                background: ACCENT,
                color: "#fff",
                padding: "10px 0",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                width: "100%",
              }}
            >
              В корзину
            </button>
          </div>
        ))}
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
              borderRadius: 16,
              padding: 24,
              width: 330,
              maxWidth: "90vw",
              boxShadow: "0 6px 24px #000a",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Корзина</div>
            {cart.length === 0 ? (
              <div style={{ color: "#aaa", marginBottom: 14 }}>Корзина пуста</div>
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
                        alignItems: "center",
                        marginBottom: 10,
                        borderBottom: "1px solid #4446",
                        paddingBottom: 5,
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 700 }}>{product.brand}</span>
                        <div style={{ fontSize: 14 }}>{product.name}</div>
                        <div style={{ color: "#aaa", fontSize: 13 }}>x{item.qty}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span>{product.price * item.qty} ₽</span>
                        <button
                          style={{
                            display: "block",
                            marginTop: 5,
                            color: ACCENT,
                            background: "none",
                            border: "none",
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontWeight: 700, fontSize: 16, textAlign: "right", marginTop: 14 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 14,
                    background: ACCENT,
                    color: "#fff",
                    padding: "12px 0",
                    borderRadius: 10,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 16,
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
