import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import img from '../images/xc.png'

const useStyles = makeStyles((theme) => ({
  box:{
    padding:'95px 30px 30px 30px',
    textAlign:'center',
    color:'white',
    backgroundImage:`url(${img})`,
    backgroundSize:'cover',
    marginTop:'-85px',
    border:'none',
    [theme.breakpoints.down('md')] : {
      backgroundPosition:350
    }
  },
  boxTop:{
    backgroundImage:`url(${img})`,
    height:100,
    backgroundSize:'cover',
  },
}));

export default function BookRecomended(props) {
  const classes = useStyles();
  return (
    <>
    <Box className={classes.box}>
        <Typography 
          gutterBottom 
          variant="h5" 
          style={{fontWeight:'bold',lineHeight:1}}>
            What is GO-Read.io ?
        </Typography>
        <Typography 
          gutterBottom 
          variant="body1" 
          style={{lineHeight:2}}>
            An online library that provides book loan and book return services to increase public interest in literacy.
        </Typography>
    </Box>
    </>
  );
}