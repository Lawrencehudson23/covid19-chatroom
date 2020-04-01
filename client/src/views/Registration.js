import React,{useState} from 'react';
import axios from "axios";
import {navigate,Link} from '@reach/router';
import { Alert } from '@material-ui/lab';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Grid,
} from '@material-ui/core';

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
export default function Registration() {
    const [formState, setFormState] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    const [errors, setErrors] = useState([])
    
    function handleChange(event) {
        const{name,value} = event.target;

        setFormState({
            ...formState,
            [name]:value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        axios.post('http://localhost:5000/api/users/register',formState,{
            withCredentials:true
        })
            .then(()=>{
                console.log('Register success');
                navigate('/')})
            .catch(err=>{
                console.log("cant register:" + err);
                const innerErrors = err.response.data.errors;
                const newErrors = [];
                for(const key in innerErrors){
                    newErrors.push(innerErrors[key].message);
                    
                }
    
                setErrors(newErrors)
            })
    }
    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Paper elevation={3} style={styles.paper}>
            <h2>Registration Form</h2>
            {errors &&(
                <>
                {errors.map((error,i) => (
                <Alert variant="filled" severity="error" key={i}>
                    {error}
                </Alert>
                ))}
                </>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput name='firstName' value={formState.firstName} type="text" onChange={handleChange}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput name='lastName' value={formState.lastName} type="text" onChange={handleChange}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput name='email' value={formState.email} type="text" onChange={handleChange}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput name='password' value={formState.password} type="password" onChange={handleChange}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput name='confirmPassword' value={formState.confirmPassword} type="password" onChange={handleChange}/>
                </FormControl>
                <br/>
                    <Link to='/login' >
                        Already a member?
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