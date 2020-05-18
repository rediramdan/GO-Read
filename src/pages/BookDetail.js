import React,{Component} from 'react'
import { getBookById,deleteBook,transactionBook,checkBook } from '../utils/http'
import Footer from '../components/Footer'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import BookDetailComponent from '../components/BookDetailComponent'
import {connect} from 'react-redux'
import {addHistoryActionCreator} from '../redux/actions/actionBook'

class BookDetail extends Component{

    state = {
        book :{},
        status:0,
        delete:false,
        userMatch:false,
        role : atob(localStorage.getItem('_h')),
        id : atob(this.props.match.params.bookId),
        isLoading : true,
        snackbar:{
            open: false,
            message:'',
        }
    }

    handleDelete = async (e) => {
        e.preventDefault()
        await deleteBook(this.state.id)
        .then(() => {
            this.props.history.push({
                pathname:'/',
                state:{
                    openSnackbar:true,
                    messageSnackbar:"Book has been deleted"
                }
            })
        })
        .catch((error) => {
            if(error.response.data.data.message === "JsonWebTokenError" || 
                error.response.data.data.message === "TokenExpiredError"){
                this.props.history.push("/refresh-token")
            }
        })
    }

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }

    handleTransaction = async (e) => {
        let st = ""
        let message = ""
        this.setState({
            isLoading:true
        })
        if(this.state.status===1){
            st = 0
            message = "Book has been borrowed"
        }else{
            st = 1
            message = "Book has been returned"
        }
        await transactionBook({status:st},this.state.id)
        .then((response) => {
            this.setState({
                snackbar:{
                    open:true,
                    message:message
                },
                status:st,
                userMatch:true,
                isLoading:false
            })
            this.props.addHistoryAction({
                id:response.data.data.id_history,
                status : st,
                id_book:this.state.book.id,
                title:this.state.book.title,
                created_at:new Date()
            })
        })
        .catch((error) => {
            console.log({error})
            if(error.response.data.data.message === "JsonWebTokenError" || 
                error.response.data.data.message === "TokenExpiredError"){
                this.props.history.push("/refresh-token")
            }
        })
    }
    
    userMatchCheck = async (bookId) => {
        await checkBook(atob(bookId))
        .then((response) => {
            this.setState({
                userMatch: response.data.data.message,
            });
        })
        .catch((error) => {
            if(this.state.role === 1 || 
                this.state.role === 0 || 
                this.state.role === "1" || 
                this.state.role === "0"){
                if(error.response.data.data.message === "JsonWebTokenError" || 
                    error.response.data.data.message === "TokenExpiredError"){
                    this.props.history.push("/refresh-token")
                }
            }
            console.log(error)
        })
    }

    async componentDidMount(){
        const {bookId} = this.props.match.params
        const {responseAPI} = this.props
        if(responseAPI.length !== 0){
            let bookDetail = {}
            responseAPI.forEach(response => {
                if(response.id === parseInt(atob(bookId))){
                    bookDetail = response
                }
            });
            this.setState({
                book: bookDetail,
                isLoading: false,
                status:bookDetail.status,
            })
            if(bookDetail.status === 0 || bookDetail.status === "0"){
                this.userMatchCheck(bookId)
            }
        }else{
            await getBookById(atob(bookId))
            .then(async (response) => {
                this.setState({
                    book: response.data.data,
                    isLoading: false,
                    status:response.data.data.status,
                });
                if(response.data.data.status === 0 || response.data.data.status === "0"){
                   this.userMatchCheck(bookId)
                }
            })
            .catch((error) => {
                console.log(error)
            })

        }

    }
    
    handleClose = () => {
        this.setState({snackbar: {
            open:false,
            message:''
        } });
    };

    handleClickOpenDialog = (e) => {
        e.preventDefault()
        this.setState({
            delete:true
        })
    };
    
    handleCloseDialog = () => {
        this.setState({
            delete:false
        })
    };

    render(){
        const {isLoading,status,userMatch,snackbar} = this.state
        return (
            <>
                <AppBar 
                    handleChangeLoading={this.handleChangeLoading} 
                    isLoading={isLoading} 
                    {...this.props}
                />
                <Header 
                    name={'Book Detail'} 
                    type={2} status={status} 
                    handleTransaction={this.handleTransaction} 
                    handleClickOpenDialog={this.handleClickOpenDialog}
                    userMatch={userMatch} bookId={this.state.id} 
                    {...this.props} 
                />
                {!isLoading ?
                    <BookDetailComponent data={this.state} isLoading={isLoading}/> 
                : ""}
                
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    key={'top,right'}
                    open={snackbar.open}
                    message={`${snackbar.message}`}
                    autoHideDuration={2000} 
                    onClose={this.handleClose}
                    action={
                          <IconButton 
                            size="small" 
                            aria-label="close" 
                            color="inherit" 
                            onClick={this.handleClose}>
                                <CloseIcon fontSize="small" />
                          </IconButton>
                      }
                />
                <Footer/>
                <Dialog
                    open={this.state.delete}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {status === 1 ? "Do you want to DELETE this book ?" : "Sorry, book cannot be deleted"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {status === 1 ? "Are you sure ?" : "This book is still borrowed"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        {status === 1?
                            <Button onClick={this.handleDelete} color="primary" autoFocus>
                                Yes, Im sure
                            </Button>
                        :
                            <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                                Ok
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = ({book}) => {
    const {responseAPI} = book
    return {
        responseAPI
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addHistoryAction : (body) => {
            dispatch(addHistoryActionCreator(body))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)