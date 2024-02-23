import { useState } from "react";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";//for routing

export const SignupView = ({gotoLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    if(username.length>=2 && birthday!=''&&password!=''&&email!=''){

    fetch('https://myflixdb-162c62e51cf6.herokuapp.com/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful, please login");
        window.location.reload();
       // gotoLogin();
       // <Navigate to ='/login'/>
      } else {
        alert("Signup failed");
      }
    });}

    else{
      alert('please correct formatting...');
    }

  };
  
//-------------------------------------------------------------------------------------------
    return (

      <Form onSubmit={handleSubmit} className="loginForm">
        <Form.Label>REGISTER...</Form.Label>
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
        <Button type = 'submit' className="button">Submit</Button>
      </Form>

        
    );
  };