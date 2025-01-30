import { useContext, useState, useEffect } from 'react';
import { FaRegUser, FaEnvelope, FaPhoneAlt, FaRegListAlt, FaHeart, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function Profile() {
  const { user } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    image: null
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Update userForm with fetched user data when user context changes
  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.mobile || "",
        image: user.avatar.url || "https://via.placeholder.com/150",

      });
    }
  }, [user]);

  const handleSave = () => {
    setIsEditModalOpen(false);
    console.log('Saved:', userForm);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserForm({
        ...userForm,
        image: URL.createObjectURL(file)
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  return (
    <div className="flex flex-row bg-gray-100">
      {/* Sidebar */}

      <div className="flex-1 bg-gray-100">

        <div className="max-w-screen-xl mx-auto py-4 lg:py-12 px-2 md:px-6 h-screen overflow-y-scroll relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Profile Info */}
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-28 h-28 rounded-full border-4 border-[#4222C4] overflow-hidden">

                  <img
                    src={user?.avatar?.url ? `${import.meta.env.VITE_APP}${user.avatar.url}` : "https://react-icons.github.io/react-icons/icons?name=fa-solid/fa-user-circle"}
                    alt="Profile"
                    className="w-full h-full object-cover m-0"
                  />




                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-[#4222C4]">{userForm.name}</h2>
                <p className="text-lg text-[#4F4F4F]">{userForm.email}</p>
              </div>

              {/* Profile Info */}
              <div className="mt-8 space-y-6 text-lg text-[#4F4F4F]">
                <div className="flex items-center space-x-3">
                  <FaRegUser className="text-[#4222C4]" />
                  <p>{userForm.name}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-[#4222C4]" />
                  <p>{userForm.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-[#4222C4]" />
                  <p>{userForm.phone}</p>
                </div>
              </div>

              {/* Toggle Edit Button */}
              <div className="mt-6">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full py-3 px-4 bg-[#4222C4] text-white text-lg rounded-lg hover:bg-[#3C8D5A]"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Right Column: Actions */}
            <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-[#4222C4] mb-6">Account Settings</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-[#4F4F4F] mb-4">Order History</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/userorders" className="text-[#4222C4] hover:text-[#3C8D5A] flex items-center space-x-2">
                        <FaRegListAlt className="text-[#4222C4]" />
                        <span>View Orders</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-[#4F4F4F] mb-4">Wishlist</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/wishlist" className="text-[#4222C4] hover:text-[#3C8D5A] flex items-center space-x-2">
                        <FaHeart className="text-[#4222C4]" />
                        <span>View Wishlist</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-[#4F4F4F] mb-4">Settings</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/settings" className="text-[#4222C4] hover:text-[#3C8D5A] flex items-center space-x-2">
                        <FaCog className="text-[#4222C4]" />
                        <span>Update Info</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/change-password" className="text-[#4222C4] hover:text-[#3C8D5A] flex items-center space-x-2">
                        <FaCog className="text-[#4222C4]" />
                        <span>Change Password</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <button className="w-full mt-6 py-3 px-4 bg-[#F25D5D] text-white text-lg rounded-lg hover:bg-[#D94B4B] flex items-center justify-center">
                    <FaSignOutAlt className="inline mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Update Profile</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-gray-700">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={userForm.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-700">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={userForm.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="text-gray-700">Profile Picture</label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
