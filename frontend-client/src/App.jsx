import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginComponent';
import { Link } from 'react-router-dom';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">My Backlog</Link> | <Link to="/search">Search Games</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="login" element={<LoginPage/>} />
          <Route element={<ProtectedLayout/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App