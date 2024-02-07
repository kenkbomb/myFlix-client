import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../signupView/SignupView";
import { NavigationBar } from "../navigationBar/navigationBar";
import { ProfileView } from "../profileView/profileView";
import { HomeView } from "../homeView/HomeView";

import { Col, Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";//for routing
import '../../index.scss';//remove?



//---------------------------------------------------------------------------------------------------------------
export const MainView = () =>
{
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser?storedUser:null);
  const [token, setToken] = useState(storedToken?storedToken:null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function doLogout()
  {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
    console.log('go back to login page');
    <Navigate to = '/logout'/>;
    console.log("test");

  }


const deleteUser = () =>
{
  fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+ user.Username,
  {
    method:'DELETE',
    headers:{ Authorization: `Bearer ${token}`}
  }).then((response)=>
  {
    if(response.ok){
      alert('user was deleted');
    }
  }).catch(error =>
    {
      console.log(error)
    });


  //alert('delete button pressed, delete this user');
}


  const addFavorite = () =>
  {
    //const sm = 

      fetch(`https://myflixdb-162c62e51cf6.herokuapp.com/users/${user.Username}/favs/`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`,"Content-Type":"application/json"},
        body:JSON.stringify({MovieID:selectedMovie._id})
      }).then((response) => {
        if (response.ok) {
          alert('fav added!? check console log ' + selectedMovie._id + ' ' + selectedMovie.title);
          console.log(user.Favorites);
          console.log(response);
          console.log(user);
            return response.json();
            
        } else {
            alert("Failed to add");
        }
    }).catch(error => {
      console.error('Error: ', error);
  });
  }

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
                release:movie.Release,
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
   
//below, if no user exists, show the login or signup components...


  return (
    <BrowserRouter>
    <Container>
        <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
        />
      <Routes>
{/*-----------------------------------------------------------------------------------------------*/}
        <Route path="/" element = {
          <>
              <HomeView></HomeView>
              
          </>
        }></Route>
        
{/*-----------------------------------------------------------------------------------------*/}
        <Route
          path = '/login' element = {
          <>
            {user?(<Navigate to ='/'/>):(
            <LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}} />)}
          </>
          }
        />
{/*----------------------------------------------------------------------------------------*/}
        <Route path = 'logout' element = {
       <>
       {!user?(<Navigate to ='/login'/>):(
       <LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}} />)}
     </>
     }></Route>


{/*----------------------------------------------------------------------------------------*/}
    <Route path = '/signUp'  element = {
      <>
          {user?(<Navigate to='/'/>):(<SignupView/>)}
      </>
    }
  />

{/*------------------------------------------------------------------------------------------*/}
   


    {/*------------------------------------------------------------------------------------------*/}
    <Route style={{border:'2px solid black',marginTop:'10vw'}} path = '/profile' element = {
      <>
        {!user?(<Navigate to = '/login'/>):(<ProfileView  userData={user} moviesData={movies} deleteMe={deleteUser}/>)}
      </>
    }/>

    {/*-------------------------------------------------------------------------------------------*/}

    <Route path = '/movies' element = {

      <>
      {!selectedMovie?(
          <div style={{border:'2px solid black',marginTop:'10vw'}}>
          <Row >
            <Col></Col>
            <Col style={{textAlign:'center',border:'1px solid'}}>
            <h1>MyMOVIES</h1>
          {movies.map((movie) => {
            return (
              <div>
            <MovieCard 
            key = {movie.id} 
            movieData = {movie}
            onMovieClick = {(newSelectedMovie)=>{
                setSelectedMovie(newSelectedMovie);
              // alert(movie.title.toString());
              alert(newSelectedMovie.title + ' clicked');
            }} />
            </div>
            );
          })}
          <button style={{marginTop:'5px',marginBottom:'5px'}}  onClick={() => { { doLogout/*setUser(null); setToken(null); localStorage.clear(); */}}}>Logout</button>
          </Col>
          <Col></Col>
        </Row>
        </div>): (<MovieView movieData = {selectedMovie} onBackClick = {()=>setSelectedMovie(null)} addFav={addFavorite} />)
    }
    
    </>
    }/>

        </Routes>
</Container>
        </BrowserRouter>
  )
     
  
{/*
//--------------------------------------------------------------------------------------------
    if(selectedMovie)//if a movie has been selected, return/show the 'MovieView' component...
    {
        return <MovieView movieData = {selectedMovie} onBackClick = {()=>setSelectedMovie(null)}/>;
    };
//-------------------------------------------------------------------------------------------------

  return (
    <div style={{border:'2px solid black'}}>
      <Row >
        <Col></Col>
        <Col style={{textAlign:'center',border:'1px solid'}}>
        <h1>My Flix</h1>
      {movies.map((movie) => {
        return (
          <div>
        <MovieCard 
        key = {movie.id} 
        movieData = {movie}
        onMovieClick = {(newSelectedMovie)=>{
            setSelectedMovie(newSelectedMovie);
           // alert(movie.title.toString());
        }} />
        </div>
        );
      })}
      <button style={{marginTop:'5px',marginBottom:'5px'}}  onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </Col>
      <Col></Col>
    </Row>
    </div>
  );
  //------------------------------------------------------------------------------
    */}
};