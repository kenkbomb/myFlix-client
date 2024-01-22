import React from "react";
import PropTypes from 'prop-types';
export const MovieCard = ({movieData,onMovieClick}) =>
{
    return <div onClick={()=>{onMovieClick(movieData)}}>{movieData.title}</div>;
};

MovieCard.PropTypes = {
    movie:PropTypes.shape({
        title:PropTypes.string.isRequired,
        director:PropTypes.string.isRequired,
        genre:PropTypes.string.isRequired,
        tagline:PropTypes.string,
        description:PropTypes.string,
        

    }).isRequired
};