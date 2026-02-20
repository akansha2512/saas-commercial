import { useParams, useNavigate } from "react-router-dom";
import { Button, Tag } from "antd";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data
  const product = {
    name: "Blue T-Shirt",
    description: "Premium cotton fabric",
    price: 799,
    category: "Fashion",
    stock: 50,
    image: "https://via.placeholder.com/300",
    status: "Active",
  };

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold">
        Product Details
      </h2>

      <img
        src={product.image}
        alt="product"
        className="w-64 rounded-md"
      />

      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>
        <strong>Status:</strong>{" "}
        <Tag color="green">{product.status}</Tag>
      </p>

      <Button onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}
