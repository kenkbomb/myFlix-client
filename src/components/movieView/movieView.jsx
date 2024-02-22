import React from "react";
//import { MovieCard } from "../movieCard/movieCard";
import { Col,Button } from "react-bootstrap";
import { useState } from "react";

export const MovieView = ({movieData,onBackClick,user,token,favs}) =>
{

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
          
            return response.json();
            
        } else {
            alert("Failed to add");
        }
    }).catch(error => {
      console.error('Error: ', error);
  });
  }

    return (//this is the main movie view component, which displays all of the movies data/info
    <Col >
    
    <div style={{textAlign:'center',border:'2px solid',marginTop:'15vw',backgroundColor:'#fa921b'}}> 
    <h2 style ={{textDecoration:'underline'}}>Movie View</h2>
        <div>{movieData.imageURL}</div>
        <div>Title: {movieData.title}</div>
        <div> Director: {movieData.director}</div>
        <div>Released: {movieData.release}</div>
        <div>Genre: {movieData.genre}</div>
        <div>Tagline: {movieData.tagline}</div>
        <div>Description: {movieData.description}</div>
       
        <Button style = {{margin:'5px'}} onClick={addFav}>Favorite</Button>
        <Button onClick={onBackClick} >back</Button>
        </div>
    </Col>
    );
};