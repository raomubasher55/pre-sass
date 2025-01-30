import { useState } from "react";
import Sidebar from "./shop/Sidebar";
import Topbar from "./shop/Topbar";
import Overview from "./shop/Overview";
import ProductCard from "./shop/ProductCard";
import { CostumerOrders } from "./shop/CostumerOrders";
import { Customers } from "./shop/Customers";
import { Analytics } from "./shop/Analytics";
import DiscountsAndPromotions from "./shop/DiscountsAndPromotions";
import Messages from "./shop/Messages";
import Settings from "./shop/Settings";
import Categories from "./shop/Categories";

const ShopDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Overview />;
      case "Products":
        return <ProductCard /> ;
        case "Categories":
          return <Categories /> ;
      case "Orders":
        return <CostumerOrders />;
      case "Customers":
        return <Customers /> ;
      case "Analytics":
        return  <Analytics /> ;
      case "Discounts":
        return <DiscountsAndPromotions />;
      case "Messages":
        return <Messages /> ;
      case "Settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  }


    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    return (
      <div className="flex h-screen">
        {/* Sidebar */}

        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <Topbar />

          {/* Dynamic Content Area */}
          <main className="flex-1 bg-gray-100 overflow-auto">{renderContent()}</main>
        </div>
      </div>
    );
  };

  export default ShopDashboard;
