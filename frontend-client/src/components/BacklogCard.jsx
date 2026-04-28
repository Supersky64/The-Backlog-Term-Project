import { Link } from 'react-router-dom';
import '../style/BacklogCard.css';

function BacklogCard({ game }) {

  return (
    <div className="backlog-card">

      <img
        src={game.image_url || 'https://placehold.co/120x160'}
        alt={game.title}
      />

      <div className="card-content">

        <div>

          <h2>{game.title}</h2>

          <p>
            Status: {game.status}
          </p>

          <p>
            {game.notes}
          </p>

        </div>

        <Link to={`/games/${game.id}`}>
          View Details
        </Link>

      </div>

    </div>
  )
}

export default BacklogCard;