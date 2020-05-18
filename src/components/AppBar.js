import qs from 'qs'
import React from 'react'
import {Link} from 'react-router-dom'
import { postLogout } from '../utils/http'
import LinearProgress from './LinearProgress'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import Toolbar from '@material-ui/core/Toolbar'
import BottomNav from '../components/BottomNav'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'
import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SettingsIcon from '@material-ui/icons/Settings'
import DialogTitle from '@material-ui/core/DialogTitle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DialogActions from '@material-ui/core/DialogActions'
import { fade, makeStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';




const useStyles = makeStyles((theme) => ({
  fixed:{
    position:'fixed',
    top:0,
  },
  grow: {
    flexGrow: 1,
    [theme.breakpoints.down('md')] : {
      position:'fixed',
      top:0,
      left:0,
      right:0,
      padding:0,
      zIndex:99
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')] : {
        marginRight: 0,
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  buttonNav:{
    color:'white',
    borderColor:'white',
    marginLeft:10,
    boxShadow:'none',
    '&:hover': {
      borderColor: 'white!important',
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const role = atob(localStorage.getItem('_h'))
  const {isLoading,handleChangeLoading,handleChange,value} = props
  const classes = useStyles();
  const [logout, setLogout] = React.useState(false)

  const handleClickOpen = (e) => {
    e.preventDefault()
    setLogout(true);
  };

  const handleClose = () => {
    setLogout(false);
  };
  const token =localStorage.getItem('token')
  const handleLogout = async (e) => {
    handleChangeLoading(true)
    e.preventDefault()
        await postLogout({token :token})
        .then(() => {
            localStorage.clear()
            props.history.push('/login')
        })
        .catch((error) => {
            console.log({error})
        })
  }

  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      let query = {}
      const search = e.target.value
      query.search = search
      props.history.push(`/?${qs.stringify(query)}`)
    }
  }
  return (

    <div className={classes.grow}>
      <AppBar position="static" className={classes.fixed}>
        <Container maxWidth={'lg'}>
        <Toolbar>
          <Link to={'/'} style={{color:'white'}}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer">
              <MenuBookIcon />
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            GO-Read.io
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {handleChange?
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="search"
              value={value}
              onChange={handleChange}/>
              :
              <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="search"
              onKeyDown={handleSearch}/>
            }
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {role===0 || role==="0"?
            <><Link to={'/'} style={{color:'white'}}>
              <Tooltip title="Home" >
                <IconButton aria-label="show 4 new mails" color="inherit" style={{float:'right'}}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              </Link>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Tooltip title="My Books" >
                  <Link to={'/mybooks'} style={{color:'white'}}>
                  <BookIcon />
                  </Link>
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Logout" >
                  <Link to='/' style={{color:'white'}} onClick={handleClickOpen}>
                    <ExitToAppIcon />
                  </Link>
                </Tooltip>
              </IconButton></>  
              :<></>}
              {role===1 || role==="1"?
            <><Link to={'/'} style={{color:'white'}}>
              <Tooltip title="Home" >
                <IconButton aria-label="show 4 new mails" color="inherit" style={{float:'right'}}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              </Link>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Tooltip title="Dashboard" >
                  <Link to={'/dashboard'} style={{color:'white'}}>
                    <TrendingUpIcon />
                  </Link>
                </Tooltip>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Tooltip title="Manage" >
                  <Link to={'/manage'} style={{color:'white'}}>
                    <SettingsIcon />
                  </Link>
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Logout" >
                  <Link to='/' style={{color:'white'}} onClick={handleClickOpen}>
                    <ExitToAppIcon />
                  </Link>
                </Tooltip>
              </IconButton></>  
              :<></>}
            {role !== 1 && role !== '1' && role !== '0'&&role ?
            <><Button onClick={()=>props.history.push('/login')}   className={classes.buttonNav}>Login</Button>
            <Button onClick={()=>props.history.push('/register')} variant="outlined"  className={classes.buttonNav}>Register</Button></>
            :<></>}
          </div>
        </Toolbar>
        </Container>
      </AppBar>
      {isLoading?(<LinearProgress/>):<></>}
      <Dialog
        open={logout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Do you want to exit from GO-Read ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Yes, Im sure
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNav handleClickOpen={handleClickOpen} {...props}/>
    </div>
  );
}