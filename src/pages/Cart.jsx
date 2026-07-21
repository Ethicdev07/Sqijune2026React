import React from "react";
import { useCart } from "../contexts/CartContext";



const Cart = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <div style={styles.emptyCart}>Your cart is empty.</div>;
  }

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item._id || item.id} style={styles.cartItem}>
          <img
            src={item.image}
            alt={item.title}
            style={styles.image}
          />

          <div style={styles.details}>
            <h2 style={styles.heading}>{item.title}</h2>

            <p style={styles.text}>
              Price: ₦{Number(item.price).toLocaleString()}
            </p>

            <p style={styles.text}>
              Quantity: <strong>{item.quantity}</strong>
            </p>

            <p style={styles.subtotal}>
              Subtotal: ₦
              {(Number(item.price) * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      <div style={styles.summary}>
        <h2>Order Summary</h2>

        <div style={styles.summaryRow}>
          <span>Total Items:</span>
          <span>{cart.length}</span>
        </div>

        <div style={styles.summaryRow}>
          <strong>Total:</strong>
          <strong>₦{totalPrice.toLocaleString()}</strong>
        </div>

        <button style={styles.button}>Checkout</button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "40px auto",
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
  },

  emptyCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    fontSize: "32px",
    color: "#777",
  },

  cartItem: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  details: {
    flex: 1,
  },

  heading: {
    margin: "0 0 10px",
  },

  text: {
    margin: "8px 0",
  },

  subtotal: {
    fontWeight: "bold",
    color: "#0d6efd",
  },

  summary: {
    width: "300px",
    marginLeft: "auto",
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Cart;