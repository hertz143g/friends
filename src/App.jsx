import React, { useEffect, useState } from "react";

// ====== CSV ссылка ======
const SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRtT-9yQsf2f0mY01Hkcg_711efC99-ZBqzhO_j8nUJWcP3HCZFzXTGCkEKXtqL8FF4IHmFUM_34TM/pub?output=csv";

// ====== Парсер CSV ======
function parseCSV(str) {
  const rows = str.trim().split('\n');
  const headers = rows[0].split(',');
  return rows.slice(1).map(row => {
    // Убираем кавычки, если есть, и делим на запятые, без косяков с пустыми ячейками
    const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const obj = {};
    headers.forEach((h, i) => {
      let v = (values[i] || "").trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1); // убираем кавычки
      obj[h.trim()] = v;
    });
    return obj;
  });
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_CSV)
      .then(r => r.text())
      .then(text => {
        setProducts(parseCSV(text));
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      background: "#181e28",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "system-ui, sans-serif",
      padding: 0,
      margin: 0
    }}>
      <div style={{
        maxWidth: 430,
        margin: "0 auto",
        padding: 20
      }}>
        <h2 style={{
          fontWeight: 900,
          fontSize: 28,
          marginBottom: 20,
          letterSpacing: "0.01em",
          color: "#5ac5ff"
        }}>Товары из Google Таблицы</h2>

        {loading && <div style={{color:"#acd2ff"}}>Загрузка...</div>}
        {!loading && products.length === 0 && <div>Нет товаров</div>}

        {products.map((p, i) => (
          <div key={i} style={{
            background: "#23293b",
            borderRadius: 18,
            margin: "14px 0",
            padding: 18,
            boxShadow: "0 6px 20px #1b2440aa",
            display: "flex",
            gap: 18,
            alignItems: "center"
          }}>
            <div>
              {p.img
                ? <img src={p.img} alt={p.name} style={{maxWidth: 120, maxHeight: 120, borderRadius: 10, background: "#161b27"}} />
                : <div style={{width: 120, height: 120, background:"#161b27", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#3ca4ff88"}}>Нет фото</div>
              }
            </div>
            <div style={{flex: 1}}>
              <div style={{color:"#a7d4ff", fontWeight:800, fontSize:15}}>{p.category || "Категория не указана"}</div>
              <div style={{color:"#fff", fontWeight:900, fontSize:17, margin:"2px 0"}}>{p.name}</div>
              <div style={{color:"#b3c9eb", fontWeight:600, fontSize:14}}>{p.brand}</div>
              <div style={{color:"#63bfff", fontWeight:800, fontSize:17, margin:"7px 0 0 0"}}>
                {p.price ? `${p.price} ₽` : ""}
              </div>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 60,
          fontSize: 14,
          color: "#65bbff80",
          textAlign: "center"
        }}>
          <b>Для владельца:</b> Редактируй список товаров прямо в Google Таблице!<br/>
          <span style={{fontSize:11}}>Измени, добавь или удали товар — и тут обновится автоматически.</span>
        </div>
      </div>
    </div>
  );
}
