import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));



export default function DenseTable(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Method</TableCell>
              
              <TableCell align="right">Params</TableCell>
              <TableCell align="right">Query</TableCell>
              <TableCell align="right">Content Type</TableCell>
              <TableCell align="right">Agent</TableCell>
              <TableCell align="right">Authorization</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map(row => (
              <TableRow key={row.Date}>
                <TableCell component="th" scope="row">
                  {row.Date}
                </TableCell>
                <TableCell align="right">{row.Method}</TableCell>
                <TableCell align="right">{row.Params}</TableCell>
                <TableCell align="right">{row.Query}</TableCell>
                <TableCell align="right">{row.ContentType}</TableCell>
                <TableCell align="right">{row.Agent}</TableCell>
                <TableCell align="right">{row.Authorization}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
