import React,{Component} from 'react'
import {postBook } from '../utils/http'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import MenuItem from '@material-ui/core/MenuItem'
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import SaveSharpIcon from '@material-ui/icons/SaveSharp'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {getAllAuthorActionCreator} from '../redux/actions/actionAuthor'
import {getAllGenreActionCreator} from '../redux/actions/actionGenre'

class BookAdd extends Component{

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
        author:[],
        genre:[],
        isLoading : true
    }

    handleClose = () => {
        this.setState({snackbar: {
            open:false,
            message:''
        } });
    };

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
        if( image.type === "image/png" || 
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
        const {title,description,id_author,id_genre,image} = this.state
        if( title === "" || 
            description === "" || 
            id_author === "" || 
            id_genre === "" || 
            image === null){
            this.setState({snackbar: {
                open:true,
                message:'Error : All field must be filled'
            } });
        }else{
            this.setState({
                isLoading : true
            })
            await postBook({title,description,id_author,id_genre,image})
            .then(() => {
                this.props.history.push({
                    pathname:'/',
                    state:{
                        openSnackbar:true,
                        messageSnackbar:"Book has been added"
                    }
                })
            })
            .catch((error) => {
                if( error.response.data.data.message === "JsonWebTokenError" || 
                    error.response.data.data.message === "TokenExpiredError"){
                    this.props.history.push("/refresh-token")
                }
            })
        }
        
    }

    async componentDidMount(){
        if(atob(localStorage.getItem('_h')) !== 1 && atob(localStorage.getItem('_h')) !== "1"){
                this.props.history.push('/')
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
                <Header name={'Book Add'}{...this.props} />
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
                                        id="standard-full-width"
                                        label="Title"
                                        style={{ marginBottom: 10 }}
                                        fullWidth
                                        error={titleError !== null ? true : false}
                                        helperText={titleError !== null ? titleError : ""}
                                        variant="outlined"
                                        name="title"
                                        onChange={this.handlerChange}
                                    />
                                    <FormControl variant="outlined" style={{ marginBottom: 10 }}   fullWidth>
                                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.id_genre}
                                        label="Genre"
                                        name="id_genre"
                                        onChange={this.handlerChange}
                                        >
                                        {optGenre}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginBottom: 10 }} variant="outlined"  fullWidth>
                                        <InputLabel id="demo-simple-select-label">Author</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.id_author}
                                        label="Author"
                                        name="id_author"
                                        onChange={this.handlerChange}
                                        >
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
                                    rows='12' 
                                    name='description'
                                    placeholder='Description...'
                                    onChange={this.handlerChange}
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
                        autoHideDuration={4000} 
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

const mapStateToProps = ({genre,author}) => {
    return {
        genre,
        author
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


export default connect(mapStateToProps, mapDispatchToProps)(BookAdd)