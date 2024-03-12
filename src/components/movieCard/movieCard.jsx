import React from "react";
import PropTypes from 'prop-types';
import { Card, CardImg } from "react-bootstrap";

export const MovieCard = ({movieData,onMovieClick}) =>
{
    return (
    <>
       {/* <div title={movieData.tagline} style={{className:'card',display:'inline-block', cursor:"pointer",backgroundColor:'#fa921b',marginBottom:'5px', border:'1px solid',textAlign:'center',width:'80%'}} onClick={()=>{onMovieClick(movieData)}}>{movieData.title}
        </div>*/}
        
        {/*<Card className="mCard" title={movieData.title + ' ' + '['+movieData.tagline+']'} onClick={()=>{onMovieClick(movieData)}}>
        <Card.Img className="mCardImg" src={movieData.imageURL}/>
        <Card.Body>
            
        </Card.Body>
        </Card>
    */}
        <div>
            <img style={{borderRadius:'5px'}} title={movieData.title + ' ' + '['+movieData.tagline+']'} onClick={()=>{onMovieClick(movieData)}} className="pic" src = {movieData.imageURL}></img>
        </div>
    
    </>)
};

MovieCard.PropTypes = {
    movie:PropTypes.shape({
        title:PropTypes.string.isRequired,
        director:PropTypes.string.isRequired,
        genre:PropTypes.string.isRequired,
        release:PropTypes.string,
        tagline:PropTypes.string,
        description:PropTypes.string,
        imageURL:PropTypes.string
        }).isRequired
};