import { useState } from "react";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";
import DashboardOverview from './admin/DashboardOverview'
import UserManagement from './admin/UserManagement'
import ShopManagement from './admin/ShopManagement';
import ProductManagement from './admin/ProductManagement';
import OrdersTransactions from './admin/OrdersTransactions';
import Promotions from './admin/Promotions';
import AffiliateMarketing from './admin/AffiliateMarketing';
import Settings from './admin/Settings';
import Packages from "./admin/Packages";


const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <DashboardOverview />;
      case "User Management":
        return <UserManagement />;
      case "Shops Management":
        return <ShopManagement />;
      case "Products":
        return <ProductManagement />;
        // case "Categories Add":
        //   return <Categories />;
      case "Orders & Transactions":
        return <OrdersTransactions />;
      case "Promotions":
        return <Promotions />;
      case "Affiliate Marketing":
        return <AffiliateMarketing />;
      case "Packages":
        return <Packages />;
      case "Settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 bg-gray-100 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
