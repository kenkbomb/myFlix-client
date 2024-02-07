import React from "react";
import { Button, Col } from "react-bootstrap";
import { MovieCard } from "../movieCard/movieCard";

export const ProfileView = ({userData,moviesData,deleteMe}) =>
{
    //let favoriteMovies = moviesData.filter(m => userData.Favorites.includes(m._id));
    let favs = userData.Favorites;
    return (

        <Col style={{border:'2px solid black',marginTop:'10vw',textAlign:'center'}}>
            <div><h2 style={{textDecoration:'underline'}}>Profile View</h2></div>
            <div style = {{textTransform:'capitalize'}}>Username: {userData.Username}</div>
            <div>Birthday: {userData.Birthday}</div>
            <div>Email: {userData.Email}</div>
            <div>Favs:{userData.Favorites}
            {
              favs.map((movie)=>
            {
                console.log(moviesData );
                console.log('this is a test from profile view component');
                console.log(userData);
                console.log(userData.Favorites);
                return(
                <div>
                    <div>{movie.title}</div>
                    {/*<img src = {movie.imageURL}/>*/}
                    <button /*onClick={removeFav(movie._id)}*/ >Remove</button>
                </div>
                )
            }
            )
            }</div>
            <Button style={{marginBottom:'5px'}} onClick={deleteMe}>Delete</Button>
        </Col>

        
        
    )
}