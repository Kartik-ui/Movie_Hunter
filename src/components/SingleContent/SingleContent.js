import { Badge } from '@mui/material'
import React from 'react'
import { img_300, unavailable } from '../config'
import ContentModal from '../contentModal/ContentModal'


import './SingleContent.css'

function SingleContent(props) {
    //destructuring
    const {id,poster,title,date,media_type,vote_average}=props
  return (

    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average>6?'primary':'secondary'} />
      <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {media_type === 'tv' ? "Tv series" : "Movie"}
        <span className='subTitle'>{date}</span>
      </span>
    </ContentModal>
  )
  
}

export default SingleContent
