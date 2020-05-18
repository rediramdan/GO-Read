import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(3),
    [theme.breakpoints.up('md')]:{
      right: theme.spacing(15),
    }
  },
}));

export default function SimpleTooltips(props) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add new book" aria-label="add" onClick={() => props.history.push('/add/book')}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}