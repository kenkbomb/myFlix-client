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

import { Col, Container,Button,Row,Form } from "react-bootstrap";

import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";//for routing
import '../../index.scss';//remove?


let matches = [];
let moviesFromApi = [];

//---------------------------------------------------------------------------------------------------------------
export const MainView = () =>
{
  //user and token vars--------------------------------------------
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser?storedUser:null);
  const [token, setToken] = useState(storedToken?storedToken:null);
  //movie data hooks-----------------------------------------------
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //search hooks---------------------------------------------------
  const [search,setSearch] = useState('');
  const [match,setMatch] = useState([]);
  //search button vars---------------------------------------------
  const [buttonSearch,setButtonSearch] = useState(false);//a toggle bool to help with search logic...
  const [searchButtonText,setSearchButtonText] = useState('Search');//the text of the search button...
 //----------------------------------------------------------------------------------------------------
 
  //--------------------------------------------------------------------------------------------------------------
  function doLogout()
  {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
    //console.log('go back to login page');
    <Navigate to = '/logout'/>;
    //console.log("test");
    alert('Returning to Login');

  }//------------------------------------------------------------------------------------------------------------
  function gotoLogin()
  {
    alert('Please Login');
    <Navigate to ={'/login'}/>;//not going to work, overriden at the markup section via conditional rendering...
    
  }
  //--------------------------------------------------------------------------------------------------------------
  //Below, the 'search' function logic...
  //---------------------------------------------------------------------------------------------------------------
  const doSearch =() =>
  {
    if(search==='')
      {
        setSearchButtonText('Search');
      }
      else{setSearchButtonText('Back')}

    setMovies(moviesFromApi);

     matches= movies.filter((m)=>{ return m.genre.toLowerCase().includes(search.toLowerCase())});

    
   if(search ===''||matches.length===0&&movies.length===moviesFromApi.length)//clean but empty search, no match
   {
    alert('no matches found for '+search+ ', please rephrase...');
   // console.log('no matches found! ' + matches.length);
    //console.log(JSON.stringify(moviesFromApi) + ' from moviesFromApi');
    
    setSearchButtonText('Search');
  }
   if(search!=''&& movies.length===moviesFromApi.length)//first clean search...
   {
      //console.log('this is the search result: ' + JSON.stringify(matches));
      //console.log(matches.length + ' test match length');
      //console.log(movies);
      
      setMatch(JSON.stringify(matches));
      setMatch(match.map((movie)=>{console.log(movie.title)}));
      //console.log(matches.length);
      setMovies(moviesFromApi);
    }
    if(search!=''&&movies.length<moviesFromApi.length)//dirty search...
    {
      alert('back to full list');
      
      setSearch('');
      setSearchButtonText('Search');
    }
    if(matches.length!=0&&matches.length!=11)
    {
     // console.log('reset search jank');
    }
    setButtonSearch(!buttonSearch);
  }
//-----------------------------------------------------------------------------------------------------------
//below, the delete user logic...
//-----------------------------------------------------------------------------------------------------------
const deleteUser = () =>
{
  fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+ user.Username,
  {
    method:'DELETE',
    headers:{ Authorization: `Bearer ${token}`}
  }).then((response)=>
  {
    if(response.ok){
      alert('user ' + user.Username + " has 'unsubscribed'!");
      localStorage.clear();
      setUser(null);
      setToken(null);//** */
      <Navigate to={'/'}/>
    }
  }).catch(error =>
    {
      console.log(error)
    });
}
//-----------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------
 
//------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------
    useEffect(()=>
    {
      if(!token){return;}//if theres no token present yet, exit this function, ei...do not call fetch...

      //if there IS a token present fetch is called...
        fetch('https://myflixdb-162c62e51cf6.herokuapp.com/movies',
        {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>response.json())
        .then((data)=>{
         // console.log(data);
          
          moviesFromApi = data.map((movie)=>
          {
              return{
                _id:movie._id,
                title:movie.Title,
                director:movie.Director,
                release:movie.Release,
                imageURL:movie.Imagepath,
                genre:movie.Genre,
                tagline:movie.Tagline,
                description:movie.Description
                
              };
          });
        
          if(search==='')
          {
           // console.log('match length is ' + matches.length);
           
          setMovies(moviesFromApi);
          }
          if(search!='' && matches.length!=0)//bug here
          {
          
           // console.log('matches found on ' + search+ ' ' + matches.length );
            setMovies(matches);
           
          }
        });

    },[token,match,buttonSearch,user]);//empty dependancy array is the same as using an 'onMount',which means only call/do once...

    /*Notice that you’ll need to add token to the second argument of useEffect(). This is known as the dependency array, and it ensures fetch is called every time token changes (for example, after the user logs in). An if statement has also been added to check for token, as there’s no reason to execute the fetch call if there’s no token yet.*/
//-------------------------------------------------------------------------------------------------------------
   
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
      <Routes >
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
        <Route path = '/logout' element = {
       <>
       {!user?(<Navigate to ='/login'/>):(
       <LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}} />)}
     </>
     }></Route>
{/*------------------------------------------------------------------------------------------------*/}
    <Route path = '/signUp'  element = {
      <>
          {user?(<Navigate to='/'/>):(<SignupView gotoLogin={gotoLogin} />)}
      </>
    }
  />
{/*------------------------------------------------------------------------------------------*/}
    <Route style={{border:'2px solid black',marginTop:'10vw'}} path = '/profile' element = {
      <>
        {!user?(<Navigate to = '/signup'/>):(<ProfileView userData={user} moviesData={movies} deleteMe={deleteUser} token={token} setUser={setUser} logout={doLogout} />)}
      </>
    }/>
{/*-------------------------------------------------------------------------------------------*/}

    <Route path = '/movies' element = {

      <>
      {!selectedMovie?(
        
          <div style={{border:'2px solid #c3ecfa',borderRadius:'10px',marginTop:'5vw',backgroundColor:'cornflowerblue'}}>
           
          <Row >
            <Col></Col>
            <Col style={{textAlign:'center',border:'1px solid #c3ecfa',backgroundColor:'whitesmoke'}}>
        <Form.Group controlId="search">
        <Form.Control className="searchInput" type = 'text' value={search} onChange={(e)=>setSearch(e.target.value)} required></Form.Control>
        </Form.Group>
        <Button className="button" type = 'submit' onClick={doSearch}>{searchButtonText}</Button>

            <h1>MyMOVIES</h1>
          {movies.map((movie) => {
            return (
              <div>
            <MovieCard className='card'
            key = {movie.id} 
            movieData = {movie}
            onMovieClick = {(newSelectedMovie)=>{
                setSelectedMovie(newSelectedMovie);
              
            }} />
            </div>
            );
          })}{/*end of movies map*/}
          
          </Col>
          <Col></Col>
        </Row>
        </div>): (<MovieView movieData = {selectedMovie} onBackClick = {()=>setSelectedMovie(null)} user={user} token={token} />)
    }
    
    </>
    }/>

        </Routes>
</Container>
        </BrowserRouter>
  )
     
  

};