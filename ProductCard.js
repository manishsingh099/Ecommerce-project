import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div style={{border: "1px solid #ddd", padding: "10px", width: "200px"}}>
      <img src={product.image} alt="" width="100%" />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <Link to={`/product/${product.id}`}>View</Link>
    </div>
  );
}

export default ProductCard;