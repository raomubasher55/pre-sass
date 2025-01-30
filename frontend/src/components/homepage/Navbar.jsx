import { IoIosSearch } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {

  const { user } = useContext(UserContext);


  const navigate = useNavigate();
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [storeToken, setStoreToken] = useState(null)
  const [token, setToken] = useState(null)

  // Toggle Category Dropdown
  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
    setSidebarOpen(false);
    setSearchOpen(false);
    setUserDropdownOpen(false)
  }

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSearchOpen(false);
    setUserDropdownOpen(false)
  }

  // Toggle Search Input
  const toggleSearchInput = () => {
    setSearchOpen(!isSearchOpen);
    setSidebarOpen(false);
    setCategoryDropdownOpen(false)
    setUserDropdownOpen(false)
  }

  // Toggle User Dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    setSidebarOpen(false);
    setSearchOpen(false);
    setCategoryDropdownOpen(false)
  }

  useEffect(() => {
    const storeToken = localStorage.getItem('storeToken')
    if (storeToken) {
      setStoreToken(storeToken)
    }
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  const Logout = () => {
    localStorage.removeItem('storeToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  };


  return (
    <div className="w-full">
      {/* Sidebar */}
      <div className={`fixed top-[50px] right-0 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out z-50 md:hidden`}>
        <div className="flex justify-end items-center p-2 border-b">
          <button onClick={toggleSidebar} className="text-xl text-gray-600">&times;</button>
        </div>

        <div className="p-4">
          <ul className="space-y-4 text-gray-700">
            <li><Link to="/deals" className="hover:text-yellow-500">Deals & Offers</Link></li>
            <li><Link to="/track-order" className="hover:text-yellow-500">Track Order</Link></li>
            <li><Link to="/login" className="hover:text-yellow-500">Login / Register</Link></li>
            <li><Link to="/shortlist" className="hover:text-yellow-500">Shortlist</Link></li>
            <li><Link to="/userdashboard" className="hover:text-yellow-500">Cart</Link></li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-white shadow-md transition-all duration-300 px-5 m-auto lg:w-full">
        <div className="max-w-screen-xl mx-auto py-4 flex justify-between items-center flex-wrap">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-[#4222C4] mr-4">Platform</span>
          </div>

          {/* Search Input (Mobile) */}
          {isSearchOpen && (
            <div className={`md:hidden absolute left-0 w-full bg-white shadow-md px-2 transition-all duration-300 ${isSearchOpen ? 'top-28' : 'top-0'}`}>
              <input
                type="text"
                placeholder="Search for products, categories, brands..."
                className="px-4 py-2 rounded-full w-full text-gray-700 placeholder-gray-500 border border-[#4222C4] focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              />
            </div>
          )}

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center w-full max-w-md space-x-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products, categories, brands..."
                className="px-8 py-2 rounded-full w-full text-gray-700 placeholder-gray-500 border border-[#4222C4] focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              />
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Navbar Right Section */}
          <div className="flex justify-between items-center ml-2 mt-1 md:mt-5 m-auto xl:mt-3 w-auto">
            <div className="flex items-center space-x-4 text-gray-800 text-sm">
              {/* Categories Dropdown */}
              {/* <div className="relative cursor-pointer" onClick={toggleCategoryDropdown}>
                <span className="font-semibold text-gray-500">Categories</span>
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 bg-white border shadow-lg w-48 mt-2 rounded-md z-10">
                    <ul className="text-gray-700 p-2">
                      <li className="p-2 hover:bg-blue-100 cursor-pointer">Electronics</li>
                      <li className="p-2 hover:bg-blue-100 cursor-pointer">Fashion</li>
                      <li className="p-2 hover:bg-blue-100 cursor-pointer">Home & Kitchen</li>
                      <li className="p-2 hover:bg-blue-100 cursor-pointer">Beauty</li>
                      <li className="p-2 hover:bg-blue-100 cursor-pointer">Sports</li>
                    </ul>
                  </div>
                )}
              </div> */}

              <span className="hidden md:flex text-gray-400">|</span>

              {/* Deals & Offers */}
              <Link to={'/dealoffer'} className="hidden md:flex">Deals & Offers</Link>
              <span className="hidden md:flex text-gray-400">|</span>

              {/* Track Order */}
              <Link to={'/trackorder'} className="hidden md:flex">Track Order</Link>
              <span className="hidden md:flex text-gray-400">|</span>

              {/* User Icon (Dropdown) */}
              <div className="relative cursor-pointer" onClick={toggleUserDropdown}>
                <FaUserCircle className="text-xl text-[#4222C4]" />
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 bg-white border shadow-lg w-48 mt-2 rounded-md z-10">
                    <ul className="text-gray-700 p-2">

                      {!user && (
                        <>
                          <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/login">Login</Link></li>
                          <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/register">Register</Link></li>
                        </>
                      )}

                      {!storeToken && !user && (
                        <>
                          <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/register-store">Register Store</Link></li>
                          <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/login-store">Login Store</Link></li>
                        </>

                      )
                      }
                      {storeToken &&
                        <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/shopdashboard">Shop Dashboard</Link></li>
                      }
                      {user && user.role === 'user' &&
                        <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/userdashboard">User Dashboard</Link></li>
                      }
                      {user && user.role === 'admin' &&
                        <li className="p-2 hover:bg-blue-100 cursor-pointer"><Link to="/admindashboard">Admin Dashboard</Link></li>
                      }
                      {(storeToken || user || token) && (
                        <li onClick={Logout} className="p-2 hover:bg-blue-100 cursor-pointer">Logout</li>
                      )}


                    </ul>
                  </div>
                )}
              </div>
            </div>

            <span className="hidden md:flex text-gray-400 ml-1">|</span>

            {/* Shortlist Icon */}
            <Link to={'/shortlist'} className="hidden md:flex items-center space-x-1 cursor-pointer ml-3 mr-2">
              <AiOutlineHeart className="text-[#4222C4]" />
              <span>Shortlist</span>
            </Link>

            <span className="hidden md:flex text-gray-400">|</span>

            {/* Cart Icon */}
            <div className="hidden md:flex items-center space-x-1 cursor-pointer ml-3" onClick={() => navigate("/userdashboard")}>
              <CgShoppingCart className="text-[#4222C4]" />
              <span>Cart</span>
            </div>

          </div>

          {/* Hamburger Icon for Mobile */}
          <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
            &#9776;
          </button>

          {/* Search Bar (Mobile) */}
          <div className="md:hidden flex items-center mt-3 ml-2 sm:ml-10">
            <IoIosSearch className="text-gray-500 cursor-pointer" onClick={toggleSearchInput} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
