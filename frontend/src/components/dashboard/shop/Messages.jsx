import { useState } from 'react';
import { FaReply, FaTrashAlt } from 'react-icons/fa';

const Messages = () => {
  // Initial state for messages and filter option
  const [messages, setMessages] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      subject: 'Issue with my order',
      message: 'Hi, I received a damaged product. Can I return it?',
      status: 'Pending',
      answer: '',
      date: '2024-12-01',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      subject: 'Question about the product',
      message: 'Can you tell me if this product comes in different sizes?',
      status: 'Answered',
      answer: 'Yes, this product comes in 3 different sizes: S, M, L.',
      date: '2024-12-02',
    },
    {
      id: 3,
      customerName: 'Michael Lee',
      subject: 'Shipping delay',
      message: 'My order has not arrived yet, and it’s been over a week.',
      status: 'Pending',
      answer: '',
      date: '2024-12-03',
    },
  ]);

  // Modal state for replying
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(''); // Store the reply message

  // Filter state (All, Pending, Answered)
  const [filter, setFilter] = useState('All');

  // Open modal to view or reply to a message
  const openModal = (message) => {
    setCurrentMessage(message);
    setReplyMessage(''); // Reset reply message field
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMessage(null);
  };

  // Handle reply
  const handleReply = () => {
    if (currentMessage && replyMessage.trim()) {
      // Update message status and add reply
      const updatedMessages = messages.map((message) =>
        message.id === currentMessage.id
          ? {
              ...message,
              status: 'Answered',
              answer: replyMessage, // Store the reply message
            }
          : message
      );
      setMessages(updatedMessages);
    }
    setIsModalOpen(false); // Close modal after reply
  };

  // Delete message
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  // Filter messages based on status
  const filteredMessages =
    filter === 'All'
      ? messages
      : messages.filter((message) => message.status === filter);

  // Calculate message counts
  const totalMessages = messages.length;
  const unansweredMessages = messages.filter(
    (message) => message.status === 'Pending'
  ).length;

  return (
    <div className="p-6 bg-gray-100 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#4222C4]">Messages</h1>
      <p className="text-gray-600">Manage messages from your customers here.</p>

      {/* Message Stats */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Total Messages: {totalMessages}</p>
          <p className="text-gray-600">Unanswered Messages: {unansweredMessages}</p>
        </div>

        {/* Filter Option */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="All">All Messages</option>
          <option value="Pending">Pending Messages</option>
          <option value="Answered">Answered Messages</option>
        </select>
      </div>

      {/* Messages Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Messages</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#4222C4] text-white">
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{message.customerName}</td>
                  <td className="px-4 py-2">{message.subject}</td>
                  <td className="px-4 py-2">
                    {message.status}
                    {message.status === 'Answered' && (
                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Answer:</strong> {message.answer}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{message.date}</td>
                  <td className="px-4 py-2 space-x-4">
                    <button
                      onClick={() => openModal(message)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaReply />
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Viewing and Replying to Message */}
      {isModalOpen && currentMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Reply to Message
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Customer Name</label>
              <p className="text-gray-600">{currentMessage.customerName}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Subject</label>
              <p className="text-gray-600">{currentMessage.subject}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Message</label>
              <p className="text-gray-600">{currentMessage.message}</p>
            </div>

            {/* Reply Form */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Your Reply</label>
              <textarea
                className="w-full p-2 mt-1 border rounded-md"
                rows="4"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)} // Update reply message state
                placeholder="Write your reply here..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-600 border border-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReply} // Update status and reply
                className="bg-[#4222C4] text-white px-4 py-2 rounded-md"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
