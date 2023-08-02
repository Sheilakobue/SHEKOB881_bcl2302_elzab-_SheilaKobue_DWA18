import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fuse from 'fuse.js';
import ShowCardPreview from './ShowCardPreview';
import FavoriteList from './FavoriteList';

export default function Cards() {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(8);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [sortByAZ, setSortByAZ] = useState(true); // New state variable for sorting
  const [sortByDate, setSortByDate] = useState(true); // New state variable for date sorting
  const [favoriteShows, setFavoriteShows] = useState([]); // State variable for favorite shows
  const [searchTerm, setSearchTerm] = useState(''); // State variable for search term
  const [filteredPreviews, setFilteredPreviews] = useState([]); // State variable for filtered previews
  const [selectedSeasonId, setSelectedSeasonId] = useState(null); // New state for selected season
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null); // New state for selected episode
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]); // New state for favorite episodes

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviews(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  useEffect(() => {
    // Filter previews based on the search term using Fuse.js
    const fuse = new Fuse(previews, {
      keys: ['title', 'genres'], // Search by title and genres
      threshold: 0.3, // Adjust this threshold for fuzzy matching sensitivity
    });
    const filteredResults = fuse.search(searchTerm).map((result) => result.item);
    setFilteredPreviews(filteredResults);
  }, [searchTerm, previews]);

  const handleShowMore = () => setCardsToShow((prevCardsToShow) => prevCardsToShow + 8);
  const handleShowLess = () => setCardsToShow(8);
  const handleViewDetails = (cardId) => setSelectedCardId(cardId);
  const handleSortToggle = () => setSortByAZ((prevSortByAZ) => !prevSortByAZ);
  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleDateSortToggle = () => setSortByDate((prevSortByDate) => !prevSortByDate);

  const handleViewSeasonDetails = (showId, seasonId) => {
    setSelectedCardId(showId);
    setSelectedSeasonId(seasonId);
    setSelectedEpisodeId(null);
  };

  const handleViewEpisodeDetails = (episodeId) => {
    setSelectedEpisodeId(episodeId);
  };

  // Function to handle adding/removing a show from favorites
  const handleToggleFavorite = (showId) => {
    if (favoriteShows.includes(showId)) {
      setFavoriteShows(favoriteShows.filter((id) => id !== showId));
    } else {
      setFavoriteShows([...favoriteShows, showId]);
    }
  };

  // New function to add or remove a favorite episode from the list
  const handleToggleFavoriteEpisode = (episode) => {
    const isFavorite = favoriteEpisodes.some((fav) => fav.episodeId === episode.id);
    if (isFavorite) {
      setFavoriteEpisodes(favoriteEpisodes.filter((fav) => fav.episodeId !== episode.id));
    } else {
      setFavoriteEpisodes([...favoriteEpisodes, episode]);
    }
  };

  // New function to remove a favorite episode from the list
  const handleRemoveFavoriteEpisode = (episodeId) => {
    setFavoriteEpisodes(favoriteEpisodes.filter((fav) => fav.episodeId !== episodeId));
  };

  if (loading) {
    return <div className="load-images">Loading...</div>;
  }

  // Use filteredPreviews instead of sortedPreviews to display filtered results
  const previewsToDisplay = searchTerm ? filteredPreviews : previews;
  const sortedPreviews = previewsToDisplay
    .slice()
    .sort((a, b) => (sortByAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  // Apply date sorting based on sortByDate value
  const sortedPreviewsByDate = sortedPreviews.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return sortByDate ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="Card-Box">
      <Button variant="outlined" onClick={handleSortToggle} style={{ backgroundColor: 'grey', color: 'darkblue' }} size="small">
        Sort {sortByAZ ? 'Z-A' : 'A-Z'}
      </Button>

      <Button variant="outlined" onClick={handleDateSortToggle} style={{ backgroundColor: 'grey', color: 'darkblue' }} size="small">
        Sort by Date {sortByDate ? 'Newest' : 'Oldest'}
      </Button>

      <input type="text" placeholder="Search shows..." value={searchTerm} onChange={handleSearch} />

      {/* Show the FavoriteList component and pass necessary props */}
      {favoriteEpisodes.length > 0 && (
        <FavoriteList
          favorites={favoriteEpisodes}
          onRemoveFavorite={handleRemoveFavoriteEpisode}
          onShowDetails={handleViewEpisodeDetails}
        />
      )}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {sortedPreviewsByDate.slice(0, cardsToShow).map((preview) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={preview.id}>
            <ShowCardPreview
              show={preview}
              isSelected={selectedCardId === preview.id}
              onToggleFavorite={handleToggleFavorite}
              onToggleFavoriteEpisode={handleToggleFavoriteEpisode} // Pass the function as a prop
              onViewDetails={handleViewDetails}
            />
          </Grid>
        ))}
      </Grid>

      {selectedSeasonId && (
        <div>
          {previews.find((preview) => preview.id === selectedCardId)?.seasons.map((season) => (
            <div key={season.id}>
              <h4>Season {season.number}</h4>
              <p>{season.description}</p>
              {season.episodes.map((episode) => (
                <div key={episode.id}>
                  <h5>{episode.title}</h5>
                  <p>Episode Number: {episode.number}</p>
                  <p>Duration: {episode.duration}</p>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewEpisodeDetails(episode.id)}
                    style={{ backgroundColor: 'grey', color: 'darkblue' }}
                    size="small"
                  >
                    View Episode Details
                  </Button>
                </div>
              ))}
              <Button
                variant="outlined"
                onClick={() => setSelectedSeasonId(null)}
                style={{ backgroundColor: 'grey', color: 'darkblue' }}
                size="small"
              >
                Close Season
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedEpisodeId && (
        <div>
          {previews
            .find((preview) => preview.id === selectedCardId)
            .seasons.flatMap((season) => season.episodes)
            .map((episode) =>
              episode.id === selectedEpisodeId ? (
                <div key={episode.id}>
                  <h5>{episode.title}</h5>
                  <p>Episode Number: {episode.number}</p>
                  <p>Duration: {episode.duration}</p>
                  <p>{episode.description}</p>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedEpisodeId(null)}
                    style={{ backgroundColor: 'grey', color: 'darkblue' }}
                    size="small"
                  >
                    Close Episode Details
                  </Button>
                </div>
              ) : null
            )}
        </div>
      )}

      {cardsToShow < previewsToDisplay.length && (
        <Button
          variant="contained"
          onClick={() => setCardsToShow((prevCardsToShow) => prevCardsToShow + 8)}
          style={{ backgroundColor: 'grey', color: 'darkblue' }}
          size="small"
        >
          Show More
        </Button>
      )}
      {cardsToShow > 8 && (
        <Button
          variant="contained"
          onClick={() => setCardsToShow(8)}
          style={{ backgroundColor: 'grey', color: 'darkblue' }}
          size="small"
        >
          Show Less
        </Button>
      )}
    </div>
  );
}