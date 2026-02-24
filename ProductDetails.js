import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products`)
      .then(res => {
        const found = res.data.find(p => p.id == id);
        setProduct(found);
      });
  }, [id]);

  const addToCart = () => {
    const user_id = localStorage.getItem("userId");
    axios.post("http://localhost:5000/api/cart", {
      user_id,
      product_id: id,
      quantity: 1
    });
    alert("Added to cart");
  };

  return (
    <div style={{padding: "20px"}}>
      <h2>{product?.name}</h2>
      <img src={product?.image} width="300" alt="" />
      <p>{product?.description}</p>
      <h3>₹{product?.price}</h3>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
}

export default ProductDetails;