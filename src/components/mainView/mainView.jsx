import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../signupView/SignupView";
import { Col } from "react-bootstrap";
import {Row} from "react-bootstrap";
//import {Col} from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
//import '../../components/style.css';
import '../../index.scss';

//---------------------------------------------------------------------------------------------------------------
export const MainView = () =>
{
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser?storedUser:null);
  const [token, setToken] = useState(storedToken?storedToken:null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
   //------------------------------------------------------------------------------------------------------------
    useEffect(()=>
    {
      if(!token){return;}//if theres no token present yet, exit this function, ei...do not call fetch...

      //if there IS a token present fetch is called...
        fetch('https://myflixdb-162c62e51cf6.herokuapp.com/movies',
        {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>response.json())
        .then((data)=>{
          console.log(data);
          const moviesFromApi = data.map((movie)=>
          {
              return{
                _id:movie._id,
                title:movie.Title,
                director:movie.Director,
                released:movie.Released,
                imageURL:movie.ImageURL,
                genre:movie.Genre,
                tagline:movie.Tagline,
                description:movie.Description
                
              };
          });
          setMovies(moviesFromApi);
        });

    },[token]);

    /*Notice that you’ll need to add token to the second argument of useEffect(). This is known as the dependency array, and it ensures fetch is called every time token changes (for example, after the user logs in). An if statement has also been added to check for token, as there’s no reason to execute the fetch call if there’s no token yet.*/
//-------------------------------------------------------------------------------------------
   


if (!user) {
  return (
    <>
    <LoginView
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
    />or <SignupView/></>
  );
}
//--------------------------------------------------------------------------------------------
    if(selectedMovie)//if a movie has been selected, return/show the 'MovieView' component...
    {
        return <MovieView movieData = {selectedMovie} onBackClick = {()=>setSelectedMovie(null)}/>;
    };
//-------------------------------------------------------------------------------------------------

  return (
    <div>
      <Row >
        <Col></Col>
        <Col>
        <h1>My Flix</h1>
      {movies.map((movie) => {
        return <MovieCard
        key = {movie.id} 
        movieData = {movie}
        onMovieClick = {(newSelectedMovie)=>{
            setSelectedMovie(newSelectedMovie);
           // alert(movie.title.toString());
        }} />;
      })}
      <button className="button"  onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </Col>
      <Col></Col>
    </Row>
    </div>
  );
  //------------------------------------------------------------------------------
  
};