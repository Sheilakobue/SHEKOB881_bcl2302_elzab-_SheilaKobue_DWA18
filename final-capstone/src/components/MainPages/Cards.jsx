import { useEffect, useState, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import searchIcon from '../Images/magnifying-glass.png'
import Fuse from 'fuse.js';
import axios from 'axios';
import { Box } from '@mui/material';

const Cards = () => {
  const [previewData, setPreviewData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingShow, setLoadingShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filteredPreviews, setFilteredPreviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // New state variable for filtered data
  const [descriptionVisible, setDescriptionVisible] = useState(false); // State for description visibility
  const [backIconLabel, setBackIconLabel] = useState('Back to Show List');


  const genreTitleMapping = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  useEffect(() => {
     setLoading(true);
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviewData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  const fetchShowDetails = async (showId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://podcast-api.netlify.app/id/${showId}`);
      const data = response.data;
      setShowData(data);
      setSelectedSeason(null);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching show details:', error);
      
    }
  };

  const handleShowClick = (showId) => {
    fetchShowDetails(showId);
  };
const handleGenreClick = (genreId) => {
  setSelectedGenre(genreId === selectedGenre ? null : genreId);
};
  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  useEffect(() => {
    filterPreviews();
  }, [searchQuery, sortBy, previewData, selectedGenre]); // Update dependencies

  const filterPreviews = () => {
    let filteredPreviews = [...previewData];

    // Filter by title
    if (searchQuery) {
      const fuse = new Fuse(filteredPreviews, { keys: ['title'] });
      filteredPreviews = fuse.search(searchQuery).map((result) => result.item);
    }
    // Filter by genre (assuming you have selectedGenre as a state variable)
    if (selectedGenre) {
      filteredPreviews = filteredPreviews.filter((preview) =>
        preview.genres.includes(parseInt(selectedGenre))
      );
    }
        // Sort the previews based on sortBy
    if (sortBy === 'title') {
      filteredPreviews.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-az') {
      filteredPreviews.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'seasons') {
      filteredPreviews.sort((a, b) => a.seasons - b.seasons);
    } else if (sortBy === 'date') {
      filteredPreviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredPreviews(filteredPreviews);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

   const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
        <h2>Loading...</h2>
      </div>
    );
  }
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!showData) {
    return (
      <Box className="Box-container">
      
      <img src={searchIcon} alt="Search Icons" className='Icons' />
    
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />

  <div className="Card-Box">
  <h3>Filter by Genre:</h3>
  {Object.entries(genreTitleMapping).map(([genreId, genreTitle]) => (
    <button
      key={genreId}
      onClick={() => handleGenreClick(parseInt(genreId))}
      style={{
        backgroundColor: selectedGenre === parseInt(genreId) ? 'blue' : 'lightblue',
        color: selectedGenre === parseInt(genreId) ? 'white' : 'black',
        border: '1px solid blue',
        padding: '5px',
        margin: '2px',
        cursor: 'pointer',
      }}
    >
      {genreTitle}
    </button>
  ))}
  <button className='Genre-Buttons'
    onClick={() => setSelectedGenre(null)}
    style={{
      backgroundColor: selectedGenre === null ? 'blue' : 'lightblue',
      color: selectedGenre === null ? 'white' : 'black',
      border: '1px solid black',
      padding: '5px',
      margin: '2px',
      cursor: 'pointer',
    }}
  >
    All Genres
  </button>
</div>

        {/* Sort select */}
        <select className='Sort-By' value={sortBy} onChange={handleSortChange}>
          <option value="choose">Choose</option>
          <option value="date">Sort by Date (A-Z)</option>
          <option value="date">Sort by Date (Z-A)</option>
          <option value="title">Sort by Title (A-Z)</option>
          <option value="title-az">Sort by Title (Z-A)</option>
        </select>

        {/* Header Component */}
        <div className="card-box">
          <Grid container spacing={3}>
            {filteredPreviews.map((show) => (
              <Grid item xs={12} sm={6} md={4} key={show.id}>
                <div className="preview-item">
                  <div className="card--image">
                    <img src={show.image} alt={show.title} className="preview-image" />
                  </div>

                  <div className="info">
                    <h3>Title: {show.title}</h3>
                    <p>Genre: {show.genres.map((genreId) => genreTitleMapping[genreId]).join(',')}</p>
                    <p>Seasons: {show.seasons}</p>
                    {/* Toggle description visibility */}
                    {descriptionVisible && <p>Description: {show.description}</p>}
                    <p>Last Updated:{formatDate(show.updated)} </p>
                  </div>

                  <div className='buttons'>
                    <button 
                    style={{
                    backgroundColor:  'lightblue',
                    color:'darkblue',
                    border: '1px solid blue',
                    padding: '5px',
                    margin: '2px',
                    cursor: 'pointer',
                        }}
                    onClick={() => handleShowClick(show.id)}>Seasons
                    </button>
                    {/* Toggle description visibility on button click */}

                    <button 
                     style={{
                    backgroundColor:  'lightblue',
                    color:'darkblue',
                    border: '1px solid blue',
                    padding: '5px',
                    margin: '2px',
                    cursor: 'pointer',
                        }}
                    onClick={() => setDescriptionVisible(!descriptionVisible)}>
                      {descriptionVisible ? 'Hide Description' : 'Show Description'}

                    </button>
                  </div>
                  
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    );
  }

  return (
    <div className="season-container">
      <IconButton
          variant="outlined"
          style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
          size="small"
          onClick={() => setShowData(null)}>
      <ArrowBackIcon />
          </IconButton>
      
        <h2>{showData.title}</h2>
        {showData.seasons.map((season) => (
          <div key={season.number}>
            <h3>Season {season.number}</h3>
            {selectedSeason === season.number ? (
              <ul>
                {season.episodes.map((episode) => (
                  <Fragment key={episode.id}>
                    <h4>{episode.name}</h4>
                    <li>{episode.title}</li>
                    <p>{episode.description}</p>
                    <audio controls>
                      <source src={episode.file} />
                    </audio>
                  </Fragment>
                ))}
              </ul>
            ) : (
              <div>
              
                <img className="seasons" src={season.image} alt={`Season ${season.number}`} />
                <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
                {season.episodes.length} Episodes
                
                
              </div>
            )}
          </div>
        ))}
      </div>
    
  );
};

export default Cards;