import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BacklogPage from './pages/BacklogPage';
import GameDetailsPage from './pages/GamesDetailsPage';
import SearchGamesPage from './pages/SearchGamesPage';
import LoginPage from './components/auth/LoginComponent';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route element={<ProtectedLayout/>}>
            <Route path="/" element={<BacklogPage/>} />
            <Route path="/search" element={<SearchGamesPage />} />
            <Route path="/games/:id" element={<GameDetailsPage />} />
            </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App