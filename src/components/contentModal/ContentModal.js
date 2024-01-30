//this component uses material ui Modal component

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { img_500, unavailable } from '../config';

import YouTubeIcon from '@mui/icons-material/YouTube';

import Carousel from '../Carousel/Carousel'

import './ContentModal.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height:'75%',
    bgcolor: '#39445a',
    boderRadius: 10,
     color: "white",
    border: '2px solid #000',
    boxShadow: 24,
    display: "flex",
    flexDirection:'column',
    
    alignItems: "center",
    justifyContent: "center",
    p: 4,

};

//to receive the everything from child component we have to provide here child ,now whole content of singleContent is imported here and the syle which we provided there ,must be provide here in the div that is showing all that content and it the div above Modal 


export default function ContentModal({ children, media_type, id }) {
    
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
        

        
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        // console.log('inside video', data);
        
        //if results[0] contains somedata then return its key
        setVideo(data.results[0]?.key);



    }

    useEffect(() => {
        fetchData();
        fetchVideo();
 // eslint-disable-next-line
    }, []);
    

    return (
        <>  
            {/* now  content of singleContent is here  */}
            <div onClick={handleOpen} className='media'>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                          {/* things we want to provide inside the box that will be open after clicking is here
                           */}
                            {content && (<div className='ContentModal'>

                                <img alt={content.name || content.title} className='ContentModal__portrait' src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                                />

                                <img alt={content.name || content.title} className='ContentModal__landscape' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable}
                                />

                                <div className='ContentModal__about'>

                                    <span className='ContentModal__title'>
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_data || content.release_date || "...."
                                        ).substring(0, 4)}
                                        )
                                    </span>


                                    {content.tagline && (
                                    <i className='tagline'>{content.taglin}</i>
                                    )}
                                    <span className='ContentModal__description'>{content.overview}</span>

                                    <div>

                                    <Carousel media_type={media_type} id={id} />                           </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="secondary"
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}>Watch the Trailer</Button>

                                </div>

                            </div>)}  
                      
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}