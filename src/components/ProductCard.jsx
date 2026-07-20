import AppButton from "./AppButton";
const Card = ({ image, title, price, description }) => {
  return (
    <div style={style.card}>
      <img src={image} alt="" style={style.img} />
      <div style={style.textContent}>
        <h4 style={style.title}>
          {title.length > 20 ? `${title.slice(0, 21)}...` : title}
        </h4>
        <p style={{color:'black', fontSize: '0.8em'}}>{description}</p>
        <p style={{ ...style.price }}>${price}</p>
      </div>
      <div style={style.btn}>
        <AppButton text={"Add to cart"} bgColor={"blue"} textColor={"white"} />
      </div>
    </div>
  );
};

const style = {
  card: {
    width: "300px",
    height: "400px",
    overflowY: "hidden",
    overflowX: "hidden",
    backgroundColor: "# fff",
    boxShadow: "1px 2px 4px 2px #646464",
    borderRadius: "4px",
    paddingBottom: "40px",
    border: "2px solid red"

  },

  img: {
    width: "80%",
    height: "70%",
    objectFit: "contain",
  },

  textContent: {
    padding: "10px",
  },

  discount: {
    textDecoration: "line-through",
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

export default Card;