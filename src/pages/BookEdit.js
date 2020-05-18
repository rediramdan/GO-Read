import React,{Component} from 'react'
import Footer from '../components/Footer'
import { getBookById,putBook } from '../utils/http'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import CloseIcon from '@material-ui/icons/Close'
import MenuItem from '@material-ui/core/MenuItem'
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import SaveSharpIcon from '@material-ui/icons/SaveSharp'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {getAllAuthorActionCreator} from '../redux/actions/actionAuthor'
import {getAllGenreActionCreator} from '../redux/actions/actionGenre'

class BookEdit extends Component{

    state = {
        title:"",
        description:"",
        id_author : "",
        id_genre : "",
        titleError:null,
        image:null,
        snackbar:{
            open:false,
            message:''
        },
        book :{},
        author:[],
        genre:[],
        isLoading : true
    }

    handlerChange = (e) => {
        const key = e.target.name
        if(key === "title"){
           if(e.target.value === ""){
            this.setState({
                titleError : "title is required"
            })
           }else{
            this.setState({
                titleError : null
            }) 
           }
        }else{
            if(e.target.value === ""){
                this.setState({
                    snackbar : {
                        open:true,
                        message: key+" is required"
                    }
                })
            }
        }
        this.setState({
            [key] : e.target.value
        })
    }

    handleUpload = (e) => {
        const key = e.target.name
        const image = e.target.files[0]
        if(image.type === "image/png" || 
            image.type === "image/jpg" || 
            image.type === "image/jpeg"){
            if(image.size <= 2000000){
                this.setState({
                    [key] : image
                })
            }else{
                this.setState({
                    snackbar : {
                        open:true,
                        message: "Book cover size is to large max:2MB"
                    }
                })
            }
        }else{
            this.setState({
                snackbar : {
                    open:true,
                    message: "Book cover must be image"
                }
            })
        }
    }

