import { useEffect, useState } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStore } from "../../../store/actions/storeActions";
import ConfirmLogoutModal from '../../presentation/modals/ConfirmLogoutModal'; 

export default function Topbar() {
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();
    const { store, loading } = useSelector((state) => state.store);
    useEffect(() => {
        const storeToken = localStorage.getItem("storeToken");
        if (storeToken) {
            dispatch(fetchStore());
        }
    }, [dispatch]);

    const handleLogoutClick = () => {
        setModalVisible(true);
    };

    const handleConfirmLogout = () => {
        localStorage.removeItem("storeToken");
        setModalVisible(false);
        window.location.href = "/";
    };

    const handleCancelLogout = () => {
        setModalVisible(false);
    };

    return (
        <div className="w-full bg-white shadow h-[80px] flex justify-between items-center px-2 sm:px-6 text-gray-800">
            <Link to={'/'} className="text-2xl font-bold text-[#4222C4]">Platform</Link>

            <div className="hidden md:flex items-center bg-gray-100 text-gray-600 rounded-lg overflow-hidden">
                <input type="text" placeholder="Search..." className="px-4 py-2 w-64 focus:outline-none bg-gray-100" />
                <button className="bg-[#4222C4] hover:bg-[#4222C4] px-4 py-2 text-white">Search</button>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
                <div className="relative">
                    <button
                        className="relative"
                        onClick={() => setNotificationOpen(!isNotificationOpen)}
                    >
                        <FaBell className="text-2xl text-[#4222C4]" />
                        <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                            3
                        </span>
                    </button>
                </div>

                <div className="relative">
                    <button
                        className="flex items-center space-x-3"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : store ? (
                            <>
                                <img
                                    src={`${import.meta.env.VITE_APP}${store?.photo?.url.replace(/\\/g, '/')}`} 
                                  alt={store.name} className="w-10 h-10 rounded-full" />
                                <span className="hidden sm:block text-[#4222C4] font-bold">
                                    {store.name}
                                </span>
                            </>
                        ) : (
                            <span className="hidden sm:block text-[#4222C4] font-bold">User</span>
                        )}
                        <FaChevronDown className="text-lg font-bold text-[#4222C4]" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg">
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-800">
                                Profile
                            </Link>
                            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-50 text-gray-800">
                                Settings
                            </Link>
                            <button
                                onClick={handleLogoutClick}
                                className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmLogoutModal
                isVisible={isModalVisible}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        </div>
    );
}
