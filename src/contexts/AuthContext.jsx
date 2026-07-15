import { createContext, useState, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
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
  }, []);

  console.log("Token in auth", token);

  const signup = async (data) => {
    setLoading(true);

    axios
      .post(`${apiUrl}/auth/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        console.log(res.data);

        setToken(res.data.data.token);
        setUser(res.data.data.user);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("signup successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        err?.response
          ? toast.error(err?.response.data.message)
          : toast.error("An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = async (data) => {
    setLoading(true);

    axios
      .post(`${apiUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        console.log(res.data);

        setToken(res.data.data.token);
        setUser(res.data.data.user);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        err?.response
          ? toast.error(err?.response.data.message)
          : toast.error("An eeror occured");
      });
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setToken(null);
  setUser(null);

  navigate("/login");
};


const updateUserProfile = async (profileData) => {
  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("firstname", profileData.firstname);
    formData.append("lastname", profileData.lastname);

    if (profileData.profileImage) {
      formData.append("image", profileData.profile_image);
    }

    const res = await axios.patch(
      `${apiUrl}/users/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Updated user returned from the backend
    const updatedUser = res.data.data.user;

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully!");

    return updatedUser;
  } catch (err) {
    console.error(err);

    err?.response
      ? toast.error(err.response.data.message)
      : toast.error("Failed to update profile.");
  } finally {
    setLoading(false);
  }
};
  const values = {
    loading,
    token,
    user,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
