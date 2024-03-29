import React from "react";
//import { MovieCard } from "../movieCard/movieCard";
import { Col,Button } from "react-bootstrap";
import { useState } from "react";
import Image from "react-bootstrap/Image";

export const MovieView = ({movieData,onBackClick,user,token}) =>
{
    //const [isFaved,setIsFaved] = useState(topFavs);
//-------------------------------------------------------------------------------------------------------------
    
//----------------------------------------------------------------------------------------------------------------
 const addFav = (event) =>
  {
      event.preventDefault();
      fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users/'+user.Username+'/favs',
      {
        method: "PUT",
        headers: { Authorization: 'Bearer '+token,"Content-Type":"application/json"},
        body:JSON.stringify({MovieID:movieData._id})
      }).then((response) => {
        if (response.ok) {
          alert('Added '+movieData.title+' to your Favorites!');
            return response.json();
            
        } else {
            alert("Failed to add");
        }
    }).catch(error => {
      console.error('Error: ', error);
  });
  }
//---------------------------------------------------------------------------------------------------------------------


    return (//this is the main movie view component, which displays all of the movies data/info
    <Col >
    { user?
    <div className="cardBack" style={{marginTop:'8vw'}}> 
        <div className="movieDetails" >
        <div >
        <img className="picDetail" src = {movieData.imageURL} />
        </div>
        <div style={{height:'100%'}}>
        <div className="movieText">
            <div>Title: {movieData.title}</div>
            <div> Director: {movieData.director}</div>
            <div>Released: {movieData.release}</div>
            <div>Genre: {movieData.genre}</div>
            <div>Tagline: {movieData.tagline}</div>
            <div>Description: {movieData.description}</div>
        </div>
        <div style={{marginTop:'25vh',marginRight:'5px',marginBottom:'5px',backgroundColor:'rgb(31,30,30)',borderRadius:'5px', float:'right'}}>
       { user?
        <Button style = {{margin:'5px',backgroundColor:'#d13028',border:'none'}} onClick={addFav}>Favorite</Button>
        :<div></div>
       }
        <Button onClick={onBackClick} style={{backgroundColor:'#d13028',border:'none',marginRight:'5px'}}>Go Back</Button>
        </div></div></div>
    </div>:
    <div className="cardBack"> {/*in the profile/favs view...*/}
        <div className="movieDetails" >
        <div> <img className="picNoGrow" src = {movieData.imageURL} /></div>
        <div className="movieText">

            <div>Title: {movieData.title}</div>
            <div> Director: {movieData.director}</div>
            <div>Released: {movieData.release}</div>
            <div>Genre: {movieData.genre}</div>
            <div>Tagline: {movieData.tagline}</div>
            <div>Description: {movieData.description}</div>
        </div>
        
       { user?
        <Button className="button" style = {{margin:'5px'}} onClick={addFav}>Favorite</Button>
        :<div></div>
       }
        <Button  style={{backgroundColor:'#d13028',border:'none',float:'right',marginTop:'5vw', marginRight:'5px',marginBottom:'5px'}}  onClick={onBackClick} >Go Back</Button>
        </div>
    </div>
}
    </Col>
      
    );
};