import React from 'react'
import BookIcon from '@material-ui/icons/Book'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles((theme)=>({
  root: {
    position:'fixed',
    bottom:0,
    left:0,
    right:0,
    boxShadow:'0px 0px 5px rgba(0,0,0,0.5)',
    display:'flex',
    [theme.breakpoints.up('md')] : {
        display:'none'
    }

  },
}));

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const role = atob(localStorage.getItem('_h'))
  const pathname = props.location.pathname
  let val = 0
  if(pathname === "/manage"){
      val = 3
  }else if(pathname === "/mybooks"){
      val = 1
  }else if(pathname === "/dashboard"){
    val = 2
  }

  return (
    <BottomNavigation
      value={val}
      showLabels
      className={classes.root}>

      <BottomNavigationAction 
        label="Home" 
        icon={<HomeIcon />} 
        onClick={()=>{
            props.history.push('/')
        }}/>

      {role===0 || role==="0"?
      <BottomNavigationAction 
        label="My Books" 
        icon={<BookIcon />} 
        onClick={()=>{
            props.history.push('/mybooks')
        }}/>
      :""}

      {role===1 || role==="1"?
      <BottomNavigationAction 
        label="Dashboard" 
        icon={<TrendingUpIcon />} 
        onClick={()=>{
            props.history.push('/dashboard')
        }}/>
      :""}

      {role===1 || role==="1"?
      <BottomNavigationAction 
        label="Manage" 
        icon={<SettingsSharpIcon />} 
        onClick={()=>{
            props.history.push('/manage')
        }}/>
      :""}

      {role !==1 && role !=="1" && role !==0 && role !=="0"?
      <BottomNavigationAction 
        label="Sign In" 
        icon={<ExitToAppIcon />} 
        onClick={()=>{
            props.history.push('/login')
        }}/>
      :""}

      {role===0 || role==="0" || role===1 || role==="1"?
      <BottomNavigationAction 
        label="Sign Out" 
        icon={<ExitToAppIcon />} 
        onClick={props.handleClickOpen}/>
      :
      <BottomNavigationAction 
        label="Sign Up" 
        icon={<AssignmentIndSharpIcon />} 
        onClick={()=>{
            props.history.push('/register')
        }}/>}
      
    </BottomNavigation>
  );
}