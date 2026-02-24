import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    axios.get(`http://localhost:5000/api/cart/${user_id}`)
      .then(res => setCart(res.data));
  }, []);

  return (
    <div style={{padding: "20px"}}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Qty: {item.quantity}</p>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;