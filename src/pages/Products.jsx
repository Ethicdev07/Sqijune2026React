import ProductCard from "../components/ProductCard";
import { useProductContext } from "../contexts/ProductContext";

const Products = () => {
  const { loading, products } = useProductContext();

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;