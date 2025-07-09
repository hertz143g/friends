// src/AdminPanel.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", emoji: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    img: "",
    categoryId: ""
  });

  // --- Загрузка данных ---
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const cats = await getDocs(collection(db, "categories"));
    setCategories(cats.docs.map(d => ({ id: d.id, ...d.data() })));

    const prods = await getDocs(collection(db, "products"));
    setProducts(prods.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  // --- Добавление категории ---
  async function addCategory(e) {
    e.preventDefault();
    if (!newCategory.name) return;
    await addDoc(collection(db, "categories"), newCategory);
    setNewCategory({ name: "", emoji: "" });
    loadData();
  }

  // --- Добавление товара ---
  async function addProduct(e) {
    e.preventDefault();
    if (!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.categoryId) return;
    await addDoc(collection(db, "products"), {
      ...newProduct,
      price: Number(newProduct.price)
    });
    setNewProduct({ name: "", brand: "", price: "", img: "", categoryId: "" });
    loadData();
  }

  // --- Удаление ---
  async function deleteCategory(id) {
    await deleteDoc(doc(db, "categories", id));
    // Товары в категории тоже удалить (по желанию)
    const prodQuery = query(collection(db, "products"), where("categoryId", "==", id));
    const prodsSnap = await getDocs(prodQuery);
    prodsSnap.forEach(async p => await deleteDoc(doc(db, "products", p.id)));
    loadData();
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
    loadData();
  }

  return (
    <div style={{ maxWidth: 750, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1>Админка (Категории и Товары)</h1>
      <div style={{ display: "flex", gap: 44 }}>
        {/* Категории */}
        <div style={{ flex: 1 }}>
          <h2>Категории</h2>
          <form onSubmit={addCategory} style={{ marginBottom: 14 }}>
            <input
              placeholder="Emoji"
              value={newCategory.emoji}
              onChange={e => setNewCategory({ ...newCategory, emoji: e.target.value })}
              style={{ width: 48, fontSize: 18, marginRight: 8 }}
              maxLength={2}
            />
            <input
              placeholder="Название категории"
              value={newCategory.name}
              onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
              style={{ width: 180, marginRight: 8 }}
            />
            <button type="submit">Добавить</button>
          </form>
          <ul>
            {categories.map(cat =>
              <li key={cat.id} style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>{cat.emoji}</span> {cat.name}
                <button onClick={() => deleteCategory(cat.id)} style={{ marginLeft: 12, color: "red" }}>Удалить</button>
              </li>
            )}
          </ul>
        </div>

        {/* Товары */}
        <div style={{ flex: 2 }}>
          <h2>Товары</h2>
          <form onSubmit={addProduct} style={{ marginBottom: 14 }}>
            <input
              placeholder="Название"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              style={{ width: 110, marginRight: 6 }}
            />
            <input
              placeholder="Бренд"
              value={newProduct.brand}
              onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
              style={{ width: 90, marginRight: 6 }}
            />
            <input
              placeholder="Цена"
              type="number"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              style={{ width: 70, marginRight: 6 }}
            />
            <input
              placeholder="URL картинки"
              value={newProduct.img}
              onChange={e => setNewProduct({ ...newProduct, img: e.target.value })}
              style={{ width: 180, marginRight: 6 }}
            />
            <select
              value={newProduct.categoryId}
              onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              style={{ marginRight: 6 }}
            >
              <option value="">Категория</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <button type="submit">Добавить</button>
          </form>
          <table border={1} cellPadding={4}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Бренд</th>
                <th>Цена</th>
                <th>Картинка</th>
                <th>Категория</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod =>
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.brand}</td>
                  <td>{prod.price}</td>
                  <td>
                    {prod.img && <img src={prod.img} alt="" style={{ width: 42, height: 32, objectFit: "contain" }} />}
                  </td>
                  <td>{categories.find(c => c.id === prod.categoryId)?.name || "-"}</td>
                  <td><button onClick={() => deleteProduct(prod.id)} style={{ color: "red" }}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
