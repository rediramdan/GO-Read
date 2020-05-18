import React from 'react'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import SortIcon from '@material-ui/icons/Sort'
import BookIcon from '@material-ui/icons/Book'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles((theme) => ({
    h4: {
        display:'inline-block',
        marginRight:150,
        [theme.breakpoints.up('md')]:{
            marginRight:700,
        },
        marginTop:20
    },
    buttonStyle:{
        marginBottom:0,
        marginTop : 10,
        [theme.breakpoints.up('md')] : {
            marginBottom:20,
            marginTop:0
        }
    },
    upp:{
        [theme.breakpoints.up('md')] :{
            marginBottom:10,
            marginTop:60
        },
        marginBottom:10,
        marginTop:50
    },
    mobile:{
        [theme.breakpoints.up('md')] :{
            display:'none'
        },
        display:'block',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderColor:'rgba(0,0,0,0.1)',
        marginTop:10,
        marginBottom:0
    },
    desktop:{
        [theme.breakpoints.up('md')] :{
            display:'block',
            marginTop:0
        },
        display:'none'
    },
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        }
    }
  
  }));

function Header(props){
    const {
        handleChange,
        handleChangeAsc,
        asc,
        max,
        sort,
        name,
        type,
        status,
        userMatch,
        handleTransaction,
        bookId,
        limit,
        handleClickOpenDialog
    } = props
    const role=atob(localStorage.getItem('_h'))
    const classes = useStyles()
    return(
        <>
        <Container maxWidth={max?max:"md"} className={classes.upp}>
            <Typography variant="h5" component="h5" className={classes.h4}>
                {name}
            </Typography>
            <hr className={classes.mobile}/>
            {type===1?
            <>
            <FormControl 
                style={{
                    minWidth: 50,
                    marginRight:'22px',
                    marginTop:5,
                    borderBottomColor:'white'
                }}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="limit" 
                onChange={handleChange}
                className={classes.select}
                value={limit}>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
            </Select>
            </FormControl>
            <FormControl style={{minWidth: 100,marginRight:'25px',marginTop:5}}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="sort" 
                onChange={handleChange} 
                className={classes.select}
                value={sort}>
                    <MenuItem value={""}>Created</MenuItem>
                    <MenuItem value={'author'}>Author</MenuItem>
                    <MenuItem value={'genre'}>Genre</MenuItem>
                    </Select>
            </FormControl>
            <FormControl style={{minWidth: 10,marginTop:20}}>
                <Tooltip title={asc?"set to Desc" : "set to Asc"}>
                    <Button id={`${!asc}`} onClick={handleChangeAsc}>
                        {asc?
                        <SortIcon style={{transform:'rotateY(180deg) rotate(180deg)',}} />
                        :
                        <SortIcon/>
                        }
                    </Button>
                </Tooltip>
            </FormControl>
            </>
            : <></>}
            {type === 2?
                role === 0 || role === "0"?
                    status === 1?
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransaction}
                    className={classes.buttonStyle}
                    startIcon={<BookIcon />}
                    >
                        Borrow
                    </Button>
                    :
                    userMatch === true?
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTransaction}
                        className={classes.buttonStyle}
                        startIcon={<BookIcon />}
                        >
                            Return Book
                        </Button>
                    :
                    <></>
                :
                role === 1 || role === "1"?
                <>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{props.history.push(`/book/edit/${btoa(bookId)}`)}}
                    className={classes.buttonStyle}
                    startIcon={<EditIcon />}
                    style={{marginRight:5}}
                    size="small"
                    >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpenDialog}
                    className={classes.buttonStyle}
                    startIcon={<DeleteIcon />}
                    size="small"
                    >
                    Delete
                </Button>
                </>
                :<></>

            :<></>}
            <hr className={classes.desktop}/>
        </Container>
        </>
    )
}

export default Header