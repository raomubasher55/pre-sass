import { useState } from "react";
import Sidebar from "./user/Sidebar";
import Topbar from "./user/Topbar";
import Profile from "./user/Profile";
import UserOrders from "./user/UserOrders";
import Wishlist from "./user/Wishlist";
import UserCart from "./user/UserCart";
import UserSettings from "./user/UserSettings";

export default function Dashboard() {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [activeComponent, setActiveComponent] = useState("orders");

  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "orders":
        return <UserOrders />;
      case "wishlist":
        return <Wishlist />;
      case "cart":
        return <UserCart />;
      case "setting":
        return <UserSettings />;
      // case "Analytics":
      //   return  <Analytics /> ;
      // case "Discounts":
      //   return <DiscountsAndPromotions />;
      // case "Messages":
      //   return <Messages /> ;
      // case "Settings":
      //   return <Settings />;
      default:
        return <UserOrders />;
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Topbar />

        {/* Main Content */}
        {/* <div
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 overflow-y-scroll ${
            isSidebarOpen ? "ml-0 sm:ml-4" : "ml:0 sm:ml-20"
          }`}
        >
          <h2 className="text-lg sm:text-3xl font-semibold text-gray-700 mb-6 text-center">
            Welcome to your dashboard!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Orders",
                value: 5,
                link: "/userorders",
                color: "blue",
              },
              {
                title: "Wishlist",
                value: 3,
                link: "/wishlist",
                color: "green",
              },
              {
                title: "Account Settings",
                value: "Update",
                link: "/settings",
                color: "yellow",
              },
              {
                title: "Cart",
                value: 2,
                link: "/cart",
                color: "purple",
              },
              {
                title: "Shipping & Billing",
                value: "Update",
                link: "/shipping",
                color: "orange",
              },
              {
                title: "Notifications",
                value: 5,
                link: "/notifications",
                color: "gray",
              },
            ].map(({ title, value, link, color }) => (
              <div
                key={title}
                className={`bg-${color}-100 p-6 rounded-lg shadow-md text-center border border-${color}-200`}
              >
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  {title}
                </h3>
                <p className={`text-3xl font-bold text-${color}-600`}>
                  {value}
                </p>
                <a
                  href={link}
                  className={`mt-4 inline-block text-${color}-700 hover:text-${color}-900 text-sm`}
                >
                  View {title}
                </a>
              </div>
            ))}
          </div>
        </div> */}

        <main className="flex-1 bg-gray-100 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
