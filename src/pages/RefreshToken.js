import React,{Component} from 'react'
import Footer from '../components/Footer'
import AppBar from '../components/AppBar'
import {refreshToken} from '../utils/http'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import RefreshIcon from '@material-ui/icons/Refresh'
import Typography from '@material-ui/core/Typography'

class RefreshToken extends Component{

    state = {
        isLoading : false,
        token : localStorage.getItem('_token')
    }

    handleClick = async () => {
        this.setState({
            isLoading:true
        })
        await refreshToken({token:this.state.token})
        .then((response)=>{
            localStorage.removeItem('token')
            localStorage.setItem('token', response.data.data.accessToken)
            this.props.history.goBack()
        })
        .catch((error) => {
            localStorage.clear()
            this.props.history.push('/login')
        })
    }

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }

    render(){
        const {isLoading} = this.state
        return (
            <>
                <AppBar 
                    handleChangeLoading={this.handleChangeLoading} 
                    isLoading={isLoading} 
                    {...this.props}
                />
                <Container maxWidth={'md'} style={{marginTop:100,textAlign:'center'}}>
                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                        Your token has expired, 
                        this can happen if your token has expired or your token has been lost
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop:20}}
                        onClick={this.handleClick}
                        startIcon={<RefreshIcon />}>
                        Refresh
                    </Button>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default RefreshToken