// src/pages/Chat.jsx
import { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [users, setUsers] = useState([]);
  const [isPolling] = useState(true); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch messages and poll every 2 seconds to simulate real-time updates
  useEffect(() => {
    const fetchMessages = () => {
      fetch('http://localhost:3001/messages')
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error('Error fetching messages:', error));
    };

    fetchMessages(); // Initial fetch

    if (isPolling) {
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [isPolling]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !receiver) return;

    const message = {
      sender: currentUser.username,
      receiver,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then(() => {
        setMessages((prevMessages) => [...prevMessages, message]); // Optimistic update
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleUserSelect = (user) => {
    setReceiver(user.username);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#374151]">
        Chat with {receiver || 'Select a user to chat'}
      </h2>

      {/* Display all users */}
      <div className="w-full max-w-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Users:</h3>
        {users.map(
          (user) =>
            user.username !== currentUser.username && (
              <div
                key={user.id}
                className="flex items-center justify-between mb-2 p-2 border-b border-gray-300"
              >
                <p>{user.username}</p>
                <button
                  onClick={() => handleUserSelect(user)}
                  className="bg-[#60a5fa] text-white px-4 py-1 rounded-lg hover:bg-[#4b95e0] transition duration-300"
                >
                  Chat
                </button>
              </div>
            )
        )}
      </div>

      {/* Chat messages */}
      <div
        className="w-full max-w-lg bg-gray-100 rounded-lg shadow-md p-4 mb-4 overflow-y-auto"
        style={{ maxHeight: '400px' }}
      >
        {messages
          .filter(
            (msg) =>
              (msg.sender === currentUser?.username && msg.receiver === receiver) ||
              (msg.sender === receiver && msg.receiver === currentUser?.username)
          )
          .map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 ${msg.sender === currentUser?.username ? 'text-right' : 'text-left'}`}
            >
              <p className="text-sm">
                <strong>{msg.sender}:</strong> {msg.content}
              </p>
              <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
      </div>

      {/* Message input */}
      <div className="w-full max-w-lg flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#60a5fa] text-white px-4 py-2 rounded-lg hover:bg-[#4b95e0] transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
