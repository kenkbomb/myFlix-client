import React from "react";
//import { MovieCard } from "../movieCard/movieCard";
import { Col,Button } from "react-bootstrap";
export const MovieView = ({movieData,onBackClick,addFav}) =>
{

    return (//this is the main movie view component, which displays all of the movies data/info
    <Col style={{textAlign:'center',border:'2px solid',marginTop:'15vw'}}> 
        <div>{movieData.imageURL}</div>
        <div>Title: {movieData.title}</div>
        <div> Director: {movieData.director}</div>
        <div>Released: {movieData.release}</div>
        <div>Genre: {movieData.genre}</div>
        <div>Tagline: {movieData.tagline}</div>
        <div>Description: {movieData.description}</div>
        <Button onClick={addFav()}>Favorite</Button>
        
        <Button onClick={onBackClick} >back</Button>
    </Col>
    );
};