import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact'
import Attendance from './pages/Attendance';
import AddUser from './pages/AddUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
