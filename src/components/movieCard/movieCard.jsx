import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({movieData,onMovieClick}) =>
{
    return (
    <>
        <div style={{className:'card', cursor:"pointer" ,backgroundColor:'#fa921b',margin:'5px', border:'1px solid',borderRadius:'5px'}} onClick={()=>{onMovieClick(movieData)}}>{movieData.title}
        </div>
    
    </>)
};

MovieCard.PropTypes = {
    movie:PropTypes.shape({
        title:PropTypes.string.isRequired,
        director:PropTypes.string.isRequired,
        genre:PropTypes.string.isRequired,
        release:PropTypes.string,
        tagline:PropTypes.string,
        description:PropTypes.string,
        }).isRequired
};