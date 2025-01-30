import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAd, getActiveAds , deleteAd , updateAd } from '../../../store/actions/adActions';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

const Promotions = () => {
  const dispatch = useDispatch();
  const { loading, ads, error } = useSelector((state) => state.adData);

  const [adData, setAdData] = useState({
    title: '',
    description: '',
    product: '',
    startDate: '',
    endDate: '',
  });
  const [image, setImage] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [deleteAdId, setDeleteAdId] = useState(null); 
  const [ showEditModal , setShowEditModal] = useState(false)

  const handleChange = (e) => {
    setAdData({
      ...adData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAd(adData, image));
  };

  const toggleOptions = (adId) => {
    setShowOptions(showOptions === adId ? null : adId);
  };

  const handleOptionClick = (adId, action) => {
    if (action === 'update') {
      setAdData({
        id: adId._id,
        title: adId.title,
        description: adId.description,
        product: adId.product._id,
        startDate: adId.startDate,
        endDate: adId.endDate,
        status: adId.status,
      });
      setShowEditModal(true);  
    } else if (action === 'delete') {
      setDeleteAdId(adId);
      setShowDeleteModal(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteAd(deleteAdId._id));
    setShowDeleteModal(false); 
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); 
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', adData.title);
    formData.append('description', adData.description);
    formData.append('product', adData.product);
    formData.append('startDate', adData.startDate);
    formData.append('endDate', adData.endDate);
    formData.append('status', adData.status);
    if (image) {
      formData.append('image', image);
    }
  
    dispatch(updateAd(adData.id, formData)); 
    setShowEditModal(false);
    dispatch(getActiveAds());
  };

  useEffect(() => {
    dispatch(getActiveAds());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Promotion</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={adData.title}
            onChange={handleChange}
            className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={adData.description}
            onChange={handleChange}
            className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            id="product"
            name="product"
            value={adData.product}
            onChange={handleChange}
            className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
            placeholder="Enter product ID"
            required
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={adData.startDate}
              onChange={handleChange}
              className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              required
            />
          </div>

          <div className="md:w-1/2">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={adData.endDate}
              onChange={handleChange}
              className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              required
            />
          </div>
        </div>
        <div className="mb-4">
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
    Upload Image
  </label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleImageChange}
    className="mt-2 block w-full border-[#c6bbee] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
  />
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? 'Creating Ad...' : 'Create Ad'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="max-w-4xl mx-auto p-2 md:p-6 mt-10 border shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Active Promotions</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {ads.length === 0 ? (
  <p className="text-center text-lg font-medium text-gray-500">No active ads found.</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
    {ads.map((ad) => (
      <div
        key={ad.id}
        className="bg-gray-200 p-6 rounded-lg shadow-md relative hover:shadow-lg transition-shadow duration-300"
      >
        {/* Options Button */}
        <div className="absolute top-3 right-3 cursor-pointer">
          <button
            onClick={() => toggleOptions(ad._id)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <FaEllipsisV className="text-lg" />
          </button>
          {showOptions === ad._id && (
            <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg border border-gray-200">
              <button
                onClick={() => handleOptionClick(ad, 'update')}
                className="block w-full px-6 py-3 text-sm text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                onClick={() => handleOptionClick(ad, 'delete')}
                className="block w-full px-6 py-3 text-sm text-red-600 hover:bg-gray-100 transition-colors"
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Ad Details */}
        <h3 className="text-[12px] sm:text-base font-semibold text-gray-800">{ad.title}</h3>
        <p className="text-gray-600 mt-2 text-[11px] sm:text-[14px]">{ad.description}</p>
        <p className="text-gray-700 mt-2 text-[11px] sm:text-[14px]">
          <span className="font-semibold">Product:</span> {ad.product.name}
        </p>
        <p className="text-gray-700 mt-1 text-[11px] sm:text-[10px]">
          <span className="font-semibold">Date:</span>{' '}
          {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
        </p>
        
        <p className="mt-2 text-[11px] sm:text-[14px]">
          <span className="font-semibold">Status:</span>{' '}
          <span className="text-green-500">{ad.status}</span>
        </p>

        {/* Ad Image */}
        <img
          src={`${import.meta.env.VITE_APP}/${ad.product.images[0].url.replace(/\\/g, '/')}`}
          alt="Ad"
          className="mt-4 w-full h-28 md:h-32 lg:h-40 object-cover rounded-md"
        />
      </div>
    ))}
  </div>
)}

      </div>

            {/* Confirmation Modal */}
            {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Are you sure you want to delete this advertisement?</h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">
                No
              </button>
              <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded-lg">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

{showEditModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Ad</h3>
    <form onSubmit={handleUpdateSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={adData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={adData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="product"
        value={adData.product}
        onChange={handleChange}
        placeholder="Product ID"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-4">
        <input
          type="date"
          name="startDate"
          value={adData.startDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="endDate"
          value={adData.endDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        name="status"
        value={adData.status}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 file:bg-blue-500 file:text-white file:border-none file:rounded-lg"
      />
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setShowEditModal(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Update Ad
        </button>
      </div>
    </form>
  </div>
</div>

)}

    </div>
  );
};

export default Promotions;
