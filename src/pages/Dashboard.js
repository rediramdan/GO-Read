import React,{Component} from 'react'
import Footer from '../components/Footer'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import DashboardComponent from '../components/DashboardComponent'

class Dasboard extends Component{

    state = {
        isLoading : true
    }

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }

    componentDidMount (){
        if( atob(localStorage.getItem('_h')) !== 1 && 
            atob(localStorage.getItem('_h')) !== "1"){
            this.props.history.push('/')
        }
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
            <Header name={'Dashboard'}{...this.props} max={'lg'}/>
            <DashboardComponent 
                handleChangeLoading={this.handleChangeLoading} 
                {...this.props}
            />
            <Footer/>
            </>
        )
    }
}

export default Dasboard