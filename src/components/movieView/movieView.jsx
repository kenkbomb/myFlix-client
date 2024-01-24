import React from "react";
//import { MovieCard } from "../movieCard/movieCard";
import { Col } from "react-bootstrap";
export const MovieView = ({movieData,onBackClick}) =>
{
    return (//this is the main movie view component, which displays all of the movies data/info
    <Col style={{textAlign:'center',border:'2px solid'}}> 
        <div>{movieData.imageURL}</div>
        <div>Title: {movieData.title}</div>
        <div> Director: {movieData.director}</div>
        <div>Released: {movieData.release}</div>
        <div>Genre: {movieData.genre}</div>
        <div>{movieData.tagline}</div>
        <div>{movieData.description}</div>
        
        <button style={{marginBottom:'5px'}} onClick={onBackClick} >back</button>
    </Col>
    );
};