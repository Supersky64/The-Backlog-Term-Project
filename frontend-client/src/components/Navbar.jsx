import { Link, useNavigate }
  from 'react-router-dom';

import { useEffect, useState }
  from 'react';

import AuthService
  from '../services/AuthService';

import '../style/Navbar.css';

function Navbar() {

  const [user, setUser] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    async function fetchUser() {

      try {

        const response =
          await AuthService.getCurrentUser();

        setUser(response.data);

      } catch (err) {

        console.error(err);
      }
    }

    fetchUser();

  }, []);

  async function handleLogout() {

    try {

      await AuthService.logout();

      setUser(null);

      navigate('/login');

    } catch (err) {

      console.error(err);
    }
  }

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <h2>The Backlog</h2>

      </div>

      <div className="navbar-center">

        <Link to="/">
          My Backlog
        </Link>

        <Link to="/search">
          Search Games
        </Link>

      </div>

      <div className="navbar-right">

        {user ? (

          <>
            <span>
              👤 {user.display_name}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>

        ) : (

          <Link to="/login">
            Login
          </Link>

        )}

      </div>

    </nav>
  )
}

export default Navbar;