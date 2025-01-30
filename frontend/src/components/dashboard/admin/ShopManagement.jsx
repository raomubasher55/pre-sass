import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingDocuments, approveDocument, rejectDocument } from "../../../store/actions/documentActions";
import { fetchStores } from "../../../store/actions/storeActions";
import UserContext from "../../context/UserContext";

export default function ShopManagement() {
  const { setRefreshData } = useContext(UserContext);
  const dispatch = useDispatch();

  const { documents = [], loading, error } = useSelector((state) => state.documents);
  const { stores, loading: storeLoading, error: storeError } = useSelector((state) => state.store);
  
  useEffect(() => {
    dispatch(fetchPendingDocuments());
    dispatch(fetchStores());
  }, [dispatch]);

  const handleApprove = (documentId, userId) => {
    dispatch(approveDocument(documentId, userId));
    setRefreshData(true); 
  };

  const handleReject = (documentId, userId) => {
    dispatch(rejectDocument(documentId, userId));
    setRefreshData(true); 
  };

  useEffect(() => {
    if (setRefreshData) {
      dispatch(fetchPendingDocuments()); 
      dispatch(fetchStores());
      setRefreshData(false);
    }
  }, [setRefreshData, dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Document Approvals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-600">No pending documents found.</p>
      ) : (
        <div className="overflow-x-auto w-screen md:w-full">
          <table className="min-w-full text-left text-sm md:text-base">
            <thead>
              <tr className="text-gray-600">
                <th className="pb-2">Store Name</th>
                <th className="pb-2">Phone</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Uploaded By</th>
                <th className="pb-2">Document File</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id} className="border-t">
                  <td className="py-2 text-gray-800">{doc.name}</td>
                  <td className="py-2 text-gray-600">{doc.phone}</td>
                  <td className="py-2 text-gray-600">{doc.category}</td>
                  <td className="py-2 text-gray-600">{`${doc.storeEmail}`}</td>
                  <td className="py-2 text-gray-600">{doc.fileName}</td>
                  <td className="py-2 space-x-4">
                    <button
                      onClick={() => handleApprove(doc._id, doc.storeId)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(doc._id, doc.storeId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Store Data Section */}
      <div className="mt-8 overflow-x-auto w-screen md:w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">All Stores</h2>
        {storeLoading ? (
          <p>Loading stores...</p>
        ) : storeError ? (
          <p className="text-red-500">{storeError}</p>
        ) : stores.length === 0 ? (
          <p className="text-gray-600">No stores found.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-max text-left text-sm md:text-base">
              <thead>
                <tr className="text-gray-600">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Address</th>
                  <th className="pb-2">Photo</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store._id} className="border-t">
                    <td className="py-2 px-2 text-gray-800">{store.name}</td>
                    <td className="py-2 px-2 text-gray-600">{store.phone}</td>
                    <td className="py-2 px-2 text-gray-600">{store.email}</td>
                    <td className="py-2 px-2 text-gray-600 md:w-[30%]">{store.address}</td>
                    <td className="py-2">
                      <img
                         src={
                          store?.photo?.url 
                            ? `${import.meta.env.VITE_APP}${store?.photo?.url.replace(/\\/g, '/')}` 
                            : store.photo.url || '/default-profile.png'
                        }
                        alt={store.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
