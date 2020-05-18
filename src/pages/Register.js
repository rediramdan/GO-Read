import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Backdrop from '@material-ui/core/Backdrop'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'

import {connect} from 'react-redux'
import {postRegisterActionCreator} from '../redux/actions/actionAuth'

class Register extends Component{

    state = {
        username:"",
        password:"",
        password2:"",
        name:"",
        nameCheck:true,
        match:true,
        usernameCheck:true,
        passwordCheck:true,
        passwordError:"",
        usernameError:"",
        isLoading : false,
        isRequested:false,
    }

    handlerChange = (e) => {
        const key = e.target.name
        if(key === "password2"){
            if(e.target.value !== this.state.password){
                this.setState({match:false})
            }else{
                this.setState({match:true})
            }
        }

        if(key === "password"){
            if(e.target.value.match(/^([a-zA-Z0-9!@#$%^&*]{8,})$/)){
                if(e.target.value.match(/^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9!@#$%^&*]{8,})$/)){
                    this.setState({passwordCheck:true})
                }else{
                    this.setState({
                        passwordCheck:false,
                        passwordError:"Password at least 1 lowercase character and 1 number character"
                    }) 
                }
            }else{
                this.setState({
                    passwordCheck:false,
                    passwordError:"Password must be a string or numbers or character:!@#$%^&*, min:8"
                })
            }
        }

        if(key === "username"){
            if(e.target.value.indexOf(' ') >= 0){
                this.setState({usernameCheck:false,usernameError:"Username must be a string without spaces"})
            }else{
                this.setState({usernameCheck:true})
            }
        }
        
        this.setState({
            [key] : e.target.value
        })
    }

    handlerSubmit = async (e) => {
        e.preventDefault()
        const {username,password,password2,name,usernameCheck,match,passwordCheck} = this.state
        if(username===""){
            this.setState({
                usernameCheck:false,
                usernameError:"Username is required"
            })
        }
        if(name===""){
            this.setState({
                nameCheck:false,
            })
        }
        if(password===""){
            this.setState({
                passwordCheck:false,
                passwordError:"Password is required"
            })
        }
        if(password!==password2){
            this.setState({
                match:false,
            })
        }
        if(usernameCheck&&match&&usernameCheck&&passwordCheck&&username!==""&&password!==""&&name!==""){
            this.setState({
                isLoading:true
            })
            const {registerAction} = this.props
            await registerAction({username,password,name})
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
                this.setState({
                    isRequested:true,
                    isLoading:false,
                    usernameCheck:false,
                    usernameError:"Username already exists"
                })
            }
        }

        if(isFulfilled&&!isRequested){
            localStorage.clear()
            this.props.history.push('/login')
        }
    }


    render(){
        const {isLoading,match,nameCheck,usernameCheck,usernameError,passwordCheck,passwordError} = this.state
        return(
             <>
            <Container component="main" maxWidth="xs">
            <div style={{marginTop: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                <Avatar >
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom:'20px'}}>
                Sign Up
                </Typography>
                <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!nameCheck}
                    helperText={!nameCheck?"Name is required":""}
                    id="Name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={this.handlerChange}
                />
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
                    onChange={this.handlerChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!passwordCheck}
                    helperText={!passwordCheck?
                        passwordError
                    :""}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handlerChange}
                    autoComplete="current-password"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!match}
                    helperText={!match?"Password doesn't match":""}
                    name="password2"
                    label="Confirm password"
                    type="password"
                    id="password2"
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
                    Sign Up
                </Button>
                <Grid container style={{marginTop:'20px'}}>
                    <Grid item xs>
                    <Link to="/" style={{textDecoration:'none'}}>
                        Home
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/login" style={{textDecoration:'none'}}>
                        {"Already have an account? Sign In"}
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
    const {isLoading,isRejected,isFulfilled,responseAPI} = auth
    return {
        isLoading,
        isRejected,
        isFulfilled,
        responseAPI
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        registerAction:(body) => {
            dispatch(postRegisterActionCreator(body))
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Register)
