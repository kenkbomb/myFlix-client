import {React} from "react";
import PropTypes from 'prop-types';
import { useState,useEffect } from "react";
import { BsSuitHeartFill } from "react-icons/bs";


export const MovieCard = ({movieData,onMovieClick,userData}) =>
{
   
    const [faved,setFaved] = useState(false);
    const [user,setUser] = useState(userData);
    const [picType,setPicType] = useState('pic');
    
  
    function getFavs(movie)
    {
        userData.Favorites.forEach(element => {
             if(movie._id===element)
        {
            
            setFaved(true);
            setPicType("favedPic");
        }
    
            });

      
    }

    useEffect(()=>
        {   
            setUser(userData);
            getFavs(movieData);
        },[userData,faved])

    return (
    <>
       
        <div className={picType} title={movieData.title + ' ' + '['+movieData.tagline+']'} onClick={()=>{onMovieClick(movieData)}} style={{display:'block', backgroundImage:`url(${movieData.imageURL})`, backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
            
            {faved?  <BsSuitHeartFill style={{width:'3vw',height:'3vw',padding:'5px',fill:'red',border:'2px solid red', position:'relative',backgroundColor:'black',display:'inlineBlock',float:'right',boxSizing:'border-box',borderRadius:'50px',minWidth:'40px',marginLeft:'75%',minHeight:'40px'}} />:null}
            
        
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