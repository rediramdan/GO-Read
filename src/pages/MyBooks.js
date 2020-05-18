import React,{Component} from 'react'
import qs from 'qs'
import {getMyBooks} from '../utils/http'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RealMyBooks from '../components/RealMyBooks'
import History from '../components/History'
import ButtonAdd from '../components/ButtonAdd'
import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {getHistoryActionCreator} from '../redux/actions/actionBook'

class MyBooks extends Component{

    state = {
        search : "",
        sort : "",
        asc : true,
        requestPage : 1,
        limit : 10,
        role:atob(localStorage.getItem('_h')),
        data : [],
        isLoading : true,
        pagination:{}
    }

    getHistory = async (body) => {
        await this.props.getHistoryAction(body)
    }

    getData = async () => {
        const queryString = qs.parse(this.props.location.search,{ignoreQueryPrefix:true})
        const {search,sort,asc,requestPage,limit} = queryString
        this.setState({
            search:search || this.state.search,
            sort:sort || this.state.sort,
            asc:asc?false:true,
            requestPage:parseInt(requestPage) || this.state.requestPage,
            limit:limit || this.state.limit
        },async ()=>{
            await getMyBooks(this.state)
            .then((response) => {
                this.setState({
                    data: response.data.data,
                    pagination:response.data.pagination,
                    isLoading:false
                });
            })
            .catch((error) => {
                if( error.response.data.data.message === "JsonWebTokenError" || 
                    error.response.data.data.message === "TokenExpiredError" ){
                    this.props.history.push("/refresh-token")
                }
            })
        })
    }

    componentDidMount(){
        this.getData()
        if(this.props.bookHistory.length === 0){
            this.getHistory({requestPage:1,limit:2})
        }
    }

    handlerChange = async (e,value) => {
        this.setState({requestPage: value,isLoading:true},
        async ()=>{
            const {search,sort,asc,requestPage,limit} = this.state
            let query = {}
            if(search !== ""){query.search = search}
            if(sort !== ""){query.sort = sort}
            if(asc !== true){query.asc = asc}
            if(requestPage !== 1){query.requestPage = requestPage}
            if(limit !== 10){query.limit = limit}
            await this.props.history.push(`/mybooks?${qs.stringify(query)}`)
            this.getData()
        })
    }

    handleChange = (e) => {
        let value = e.target.value
        if(e.target.name ==="asc"){
            value = e.target.checked
        }
        this.setState({[e.target.name]: value,isLoading:true},
        async ()=>{
            const {search,sort,asc,requestPage,limit} = this.state
            let query = {}
            if(search !== ""){query.search = search}
            if(sort !== ""){query.sort = sort}
            if(asc !== true){query.asc = asc}
            if(requestPage !== 1){query.requestPage = requestPage}
            if(limit !== 10){query.limit = limit}
            await this.props.history.push(`/mybooks?${qs.stringify(query)}`)
            this.getData()
        })
        
    }

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }

    render(){
        const {
            data,
            isLoading,
            sort,
            asc,
            search,
            limit,
            pagination,
            requestPage
        } = this.state
    const role = atob(localStorage.getItem('_h'))
    return(
        <>
        <AppBar 
            handleChange={this.handleChange}
            isLoading={isLoading} 
            value={search}
            handleChangeLoading={this.handleChangeLoading} 
            {...this.props}
        />
            <Header 
                {...this.props} 
                sort={sort} 
                handleChange={this.handleChange} 
                asc={asc} 
                limit={limit}
                name={'My Books'} 
                type={1}
            />
            <Container maxWidth={'md'}>
            <RealMyBooks 
                data={data} 
                name={"Created at"} 
                {...this.props}  
                isLoading={isLoading}
            /> 
            <Typography 
                variant="body2" 
                color="textSecondary" 
                style={{
                    float:'right',
                    fontWeight:'bold',
                    marginRight:20
                }}>
                    Showing {data.length} books from {pagination.dataAmount}
            </Typography>
            <Pagination  
                shape="rounded" 
                color="primary" 
                count={pagination.pageAmount} 
                page={requestPage} 
                onChange={this.handlerChange} 
            />
            <History {...this.props}/>
            <Footer/>
            </Container>
            {role === 1 || role === '1' ? <ButtonAdd {...this.props} /> : ""}
        </>
    )
    }
}

const mapStateToProps = ({book}) => {
    const {nextPage,bookHistory,isLoading,isRejected,isFulfilled} = book
    return {
        isLoading,
        isRejected,
        isFulfilled,
        nextPage,
        bookHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHistoryAction: (body) => {
            dispatch(getHistoryActionCreator(body))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyBooks)
