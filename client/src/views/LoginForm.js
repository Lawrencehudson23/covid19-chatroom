import React,{useState} from 'react';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Grid
} from '@material-ui/core';

import axios from 'axios';
import {navigate,Link} from '@reach/router';
import { Alert } from '@material-ui/lab';

const styles = {
    paper: {
        width: "20rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}
export default function LoginForm() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    
    function handleSubmit(event){
        event.preventDefault();
        setErr('');
        
        axios
          .post("http://localhost:5000/api/users/login",{
              email,
              password
          },{withCredentials:true})
          .then(() => navigate('/'))
          .catch(err => {
            console.log('inside catch of login');
            setErr('Please check your credentials!')
            });
    }

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Paper elevation={3} style={styles.paper}>
            <h2>Login Form</h2>
            {err &&(
            <Alert variant="filled" severity="error" >
                {err}
            </Alert>)}
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput name='email' value={email} type="text" onChange={(event)=>setEmail(event.target.value)}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput name='password' value={password} type="password" onChange={(event)=>setPassword(event.target.value)}/>
                </FormControl><br/>
                <Link to='/register' >
                        Not a member?
                    </Link><br/><br/>
                <FormControl variant="outlined" style={styles.input}>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </FormControl>
            </form>
        </Paper>
        </Grid>
    )
}