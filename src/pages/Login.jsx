import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import {FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react";

const Login = () => {
  
  const { login } = useAuth();

  const [showPassword, setShowPassword]   = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema : Yup.object({
      email: Yup.string().email("email required").required("email is required"),
      password: Yup.string().required("Password is required").min(8, "minimum of 8 characters").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
  )
    }),

    onSubmit: async (values) => {
      console.log(values);
      await login(values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}  style={style.form}>
       <div className="px-5 text-center">
        <h2 className="text-black text-xl font-bold">Welcome to Sqicommerce</h2>
        <p className="text-neutral-700 text-sm font-medium ">
        Enter login details
        </p>
      </div>
      <label htmlFor="email" className="block text-xl text-black font-semibold">Email:</label>
      <input
       className="border-2 border-blue-500 rounded focus:outline-none w-[100%] p-2 mb-2"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Email"
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500">{formik.errors.email}</p>
      )}
      
       <div style={{position: "relative"}}>
        <label
          htmlFor="password"
          className="block text-xl text-black font-semibold"
        >
          Password
        </label>
        <input
          className="border-2 border-blue-500 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type={`${showPassword ? "text" : "password"}`}
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {/* Password toggle temporarily removed */}
        <span className="absolute top-[32px] right-[60px] cursor-pointer"
        onClick={()=> setShowPassword(!showPassword)}
        >
            {showPassword ? (
            <FaEyeSlash color="grey" size={20} />
          ) : (
            <FaEye color="grey" size={20}/>
          )}
        </span>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
      </div>
      <div className="p-5 flex justify-center">
        <div className="w-[200px]">
          <AppButton
            text={"Login"}
            bgColor={"blue"}
            textColor={"#FFF"}
            type={"submit"}
          />
        </div>
      </div>
    </form>
  );
};

export default Login;

const style = {
  form: {
    border: "2px solid black",
    width: "50%",
    margin: '200px auto',
    padding: "2rem"
  }
}