    handleUpdate = async () => {
        const {title,description,id_author,id_genre,image,book} = this.state
        if(title === "" || description === "" || id_author === "" || id_genre === ""){
            this.setState({snackbar: {
                open:true,
                message:'Error : All field must be filled'
            } });
        }else{
            this.setState({
                isLoading : true
            })
            await putBook({title,description,id_author,id_genre,image},book.id)
            .then(() => {
                this.props.history.push({
                    pathname:'/',
                    state:{
                        openSnackbar:true,
                        messageSnackbar:"Book has been changed"
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
    }

    async componentDidMount(){
        if(atob(localStorage.getItem('_h')) !== 1 && 
            atob(localStorage.getItem('_h')) !== "1"){
            this.props.history.push('/')
        }
        const {bookId} = this.props.match.params
        // await getBookById(atob(bookId))
        // .then((response) => {
        //     this.setState({
        //         book: response.data.data,
        //         title:response.data.data.title,
        //         description:response.data.data.description,
        //         id_author : response.data.data.id_author,
        //         id_genre : response.data.data.id_genre,
        //         isLoading:false
        //     });
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        const {responseAPI} = this.props
        if(responseAPI.length !== 0){
            let bookDetail = {}
            responseAPI.forEach(response => {
                if(response.id === parseInt(atob(bookId))){
                    bookDetail = response
                }
            });
            console.log(bookDetail)
            this.setState({
                book: bookDetail,
                title:bookDetail.title,
                description:bookDetail.description,
                id_author : bookDetail.id_author,
                id_genre : bookDetail.id_genre,
                isLoading:false
            })
        }else{
            await getBookById(atob(bookId))
            .then(async (response) => {
                this.setState({
                    book: response.data.data,
                    title:response.data.data.title,
                    description:response.data.data.description,
                    id_author : response.data.data.id_author,
                    id_genre : response.data.data.id_genre,
                    isLoading:false
                });
            })
            .catch((error) => {
                console.log(error)
            })

        }

        const {getAuthorAction,getGenreAction,author,genre} = this.props
        if(author.responseAPI.length === 0){
            await getAuthorAction()
        }

        if(genre.responseAPI.length === 0){
            await getGenreAction()
        }

        this.handleChangeLoading(false)

        
    }

    handleChangeLoading = (value) => {
        this.setState({
            isLoading:value
        })
    }


    render(){
        const {isLoading,snackbar,titleError} = this.state
        const author = this.props.author.responseAPI
        const genre = this.props.genre.responseAPI
        const optAuthor = author.map(author =>{
            return (
                <MenuItem value={author.id} key={author.id}>{author.name}</MenuItem>
            )
        })
        const optGenre = genre.map(genre =>{
            return (
                <MenuItem value={genre.id} key={genre.id}>{genre.name}</MenuItem>
            )
        })
        return (
            <>
                <AppBar 
                    isLoading={this.state.isLoading} 
                    handleChangeLoading={this.handleChangeLoading} 
                    {...this.props}
                />
                <Header name={'Book Edit'}{...this.props}/>
                <Container>
                    <Box style={{padding: 0,
                            margin: 'auto',
                            maxWidth: 900,
                        }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <TextField
                                        label="Title"
                                        style={{ marginBottom: 10 }}
                                        fullWidth
                                        required
                                        error={titleError !== null ? true : false}
                                        helperText={titleError !== null ? titleError : ""}
                                        variant="outlined"
                                        name="title"
                                        value={this.state.title}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handlerChange}
                                    />
                                    <FormControl 
                                        variant="outlined" 
                                        style={{ marginBottom: 10 }} 
                                        required 
                                        fullWidth>
                                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.id_genre}
                                            label="Genre"
                                            name="id_genre"
                                            onChange={this.handlerChange}>
                                        {optGenre}
                                        </Select>
                                    </FormControl>
                                    <FormControl 
                                        style={{ marginBottom: 10 }} 
                                        variant="outlined" 
                                        required  
                                        fullWidth>
                                        <InputLabel id="demo-simple-select-label">Author</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.id_author}
                                            label="Author"
                                            name="id_author"
                                            onChange={this.handlerChange}>
                                        {optAuthor}
                                        </Select>
                                    </FormControl>
                                    <input
                                        accept=".png,.jpeg,.jpg"
                                        style={{display:'none'}}
                                        id="contained-button-file"
                                        type="file"
                                        name="image"
                                        onChange={this.handleUpload}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button 
                                            variant="contained" 
                                            color={this.state.image === null ? "default" : "primary"} 
                                            component="span">
                                            Upload Cover Book
                                        </Button>
                                        { this.state.image !== null ? 
                                        (<Chip label={this.state.image.name} style={{borderRadius:0}} />) 
                                        :""}
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                            <FormControl style={{ marginBottom: 10 }} variant="outlined"  fullWidth>
                                <textarea 
                                    required
                                    rows='12' 
                                    name='description'
                                    placeholder='Description...'
                                    onChange={this.handlerChange}
                                    value={this.state.description}
                                    style={{
                                        borderRadius:4,
                                        borderColor:'rgba(0,0,0,0.2)',
                                        padding:15,
                                        fontSize:18,
                                    }}>

                                </textarea>
                            </FormControl>
                                <Button 
                                    startIcon={<SaveSharpIcon />}
                                    variant="contained" 
                                    color="primary"
                                    onClick={this.handleUpdate}
                                    style={{
                                        float:'right',
                                        marginRight:0
                                    }}>
                                     Save
                                </Button>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Box>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        key={'top,right'}
                        open={snackbar.open}
                        message={`${snackbar.message}`}
                        autoHideDuration={3000} 
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
                    <Backdrop open={isLoading} style={{ zIndex:  199,color: '#fff'}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                </Container>
                <Footer/>
            </>
        )
    }
}

const mapStateToProps = ({genre,author,book}) => {
    const {responseAPI} = book
    return {
        genre,
        author,
        responseAPI
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGenreAction : () => {
            dispatch(getAllGenreActionCreator())
        },
        getAuthorAction: () => {
            dispatch(getAllAuthorActionCreator())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookEdit)