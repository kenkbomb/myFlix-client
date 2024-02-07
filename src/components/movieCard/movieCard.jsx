import React from "react";
import PropTypes from 'prop-types';
import { Col } from "react-bootstrap";
export const MovieCard = ({movieData,onMovieClick}) =>
{
    return <Col style={{cursor:"pointer",margin:'5px', border:'1px solid',borderRadius:'5px'}} onClick={()=>{onMovieClick(movieData)}}>{movieData.title}</Col>;
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