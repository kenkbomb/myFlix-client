import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({movieData,onMovieClick}) =>
{
    return (
    <>
        <div title="click for more details!" style={{className:'card',display:'inline-block', cursor:"pointer",backgroundColor:'#fa921b',marginBottom:'5px', border:'1px solid',textAlign:'center',width:'80%'}} onClick={()=>{onMovieClick(movieData)}}>{movieData.title}
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
        imageURL:PropTypes.string
        }).isRequired
};