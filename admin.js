import { useState } from 'react';

const mockOrders = [
  {
    name: "Иван Петров",
    address: "ул. България 12",
    phone: "0888123456",
    items: [
      { name: "Хляб", price: 1.2 },
      { name: "Сирене", price: 6.3 }
    ],
    total: 7.5,
    status: "ново"
  }
];

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState(mockOrders);

  const login = () => {
    if (password === "admin123") setAuthenticated(true);
    else alert("Грешна парола");
  };

  const updateStatus = (index, status) => {
    const updated = [...orders];
    updated[index].status = status;
    setOrders(updated);
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Админ панел</h1>
        <input
          type="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Вход</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Поръчки</h1>
      {orders.map((order, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <p><strong>Име:</strong> {order.name}</p>
          <p><strong>Адрес:</strong> {order.address}</p>
          <p><strong>Тел.:</strong> {order.phone}</p>
          <p><strong>Продукти:</strong></p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} - {item.price.toFixed(2)} лв.</li>
            ))}
          </ul>
          <p><strong>Общо:</strong> {order.total.toFixed(2)} лв.</p>
          <p><strong>Статус:</strong> {order.status}</p>
          <button onClick={() => updateStatus(index, "обработва се")}>Обработва се</button>
          <button onClick={() => updateStatus(index, "доставена")}>Доставена</button>
        </div>
      ))}
    </div>
  );
}