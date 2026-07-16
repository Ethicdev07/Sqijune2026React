import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import AppButton from "../components/AppButton";

const Profile = () => {
  const { user, loading, updateUserProfile, updateProfileDetails } = useAuth();

  const fileInputRef = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstname: user?.firstName || "",
      lastname: user?.lastName || "",
      profileImage: null, // FIX: Changed from profile_image to profileImage
    },

    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
    }),

    onSubmit: async (values) => {
      await updateProfileDetails(user._id, {
        firstname: values.firstname,
        lastname: values.lastname
      });
      
      // FIX: Checked against profileImage instead of profile_image
      if (values.profileImage){
        await updateUserProfile(values);
        formik.setFieldValue("profileImage", null); // FIX: Cleared profileImage inside state
      }
    },
  });

  return (
    <div style={style.wrapper}>

      <div style={{width:"60%", margin: "200px auto", padding:"20px"}}>

        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Update your personal information.
          </p>
        </div>

        {/* Profile Image */}

        <div className="flex justify-center mb-10">

          <div className="relative">

            <img
              src={
                formik.values.profileImage
                  ? URL.createObjectURL(formik.values.profileImage)
                  : user?.profilePic ||
                    "https://ui-avatars.com/api/?name=User"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all duration-300"
            >
              <FaCamera size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue(
                  "profileImage", // Keeps everything cleanly synchronized with camelCase
                  e.currentTarget.files[0]
                )
              }
            />

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={formik.handleSubmit}
          style={{padding:"20px", border:"2px solid red"}}
        >

          {/* Email */}

          <div style={{marginBottom: '10px'}}>

            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            />

          </div>

          {/* Firstname */}

          <div style={{marginBottom: '10px'}}>

            <label
              htmlFor="firstname"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              First Name
            </label>

            <input
              id="firstname"
              type="text"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            />

            {formik.touched.firstname &&
              formik.errors.firstname && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.firstname}
                </p>
              )}

          </div>

          {/* Lastname */}

          <div style={{marginBottom: '10px'}}>

            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Last Name
            </label>

            <input
              id="lastname"
              type="text"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            />

            {formik.touched.lastname &&
              formik.errors.lastname && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.lastname}
                </p>
              )}

          </div>

          {/* Save Button */}

          <div className="pt-4">

            <AppButton
              text={loading ? "Saving..." : "Save Changes"}
              bgColor="blue"
              textColor="#FFF"
              type="submit"
              disabled={loading}
            />

          </div>

        </form>

      </div>

    </div>
  );
};

export default Profile;

const style = {
    wrapper: {
        width: "60%",
        margin: "200px auto",
        border: "1px solid black"
        
    }
}