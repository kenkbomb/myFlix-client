import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";

export const LoginView = ({onLoggedIn}) =>
{
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    const data = {
        Username:username,
        Password:password
    };
    
//-------------------------------------------------------------------------------------------------
    fetch('https://myflixdb-162c62e51cf6.herokuapp.com/login',
    //fetch('127.0.0.1:8080/login',
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then((response)=>response.json())
    .then((data)=>
    {
        if (data.user) 
            {
                alert('Welcome  '+ data.user.Username + '!');
                localStorage.setItem('user',JSON.stringify(data.user));
                localStorage.setItem('token',data.token);
             onLoggedIn(data.user, data.token);
            } 
            else 
          {
            alert("No such user " + data.Username);
            console.log(data);
          }
    })
        .catch((e) => {
          alert("Something went wrong");
        });
    
    };
//---------------------------------------------------------------------------------------------------
    return (

        <Form style={{marginTop:'5vw', position:'sticky',top:'25px'}} onSubmit={handleSubmit}>

            <Form.Group controlId="formUsername">
                <Form.Label>LOGIN...</Form.Label><br></br>
                <Form.Label>Username: </Form.Label>
                <Form.Control type = 'text' value={username} onChange={(e)=>setUsername(e.target.value)} required minLength='3'/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type = 'password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </Form.Group>
            <Button className="button" variant = 'primary' type = 'submit'>Login</Button>
        </Form>

       
    );
};