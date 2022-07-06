import './asidestyle.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar'
import { Divider } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function AsideMenu() {
    return(
        <div className='asidebackground'>
            <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
                <IconButton color="primary" aria-label="Menu"> <MenuOutlinedIcon /> </IconButton>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Divider flexItem/>
                <IconButton color="primary" aria-label="Menu"><LocalAtmOutlinedIcon  color="primary"/> </IconButton>
            </div>
            <div>
                <IconButton color="primary" aria-label="Menu"><ExitToAppIcon  color="warning"/> </IconButton>
            </div>
        </div>
)
};

export default AsideMenu;