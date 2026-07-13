import { createContext, useState, useEffect, useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  //states

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  });



  const signUp = async () => {
  setLoading(true);

  axios
    .post(`${apiUrl}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then((res) => {
      console.log(res.userData);

      setToken(res.userData.data.token);
      setUser(res.userData.data.user);

      localStorage.setItem("token", res.userData.data.token);
      localStorage.setItem("user", res.userData.data.user);
    })
    .catch((error) => {
      console.log(error);
      error?.response ? toast.error(error?.response.data.message) : toast.error("An error occurred")
    }).finally(()=>{
        setLoading(false)
    })
};
};

export default authContext;
