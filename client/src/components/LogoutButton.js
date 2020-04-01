import React from 'react'
import axios from "axios";
import { Button } from '@material-ui/core';
import {navigate} from '@reach/router';

export default function LogoutButton() {
    
    function handleClick(event){
        axios
          .delete("http://localhost:5000/api/users/logout",{
              withCredentials:true
          })
          .then(res => navigate('/'))
          .catch(err => console.error(err));
    }


    return (
        
        <Button onClick={handleClick}>Log Out</Button>
        
    )
}
