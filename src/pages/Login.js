import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Backdrop from '@material-ui/core/Backdrop'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'

import {postLoginActionCreator,resetAuthActionCreator} from '../redux/actions/actionAuth'



class Login extends Component{

    state = {
        username:"",
        usernameCheck:true,
        passwordCheck:true,
        usernameError:"",
        passwordError:"",
        password:"",
        isRequested:false,
    }

    
    
    
    handlerChange = (e) => {
        const key = e.target.name
        if(e.target.value !== ""){
            if(key === "username"){
                this.setState({
                    usernameCheck:true
                })
            }else if(key === "password"){
                this.setState({
                    passwordCheck:true
                })
            }
        }
        this.setState({
            [key] : e.target.value
        })
    }

    handlerSubmit = async (e) => {
        e.preventDefault()
        const {username,password,usernameCheck,passwordCheck} = this.state
        if(username === ""){
            this.setState({
                usernameCheck:false,
                usernameError:"Username is required"
            })
        }

        if(password === ""){
            this.setState({
                passwordCheck:false,
                passwordError:"Password is required"
            })
        }
        if(usernameCheck&&passwordCheck&&username !== ""&&password !== ""){
            this.setState({
                isLoading:true
            })
            const {postLoginAction} = this.props
            await postLoginAction({username,password})
        }

    }


    componentWillUpdate(){
        if(this.props.isLoading&&this.state.isRequested){
            this.setState({
                isRequested:false
            })
        }
    }

    componentDidUpdate(){
        const {isRequested} = this.state
        const {isRejected,responseAPI,isFulfilled} = this.props
        if(isRejected&&!isRequested){
            if(responseAPI.status === 401){
                if(responseAPI.data.message === "username not found"){
                    this.setState({
                        isRequested:true,
                        usernameCheck:false,
                        usernameError:"Username not Found"
                    })
                }else{
                    this.setState({
                        isRequested:true,
                        passwordCheck:false,
                        passwordError:"Password Wrong"
                    })
                }
            }
        }

        if(isFulfilled&&!isRequested){
            this.props.resetAuthAction()
            localStorage.clear()
            localStorage.setItem('token', responseAPI.accessToken)
            localStorage.setItem('_token', responseAPI.refreshToken)
            localStorage.setItem('_r', btoa(responseAPI.id))
            localStorage.setItem('_h', btoa(responseAPI.role))
            this.props.history.push('/')
        }
    }


    render(){
        const {usernameCheck,passwordCheck,usernameError,passwordError} = this.state
        const {isLoading} = this.props
        return(
            <>
            <Container component="main" maxWidth="xs">
            <div style={{marginTop: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                <Avatar >
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom:'20px'}}>
                Sign In
                </Typography>
                <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!usernameCheck}
                    helperText={!usernameCheck?usernameError:""}
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={this.handlerChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    error={!passwordCheck}
                    helperText={!passwordCheck?passwordError:""}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handlerChange}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handlerSubmit}
                    style={{marginTop:'10px'}}
                >
                    Sign In
                </Button>
                <Grid container style={{marginTop:'20px'}}>
                    <Grid item xs>
                    <Link to="/" style={{textDecoration:'none'}}>
                        Home
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/register" style={{textDecoration:'none'}}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                <Backdrop open={isLoading} style={{ zIndex:  199,color: '#fff'}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                </form>
            </div>
            <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
           
                Redi{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
            </Box>
            </Container>
            
            </>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {isLoading,isRejected,responseAPI,isFulfilled} = auth
    return {
        isFulfilled,
        isLoading,
        isRejected,
        responseAPI
    }
}

const mapDispatchToProps = (dispatch) => {
      return {
          postLoginAction : (body) => {
              dispatch(postLoginActionCreator(body))
          },
          resetAuthAction : () => {
            dispatch(resetAuthActionCreator())
        }
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
