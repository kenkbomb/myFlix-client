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
    <div className="cardBack" style={{marginTop:'5vw'}}> 
        <div className="movieDetails" style={{display:'flex',flexDirection:'row'}}>
        <div >
        <img className="pic" src = {movieData.imageURL} />
        </div>
        <div className="movieText">
            <div>Title: {movieData.title}</div>
            <div> Director: {movieData.director}</div>
            <div>Released: {movieData.release}</div>
            <div>Genre: {movieData.genre}</div>
            <div>Tagline: {movieData.tagline}</div>
            <div>Description: {movieData.description}</div>
        </div>
        </div>
       { user?
        <Button style = {{margin:'5px'}} onClick={addFav}>Favorite</Button>
        :<div></div>
       }
        <Button onClick={onBackClick} >Go Back</Button>
    </div>:
    <div className="cardBack"> 
        <div className="movieDetails" style={{display:'flex',flexDirection:'row'}}>
        <div> <img className="pic" src = {movieData.imageURL} /></div>
        <div className="movieText">

            <div>Title: {movieData.title}</div>
            <div> Director: {movieData.director}</div>
            <div>Released: {movieData.release}</div>
            <div>Genre: {movieData.genre}</div>
            <div>Tagline: {movieData.tagline}</div>
            <div>Description: {movieData.description}</div>
        </div>
        </div>
       { user?
        <Button style = {{margin:'5px'}} onClick={addFav}>Favorite</Button>
        :<div></div>
       }
        <Button className="button" onClick={onBackClick} >Go Back</Button>
    </div>
}
    </Col>
      
    );
};