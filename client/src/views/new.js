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
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "3a01be6e25msh75a6c8a146c41d5p18acf7jsn5846c5ec8a46"
      },
      params: {
        country: searchCountry
      }
    })
      .then(response => {
        console.log(response.data.latest_stat_by_country[0]);
        setCountry(response.data.latest_stat_by_country[0]);
      })
      .catch(error => {
        console.log(error);
        //   setErr("Country not found. Case-sensitive.Please try again!")
      });
  }, [searchCountry]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span role="img" aria-label="emoji">
                  💠
                </span>
                Country
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  ⚠️
                </span>
                New Cases
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  🤧
                </span>
                Active Cases
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  🤒
                </span>
                Critical
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  💪
                </span>
                Recovered
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  😵
                </span>
                Deaths
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  😱
                </span>
                Total Cases
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  ☠️
                </span>
                Total Deaths
              </TableCell>
              <TableCell align="right">
                <span role="img" aria-label="emoji">
                  😷
                </span>
                Cases/1m
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold" }}
                component="th"
                scope="row"
              >
                {country.country_name}
              </TableCell>
              <TableCell
                style={{ color: "red", fontWeight: "bold" }}
                align="right"
              >
                {country.new_cases}
              </TableCell>
              <TableCell style={{ color: "red" }} align="right">
                {country.active_cases}
              </TableCell>
              <TableCell style={{ color: "red" }} align="right">
                {country.serious_critical}
              </TableCell>
              <TableCell
                style={{ color: "green", fontWeight: "bold" }}
                align="right"
              >
                {country.total_recovered}
              </TableCell>
              <TableCell
                style={{ color: "red", fontWeight: "bold" }}
                align="right"
              >
                {country.new_deaths}
              </TableCell>
              <TableCell align="right">{country.total_cases}</TableCell>
              <TableCell
                style={{ color: "red", fontWeight: "bold" }}
                align="right"
              >
                {country.total_deaths}
              </TableCell>
              <TableCell
                style={{ color: "red", fontWeight: "bold" }}
                align="right"
              >
                {country.total_cases_per1m}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
