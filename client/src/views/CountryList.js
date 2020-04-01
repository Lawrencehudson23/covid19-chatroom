import React,{useState,useEffect} from 'react'
import { Table } from '@material-ui/core'
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function CountryList() {
    const [state, setState] = useState([]);
    
    useEffect(() => {
        axios({
            "method":"GET",
            "url":"https://covid-193.p.rapidapi.com/statistics",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-193.p.rapidapi.com",
            "x-rapidapi-key":"3a01be6e25msh75a6c8a146c41d5p18acf7jsn5846c5ec8a46"
            }
            })
            .then((res)=>{
              setState(res.data.response)
            })
            .catch((error)=>{
              console.log(error)
            })
    }, [state])
    return (
        <div>
            <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">New Cases Today</TableCell>
                    <TableCell align="right">Active Cases</TableCell>
                    <TableCell align="right">Critical</TableCell>
                    <TableCell align="right">Recovered</TableCell>
                    <TableCell align="right">Deaths</TableCell>
                    <TableCell align="right">Total Cases</TableCell>
                    <TableCell align="right">Total Deaths</TableCell>
                    <TableCell align="right">Fatality Rate</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {state.map((a,i) => (
                    <TableRow key={i}>
                    <TableCell  style={{fontWeight: 'bold'}} component="th" scope="row">
                        {a.country}
                    </TableCell>
                    <TableCell style={{ color:'red' ,fontWeight: 'bold'}} align="right">{a.cases["new"]}</TableCell>
                    <TableCell style={{ color:'red' }} align="right">{a.cases["active"]}</TableCell>
                    <TableCell style={{ color:'red' }} align="right">{a.cases["critical"]}</TableCell>
                    <TableCell style={{ color:'green',fontWeight: 'bold'}}align="right">{a.cases["recovered"]}</TableCell>
                    <TableCell style={{ color:'red',fontWeight: 'bold' }} align="right">{a.deaths["new"]}</TableCell>
                    <TableCell  align="right">{a.cases["total"]}</TableCell>
                    <TableCell style={{ color:'red' ,fontWeight: 'bold'}} align="right">{a.deaths["total"]}</TableCell>
                    <TableCell align="right">{ Math.floor((a.deaths["total"]/a.cases["total"])*10000)/100 }%</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

        </div>
    )
}
