// src/pages/Project.jsx
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Project = () => {
   const [currentUser, setUser] = useState(null);
  const [project, setProject] = useState({
    title: '',
    description: '',
    creator: currentUser ? currentUser.username : '', // Use current user as creator
    skills: '',
    link: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log('Project data:', project);

    fetch('http://localhost:3001/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/landing');
      })
      .catch((error) => console.error('Error adding project:', error));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user);
  }, []);

  return (
    <div className="p-24 bg-white flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 pt-6 pb-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#374151]">Project Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Project Title:</label>
            <input
              type="text"
              name="title"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
              value={project.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Project Description:</label>
            <textarea
              name="description"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
              value={project.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Skills Required:</label>
            <input
              type="text"
              name="skills"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
              value={project.skills}
              onChange={handleChange}
              placeholder="Enter skills required for the project"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Project Link:</label>
            <input
              type="url"
              name="link"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
              value={project.link}
              onChange={handleChange}
              placeholder="Enter project link (e.g., GitHub repository)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg transition duration-300"
            style={{ backgroundColor: '#60a5fa', color: '#ffffff' }}
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default Project;
