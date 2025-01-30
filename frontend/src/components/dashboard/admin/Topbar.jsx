import { useContext, useState } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Topbar() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const { user } = useContext(UserContext);

  const notifications = [
    {
      id: 1,
      userImage: "https://via.placeholder.com/40",
      userName: "John Doe",
      message: "You have a new order update.",
    },
    {
      id: 2,
      userImage: "https://via.placeholder.com/40",
      userName: "Jane Smith",
      message: "Your profile was viewed 3 times today.",
    },
    {
      id: 3,
      userImage: "https://via.placeholder.com/40",
      userName: "Mike Johnson",
      message: "A new comment on your post.",
    },
  ];

  return (
    <div className="w-full bg-white shadow h-[80px] flex justify-between items-center px-2 sm:px-6 text-gray-800">
      {/* Dashboard Title */}
      <Link to={'/'} className="text-2xl font-bold text-[#4222C4]">Platform</Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 text-gray-600 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-64 focus:outline-none bg-gray-100"
        />
        <button className="bg-[#4222C4] hover:bg-[#4222C4] px-4 py-2 text-white">
          Search
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          >
            <FaBell className="text-2xl text-[#4222C4]" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
              {notifications.length}
            </span>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-700 rounded-lg shadow-lg">
              <div className="p-4 border-b font-bold text-gray-800">
                Notifications
              </div>
              <ul>
                {notifications.map(({ id, userImage, userName, message }) => (
                  <li
                    key={id}
                    className="flex items-start px-4 py-2 hover:bg-gray-50"
                  >
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-10 h-10 rounded-full mr-3 mt-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500">{message}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 text-center">
                <Link
                  to="/notifications"
                  className="text-[#4222C4] hover:text-[#4222C4] text-sm"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-3"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {user ?
            <img
            src={`${import.meta.env.VITE_APP}${user?.avatar?.url}`}
            alt="User"
            className="w-10 h-10 rounded-full m-0"
          />
             : null}
                        {user ? 
             <span className="hidden sm:block text-[#4222C4] font-bold">
             {user.name.split(' ')[0]}
           </span>
           :   
           <span className="hidden sm:block text-[#4222C4] font-bold">User</span>
            }
            <FaChevronDown className="text-lg font-bold text-[#4222C4]" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
