import React from 'react'
import Chart1 from '../components/Chart1'
import Chart2 from '../components/Chart2'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:10
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
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
  chart2:{
    padding:'0 0 0 40px',
    marginLeft:40,
    borderLeft:'1px solid rgba(0,0,0,0.1)',
    [theme.breakpoints.down('md')] :{
      margin:0,
      padding:0,
      textAlign:'center',
      border:'none'
    }
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={'lg'}>
        <Box className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={3}>
              
              <Grid item xs={6} sm={6}>
                <Grid item xs container direction="column" style={{textAlign:'center'}}>
                  <Grid item xs>
                    <Typography style={{color:' rgb(255, 112, 67)'}} color="textSecondary" gutterBottom>
                      Books Unavailable
                    </Typography>
                    <Badge color="error" variant="dot" style={{color:' rgb(255, 112, 67)'}} anchorOrigin={{vertical: 'top', horizontal: 'left'}} >
                      <Typography variant="h5" component="h2">
                        56
                      </Typography>
                    </Badge>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Grid item xs container direction="column" style={{textAlign:'center'}}>
                  <Grid item xs>
                  <Typography style={{color:'rgb(66, 165, 245)'}} color="textSecondary" gutterBottom>
                    Books Available
                  </Typography>
                  <Badge color="primary" variant="dot"  style={{color:'rgb(66, 165, 245)'}}>
                    <Typography variant="h5" component="h2">
                      56
                    </Typography>
                  </Badge>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} >
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Chart1 style={{margin:'0 auto'}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} style={{marginTop:20}}>
                <Grid item xs container direction="column" style={{textAlign:'center'}}>
                  <Grid item xs>
                    <Typography color="textSecondary" gutterBottom>
                      All Books
                    </Typography>
                      <Typography variant="h4" component="h1">
                        56
                      </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid item xs container direction="column" className={classes.chart2}>
                <Grid item xs>
                <Typography variant="h5" component="h2" style={{marginBottom:10}}>
                  Books Borrowing and Returning
                </Typography>
                <Chart2/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}