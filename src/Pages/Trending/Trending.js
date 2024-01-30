import axios from 'axios'
import React,{useState,useEffect} from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css'

const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);


  const fetchTrending = async () => {
    //here we are using data inside {} because we are destructuring the data which we are receiving



    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    // console.log("console.data",data);
    
    setContent(data.results);
  }

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line 
  }, [page]);
  
  return (
    <div>
      <span className='pageTitle'>Trending Today</span>
      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              media_type={c.media_type}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average} 
              
              />
            
          ))
        }
        
      </div>
      <CustomPagination setPage={setPage}/>

    </div>
  )
}

export default Trending
