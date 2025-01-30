import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [filterStatus, setFilterStatus] = useState("All");

    const products = [
        { id: 1, name: "Laptop", price: 1200, sales: 3 },
        { id: 2, name: "Smartphone", price: 800, sales: 50 },
        { id: 3, name: "Headphones", price: 150, sales: 2 },
        { id: 4, name: "Smartwatch", price: 250, sales: 3 },
    ];

    const orders = [
        { id: "ORD12345", buyer: "Alice", product: "Laptop", quantity: 1, total: 1200, status: "Completed" },
        { id: "ORD12346", buyer: "Bob", product: "Smartphone", quantity: 2, total: 1600, status: "Pending" },
        { id: "ORD12347", buyer: "Charlie", product: "Headphones", quantity: 3, total: 450, status: "Canceled" },
        { id: "ORD12348", buyer: "Diana", product: "Smartwatch", quantity: 1, total: 250, status: "Processing" },
    ];

    const totalSales = products.reduce((acc, product) => acc + product.sales * product.price, 0);
    const revenueToday = orders.filter((order) => order.status === "Completed").reduce((acc, order) => acc + order.total, 0);

    const salesData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Sales ($)",
                data: products.map((product) => product.sales * product.price / 7),
                borderColor: "#4222C4",
                backgroundColor: "rgba(66, 34, 196, 0.5)",
                tension: 0.4,
            },
        ],
    };

    const ordersData = {
        labels: ["Pending", "Completed", "Canceled", "Processing"],
        datasets: [
            {
                label: "Orders",
                data: [
                    orders.filter((order) => order.status === "Pending").length,
                    orders.filter((order) => order.status === "Completed").length,
                    orders.filter((order) => order.status === "Canceled").length,
                    orders.filter((order) => order.status === "Processing").length,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    const filteredOrders =
        filterStatus === "All" ? orders : orders.filter((order) => order.status === filterStatus);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#4222C4] text-center">Dashboard Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{ label: "Total Sales", value: `$${totalSales.toLocaleString()}`, color: "text-green-600" },
                  { label: "Orders", value: orders.length, color: "text-blue-600" },
                  { label: "Products Sold", value: products.reduce((acc, product) => acc + product.sales, 0), color: "text-purple-600" },
                  { label: "Revenue", value: `$${revenueToday.toLocaleString()}`, color: "text-green-600" }].map((item, index) => (
                    <div key={index} className="bg-white shadow p-6 rounded-lg text-center">
                        <h3 className="text-lg font-medium">{item.label}</h3>
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Weekly Sales Trend</h3>
                    <div className="overflow-x-auto">
                        <Line data={salesData} />
                    </div>
                </div>
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Order Distribution</h3>
                    <div className="overflow-x-auto">
                        <Bar data={ordersData} />
                    </div>
                </div>
            </div> 


        </div>
    );
}
