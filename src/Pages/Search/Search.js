import { Button, createTheme, Tabs,Tab, TextField, ThemeProvider,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = () => {
  
  //if we provide here 0 bydefault movie will be selected and if provide 1 series will be selected

  //if don't provide anything nothing will be selected but it will give result as movie because ${type ? "tv" : "movie"} here if type doesn't have anything it will return movie

  const [type, setType] = useState(0);
  const [page, setPage] = useState();
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState(0);
  

  const darkTheme = createTheme({
    palette: {
      mode:'dark',
      primary: {
        main:"#fff"
      },
  
    },
  });

  const fetchSearch = async () => {
    try {

      //if type is 0 movie will be selected and if 1 tv will be selected
      
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

      // console.log("movies data", data);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    }
    catch (error) {
      console.log(error);
    }

    
  }
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
     // eslint-disable-next-line
  }, [type,page]);
  
  return (
    <div>
      {/* <span className='pageTitle'>Search</span> */}
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0"}}>
          <TextField
            sx={{
              
              flex: 1,
              color: "white"
            }}
      
            label="Search" variant="filled"
            onChange={(e) => setSearchText(e.target.value)} />
          
          <Button variant="contained" onClick={fetchSearch}>
            <SearchIcon fontSize='large' />
          </Button>
          
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            // it returns 0 or 1 and so on according to number of tab
            // console.log("searh", newValue);
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5}}
        >

          <Tab style={{ width: "50%", color: '#fff' }} label="Search Movies"/>
          <Tab style={{ width: "50%", color: '#fff' }} label="Search Tv Series" />
        </Tabs>
       
      </ThemeProvider>

      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              media_type={type ? "tv" : "movie"}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average} />

          ))
        }
        {searchText &&
          !content &&
          (<h2>Please Press SearchIcon after entry</h2>)}

      </div>
      {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
      
     
      
    </div>
  )
}

export default Search
