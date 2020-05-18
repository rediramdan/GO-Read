import React,{Component} from 'react'
import Footer from '../components/Footer'
import AppBar from '../components/AppBar'
import ManageComponent from '../components/ManageComponent'

class BookEdit extends Component{

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
            <ManageComponent 
                handleChangeLoading={this.handleChangeLoading} 
                {...this.props}
            />
            <Footer/>
            </>
        )
    }
}

export default BookEdit