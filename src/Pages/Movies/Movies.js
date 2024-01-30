import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Genre from '../../components/Genre';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';


const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  
 //it is for genres which we see at the top of movies
  
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [genres, setGenres] = useState([]);
  

  //converting the selected genres into string 
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);

    // console.log("movies data", data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  //here we have passes page and genreforURL as dependencies ,because if either of them will change useEffect will call again , genreforURL refers here selected genres
  
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page,genreforURL])


  return (

    <div>
      <span className='pageTitle'> Movies For You </span>
      <Genre
        type="movie"
        selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
       
      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              media_type='movie'
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average} />

          ))
        }

      </div>
      {numOfPages > 1 &&
        (<CustomPagination setPage={setPage} numOfPages={numOfPages}/>)
      }

    </div>
  )
}

export default Movies
