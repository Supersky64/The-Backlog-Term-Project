import { useState } from 'react';

import GamesService
    from '../services/GamesService';

import BacklogService
    from '../services/BacklogService';

function SearchGamesPage() {

    const [searchTerm, setSearchTerm] =
        useState('');

    const [results, setResults] =
        useState([]);

    const [boxart, setBoxart] =
        useState({});

    async function handleSearch(e) {
        e.preventDefault();

        try {

            const response =
                await GamesService.searchGames(
                    searchTerm
                );

            console.log(response.data);

            setResults(
                response.data.data.games || []
            );

            setBoxart(
                response.data.include?.boxart?.data || {}
            );

        } catch (err) {

            console.error(err);
        }
    }

    function getGameImage(gameId) {

        const gameImages =
            boxart[gameId];
        if (gameImages && gameImages.length > 0) {
            return ('https://cdn.thegamesdb.net/images/medium/' + gameImages[0].filename);
        }

        return 'https://placehold.co/300x400';
    }

    async function handleAddGame(game) {

        try {

            await BacklogService.createBacklogEntry({
                game_id: game.id,
                title: game.game_title,
                image_url: getGameImage(game.id),
                status: 'Wishlist',
                notes: ''
            });

            alert('Added to backlog!');

        } catch (err) {

            console.error(err.response?.data);
            console.error(err);
        }
    }


    return (
        <div>

            <h1>Search Games</h1>

            <form onSubmit={handleSearch}>

                <input
                    type="text"
                    placeholder="Search for a game..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>

            </form>

            <div>

                {results.slice(0, 5).map(game => (

                    <div key={game.id}>

                        <h2>
                            {game.game_title}
                        </h2>

                        <img
                            src={getGameImage(game.id)}
                            width="150"
                        />

                        <button
                            onClick={() =>
                                handleAddGame(game)
                            }
                        >
                            Add To Backlog
                        </button>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default SearchGamesPage;