import { useEffect, useState } from 'react';

import BacklogService
  from '../services/BacklogService';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

function GameDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [game, setGame] = useState(null);

  useEffect(() => {

    async function loadGame() {

      const response =
        await BacklogService.getBacklogEntryById(id);

      setGame(response.data);
    }

    loadGame();

  }, [id]);

  async function handleUpdate(e) {

    e.preventDefault();

    await BacklogService.updateBacklogEntry(
      id,
      game
    );

    alert('Updated!');
  }

  async function handleDelete() {

    await BacklogService.deleteBacklogEntry(id);

    navigate('/');
  }

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <h1>{game.title}</h1>

      <img
        src={game.image_url}
        width="250"
      />

      <form onSubmit={handleUpdate}>

        <select
          value={game.status}
          onChange={(e) =>
            setGame({
              ...game,
              status: e.target.value
            })
          }
        >

          <option>
            Playing
          </option>

          <option>
            Completed
          </option>

          <option>
            Wishlist
          </option>

          <option>
            Paused
          </option>

        </select>

        <textarea
          value={game.notes}
          onChange={(e) =>
            setGame({
              ...game,
              notes: e.target.value
            })
          }
        />

        <button type="submit">
          Save Changes
        </button>

      </form>

      <button onClick={handleDelete}>
        Delete Entry
      </button>

    </div>
  );
}

export default GameDetailsPage;