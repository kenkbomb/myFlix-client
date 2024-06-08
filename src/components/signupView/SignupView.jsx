import { useState } from "react";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { BrowserRouter,Route,Routes,Navigate, useNavigate } from "react-router-dom";//for routing

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

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
       
        navigate('/login');//goes to the login page after successfully subscribing...
       
      } else {
        alert("Signup failed, please try again, perhaps choose a different username");
      }
    });}

    else{
      alert('please correct formatting...');
    }

  };
  
//-------------------------------------------------------------------------------------------
    return (

      <Form onSubmit={handleSubmit} className="loginForm">
        <Form.Label style={{marginLeft:'20vw',marginTop:'5vw'}}>Please Fill Out The Form To REGISTER...</Form.Label>
        <Form.Group controlId="formUserName">
        <Form.Label style={{marginLeft:'20vw'}}>Username: </Form.Label>
        <Form.Control className="m-auto w-50" type = 'text' value={username} onChange={(e)=>setUsername(e.target.value)} required minLength='3'></Form.Control>
        </Form.Group>
      
        <Form.Group controlId="formPassword">
        <Form.Label style={{marginLeft:'20vw'}}>Password: </Form.Label>
        <Form.Control className="m-auto w-50" type = 'password' value={password} onChange={(e)=>setPassword(e.target.value)} required minLength='3'></Form.Control>
        </Form.Group>

        <Form.Group controlId="formEmail">
        <Form.Label style={{marginLeft:'20vw'}}>Email: </Form.Label>
        <Form.Control className="m-auto w-50" type = 'email' value={email} onChange={(e)=>setEmail(e.target.value)} required ></Form.Control>
        </Form.Group>

        <Form.Group  controlId="formBirthday">
        <Form.Label style={{marginLeft:'20vw'}}>Birthday: </Form.Label>
        <Form.Control className="m-auto w-50" type = 'date' value={birthday} onChange={(e)=>setBirthday(e.target.value)} required></Form.Control>
        </Form.Group>
        <Button type = 'submit' style={{backgroundColor:'#d13028',marginLeft:'20vw',border:'none'}} className="button">Submit</Button>
      </Form>

        
    );
  };