import * as React from 'react';
import './App.css';
import Balance from './assets/balance';
import AsideMenu from './assets/asidemenu.js';
import { DialogContentText, Grid } from '@mui/material';
import EnhancedTable from './assets/tabletwo';

function App() {  
 
  return (
    <div className='body'>
      <AsideMenu/>
      <Grid container spacing={2} className='header'>

        <Grid item >
          <h1>Crédito</h1>
        </Grid>

        <Grid item >
          <Balance/>
        </Grid>

        <Grid container spacing={0}>
          <Grid item sm >
            <EnhancedTable />
          </Grid>
        </Grid>
      
      </Grid>
    </div>
  );
};

export default App;
