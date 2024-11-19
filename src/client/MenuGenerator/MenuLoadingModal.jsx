import React from 'react';
import {
    Grid,
    Modal
} from '@mui/material';
import MenuAnimation from './MenuAnimation';

const MenuLoadingModal = ({open, onClose}) => {
    return(
        <Modal
            open={open}
            // onClose={onClose}
            style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <Grid style={{height: 200, width: 400, backgroundColor:'#FFF', borderRadius: 10}}>
                <p style={{textAlign:'center', fontWeight: 500}}><span style={{color:'red'}}>AI </span>is generating your menu...</p>
                <MenuAnimation />
            </Grid>
        </Modal>
    )
}

export default MenuLoadingModal;