import React from "react";
import { useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
export const MainView = () =>
{
    const [movies,setMovies] = useState([
        {id:1,title:'The Thing',director:'john carpenter',released:'1982',imageURL:'--'},
        {id:2,title:'Invasion of the Body Snatchers',director:'someguy',released:'1978',imageURL:'--'},
        {id:3,title:'It Follows',director:'willy yanker',released:'2013',imageURL:'--'},
        {id:4,title:'Night of the Living Dead',director:'george a romero',released:'1968',imageURL:'--'}
    ]);

    if(movies.length === 0)
    {
        return <div>The list is empty!</div>;
    }
    const [selectedMovie,setSelectedMovie] = useState(null);
    //return <p>mainview placeholder </p>
    if(selectedMovie)
    {
        return <MovieView movieData = {selectedMovie} onBackClick = {()=>setSelectedMovie(null)}/>;
    };
    

  return (
    <div>
      {movies.map((movie) => {
        return <MovieCard
        key = {movie.id} 
        movieData = {movie}
        onMovieClick = {(newSelectedMovie)=>{
            setSelectedMovie(newSelectedMovie);
            alert(movie.title.toString());
        }} />;
      })}
    </div>
  );
};