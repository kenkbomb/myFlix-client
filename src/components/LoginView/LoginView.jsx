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
        if (data.user) //user has logged in successfully
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
        <div>
        <Form style={{marginTop:'5vw', position:'sticky',top:'25px',backgroundColor:'rgb(31,30,30',}} onSubmit={handleSubmit}>

            <Form.Group controlId="formUsername">
                <Form.Label style={{marginLeft:'20vw'}}>LOGIN...</Form.Label><br></br>
                <Form.Label style={{marginLeft:'20vw'}}>Username: </Form.Label>
                <Form.Control className="w-50 m-auto" type = 'text' value={username} onChange={(e)=>setUsername(e.target.value)} required minLength='3'/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label style={{marginLeft:'20vw'}}>Password: </Form.Label>
                <Form.Control className="w-50 m-auto" type = 'password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <Button className="button" style={{backgroundColor:'#d13028',marginLeft:'20vw',border:'none'}}  variant = 'primary' type = 'submit'>Login</Button>
            </Form.Group>
            
        </Form>
</div>
       
    );
};