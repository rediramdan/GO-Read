import React from 'react'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TagFacesSharpIcon from '@material-ui/icons/TagFacesSharp'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem(props) {
  const {data,handleClick,notClick} = props
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index , name) => {
      console.log(event)
      if(selectedIndex === null || selectedIndex !== index){
        handleClick(index,name)
        setSelectedIndex(index);
      }else{
        notClick(index)
        setSelectedIndex(null);
      }
  };

  const ListData = data.map(data =>{
        return (
          <Tooltip 
            title={
                selectedIndex === data.id ? 
                  " Click to Unselect "+data.name 
                  : 
                  " Click to select "+data.name
            } 
            key={data.id}>
            <ListItem
              button
              selected={selectedIndex === data.id}
              onClick={
                  (event) => handleListItemClick(event, data.id,data.name)
              }
            >
            <ListItemIcon>
                {props.type === 1 ? <PersonIcon /> : <TagFacesSharpIcon />}
            </ListItemIcon>
            <ListItemText primary={data.name} />
            </ListItem>
          </Tooltip>

        )
    })

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {ListData}
      </List>
    </div>
  );
}