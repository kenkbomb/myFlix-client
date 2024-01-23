import React from "react";
import { useState } from "react";

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
    
    //alert('submit test');
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

        alert('login response: '+ data.user);
       // alert(data.Username);
        if (data.user) 
            {
                localStorage.setItem('user',JSON.stringify(data.user));
                localStorage.setItem('token',data.token);
             onLoggedIn(data.user, data.token);
            } else 
          {
            alert("No such user " + data.user);
          }
    })
        .catch((e) => {
          alert("Something went wrong");
        });
    
    };
//---------------------------------------------------------------------------------------------------
    return (
        <form onSubmit={handleSubmit}>
            <label>LOGIN...</label><br></br>
            <label>Username: 
            <input type = 'text' value = {username} onChange={(e) => setUsername(e.target.value)} required></input>
            </label><br></br>
            <label>Password: 
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </label><br></br>
            <button type="submit">SUBMIT</button>
        </form>
    );
};//}