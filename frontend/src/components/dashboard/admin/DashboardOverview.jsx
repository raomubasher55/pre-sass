import { useDispatch, useSelector } from "react-redux";
import {
  FaDollarSign,
  FaUserFriends,
  FaStore,
  FaShoppingCart,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { fetchUsers } from '../../../store/actions/AlluserActions';
import { fetchStores } from "../../../store/actions/storeActions";
import { useEffect } from "react";


const DashboardOverview = () => {

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchUsers());
      dispatch(fetchStores());
    }, [dispatch]);
    const totalUsers = useSelector((state) => state.users.totalUsers);
    const { stores } = useSelector((state) => state.store);
  // Example Data
  const metrics = [
    { label: "Total Revenue", value: "$125,500", icon: <FaDollarSign /> },
    { label: "Active Users", value: totalUsers, icon: <FaUserFriends /> },
    { label: "Active Shops", value: stores.length, icon: <FaStore /> },
    { label: "Orders Processed", value: "8,600", icon: <FaShoppingCart /> },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12000, 15000, 10000, 18000, 22000, 20000, 24000, 26000, 21000, 23000, 19000, 25000],
        backgroundColor: "#4222C4",
        borderColor: "#4222C4",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const recentActivities = [
    { id: 1, activity: "User JohnDoe created a new shop.", time: "2 hours ago" },
    { id: 2, activity: "Product added to Electronics category.", time: "5 hours ago" },
    { id: 3, activity: "Promotion campaign launched.", time: "1 day ago" },
    { id: 4, activity: "New affiliate registered.", time: "2 days ago" },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#4222C4] mb-6">Dashboard Overview</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="text-[#4222C4] text-3xl">{metric.icon}</div>
            <div>
              <p className="text-gray-600 font-medium">{metric.label}</p>
              <h3 className="text-xl font-bold text-gray-800">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white shadow rounded-lg p-6 h-[400px]">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h2>
          <Line data={salesData} options={{ maintainAspectRatio: false }} height={300} />
        </div>

        {/* Revenue by Category Chart (Placeholder) */}
        <div className="bg-white shadow rounded-lg p-6 h-[400px]">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h2>
          <Line data={salesData} options={{ maintainAspectRatio: false }} height={300} />
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600">
              <th className="pb-2">Activity</th>
              <th className="pb-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id} className="border-t">
                <td className="py-2 text-gray-800">{activity.activity}</td>
                <td className="py-2 text-gray-600">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
