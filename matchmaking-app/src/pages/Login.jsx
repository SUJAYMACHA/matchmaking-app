// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [showNewUserMessage, setShowNewUserMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { username, password } = location.state;
      setNewUser({ username, password });
      setUsername(username);
      setPassword(password);

      // Automatically show new user message only once after signup
      setShowNewUserMessage(true);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch users from the JSON server
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();

      // Check if the user exists in the server's user data
      const userExists = users.some(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        localStorage.setItem('currentUser', JSON.stringify({ username }));
        setShowNewUserMessage(false);
        navigate('/landing');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error connecting to the server. Please try again later.');
    }
  };

  const handleSignUp = () => {
    navigate('/profile-setup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#374151' }}>Welcome!</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {newUser && showNewUserMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            <p>Thank you for signing up! Use the following credentials to log in:</p>
            <p><strong>Username:</strong> {newUser.username}</p>
            <p><strong>Password:</strong> {newUser.password}</p>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2" style={{ color: '#374151' }}>Username:</label>
            <input
              type="text"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#60a5fa', color: '#374151' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-2" style={{ color: '#374151' }}>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#60a5fa', color: '#374151' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg hover:bg-[#374151] transition duration-300"
            style={{ backgroundColor: '#60a5fa', color: '#ffffff' }}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p style={{ color: '#374151' }}>
            Don&apos;t have an account?{' '}
            <button
              onClick={handleSignUp}
              className="hover:underline"
              style={{ color: '#60a5fa' }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
