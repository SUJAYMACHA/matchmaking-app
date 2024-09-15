// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#60a5fa] p-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg hover:text-black">
          Matchmaking App
        </Link>
        <div className="flex space-x-4">
           <Link to="/" className="text-white hover:text-black">
          Login
          </Link>
{/*          
          
            <Link to="/profile-setup" className="text-white hover:text-black">
            Profile
          </Link>
            <Link to="/project" className="text-white hover:text-black">
            Profile
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
