import React, { useState } from "react";
// import { Button } from '@material-ui/core'
import { navigate } from "@reach/router";
// import axios from "axios";
export default function SearchCountryForm() {
  const [formState, setFormState] = useState({
    name: ""
  });

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // axios({
    //     "method":"GET",
    //     "url":"https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
    //     "headers":{
    //     "content-type":"application/octet-stream",
    //     "x-rapidapi-host":"covid-19-coronavirus-statistics.p.rapidapi.com",
    //     "x-rapidapi-key":"3a01be6e25msh75a6c8a146c41d5p18acf7jsn5846c5ec8a46"
    //     },"params":{
    //     "country":formState.name
    //     }
    //     })
    //     .then((response)=>{
    //         console.log('RES:'+response.data);
    //         navigate('/world/'+formState.name)
    //     })
    //     .catch((error)=>{
    //       console.log(error);
    //       setErr("Case-sensitive.Please try again")
    //     })
    navigate("/world/" + formState.name);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formState.name} onChange={handleChange} />
        <button> Search Country </button>
      </form>
    </div>
  );
}
