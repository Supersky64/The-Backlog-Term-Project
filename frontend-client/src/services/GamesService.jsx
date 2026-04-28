import axios from 'axios';

const GAMES_API_BASE_URL = import.meta.env.VITE_API_URL + '/api/games' || 'http://localhost:3000/api/games';

class GamesService {
  searchGames(title) {
    return axios.get(`${GAMES_API_BASE_URL}/search`, {
        params: {
          title: title
        }
      });
  }
}

export default new GamesService();