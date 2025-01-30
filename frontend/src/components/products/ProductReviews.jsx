
export default function ProductReviews() {
  const reviews = [
    { username: 'John Doe', review: 'Great product! Highly recommend.', rating: 5 },
    { username: 'Jane Smith', review: 'Good quality but a bit expensive.', rating: 4 },
    { username: 'Alice Johnson', review: 'Not as expected. Could be improved.', rating: 3 },
    { username: 'Michael Brown', review: 'Excellent! Will buy again.', rating: 5 },
    { username: 'Emily Davis', review: 'Just okay, not bad.', rating: 4 },
  ];

  return (
    <div className="mt-10 p-4 bg-white rounded shadow-lg w-full mx-auto"
         style={{ boxShadow: '1px 1px 20px 1px lightgray' }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Reviews</h2>
      <div className="space-y-4 overflow-y-auto max-h-64 scrollbar-none">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-bold text-gray-800">{review.username}</h3>
              <div className="ml-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-yellow-500 ${i < review.rating ? 'inline-block' : 'inline-block text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
