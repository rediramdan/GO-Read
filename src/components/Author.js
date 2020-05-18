import React,{Component} from 'react'
import AddIcon from '@material-ui/icons/Add'
import  ListComponent  from './ListComponent'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {
    getAllAuthorActionCreator,
    postAuthorActionCreator,
    putAuthorActionCreator,
    deleteAuthorActionCreator,
    resetAuthorStatus,
} from '../redux/actions/actionAuthor'

class Author extends Component{

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
            const {deleteAuthorAction} = this.props
            this.props.handleChangeLoading(true)
            await deleteAuthorAction(this.state.id)
    }

    handleStore = async () => {
        const {postAuthorAction,handleChangeLoading} = this.props
        handleChangeLoading(true)
        await postAuthorAction({name : this.state.name})
    }

    handleUpdate = async () => {
        const {putAuthorAction} = this.props
        this.props.handleChangeLoading(true)
        await putAuthorAction({name : this.state.name},this.state.id)
    }

    getData = async () => {
        this.props.handleChangeLoading(true)
        const {getAuthorAction,responseAPI} = this.props
        if(responseAPI.length === 0){
            await getAuthorAction()
        }
        this.setState({
            name:"",
            id:"",
            edit:false,
        })
        this.props.handleChangeLoading(false)
    }

    async componentDidMount(){
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
                    messageSnackbar:"Author cannot deleted"
                })
            }else{
                this.props.resetAuthorAction()
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
                                "Author has been added":
                            type === 3 ?
                                "Author has been changed":
                            type === 4 ? 
                                "Author has been deleted":
                            ""
                })
                this.getData()
            }
        }
    }


    render(){
        const {name,edit,openSnackbar,messageSnackbar} = this.state
        const author = this.props.responseAPI
        return (
             
            <>  
                <Typography variant="h5" component="h5">
                    Manage Author 
                </Typography>
                <TextField 
                    required 
                    id="standard-required" 
                    name="name"  
                    value={name} 
                    onChange={this.handleChange} 
                />     
                {
                    edit ?
                    (
                    <> 
                    <Tooltip title={"Edit author"}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={this.handleUpdate} 
                            style={{width:20}}>
                            <EditIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Delete author"}>
                        <Button 
                            variant="contained" 
                            color="secondary" size="small" 
                            onClick={this.handleDelete}>
                            <DeleteIcon/>
                        </Button>
                    </Tooltip>
                    </>)
                    :
                    (
                    <Tooltip title={"Add new author"}>
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
                    Click to select the author
                </Typography>                   
                <ListComponent 
                  {...this.props} 
                  data={author} 
                  notClick={this.notClick} 
                  handleClick={this.handleClick}
                  type={1}
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
const mapStateToProps = ({author}) => {
    const {isLoading,isRejected,isFulfilled,responseAPI,type} = author
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
        getAuthorAction : () => {
            dispatch(getAllAuthorActionCreator())
        },
        postAuthorAction : (body) => {
            dispatch(postAuthorActionCreator(body))
        },
        putAuthorAction : (body,id) => {
            dispatch(putAuthorActionCreator(body,id))
        },
        deleteAuthorAction : (id) => {
            dispatch(deleteAuthorActionCreator(id))
        },
        resetAuthorAction : () => {
            dispatch(resetAuthorStatus())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Author)