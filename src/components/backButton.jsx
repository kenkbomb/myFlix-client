import React from 'react'
import { Navigate,Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
export const BackButton=({onBackClick})=>{

return(
    //<Link to={'/movies'}>
<Button onClick={()=>{
    onBackClick,console.log("hgh"),history.go(-1)}
} >Go Back</Button>
//</Link>
)

}