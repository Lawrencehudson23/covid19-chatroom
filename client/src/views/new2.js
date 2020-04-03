import React, { useState, useEffect } from "react";
import { Table } from "@material-ui/core";
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import {navigate} from '@reach/router';

export default function CountryDetail({ searchCountry }) {
  const [country, setCountry] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "3a01be6e25msh75a6c8a146c41d5p18acf7jsn5846c5ec8a46"
      },
      params: {
        country: searchCountry
      }
    })
      .then(response => {
        setErr("");
        if (
          response.data.message ===
          "Country not found. Returning all stats. Please use a country name found in the data property."
        ) {
          setErr("Country not found. Case-sensitive.Please try again!");
        }
        console.log("RES:" + response.data.message);
        const newCountry = response.data.data.covid19Stats;
        setCountry(newCountry);
      })
      .catch(error => {
        console.log(error);
        //   setErr("Country not found. Case-sensitive.Please try again!")
      });
  }, [searchCountry]);

  return (
    <div>
      {err === "Country not found. Case-sensitive.Please try again!" ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{err}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell align="right">Province</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Confirm</TableCell>
                <TableCell align="right">Death</TableCell>
                <TableCell align="right">recovered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {country.map((c, i) => (
                <TableRow key={i}>
                  <TableCell
                    style={{ fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {c.city}
                  </TableCell>
                  <TableCell align="right">{c["province"]}</TableCell>
                  <TableCell align="right">{c["country"]}</TableCell>
                  <TableCell style={{ color: "red" }} align="right">
                    {c["confirmed"]}
                  </TableCell>
                  <TableCell
                    style={{ color: "red", fontWeight: "bold" }}
                    align="right"
                  >
                    {c["deaths"]}
                  </TableCell>
                  <TableCell
                    style={{ color: "green", fontWeight: "bold" }}
                    align="right"
                  >
                    {c["recovered"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
