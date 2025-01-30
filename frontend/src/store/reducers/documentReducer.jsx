// documentReducer.jsx
const initialState = {
    documents: [],
    loading: false,
    error: null,
  };
  
  export const documentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "DOCUMENTS_REQUEST":
        return { ...state, loading: true };
      case "DOCUMENTS_SUCCESS":
        return { ...state, loading: false, documents: action.payload };
      case "DOCUMENTS_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "DOCUMENT_APPROVED":
        return {
          ...state,
          documents: state.documents.map((doc) =>
            doc._id === action.payload ? { ...doc, status: "approved" } : doc
          ),
        };
      case "DOCUMENT_REJECTED":
        return {
          ...state,
          documents: state.documents.map((doc) =>
            doc._id === action.payload ? { ...doc, status: "rejected" } : doc
          ),
        };
      default:
        return state;
    }
  };
  
  