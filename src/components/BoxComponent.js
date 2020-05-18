import React from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../images/jumbo.jpg'

const useStyles = makeStyles((theme) => ({
  box:{
    height:500,
    backgroundImage:`url(${Logo})`,
    backgroundSize:'cover',
    color:'white',
    marginTop:65,
    boxShadow:'0 0 10px rgba(0,0,0,0.9)',
    [theme.breakpoints.down('md')] :{
      backgroundPosition:'-400px 0',
      textAlign:'center',
      marginTop:0,
    }
  },
  textBox:{
    float:'right',
    paddingTop:200,
    paddingRight:100,
    [theme.breakpoints.down('md')] : {
      float:'right',
      paddingTop:150,
      paddingLeft:10,
      paddingRight:10,
    }
  }
}));

export default function BoxComponent(props) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Box className={classes.textBox}>
        <Typography 
          gutterBottom 
          variant="h1" 
          style={{fontWeight:'bold',lineHeight:1,fontSize:40}}>
            Welcome to GO-Read.io 
        </Typography>
        <Typography 
          gutterBottom 
          variant="h1" 
          style={{lineHeight:1,fontSize:30, marginBottom:20}}>
            Where you can find the most popular book here
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight:15,backgroundColor:'white',color:'rgba(0,0,0,0.4)'}}
          >
            Login
        </Button>
        <Button
          variant="outlined"
          color="default"
          style={{color:'white',borderColor:'white',boxShadow:'0 0 5px rgba(0,0,0,0.3)'}}
          >
              Register 
        </Button>
      </Box>
    </Box>
  );
}