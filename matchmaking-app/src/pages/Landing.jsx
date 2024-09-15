// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Landing = () => {
  const [projects, setProjects] = useState([]); // Initialize with an empty array
  const navigate = useNavigate();

  // Fetch projects from the JSON server
  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleAddProject = () => {
    navigate('/project');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="bg-[#374151] p-4 w-full md:w-1/4 flex flex-col items-center md:items-start">
        <button
          onClick={handleAddProject}
          className="bg-[#60a5fa] text-white px-4 py-2 mb-4 rounded-lg hover:bg-[#4b95e0] transition duration-300"
        >
          + Add Project
        </button>
      </div>

      <div className="flex-1 p-4 md:p-8 lg:p-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#374151] mb-8">
          Explore Projects
        </h2>
        <button
  onClick={() => navigate('/chat')}
  className="bg-[#60a5fa] text-white px-4 py-2 mb-4 rounded-lg hover:bg-[#4b95e0] transition duration-300"
>
  Go to Chat
</button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-[#374151] mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Skills:</strong> {project.skills}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Description:</strong> {project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Landing;
