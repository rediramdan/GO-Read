import React from 'react'
import {Link} from 'react-router-dom'
import Grow from '@material-ui/core/Grow'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/lab/Skeleton'
import GridList from '@material-ui/core/GridList'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginBottom:10,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width:'100%',
    height: 310,
    padding:0,
    [theme.breakpoints.up('md')]:{
        paddingRight:40,
        paddingLeft:0,
        height: 435,
    },

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.34)',
  },
  iconr: {
    color: 'white',
  },

}));


function RealBook(props){
    const {data,isLoading} = props
    const classes = useStyles();
    const result = data.map((data,key) => {
        return(
            <Grow in={!isLoading} 
            key={data.id}
            style={{ transformOrigin: '0 0 0' }}
            {...(!isLoading ? { timeout: 500 * key + 1000  } : {})}>
                <GridListTile >
                    <img 
                        src={'http://localhost:3001/public/images/'+data.image} 
                        alt={data.title} 
                        width={"100%"} 
                        height={"100%"}
                        style={{borderRadius:8}}
                    />
                    <GridListTileBar
                        style={{
                            borderRadius:8,
                            borderTopLeftRadius:0,
                            borderTopRightRadius:0
                        }}
                        title={data.title}
                        subtitle={
                            <span>
                                {data.genre_name}
                                <br/><br/>
                                by: {data.author_name}
                                <br/>
                            </span>}
                        actionIcon={
                        <Link to={'/book/'+btoa(data.id)}>
                            {data.status === 0 || data.status === "0"?
                                <IconButton 
                                    aria-label={`info about ${data.title}`} 
                                    className={classes.icon}>
                                    <Tooltip 
                                        title="Book unavailable" 
                                        aria-label="book" >
                                        <InfoIcon />
                                    </Tooltip>
                                </IconButton>
                                :
                                <IconButton 
                                    aria-label={`info about ${data.title}`} 
                                    className={classes.iconr}>
                                    <Tooltip 
                                        title="Book available" 
                                        aria-label="book">
                                        <InfoIcon />
                                    </Tooltip>
                                </IconButton>
                            }
                        </Link>
                    }
                    />
                </GridListTile> 
            </Grow>
        )
    })

    const getGridListCols = () => {
        if (isWidthUp('md', props.width)) {
          return 7;
        }
    
        return 2;
      }

      const role = atob(localStorage.getItem('_h'))

    return (
        <>
        <div className={classes.root}>
            <Container maxWidth={'lg'}>
            <GridList 
                cellHeight={220}
                className={classes.gridList} 
                cols={getGridListCols()}>
                {result}
                {role==="1" || role===1?
                <GridListTile 
                    className={classes.tile}>
                    <Skeleton 
                        variant="rect" 
                        width={'100%'} 
                        height={'100%'} 
                    />
                    <GridListTileBar
                        title={'Add New'}
                        actionIcon={
                        <Link to={'/add/book'}>
                            <Tooltip title="Add new book" >
                                <IconButton 
                                    aria-label={`info about`} 
                                    className={classes.icon}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    }
                    />
                    <Typography variant="h4" component="h4">
                        Add Book
                    </Typography>
                </GridListTile>
            :""} 
            </GridList>
            </Container>
        </div>
        </>
    )
}

export default withWidth()(RealBook)