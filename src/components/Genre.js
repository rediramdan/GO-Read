import React,{Component} from 'react'
import  ListComponent  from './ListComponent'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit' 
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {connect} from 'react-redux'
import {
    getAllGenreActionCreator,
    postGenreActionCreator,
    putGenreActionCreator,
    deleteGenreActionCreator,
    resetGenreStatus,
} from '../redux/actions/actionGenre'


class Genre extends Component{

    state = {
        id:"",
        name:"",
        edit:false,
        openSnackbar:false,
        messageSnackbar:"",
        isRequested:false,
        isLoading : false
    }

    handleClick = (id,name) => {
        this.setState({
            id:id,
            name:name,
            edit:true,
        })
    }

    notClick = (e) => {
        this.setState({
            edit:false,
            name:"",
        })
    }

    handleChange = (e) => {

        this.setState({
            name:e.target.value
        })
        
    }

    handleDelete = async () => {
        const {deleteGenreAction} = this.props
        this.props.handleChangeLoading(true)
        await deleteGenreAction(this.state.id)
        // await deleteGenre(this.state.id)
        // .then(()=>{
        //     this.setState({
        //         openSnackbar:true,
        //         messageSnackbar:"Genre has been deleted"
        //     })
        //     this.getData()
        //     this.props.handleChangeLoading(false)
        // })
        // .catch((error) => {
        //     this.props.handleChangeLoading(false)
        //     this.setState({
        //         openSnackbar:true,
        //         messageSnackbar:"Genre cannot deleted"
        //     })
        //     if(error.response.data.data.message === "JsonWebTokenError" || 
        //         error.response.data.data.message === "TokenExpiredError"){
        //         this.props.history.push("/refresh-token")
        //     }
        // })
    }

    handleStore = async () => {
        const {postGenreAction,handleChangeLoading} = this.props
        handleChangeLoading(true)
        await postGenreAction({name : this.state.name})
    }

    handleUpdate = async () => {
        const {putGenreAction} = this.props
        this.props.handleChangeLoading(true)
        await putGenreAction({name : this.state.name},this.state.id)
        // await putGenre({name : this.state.name},this.state.id)
        //     .then(()=>{
        //         this.setState({
        //             openSnackbar:true,
        //             messageSnackbar:"Genre has been changed"
        //         })
        //         this.getData()
        //         this.props.handleChangeLoading(false)
        //     })
        //     .catch((error) => {
        //         this.props.handleChangeLoading(false)
        //         if(error.response.data.data.message === "JsonWebTokenError" || 
        //             error.response.data.data.message === "TokenExpiredError"){
        //             this.props.history.push("/refresh-token")
        //         }
        //     })
    }

    getData = async () => {
        this.props.handleChangeLoading(true)
        const {getGenreAction,responseAPI} = this.props
        if(responseAPI.length === 0){
            await getGenreAction()
        }
        this.setState({
            name:"",
            id:"",
            edit:false,
        })
        this.props.handleChangeLoading(false)
    }

    async componentDidMount(){
        console.log(this.props)
       this.getData()
    
    }

    handleCloseSnackbar = () => {
        this.setState({
            openSnackbar:false,
            messageSnackbar:""
         });
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
        const {isRejected,isFulfilled,type} = this.props
        if(isRejected&&!isRequested){
            this.props.handleChangeLoading(false)
            this.setState({
                isRequested : true
            })
            if(type === 4){
                this.setState({
                    openSnackbar:true,
                    messageSnackbar:"Genre cannot deleted"
                })
            }else{
                this.props.resetGenreAction()
                this.props.history.push("/refresh-token")
            }
        }

        if(isFulfilled&&!isRequested){
            if(type !== 1){
                this.setState({
                        isRequested:true,
                        openSnackbar:true,
                        messageSnackbar: 
                            type === 2 ?
                                "Genre has been added":
                            type === 3 ?
                                "Genre has been changed":
                            type === 4 ? 
                                "Genre has been deleted":
                            ""
                })
                this.getData()
            }
        }
    }

    render(){
        const {name,edit,openSnackbar,messageSnackbar} = this.state
        const genre = this.props.responseAPI
        return (
             
            <>  
                <Typography variant="h5" component="h5">
                    Manage Genre 
                </Typography>
                <TextField 
                    required 
                    id="standard-required-genre" 
                    name="name"  
                    value={name} 
                    onChange={this.handleChange}
                />     
                {
                    edit ?
                    (
                    <> 
                    <Tooltip title={"Edit genre"}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={this.handleUpdate} 
                            style={{width:20}}>
                            <EditIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Delete genre"}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small" 
                            onClick={this.handleDelete}>
                            <DeleteIcon/>
                        </Button>
                    </Tooltip>
                    </>)
                    :
                    (
                    <Tooltip title={"Add new genre"}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={this.handleStore}>
                            <AddIcon/>
                        </Button>
                    </Tooltip>
                    )
                }
                 <Typography style={{display:'block',fontSize:11}}>
                    Click to select the genre
                </Typography>                   
                <ListComponent 
                    {...this.props} 
                    data={genre} 
                    notClick={this.notClick}
                    handleClick={this.handleClick}
                    type={2}
                />

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

const mapStateToProps = ({genre}) => {
    const {isLoading,isRejected,isFulfilled,responseAPI,type} = genre
    return {
        isLoading,
        isRejected,
        isFulfilled,
        type,
        responseAPI
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGenreAction : () => {
            dispatch(getAllGenreActionCreator())
        },
        postGenreAction : (body) => {
            dispatch(postGenreActionCreator(body))
        },
        putGenreAction : (body,id) => {
            dispatch(putGenreActionCreator(body,id))
        },
        deleteGenreAction : (id) => {
            dispatch(deleteGenreActionCreator(id))
        },
        resetGenreAction : () => {
            dispatch(resetGenreStatus())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Genre)