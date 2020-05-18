import React from 'react'
import Genre from '../components/Genre'
import Box from '@material-ui/core/Box'
import Author from '../components/Author'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:70,
    [theme.breakpoints.down('md')] : {
        marginTop:70
    }
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  center:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 250,
    [theme.breakpoints.up('md')]:{
      maxWidth: 350,
    },
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Author handleChangeLoading={props.handleChangeLoading} {...props}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Genre handleChangeLoading={props.handleChangeLoading} {...props}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}