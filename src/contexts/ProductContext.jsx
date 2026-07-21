import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

const productProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      getAllProducts();
    }
  }, [token]);

  const getAllProducts = async () => {
    setLoading(true);

    axios
      .get(`${apiUrl}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);

        setProducts(res.data.data.products);
        toast.success("product fetched successfully");
      })
      .catch((err) => {
        console.log("an error occured", err.message);
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createNewProduct = async (product) => {
    console.log("Product in context", product);
    const requestData = new FormData();
    requestData.append("title", product.title);
    requestData.append("price", product.price);
    requestData.append("description", product.description);
    requestData.append("stock", product.stock || 10);
    requestData.append("image", product.image);
    console.log(requestData);
    setLoading(true);
    axios
      .post(`${apiUrl}/product`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        console.log(res.data);
        toast.success("Product created successfully");
        await getAllProducts();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("An error occured", err.message);
        err.response.data.message
          ? toast.error(err.response.data.message)
          : toast.error("An error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    loading,
    products,
    setProducts,
    setLoading,
    createNewProduct
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default productProvider;
