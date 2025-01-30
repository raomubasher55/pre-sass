import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument } from '../store/actions/storeActions';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/context/UserContext';
import { FooterPrime } from '../components/presentation/FooterPrime';
import { AllAbouJumiaFooter } from '../components/presentation/AllAbouJumiaFooter';
import Navbar from '../components/homepage/Navbar';
import { HeroBanner } from '../components/homepage/HeroBanner';

const UploadDocuments = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(state => state.store);
  const { setRefreshData } = useContext(UserContext)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file || !name || !category || !phone) {
      alert('Please fill all document details');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('phone', phone);

    dispatch(uploadDocument(formData));
    setRefreshData(true)

    navigate('/upload-documents/choose-plans');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <HeroBanner />
    <Navbar />
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-lg text-center text-[#4222C4] mb-6">Your store is registered successfully. Now submit documents for the next process.</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center mb-4">Processing...</p>}

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Document Upload</h3>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-600">Store Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-600">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4222C4]"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-600">Upload Document</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className={`w-full bg-[#4222C4] text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3618a0] transition-colors'}`}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
    <FooterPrime />
    <AllAbouJumiaFooter />
    </>
  );
};

export default UploadDocuments;
