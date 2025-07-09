import React, { useState } from "react";

// Твои категории и бренды
const CATEGORIES = [
  { name: "Смартфоны", brands: ["Apple", "Samsung", "Xiaomi", "Redmi", "Poco", "OnePlus", "Google Pixel"] },
  { name: "Часы", brands: ["Apple Watch", "Casio G-SHOCK", "Garmin"] },
  { name: "Компьютеры и планшеты", brands: ["MacBook", "iMac", "iPad"] },
  { name: "Аудио", brands: ["AirPods", "AirPods в разборе", "Аксессуары", "Колонки", "Marshall"] },
  { name: "Телевизоры", brands: ["Телевизоры", "Электросамокаты"] },
  { name: "Игровые приставки", brands: ["Xbox", "Sony Ps5"] },
  { name: "Игрушки", brands: ["Игрушки Labubu"] },
  { name: "Электроника", brands: ["Apple TV", "GoPro", "Dyson", "Пылесос"] },
];

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    category: "",
    brand: "",
    name: "",
    price: "",
    img: ""
  });

  // Фильтруем бренды по выбранной категории
  const brands = CATEGORIES.find(c => c.name === form.category)?.brands || [];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Если меняем категорию — сбрасываем бренд!
      ...(name === "category" ? { brand: "" } : {})
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // onAdd — это колбэк, можешь заменить на свой способ сохранения
    onAdd && onAdd(form);
    alert("Товар собран, теперь отправь в гугл-таблицу или БД");
    setForm({ id: "", category: "", brand: "", name: "", price: "", img: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#23293b", borderRadius: 14, padding: 24, color: "#fff", maxWidth: 420, margin: "30px auto"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Добавить товар</div>
      
      <label>ID:<br/>
        <input name="id" value={form.id} onChange={handleChange} style={inputStyle} required />
      </label><br/>

      <label>Категория:<br/>
        <select name="category" value={form.category} onChange={handleChange} style={inputStyle} required>
          <option value="">Выберите категорию</option>
          {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
        </select>
      </label><br/>

      <label>Бренд:<br/>
        <select name="brand" value={form.brand} onChange={handleChange} style={inputStyle} required disabled={!form.category}>
          <option value="">Сначала выберите категорию</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label><br/>

      <label>Название:<br/>
        <input name="name" value={form.name} onChange={handleChange} style={inputStyle} required />
      </label><br/>

      <label>Цена:<br/>
        <input name="price" value={form.price} onChange={handleChange} style={inputStyle} required type="number" min="1"/>
      </label><br/>

      <label>Картинка (URL):<br/>
        <input name="img" value={form.img} onChange={handleChange} style={inputStyle}/>
      </label><br/>

      <button type="submit" style={{
        background: "#3ca4ff", color: "#fff", fontWeight: 700, padding: "10px 22px", borderRadius: 8, border: "none", marginTop: 16, fontSize: 16, cursor: "pointer"
      }}>Добавить</button>
    </form>
  );
}

const inputStyle = {
  background: "#20294a",
  border: "1.2px solid #27395a",
  borderRadius: 8,
  color: "#fff",
  padding: "7px 12px",
  margin: "5px 0 14px 0",
  width: "100%",
  fontSize: 15,
  fontWeight: 600
};
