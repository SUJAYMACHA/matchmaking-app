import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import Project from './pages/Project';
import Landing from './pages/Landing';
import PrivateRoute from './PrivateRoute';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/project" element={<Project />} />
        <Route
          path="/landing"
          element={
            <PrivateRoute>
              <Landing />
            </PrivateRoute>
          }
        />
        {/* Protect the Chat route using PrivateRoute */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
