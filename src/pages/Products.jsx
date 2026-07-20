/* eslint-disable react/prop-types */
import ProductCard from "../components/ProductCard";
// import phoneOneImage from "./../assets/images/phone1.jpg";
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
  console.log(products);
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
        //   justifyContent: "space",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description.slice(0,30)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;