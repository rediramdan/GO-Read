import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  image: {
    width: '100%',
    height: 380,
    [theme.breakpoints.up('sm')]:{
      height: 450,
    },
    textAlign:'center',
    
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
  const data = props.data.book
  const {status} = props.data
  const {isLoading} = props
  const [col,setCol] = React.useState(isLoading)
  const classes = useStyles();

  setTimeout(function(){setCol(!isLoading)}, 100)

  return (
    <div className={classes.root}>
      <Grow in={col}>
        <Box className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item style={{textAlign:'center'}} xs={12} sm>
                  <ButtonBase className={classes.image}>
                    <img 
                      className={classes.img} 
                      alt="complex" 
                      src={'http://localhost:3001/public/images/'+data.image} 
                    />
                  </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography 
                    gutterBottom 
                    variant="subtitle1" 
                    style={{fontWeight:'bold',lineHeight:1,fontSize:22}}>
                    {data.title}
                  </Typography>
                  {status===1? 
                    <><Chip
                      label="Available"
                      color="primary"
                      style={{float:'right',marginTop:-5}}
                    /></>
                    :
                    <><Chip
                      label="Unavailable"
                      color="secondary"
                      style={{float:'right',marginTop:-5}}
                    /></>
                    } 
                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                      {data.author_name}, {data.genre_name}
                    </Typography>
                    <br/><br/>
                    <Typography variant="body2" color="textSecondary">
                      {data.description}
                    </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </div>
  );
}