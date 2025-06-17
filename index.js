import { useState } from 'react';

const sampleItems = [
  { id: 1, name: "Хляб", price: 1.2 },
  { id: 2, name: "Сирене", price: 6.3 },
  { id: 3, name: "Мляко", price: 2.0 },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({ name: "", address: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Поръчка:", { ...order, items: cart });
    setSubmitted(true);
    setCart([]);
    setOrder({ name: "", address: "", phone: "" });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Продукти</h1>
      <ul>
        {sampleItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price.toFixed(2)} лв.
            <button onClick={() => addToCart(item)} style={{ marginLeft: 10 }}>Добави</button>
          </li>
        ))}
      </ul>

      <h2>Количка</h2>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.name} - {item.price.toFixed(2)} лв.</li>
        ))}
      </ul>
      <p><strong>Общо:</strong> {total.toFixed(2)} лв.</p>

      <h2>Данни за поръчка</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Име" value={order.name} onChange={(e) => setOrder({...order, name: e.target.value})} required />
        <br />
        <input placeholder="Адрес" value={order.address} onChange={(e) => setOrder({...order, address: e.target.value})} required />
        <br />
        <input placeholder="Телефон" value={order.phone} onChange={(e) => setOrder({...order, phone: e.target.value})} required />
        <br />
        <button type="submit">Поръчай</button>
      </form>

      {submitted && <p>✅ Поръчката е приета!</p>}
    </div>
  );
}