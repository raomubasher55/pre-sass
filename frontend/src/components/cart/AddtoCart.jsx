import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createOrder } from "../../store/actions/orderActions";
import { getSingleProduct } from "../../store/actions/productActions";
import { HeroBanner } from "../homepage/HeroBanner";
import Navbar from "../homepage/Navbar";
import { FooterPrime } from "../presentation/FooterPrime";
import { AllAbouJumiaFooter } from "../presentation/AllAbouJumiaFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../utils/Loader";

export default function AddToCart() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const formRef = useRef(null);

    const { loading: productLoading, product } = useSelector((state) => state.SingleproductDetails);
    const { loading, success, error, order } = useSelector((state) => state.orderCreate);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);

    const [quantity, setQuantity] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [orderData, setOrderData] = useState({
        address: "",
        city: "",
        phoneNo: "",
        postalCode: "",
        country: ""
    });

    const maxStock = product?.stock || 1;
    const isDiscountAvailable = product?.discountEndDate && new Date(product.discountEndDate) > new Date();
    const finalPrice = isDiscountAvailable ? product?.discountedPrice : product?.price;

    const handleIncrease = () => {
        setQuantity((prev) => Math.min(prev + 1, maxStock));
    };

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(prev - 1, 1));
    };

    const handleNextProcess = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const handleOrderSubmit = () => {
        if (Object.values(orderData).some((field) => !field)) {
            toast.error("Please fill in all shipping details");
            return;
        }

        const finalOrder = {
            shippingInfo: orderData,
            orderItems: [{
                name: product?.name,
                quantity,
                image: product?.images?.[0]?.url || "",
                price: finalPrice,
                product: product?._id
            }],
            paymentInfo: { method: paymentMethod },
            itemsPrice: finalPrice * quantity,
            shippingPrice: 10,
            taxPrice: 5,
            totalPrice: finalPrice * quantity + 15,
            storeId: product?.seller
        };

        dispatch(createOrder(finalOrder));
    };

    useEffect(() => {
        if (success) toast.success("Order placed successfully!");
        if (error) toast.error(error);
    }, [success, error]);

    if (productLoading) return <Loader />;

    return (
        <>
            <HeroBanner />
            <Navbar />

            <div className="sm:w-[700px] mx-auto mt-10 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="w-full md:w-1/3">
                            <img
                                src={product?.images?.[0]?.url ? `${import.meta.env.VITE_APP}/${product.images[0].url.replace(/\\/g, "/")}` : "https://via.placeholder.com/200"}
                                alt={product?.name || "Product Image"}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-2/3 mt-6 md:mt-0">
                            <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
                            <p className="text-gray-600 mt-2">{product?.description}</p>

                            <div className="mt-4 flex items-center space-x-6">
                                {isDiscountAvailable ? (
                                    <>
                                        <span className="text-xl font-bold text-red-500">${product?.discountedPrice}</span>
                                        <span className="text-sm text-gray-400 line-through">${product?.price}</span>
                                    </>
                                ) : (
                                    <span className="text-xl font-bold text-gray-900">${product?.price}</span>
                                )}
                            </div>

                            <div className="mt-4 flex items-center space-x-6">
                                <button onClick={handleDecrease} className="bg-gray-200 p-2 rounded-full text-gray-700">-</button>
                                <span className="text-xl">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 p-2 rounded-full text-gray-700">+</button>
                            </div>
                            <button onClick={handleNextProcess} className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Next Process</button>
                        </div>
                    </div>

                    {showForm && (
                        <div ref={formRef} className="mt-10 bg-gray-100 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-700">Shipping Details</h3>
                            {Object.keys(orderData).map((field) => (
                                <input key={field} type="text" placeholder={field} className="w-full p-3 mt-3 border border-gray-300 rounded-md" value={orderData[field]} onChange={(e) => setOrderData({ ...orderData, [field]: e.target.value })} />
                            ))}
                            <h3 className="text-lg font-bold text-gray-700 mt-4">Payment Method</h3>
                            <select className="w-full p-3 mt-3 border border-gray-300 rounded-md" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="COD">Cash on Delivery</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                            <button onClick={handleOrderSubmit} className="w-full mt-6 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">{loading ? "Processing..." : "Place Order"}</button>
                        </div>
                    )}

                    {success && order && (
                        <div className="mt-10 bg-green-100 p-1 rounded-lg">
                            <h3 className="text-lg font-bold text-green-700">Order Placed Successfully!</h3>
                            <p><strong>Order ID:</strong> {order?.order?._id}</p>
                            <p><strong>Status:</strong> {order?.order?.orderStatus}</p>
                            <p><strong>Total Price:</strong> ${order?.order?.totalPrice}</p>
                            <h4 className="text-md font-bold mt-2">Shipping Details:</h4>
                            <p>{order?.order?.shippingInfo?.address}, {order?.order?.shippingInfo?.city}, {order?.order?.shippingInfo?.country}</p>
                            <h4 className="text-md font-bold mt-2">Order Items:</h4>
                            {order?.order?.orderItems.map((item, index) => (
                                <p key={index}>{item.quantity}x {item.name} - ${item.price}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FooterPrime />
            <AllAbouJumiaFooter />
        </>
    );
}
