import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import AppButton from "./AppButton";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Nav = () => {
  const { token, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  // Total quantity of items in the cart
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="flex justify-around items-center">
      <div className="basis-1/6 p-2 cursor-pointer">
        <Link to="/">
          <h2 className="text-blue-600 font-bold text-2xl">
            SqiCommerce
          </h2>
        </Link>
      </div>

      <div className="flex justify-evenly items-center basis-3/6">
        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          <Link to="/create-product">Create</Link>
        </p>

        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          <Link to="/product">Products</Link>
        </p>

        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          About
        </p>

        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          Services
        </p>
      </div>

      {token ? (
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            gap: "2em",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div>
            <Link
              to="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1em",
                textDecoration: "none",
              }}
            >
              <img
                src={user?.profile_image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />

              <p className="text-md mr-12.5 text-color-neutral-500 font-semibold">
                {user?.firstname}
              </p>
            </Link>
          </div>

          {/* Cart Icon */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                color="black"
              />
            </Link>

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-12px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>

          <AppButton
            text="Logout"
            textColor="blue"
            bgColor="white"
            useBorder={true}
            handleClick={logout}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center basis-1/6 gap-2">
          <AppButton
            text="Login"
            textColor="white"
            bgColor="blue"
            handleClick={handleLogin}
          />

          <AppButton
            text="Signup"
            textColor="blue"
            bgColor="white"
            useBorder={true}
            handleClick={handleSignup}
          />
        </div>
      )}
    </nav>
  );
};

export default Nav;