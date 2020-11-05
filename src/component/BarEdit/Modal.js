import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function SimpleModal(props) {
  const classes = useStyles();
  const [show, setShow] = useState(props.open);
  return (
    <div>
      <Modal open={show}>
        <div className={classes.paper} onClose={props.handleClose}>
            <h2>Text in a modal</h2>
            <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
      </Modal>
    </div>
  );
}
