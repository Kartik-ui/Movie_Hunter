//chip component of material ui is used here to display the genres


import { Chip } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

const Genre = (props) => {
    const { selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        type,
        setPage
  } = props;
  
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);

  }

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
   

    
  }
    const fetchGenres = async () => {
      const {data}=  await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      // console.log('genre inside', data.genres);
      setGenres(data.genres);

      

  }
  // console.log("genres", genres);



    useEffect(() => {
      fetchGenres();
      
      return () => {
          //unmounting
         setGenres([]);
      }
      
      // eslint-disable-next-line 
    }, [])
    
  
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres && (selectedGenres.map((genre) => (

        <Chip
          label={genre.name}
          style={{ margin: 2,}}
          size="small"
          key={genre.id}

          color='primary'
          clickable 
          onDelete={()=>handleRemove(genre)}
          />
      )
      ))}

      {genres&&(genres.map((genre) => (
      
        <Chip label={genre.name}
          style={{ margin: 2, background: 'white' }}
          size="small"
          key={genre.id}
          clickable
          onClick={() => handleAdd(genre)} 
          
          /> 
      )
      ))}
    
      
    </div>
  )
}

export default Genre
