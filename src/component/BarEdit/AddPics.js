import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';


//import pic from '/mnt/c/namtanii/Year3/SoftEng/fetchdata/src/component/img/BarBG(4K).jpg'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: '50%',
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
      // color: '#fff'
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

function AddPics(props) {
    const classes = useStyles();
    const pics_path = props.addpics


    return (
      <div className={classes.root} >
      <GridList className={classes.gridList} cols={1.5}>
        {pics_path.map((path, index) => (
          <GridListTile key={index} keys={path}>
            <img  src={"http://35.240.130.253:3001/pictures/"+path} style={{height: "100%"}} /> 
          </GridListTile>
        ))}
      </GridList> 
      </div>
    );
    


}

export default AddPics;