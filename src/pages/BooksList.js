import React,{Component} from 'react'
import { connect } from "react-redux";
import { getUserActionCreator } from "../redux/actions/actionBook";

import qs from 'qs'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AppBar from '../components/AppBar'
import RealBook from '../components/RealBook'
import ButtonAdd from '../components/ButtonAdd'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BoxComponent from '../components/BoxComponent'
import BookRecomended from '../components/BookRecomended'

class BooksList extends Component{

    state = {
        search :"",
        sort : "",
        asc : true,
        requestPage : 1,
        limit : 10,
        openSnackbar:false,
        messageSnackbar:"",
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
            await this.props.getUserAction(this.state)
        })
    }
    componentDidMount(){
        if(this.props.location.state !== undefined){
            this.setState({
                openSnackbar:this.props.location.state.openSnackbar,
                messageSnackbar:this.props.location.state.messageSnackbar
            })
        }
        this.getData()
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
            await this.props.history.push(`/?${qs.stringify(query)}`)
            this.getData()
        })
    }
    handleChangeAsc = (e) => {
        this.setState({asc: !this.state.asc},
        async ()=>{
            const {search,sort,asc,requestPage,limit} = this.state
            let query = {}
            if(search !== ""){query.search = search}
            if(sort !== ""){query.sort = sort}
            if(asc !== true){query.asc = asc}
            if(requestPage !== 1){query.requestPage = requestPage}
            if(limit !== 10){query.limit = limit}
            await this.props.history.push(`/?${qs.stringify(query)}`)
            this.getData()
        })
        
    }
    handleChange = (e) => {
        let value = e.target.value
        let key = e.target.name
        if(e.target.name === undefined){
            value = e.target.id
            key = "asc"
            console.log(value)
        }
        this.setState({[key]: value,isLoading:true},
        async ()=>{
            const {search,sort,asc,requestPage,limit} = this.state
            let query = {}
            if(search !== ""){query.search = search}
            if(sort !== ""){query.sort = sort}
            if(asc !== true){query.asc = asc}
            if(requestPage !== 1){query.requestPage = requestPage}
            if(limit !== 10){query.limit = limit}
            await this.props.history.push(`/?${qs.stringify(query)}`)
            this.getData()
        })
        
    }

    handleCloseSnackbar = () => {
        this.props.history.replace({state:{}})
        this.setState({
            openSnackbar:false,
            messageSnackbar:""
         });
    };

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }

    render(){
        const {
                sort,
                asc,
                search,
                limit,
                openSnackbar,
                messageSnackbar,
                requestPage
            } = this.state
        const data = this.props.responseAPI
        const {pagination,isLoading} = this.props
        const role = atob(localStorage.getItem('_h'))
        return(
            <>
            <AppBar 
                handleChange={this.handleChange}
                handleChangeLoading={this.handleChangeLoading}
                isLoading={isLoading} 
                value={search}
                {...this.props}
            />
            {search === "" && parseInt(role) !== 1 && parseInt(role) !== 0 ?
                <>
                    <BoxComponent/>
                    <BookRecomended/>
                </>
            :""}
            
                <Header 
                    {...this.props} 
                    sort={sort} 
                    handleChange={this.handleChange} 
                    handleChangeAsc={this.handleChangeAsc} 
                    asc={asc} 
                    max="lg"
                    limit={limit}
                    name={'Books List'} 
                    type={1}
                />
                <Container maxWidth="lg" id="bookPage">
                {!isLoading && data.length === 0 ?"Data not found..":""}
                <RealBook 
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
                <Footer/>
                </Container>
                {role === 1 || role === '1' ? <ButtonAdd {...this.props} /> : ""}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    key={'top,right'}
                    open={openSnackbar}
                    message={`${messageSnackbar}`}
                    autoHideDuration={2000} 
                    onClose={this.handleCloseSnackbar}
                    action={
                          <IconButton 
                            size="small" 
                            aria-label="close" 
                            color="inherit" 
                            onClick={this.handleCloseSnackbar}>
                                <CloseIcon fontSize="small" />
                          </IconButton>
                      }
                />
            </>
        )
    }
}

const mapStateToProps = ({book}) => {
    const {responseAPI,pagination,isLoading,isRejected,url} = book
    return {
        url,
        isLoading,
        isRejected,
        responseAPI,
        pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserAction: (body) => {
        dispatch(getUserActionCreator(body));
      },
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList)
