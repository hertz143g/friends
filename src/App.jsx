import React, { useState } from "react";

const ACCENT = "#339DFF";
const BG = "#18181b";
const CARD = "#23272f";
const logoUrl = "https://i.ibb.co/5xhhdpQR/2025-06-30-17-13-29.jpg";

// Разделы с товарами
const SECTIONS = [
  {
    name: "Телевизоры",
    products: [
      {
        id: 1,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 32" Xiaomi TV A32 2025 RU черный',
        price: 16000,
        img: "https://cdn.ixbt.com/live/topics/preview/00/02/80/80/62d78f91e6.jpg",
      },
      {
        id: 2,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 43" Xiaomi TV A43 FHD 2025 RU черный',
        price: 23100,
        img: "https://www.citilink.ru/images/product/large/1931532_v01_b.jpg",
      },
      {
        id: 3,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 43" Xiaomi TV A43 4K 2025 RU черный',
        price: 23300,
        img: "https://cdn1.ozone.ru/s3/multimedia-6/6637571326.jpg",
      },
      {
        id: 4,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 43" Xiaomi TV A43 Pro 4K 2025 RU черный',
        price: 26500,
        img: "https://avatars.mds.yandex.net/get-mpic/5234975/img_id7106843803306287235.jpeg/600x800",
      },
      {
        id: 5,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 50" Xiaomi TV A50 2025 RU RU черный',
        price: 27800,
        img: "https://television-world.ru/images/television/2821/43/4.jpg",
      },
      {
        id: 6,
        brand: "Xiaomi",
        name: 'Телевизор ЖК 55" Xiaomi TV A55 2025 RU черный',
        price: 32800,
        img: "https://mi-shop.com/upload/iblock/b64/mi_tv_p1_55_ru_black_1.jpg",
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
        img: "https://avatars.mds.yandex.net/get-mpic/11051089/img_id7801432397197670056.jpeg/orig",
      },
      {
        id: 102,
        brand: "Samsung",
        name: "Samsung Galaxy S24 Ultra",
        price: 135000,
        img: "https://cdn1.ozone.ru/s3/multimedia-h/6720637893.jpg",
      },
      {
        id: 103,
        brand: "Xiaomi",
        name: "Xiaomi 14 Ultra 12/256GB",
        price: 89900,
        img: "https://avatars.mds.yandex.net/get-mpic/11830545/img_id8740979558294245438.jpeg/orig",
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
        img: "https://cdn1.ozone.ru/s3/multimedia-g/6847798344.jpg",
      },
      {
        id: 202,
        brand: "MSI",
        name: "MSI Modern 15 i5/16GB/512GB SSD",
        price: 75000,
        img: "https://avatars.mds.yandex.net/get-mpic/4974537/img_id7810217466822702193.png/orig",
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

  // Хак для фона на всю страницу
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
        height: "100vh",
        background: BG,
        color: "#fff",
        overflow: "auto",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Логотип */}
      <header style={{ textAlign: "center", padding: 24, position: "relative" }}>
        <img src={logoUrl} alt="logo" style={{ maxWidth: 120, margin: "0 auto" }} />
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
              width={32}
              height={32}
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
          gap: 18,
          marginBottom: 24,
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
              borderRadius: 16,
              padding: "8px 20px",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: 0.5,
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Каталог — три карточки в ряд */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 1080,
          margin: "0 auto",
          padding: 12,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: CARD,
              borderRadius: 20,
              boxShadow: "0 4px 20px #0004",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 340,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: 170,
                height: 170,
                objectFit: "cover",
                borderRadius: 14,
                marginBottom: 12,
                background: "#18181b",
              }}
            />
            <div style={{
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 4,
              textAlign: "center",
              width: "100%",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}>
              {product.brand}
            </div>
            <div style={{
              fontSize: 15,
              marginBottom: 6,
              color: "#e5e5e5",
              textAlign: "center",
              width: "100%",
              minHeight: 42,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}>
              {product.name}
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{product.price} ₽</div>
            <button
              onClick={() => addToCart(product.id)}
              style={{
                marginTop: "auto",
                background: ACCENT,
                color: "#fff",
                padding: "10px 0",
                borderRadius: 10,
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 2px 8px #339dff30",
                transition: "0.2s",
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
              borderRadius: 20,
              padding: 32,
              width: 380,
              maxWidth: "90vw",
              boxShadow: "0 6px 24px #000a",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Корзина</div>
            {cart.length === 0 ? (
              <div style={{ color: "#aaa", marginBottom: 16 }}>Корзина пуста</div>
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
                        marginBottom: 12,
                        borderBottom: "1px solid #4448",
                        paddingBottom: 8,
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
                <div style={{ fontWeight: 700, fontSize: 18, textAlign: "right", marginTop: 18 }}>
                  Итого: {total} ₽
                </div>
                <button
                  style={{
                    width: "100%",
                    marginTop: 18,
                    background: ACCENT,
                    color: "#fff",
                    padding: "13px 0",
                    borderRadius: 12,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 18,
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
      <div style={{ height: 40 }} />
    </div>
  );
};

export default App;
