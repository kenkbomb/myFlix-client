import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../signupView/SignupView";
import { NavigationBar } from "../navigationBar/navigationBar";
import { ProfileView } from "../profileView/profileView";
import { Col, Container,Button,Form,Row,Form } from "react-bootstrap";
import { BrowserRouter,Route,Routes,Navigate,useNavigate,Link,useParams } from "react-router-dom";//for routing
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
  const [selectedMovie, setSelectedMovie] = useState('');
  //search hooks---------------------------------------------------
  const [search,setSearch] = useState('');
  const [match,setMatch] = useState([]);
  //search button vars---------------------------------------------
  const [buttonSearch,setButtonSearch] = useState(false);//a toggle bool to help with search logic...
  const [searchButtonText,setSearchButtonText] = useState('Search by Genre');//the text of the search button...
  const [fav,setFav] = useState(false);
  const [f,s] = useState(0);
  const {params} = useParams();
  const [path,setPath] = useState('');
  const [mp,setmp] = useState('');
 //----------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------------
  function doLogout()
  {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
    //console.log('go back to login page');
    //<Navigate to = '/login'/>;
    //console.log("test");
    alert('Returning to Login');
    //navigate('login');
  }//------------------------------------------------------------------------------------------------------------
 
const onBackClick=()=>
{
  setSelectedMovie(null);//reset this to null if issues
  s(f+1);
  history.go(-1);
  }
  
  useEffect(()=>
    {
      if(!user){return;}//if there is no user, end this function...
  
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+user.Username,
      {headers:{Authorization: `Bearer ${token}`}})
          .then((response)=>response.json())
          .then((data)=>{
            setUser(data);
            
          })},[f]);
  
  //--------------------------------------------------------------------------------------------------------------
  //Below, the 'search by genre' function logic...
  //---------------------------------------------------------------------------------------------------------------
  const doSearch =() =>
  {
    if(search==='')
      {
        setSearchButtonText('Search by Genre');
      }
      else{setSearchButtonText('Show All')}

    setMovies(moviesFromApi);

     matches= movies.filter((m)=>{ return m.genre.toLowerCase().includes(search.toLowerCase())});

    s(f+1);//force update
   if(search ===''||matches.length===0&&movies.length===moviesFromApi.length)//clean but empty search, no match
   {
    alert('no matches found for '+search+ ', please rephrase as thriller, action, drama, noir, horror, comedy...');
    setSearchButtonText('Search by Genre');
  }
   if(search!=''&& movies.length===moviesFromApi.length)//first clean search...
   {
      setMatch(JSON.stringify(matches));
      setMatch(match.map((movie)=>{console.log(movie.title)}));
      setMovies(moviesFromApi);
    }
    if(search!=''&&movies.length<moviesFromApi.length)//dirty search...
    {
      alert('back to full list');
      
      setSearch('');
      setSearchButtonText('Search by Genre');
    }
    if(matches.length!=0&&matches.length!=11)
    {
     //do nothing...
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
//------------------------------------------------------------------------------------------------------------
    useEffect(()=>
    {
      
      if(!token){return;}//if theres no token present yet, exit this function, ei...do not call fetch...

      //if there IS a token present fetch is called...
        fetch('https://myflixdb-162c62e51cf6.herokuapp.com/movies',
        {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>response.json())
        .then((data)=>{
         
          
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
          //----------------------------------------------------------------------------------------------------
          
            //---------------------------------------------------------------------------------------------------
          if(search==='')
          {
           
           setMovies(moviesFromApi);
          }
          if(search!='' && matches.length!=0)//bug here
          {
          
            setMovies(matches);
            
          }
        });

    },[token,match,buttonSearch,user,f]);//empty dependancy array is the same as using an 'onMount',which means only call/do once...

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
                update={onBackClick}
                
        />
      <Routes>
{/*-----------------------------------------------------------------------------------------------*/}
        <Route path="/" element = {
          <>
             {user?(<Navigate to = '/movies' onClick={()=>{s(f+1)}}/>):<Navigate to = '/login'/>}
          </>
        }></Route>
        
{/*-----------------------------------  The login view  ------------------------------------------------------*/}
        <Route
          path = '/login' element = {
          <>
            {user?(<Navigate to ='/'/>):(
            <LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}} />)}
          </>
          }
        />
{/*---------------------------------  logout, goes to login view  --------------------------------------------------*/}
        <Route path = '/logout' element = {
       <>
       {!user?(<Navigate to ='/login'/>):(
       <LoginView onLoggedIn={(user, token) => {setUser(user);setToken(token);}} />)}
     </>
     }></Route>
{/*--------------------------------------  the signup view  --------------------------------------------------------*/}
    <Route path = '/signUp'  element = {
      <>
          {user?(<Navigate to='/'/>):(<SignupView   />)}
          
      </>
    }
  />
{/*--------------------------------------   Profile view  ----------------------------------------------------*/}
    <Route style={{border:'2px solid black',marginTop:'10vw'}} path = '/profile' element = {
      <>
        {!user?(<Navigate to = '/signup'/>):(<ProfileView userData={user} moviesData={moviesFromApi} deleteMe={deleteUser} token={token} setUser={setUser} logout={doLogout} f={f} s={s} />)}
      </>
    }/>
    
   
{/*-----------------------main movie list view, for when the user has not selected a movie----------*/}
    <Route path = '/movies' element={
      <div>
       {!selectedMovie? (<div style={{backgroundColor:'rgb(31, 30, 30)'}}>
           
           <Row>
             
         <Col style={{marginTop:'50px',textAlign:'center',borderRadius:'10px',marginBottom:'10px',}}>
         <Form.Group controlId="search">
         <Form.Control placeholder="type in: action, comedy, thriller, horror, drama or noir" className="w-50 m-auto"  type = 'text' value={search} onChange={(e)=>setSearch(e.target.value)} required></Form.Control>
         </Form.Group>
         
         <Button style={{backgroundColor:'#d13028',border:'none'}} className="button" title="thriller, comedy, action,drama, noir, horror" type = 'submit' onClick={doSearch}>{searchButtonText}</Button>
           </Col>
           </Row>
 
             <h3 style={{textAlign:'center',color:'red'}}>MyMOVIES</h3>
 
             <section style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:'5px'}}>
               
           {
           
           movies.map((movie) => {
            return (
              <Link to={`/movies/${encodeURIComponent(movie.title)}`}> 
            <
              MovieCard className='card'
              key = {movie.id} 
              movieData = {movie}
              userData={user}
              onMovieClick = {(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie);
                console.log(newSelectedMovie.title + ' test here');
                
                setmp('/movies/'+newSelectedMovie.title);
               
                }}
            />
            </Link>
            );
            
          })}
           {/*end of movies map*/}
           </section>
       
         </div>):null
    }
      </div>
      
    }/>

{/*-------------------------detailed movie view, when the user has selected a movie-------------------------*/}

     <Route path='/movies/:title' element={
      <>
      {selectedMovie?(<MovieView movieData = {selectedMovie} onBackClick={onBackClick} user={user} token={token} />):null}
      </>
    }/>
{/*-------------------------------------------------------------------------------------------*/}
   

    

        </Routes>
          </Container>
            </BrowserRouter>
  )
     };