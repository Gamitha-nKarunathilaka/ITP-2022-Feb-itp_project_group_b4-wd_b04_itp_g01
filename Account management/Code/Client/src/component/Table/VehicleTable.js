import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function VehicleTable(props) {
  const { items } = props;
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left">Model</TableCell>
              <TableCell align="left">{items.Model}</TableCell>
            </TableRow>
            {items.Brand && (
              <TableRow>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">{items.Brand}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="left">Mileage</TableCell>
              <TableCell align="left">{items.Mileage}KM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Year of Manufacture</TableCell>
              <TableCell align="left">{items.YearofManufacture}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">{items.Price}million</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
