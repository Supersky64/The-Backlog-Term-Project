import { useEffect, useState } from 'react';

import BacklogService from '../services/BacklogService';

import BacklogCard from '../components/BacklogCard';

import '../style/BacklogPage.css';

function BacklogPage() {

  const [games, setGames] = useState([]);

  useEffect(() => {

    async function loadGames() {

      try {

        const response =
          await BacklogService.getBacklogEntries();

        setGames(response.data);

      } catch (err) {

        console.error(err);
      }
    }

    loadGames();

  }, []);

  const completedGames =
    games.filter(
      game => game.status === 'Completed'
    );

  const playingGames =
    games.filter(
      game => game.status === 'Playing'
    );

  return (
    <div className="page-container">

      <h1>My Backlog</h1>

      <div className="stats-container">

        <div className="stat-card">
          <h2>{games.length}</h2>
          <p>Total Games</p>
        </div>

        <div className="stat-card">
          <h2>{playingGames.length}</h2>
          <p>Currently Playing</p>
        </div>

        <div className="stat-card">
          <h2>{completedGames.length}</h2>
          <p>Completed</p>
        </div>

      </div>

      <div>

        {games.map(game => (

          <BacklogCard
            key={game.id}
            game={game}
          />

        ))}

      </div>

    </div>
  )
}

export default BacklogPage;