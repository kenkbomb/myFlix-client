import React from "react";
//import { MovieCard } from "../movieCard/movieCard";
export const MovieView = ({movieData,onBackClick}) =>
{
    return (
    <div> 
        <div>{movieData.imageURL}</div>
        <div>{movieData.title}</div>
        <div>{movieData.director}</div>
        <div>{movieData.released}</div>
        
        <button onClick={onBackClick} >back</button>
    </div>
    );
};