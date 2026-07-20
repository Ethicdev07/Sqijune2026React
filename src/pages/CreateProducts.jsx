import { useFormik } from "formik";
import * as Yup from "yup";
import { useProductContext } from "../contexts/ProductContext";
import AppButton from "../components/AppButton";
const CreateProduct = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().required("Price is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);

    

      await createNewProduct(values);
    },
  });

  const { loading, createNewProduct } = useProductContext();

  return (
    <div className="w-[80%] max-w-125 mx-auto mt-[5%] shadow-2xl p-3 bg-blue-200">
      <form className="p-2" onSubmit={formik.handleSubmit}>
        <div className="p-5">
          <label className="block text-xl text-black font-semibold">
            Title:
            <input
              className="border-2 border-blue-500 rounded-lg focus:outline-none w-full p-2 mt-2"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500">{formik.errors.title}</p>
          )}
        </div>
        <div className="p-5">
          <label className="block text-xl text-black font-semibold">
            Price:
            <input
              className="border-2 border-blue-500 rounded-lg focus:outline-none w-full p-2 mt-2"
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500">{formik.errors.price}</p>
          )}
        </div>
        <div className="p-5">
          <label className="block text-xl text-black font-semibold">
            Description:
            <textarea
              className="border-2 border-blue-500 rounded-lg focus:outline-none w-full p-2 mt-2"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
        </div>
        <div className="p-5">
          <label className="block text-xl text-black font-semibold">
            Image:
            <input
              className="border-2 border-blue-500 rounded-lg focus:outline-none w-full p-2 mt-2"
              type="file"
              name="image"
              // value={formik.values.image}
              onChange={(e) => {
                console.log(e.target.files);
                formik.setFieldValue("image", e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500">{formik.errors.image}</p>
          )}

          {formik.values.image && (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="God abeg"
              className="mt-2 w-37.5 h-37.5"
            />
          )}
        </div>
        <div className="p-5 flex justify-end ">
          <div className="w-50">
            <AppButton
              text={"Create product"}
              bgColor={"blue"}
              textColor={"#FFF"}
              type={"submit"}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;