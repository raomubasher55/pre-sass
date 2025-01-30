import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStore } from '../store/actions/storeActions';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { HeroBanner } from '../components/homepage/HeroBanner';
import Navbar from '../components/homepage/Navbar';
import { FooterPrime } from '../components/presentation/FooterPrime';
import { AllAbouJumiaFooter } from '../components/presentation/AllAbouJumiaFooter';

const RegisterStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state) => state.store);

    useEffect(() => {
        if (store?.store?.token) {
            navigate('/upload-documents');
        }
    }, [store, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        location: { type: 'Point', coordinates: [0, 0] },
        phone: '',
        email: '',
        password: '',
        photo: null,
    });

    const mapRef = React.useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            photo: e.target.files[0],
        }));
    };

    useEffect(() => {
        const map = L.map(mapRef.current).setView([0, 0], 2);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([formData.location.coordinates[1], formData.location.coordinates[0]]).addTo(map);

        map.on('click', function(e) {
            const { lat, lng } = e.latlng;
            setFormData((prevState) => ({
                ...prevState,
                location: { type: 'Point', coordinates: [lng, lat] }
            }));
            marker.setLatLng([lat, lng]);
        });

        return () => {
            map.remove();
        };
    }, [formData.location.coordinates]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            if (key === 'photo') {
                formDataToSend.append('photo', formData.photo);
            } else if (key === 'location') {
                formDataToSend.append('location', JSON.stringify(formData.location));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        dispatch(registerStore(formDataToSend));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F5FA]">
            <HeroBanner />
            <Navbar />
            <div className="md:w-1/2 text-center mb-8 ">
                <h1 className="text-4xl font-bold text-[#4222C4] mb-4 mt-10">Welcome to Our E-commerce Platform</h1>
                <p className="text-lg text-[#5E3BE1]">
                    Register your store and start selling worldwide!
                </p>
            </div>
            <div className="md:w-[70%] bg-white p-8 rounded-lg shadow-md text-[#4222C4] w-full">
                <h2 className="text-2xl font-bold mb-4">Register Store</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Store Name"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Store Address"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Store Description"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border border-[#8970ee] rounded"
                        required
                    />
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-[#8970ee] rounded"
                        accept="image/*"
                        required
                    />
                    <div className="h-64 border border-[#8970ee] rounded overflow-hidden">
                        <div ref={mapRef} className="h-full w-full"></div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#4222C4] text-white p-3 rounded hover:bg-[#3219A6]"
                    >
                        Register Store
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login-store" className="underline text-[#4222C4] font-bold">
                        Login
                    </Link>
                </p>
            </div>
            <FooterPrime />
            <AllAbouJumiaFooter />
        </div>
    );
};

export default RegisterStore;
