import AppButton from "./AppButton";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log("Button clicked");
    console.log(product);

    addToCart(product);
  };

  return (
    <div style={style.card}>
      <img
        src={product.image}
        alt={product.title}
        style={style.img}
      />

      <div style={style.textContent}>
        <h4 style={style.title}>
          {product.title.length > 20
            ? `${product.title.slice(0, 21)}...`
            : product.title}
        </h4>

        <p style={{ color: "black", fontSize: "0.8em" }}>
          {product.description.length > 30
            ? `${product.description.slice(0, 30)}...`
            : product.description}
        </p>

        <p style={style.price}>${product.price}</p>
      </div>

      <div style={style.btn}>
        <AppButton
          text="Add to cart"
          bgColor="blue"
          textColor="white"
          handleClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

const style = {
  card: {
    width: "300px",
    height: "400px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "1px 2px 4px 2px #646464",
    borderRadius: "4px",
    paddingBottom: "40px",
    border: "2px solid red",
  },

  img: {
    width: "80%",
    height: "70%",
    objectFit: "contain",
  },

  textContent: {
    padding: "10px",
  },

  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "blue",
  },

  price: {
    fontSize: "16px",
    fontStyle: "italic",
  },

  btn: {
    width: "90%",
    margin: "0 auto",
  },
};

export default ProductCard;