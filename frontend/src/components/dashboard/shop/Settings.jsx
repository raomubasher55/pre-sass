import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { fetchStore, updateStoreProfile } from "../../../store/actions/storeActions";
import L from 'leaflet';

const Settings = () => {
  const dispatch = useDispatch();
  const { store, loading, error } = useSelector((state) => state.store);

  const [selectedStore, setSelectedStore] = useState(null);
  const [tempData, setTempData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    location: { type: "Point", coordinates: [] },
    photo: { public_id: "", url: "" },
  });
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    dispatch(fetchStore());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStore) {
      setTempData({
        name: selectedStore.name,
        description: selectedStore.description,
        address: selectedStore.address,
        phone: selectedStore.phone,
        email: selectedStore.email,
        location: selectedStore.location,
        photo: selectedStore.photo,
      });
    }
  }, [selectedStore]);

  useEffect(() => {
    if (isMapVisible && mapRef.current) {
      const map = L.map(mapRef.current).setView(
        [tempData.location.coordinates[1] || 0, tempData.location.coordinates[0] || 0],
        10
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const marker = L.marker(
        [tempData.location.coordinates[1] || 0, tempData.location.coordinates[0] || 0]
      ).addTo(map);

      map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        setTempData((prevState) => ({
          ...prevState,
          location: { type: "Point", coordinates: [lng, lat] },
        }));
        marker.setLatLng([lat, lng]);
      });

      return () => {
        map.remove();
      };
    }
  }, [isMapVisible, tempData.location]);

  const handleSave = () => {
    dispatch(updateStoreProfile(tempData));
    setIsEditModalVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-[#4222C4]">Shop Settings</h1>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center md:items-start">
            <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-20">
            
            <div>
            {store.photo?.url && (
              <img src={store.photo.url} alt="Store" className="w-36 h-36 object-cover rounded-full mt-2" />
            )}
            <h3 className="text-lg font-semibold text-center text-gray-800 mt-4">{store.name}</h3>

            </div>

            <div>
            <p className="text-gray-800"><strong className="text-[#4222C4]">Description:</strong> {store.description}</p>
            <p className="text-gray-800"><strong className="text-[#4222C4]">Address:</strong> {store.address}</p>
            <p className="text-gray-800"><strong className="text-[#4222C4]">Phone:</strong> {store.phone}</p>
            <p className="text-gray-800"><strong className="text-[#4222C4]">Email:</strong> {store.email}</p>
            <p className="text-gray-800"><strong className="text-[#4222C4]">Location:</strong> Lon: {store.location.coordinates[0]}, Lat: {store.location.coordinates[1]}</p>
            </div>
            
            </div>
            <button 
              onClick={() => { setSelectedStore(store); setIsEditModalVisible(true); }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Edit Store
            </button>
          </div>

      {isEditModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-96 relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Store Information</h3>
            <input
              type="text"
              value={tempData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Store Name"
            />
            <textarea
              value={tempData.description}
              onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Store Description"
            ></textarea>
            <input
              type="text"
              value={tempData.address}
              onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Store Address"
            />
            <input
              type="text"
              value={tempData.phone}
              onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Phone"
            />
            <input
              type="email"
              value={tempData.email}
              onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              value={tempData.photo.public_id}
              onChange={(e) => setTempData({ ...tempData, photo: { ...tempData.photo, public_id: e.target.value } })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Image ID"
            />
            <input
              type="text"
              value={tempData.photo.url}
              onChange={(e) => setTempData({ ...tempData, photo: { ...tempData.photo, url: e.target.value } })}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Image URL"
            />

            <div className="flex space-x-2">
              <input
                type="number"
                value={tempData.location.coordinates[0] || ""}
                onChange={(e) => setTempData({ 
                  ...tempData, 
                  location: { type: "Point", coordinates: [parseFloat(e.target.value), tempData.location.coordinates[1]] } 
                })}
                className="w-full p-2 border rounded-md"
                placeholder="Longitude"
              />
              <input
                type="number"
                value={tempData.location.coordinates[1] || ""}
                onChange={(e) => setTempData({ 
                  ...tempData, 
                  location: { type: "Point", coordinates: [tempData.location.coordinates[0], parseFloat(e.target.value)] } 
                })}
                className="w-full p-2 border rounded-md"
                placeholder="Latitude"
              />
            </div>

            <button 
              onClick={() => setIsMapVisible(true)} 
              className="bg-gray-400 text-white px-4 py-2 rounded-md mt-4"
            >
              Select on Map
            </button>

            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={() => setIsEditModalVisible(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}

      {isMapVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div ref={mapRef} className="h-64 w-80"></div>
            <button onClick={() => setIsMapVisible(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
