import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/userActions";
import { toast, ToastContainer } from "react-toastify";
import { FooterPrime } from "../components/presentation/FooterPrime";
import { AllAbouJumiaFooter } from "../components/presentation/AllAbouJumiaFooter";
import { HeroBanner } from "../components/homepage/HeroBanner";
import Navbar from "../components/homepage/Navbar";

const UserRegister = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.mobile || !formData.password || !image) {
      toast.error("Please fill all the fields and upload an image");
      return;
    }
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("mobile", formData.mobile);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("photo", image);
  
    dispatch(registerUser(formDataToSubmit));
  };
  

  return (
    <div>
      <HeroBanner />
      <Navbar />
      <div className=" flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-[70%]  space-y-8">
          <h2 className="text-center text-4xl font-extrabold text-[#4222C4]">Welcome to Our E-commerce Platform</h2>
          <p className="text-center text-lg text-[#5E3BE1]">Buy your favorite products, enjoy exclusive discounts, and get free home delivery. Register now and start shopping with ease!</p>
          {error && <div className="mt-4 text-center text-red-500">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 space-x-1 rounded-lg shadow-md p-6 bg-white"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full md:w-[49.4%] px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1] focus:border-transparent"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full md:w-[49.5%] px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1] focus:border-transparent"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full md:w-[49.4%] px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1] focus:border-transparent"
              required
              pattern="\d{10}"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full md:w-[49.4%] px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1] focus:border-transparent"
              required
              minLength="6"
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full md:w-[49.4%] px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1] focus:border-transparent"
            />

            <button
              type="submit"
              className="w-full bg-[#4222C4] hover:bg-[#5E3BE1] text-white py-2 rounded-md focus:outline-none focus:ring focus:ring-[#5E3BE1]"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

      <FooterPrime />
      <AllAbouJumiaFooter />
    </div>

  );
};

export default UserRegister;
