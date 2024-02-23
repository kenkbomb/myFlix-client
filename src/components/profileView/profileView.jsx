import React from "react";
import { Button, Col,Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

export const ProfileView = ({userData,moviesData,deleteMe,token,logout}) =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [show,toggleShow] = useState(false);
    const [theUserData,setTheUserData] = useState(userData);
    const [favs,setFavs] = useState(moviesData.filter(m => theUserData.Favorites.includes(m._id)));
    const [f,s] = useState(0);
    //------------------------------------------------------------------------------------------------------

    useEffect(()=>
    {
      //if(!user){return;}//if there is no user, end this function...
  
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+userData.Username,
      {headers:{Authorization: `Bearer ${token}`}})
          .then((response)=>response.json())
          .then((data)=>{
           // console.log(data);
            
            setTheUserData(data);
        
            setFavs(moviesData.filter(m => data.Favorites.includes(m._id)));
          })},[f]);
   //------------------------------------------------------------------------------------------------------------
   /*const fetchFavs = ()=>
    {
      //if(!user){return;}//if there is no user, end this function...
  
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+userData.Username,
      {headers:{Authorization: `Bearer ${token}`}})
          .then((response)=>response.json())
          .then((data)=>{
            console.log(data);
            
            setTheUserData(data);
            console.log('the user data is ' + theUserData);
            console.log(theUserData.Username);
            console.log(theUserData.Favorites);
            setFavs(moviesData.filter(m => theUserData.Favorites.includes(m._id)));
          })};*/
    
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
            Username: username,
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
        <Col style={{marginTop:'5vw'}}>
            <Button  className="button"  onClick={()=>{toggleShow(!show)}}>{show? 'Close Form':'Edit Profile'}</Button>
        {show && <Form>
        <h2>{userData.Username}</h2>
        <Form.Group controlId="formUserName">
        <Form.Label>Username: </Form.Label>
        <Form.Control type = 'text' value={username} onChange={(e)=>setUsername(e.target.value)} required minLength='3'></Form.Control>
        </Form.Group>
      
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
        <Button className="button" type = 'submit' onClick={updateUser}>Submit</Button>
        <Button className="button" style={{marginLeft:'5px'}} onClick={deleteMe}>Delete</Button>
      </Form>}

      <section style={{border:'1px solid',className:'profileView'}}>
        <ul style={{listStyle:'none', textAlign:'center'}}><h3>On File...</h3> 
          <li>Username: {userData.Username} </li>
          <li> Email: {userData.Email} </li>
          <li> Birthdate: {userData.Birthday}</li>
        </ul>
      </section>

        <div>
          
            {favs.length>0?<h2>Favs: </h2>:<h2>No Favorites!</h2>}
           
            {favs.map((movie)=>
            {
                return(
                <>
                <div style={{border:'1px solid', textAlign:'center', backgroundColor:'cornflowerblue'}} onClick={()=>{removeFav(movie)}}>{movie.title}    // click to remove from favorites//</div>
                </>
                )
            })}
        </div>
        
        </Col>
        </>
    );
    
    
}