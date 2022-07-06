import './balance.css'
import * as React from 'react';
import { fontSize } from '@mui/system';

function Balance() {
    return(
        <div className='balancebackground'>
        <h1 style={{color: '#424242'}}>Saldo Disponível: <strong style={{color: '#00AD17'}}>R$35.500,00</strong> </h1>
        <p style={{color: '#424242'}}> Aprovisionado: <strong >R$99.700,00</strong> <span style={{color: '#E87779'}}>   Dias pendentes: <strong>R$30.000,00</strong></span></p>
        </div>
    )
};

export default Balance;