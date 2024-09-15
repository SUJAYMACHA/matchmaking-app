// src/pages/ProfileSetup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: '',
    experienceLevel: '',
    password: '' // New field for user password
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const newUser = {
      username: profile.name,
      bio: profile.bio,
      skills: profile.skills,
      experienceLevel: profile.experienceLevel,
      password: profile.password,
    };

    // Send POST request to JSON server to create a new user
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          console.log('User created successfully:', newUser);
          // Navigate to login page with new user details
          navigate('/', { state: { username: newUser.username, password: newUser.password } });
        } else {
          console.error('Failed to create user');
        }
      })
      .catch((error) => console.error('Error creating user:', error));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center pt-16">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#374151]">Profile Setup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Bio:</label>
              <textarea
                name="bio"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Skills:</label>
              <input
                type="text"
                name="skills"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                value={profile.skills}
                onChange={handleChange}
                placeholder="Enter your skills"
                list="skills-suggestions"
                required
              />
              <datalist id="skills-suggestions">
                <option value="JavaScript" />
                <option value="Python" />
                <option value="Java" />
                <option value="React" />
                <option value="Node.js" />
                <option value="HTML/CSS" />
                <option value="SQL" />
                <option value="C++" />
                <option value="Hardware Troubleshooting" />
                <option value="Network Configuration" />
                <option value="Embedded Systems" />
                <option value="PCB Design" />
                <option value="Microcontrollers" />
                <option value="FPGA Programming" />
              </datalist>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Experience Level:</label>
              <select
                name="experienceLevel"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                value={profile.experienceLevel}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password:</label>
              <input
                type="password"
                name="password"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                value={profile.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-lg transition duration-300"
              style={{ backgroundColor: '#60a5fa', color: '#ffffff' }}
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
