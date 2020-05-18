import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Timestamp from 'react-timestamp'
import {connect} from 'react-redux'
import {getHistoryActionCreator} from '../redux/actions/actionBook'
import {deleteHistoryActionCreator} from '../redux/actions/actionBook'
import { grey } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  spinSmall : {
    animation:'spin 2s linear infinite',
  }
}));


const History = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
    const deleteAction = async (e,id) => {
      e.preventDefault()
      setSelected(id)
      setLoading(true)
      setTimeout(async () => {
        await props.deleteHistoryAction(id)
      },1000)
      
    }
    if(props.isFulfilled&&loading){
      setLoading(false)
    }
    if(props.isRejected&&loading){
      setLoading(false)
      props.history.push("/refresh-token")
    }

    const Lists = props.bookHistory.map((value) => {
      return (
        <ListItem key={value.created_at}>
          <ListItemAvatar>
            {value.status === 1?
            <Avatar style={{backgroundColor:grey[500]}}>
              <BookmarkBorderIcon />
            </Avatar>
            : 
            <Avatar>
              <BookmarkBorderIcon />
            </Avatar>
            }
          </ListItemAvatar>
          <ListItemText
            primary={<Timestamp relative date={new Date(value.created_at)} autoUpdate/>}
            secondary={
              <Link to={'/book/'+btoa(value.id_book)} style={{textDecoration:'none',color:'rgba(0,0,0,0.6)'}}>
                {value.title+' book, you have '}{value.status===1?"returned":"borrowed"}
              </Link>}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" id={value.id} onClick={(e)=>deleteAction(e,value.id)}>
              {loading && selected === value.id?
              <DeleteIcon className={classes.spinSmall}/>
              : 
              <DeleteIcon />
              }
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" className={classes.title}>
          Book transaction history
          </Typography>
          <div className={classes.demo}>
            <List dense={true}>
              {Lists}
              {!props.isEnd ?
              <Button 
              color="primary" 
              style={{textAlign:'center'}}
              onClick={(e)=>{props.getHistoryAction({requestPage:props.nextPage,limit:2})}}>
                Show more...
            </Button>:""}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({book}) => {
  const {bookHistory,nextPage,isEnd,isRejected,isFulfilled} = book
  return {
    isRejected,
    isFulfilled,
    bookHistory,
    nextPage,
    isEnd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryAction:(body) =>{
      dispatch(getHistoryActionCreator(body))
    },
    deleteHistoryAction:(body) =>{
      dispatch(deleteHistoryActionCreator(body))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(History)