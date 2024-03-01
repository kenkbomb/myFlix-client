import React from "react";
import { Button, Col,Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect,useRef } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";

export const ProfileView = ({userData,moviesData,deleteMe,token,logout}) =>
{
   // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [show,toggleShow] = useState(false);
    const [theUserData,setTheUserData] = useState(userData);
    const [favs,setFavs] = useState(moviesData.filter(m => theUserData.Favorites.includes(m._id)));
    const [f,s] = useState(0);
    const [selectedMovie,setSelectedMovie] = useState(null);
    //const [delBn,setDelbn] = useState();//the actual button
    const [lockbn,setLockbtn] = useState('click to unlock the delete user button');
    const lockbtn = useRef();//the switch
    const delBtn = useRef();//the actual button 
    
    //------------------------------------------------------------------------------------------------------
      //below the useEffect that handles the favorites list...
    //------------------------------------------------------------------------------------------------------
    useEffect(()=>
    {
      //if(!user){return;}//if there is no user, end this function...
  
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+userData.Username,
      {headers:{Authorization: `Bearer ${token}`}})
          .then((response)=>response.json())
          .then((data)=>{
            setTheUserData(data);
            setFavs(moviesData.filter(m => data.Favorites.includes(m._id)));
          })},[f]);
   //------------------------------------------------------------------------------------------------------------
   
//-------------------------------------------------------------------------------------------------------------
//below, remove a favorite from the user...          
//---------------------------------------------------------------------------------------------------------------
    const removeFav = (movie) =>
    {
      
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+userData.Username+'/favs/'+movie._id,
      {
        method: "DELETE",
        headers: { Authorization: 'Bearer '+token,"Content-Type":"application/json"},
       
      }).then((response) => {
        if (response.ok) {
          
         alert('fav movie ' + movie.title+ ' removed from '+ userData.Username+"'s favorites!");
         //console.log(f);
         console.log(response);
          //console.log('re-render the view, update the fav list');
          s(f+1);//used to update the useEffect...
         return response.json();
        
      } else {
            alert("Failed to remove fav, " + movie.title+' ' + response);
        }
    }).catch(error => {
      console.error('Error: ', error);
  });
}
  //----------------------------------------------------------------------------------------------------------
  //below, update user
  //-----------------------------------------------------------------------------------------------------------
    const updateUser =(event) =>
    {
        event.preventDefault();

        const data = {
            Username: userData.Username,
            Password: password,
            Email: email,
            Birthday: birthday
            };

        fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+userData.Username,
      {
        method: "PUT",
        headers: { Authorization: 'Bearer '+token,"Content-Type":"application/json"},
        body:JSON.stringify(data)//the data object to be sent to update the users data/profile...
      }).then((response) => {
        if (response.ok) {
          alert('user updated!'+ userData);
         
        localStorage.setItem('user',JSON.stringify(data));
        localStorage.setItem('token',data.token);

        console.log(response);
        userData = data;//******************  updates the old userData with the new data taken from the form!!! */
         // console.log(JSON.stringify(userData))  logs out the stringified NEW UPDATED userdata!!! */
          s(f+1);//re-render the view...
          
          logout();// calls logout from mainview as a prop function, to go back to the login page after updating user...
            return response.json();//return the response of the request...
            
        } else {
            alert("Failed to update" + response);
        }
    }).catch(error => {
      console.error('Error: ', error);
  });
    }
//--------------------------------------------------------------------------------------------------------------
    //below, the jsx markup code...
//--------------------------------------------------------------------------------------------------------------
return (
        <>
        <Col className="profileViewTop">
            <Button title='click to edit the user profile' className="button" id='editbtn'  onClick={()=>{toggleShow(!show)}}>{show? 'Close Form':'Edit Profile'}</Button>
        {show && <Form className="editForm">
       {/* <h2>{userData.Username}</h2>
        <Form.Group controlId="formUserName">
        <Form.Label>Username: </Form.Label>
        <Form.Control type = 'text' value={username} onChange={(e)=>setUsername(e.target.value)} required minLength='3'></Form.Control>
        </Form.Group>*/}
      
        <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type = 'password' value={password} onChange={(e)=>setPassword(e.target.value)} required minLength='3'></Form.Control>
        </Form.Group>

        <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type = 'email' value={email} onChange={(e)=>setEmail(e.target.value)} required ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control type = 'date' value={birthday} onChange={(e)=>setBirthday(e.target.value)} required></Form.Control>
        </Form.Group>
        <div className="confirmUpdate">
        <Form.Group>
        <Button className="button" id = 'subbut' type = 'submit' onClick={updateUser}>Submit</Button>
        <Button ref={delBtn} id="delbut" title="click to unsubscribe and delete this account" disabled className="button" style={{marginLeft:'5px'}} onClick={deleteMe}>Delete</Button>
        
        <Form.Check title ='click to lock and unlock the unsubscribe/delete user button.' style={{color:'#d13028'}} ref={lockbtn} type = 'switch' label = {lockbn} onClick={()=>{
          if(delBtn.current.disabled)
          {
          delBtn.current.disabled=false;
          
          setLockbtn('click to lock the delete user button');
          
          }
          else{
           
              setLockbtn('click to unlock the delete user button');
             
              delBtn.current.disabled = true;
              
          }
       // alert('delete button is disabled?'+' '+delBtn.disabled+' '+lockbtn.label);
        }}>

        </Form.Check>
        </Form.Group>
        </div>
      </Form>}

      <section className="profileView">
        <ul style={{listStyle:'none', textAlign:'center',color:'whitesmoke'}}><h3>On File...</h3> 
          <li>Username: {userData.Username} </li>
          <li> Email: {userData.Email} </li>
          <li> Birthdate: {userData.Birthday}</li>
        </ul>
      </section>
            {/*favs section------------------------------------------------------------------------------   */}
            
        <div className="favsList">
          
            {favs.length>0?<h3 style={{textAlign:'center',textDecoration:'underLine',textTransform:'capitalize',color:'#d13028'}}>{userData.Username}'s Favorites </h3>:<h2>No Favorites!</h2>}
            {!selectedMovie?<div className='favs'>
            {favs.map((movie)=>
            {
                return(
                <><div className="test" style={{border:'2px solid white',margin:'5px',borderRadius:'5px'}}>
                  <MovieCard className = 'picNoGrow' movieData={movie} onMovieClick ={(movie)=>{setSelectedMovie(movie)}} />
                  <div title="click to remove from favorites" style={{border:'1px solid', textAlign:'center',width:'2vw',height:'2vw', display:'inline-block',float:'right',borderRadius:'5px',minWidth:'25px',minHeight:'25px', backgroundColor:'#d13028'}} onClick={()=>{removeFav(movie)}}>X</div></div>
                </>
                )
            })}</div>:<MovieView className='picNoGrow' movieData={selectedMovie} onBackClick={()=>{setSelectedMovie(null)}} />}
        </div>
        
        </Col>
        </>
    );
    
    
}