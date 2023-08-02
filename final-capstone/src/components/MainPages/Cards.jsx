import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import GenreFilter from './GenreFilter';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the "Show More" icon
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Import the "Show Less" icon
import Fuse from 'fuse.js';

const Cards = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(8);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSeasonsPage, setShowSeasonsPage] = useState(false);
  const [seasonData, setSeasonData] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviews(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}/seasons`);
      const data = await response.json();
      setSeasonData(data); // Store the seasons data for the specific show
      setSelectedCardId(null); // Close the card details if open
      setShowSeasonsPage(true); // Show the seasons page for the specific show
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const genreNames = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi'];

  const handleViewDetails = (cardId) => {
    setSelectedCardId((prevSelectedCardId) => (prevSelectedCardId === cardId ? null : cardId));
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSortingOption(null);
  };

  const handleSortingOptionChange = (option) => {
    setSortingOption(option);
    setSelectedGenre(null);
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSelectedGenre(null);
    setSortingOption(null);
  };
    //ShowMore
  const handleShowMore = () => {
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 8); // Show 8 more cards on each click
  };
  const handleShowLess = () => {
    setCardsToShow(8); // Reset to the initial number of cards to show
  };

  const handleShowSeasonsPage = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}/seasons`);
      const data = await response.json();
      setSeasonData(data); // Store the seasons data for the specific show
      setSelectedCardId(null); // Close the card details if open
      setShowSeasonsPage(true); // Show the seasons page for the specific show
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const fuseOptions = {
    keys: ['title'],
    threshold: 0.3,
  };

  const fuse = new Fuse(previews, fuseOptions);
  const fuzzySearchResults = searchTerm ? fuse.search(searchTerm) : previews;

  const filteredPreviews = selectedGenre
    ? fuzzySearchResults.filter((show) => show.genres.includes(genreNames.indexOf(selectedGenre) + 1))
    : fuzzySearchResults;

  const sortedPreviews = (() => {
    switch (sortingOption) {
      case 'title-asc':
        return filteredPreviews.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return filteredPreviews.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'date-asc':
        return filteredPreviews
          .slice()
          .sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
      case 'date-desc':
        return filteredPreviews
          .slice()
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      default:
        return filteredPreviews;
    }
  })();

  const previewsToDisplay = sortedPreviews.slice(0, cardsToShow);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
        <h2>Loading...</h2>
      </div>
    );
  }

  if (showSeasonsPage) {
    return (
      <div>
        <h2>Seasons Page or Side</h2>
        <IconButton
          variant="outlined"
          onClick={() => setShowSeasonsPage(false)}
          style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
          size="small"
        >
          Back to Cards
        </IconButton>

        {/* Display the seasons data for the specific show */}
        {seasonData &&
          seasonData.map((season) => (
            <div key={season.id}>
              <h3>Season {season.number}</h3>
              <p>Episodes: {season.episodes}</p>
              <p>Release Date: {season.releaseDate}</p>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="Card-Box">
      <GenreFilter
        genres={genreNames}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {/* Combined dropdown for sorting and search */}
      <div className="DropdownMenu">
        <select
          value={sortingOption || ''}
          onChange={(e) => handleSortingOptionChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="date-asc">Date Ascending</option>
          <option value="date-desc">Date Descending</option>
        </select>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {previewsToDisplay.map((show) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
            <div className="card">
              <img src={show.image} className="card--image" alt={`Preview of ${show.title}`} />
              <h3>{show.title}</h3>
              <p>Seasons: {show.seasons}</p>
              <p>Last Updated: {show.lastUpdated}</p>
              <p>Genres: {show.genres.map((genreNumber) => genreNames[genreNumber - 1]).join(', ')}</p>

              {selectedCardId === show.id && (
                <div>
                  <p>{show.description}</p>
                  <IconButton
                    variant="outlined"
                    onClick={() => handleViewDetails(null)}
                    style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
                    size="small"
                  >
                    Close
                  </IconButton>
                </div>
              )}
              {!selectedCardId && (
                <div>
                  <IconButton
                    className="ViewButton"
                    onClick={() => handleViewDetails(show.id)}
                    style={{ color: 'lightBlue' }}
                  >
                    <InfoIcon />
                  </IconButton>

                  {/* Pass the show.id to handleShowSeasonsPage */}
                  <IconButton
                                     variant="outlined"
                    onClick={() => setShowSeasonsPage(true)}
                    style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
                    size="small"
                  >
                    Seasons
                  </IconButton>
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
         {cardsToShow < previews.length && (
        <IconButton
          variant="contained"
          onClick={handleShowMore}
          style={{ backgroundColor: 'grey', color: 'darkblue' }}
          size="small"
        >
          <ExpandMoreIcon /> 
        </IconButton>
      )}

      {cardsToShow > 8 && (
        <IconButton
          variant="contained"
          onClick={handleShowLess}
          style={{ backgroundColor: 'grey', color: 'darkblue' }}
          size="small"
        >
          <ExpandLessIcon /> 
        </IconButton>
      )}

    
    </div>
  );
};

export default Cards;