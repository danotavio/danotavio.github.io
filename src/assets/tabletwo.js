import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCodeIcon from '@mui/icons-material/QrCode';
import IconButton from '@mui/material/IconButton';
import './table.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import PixCode from '../images/pixcodepx.png'

function createData(id, destiny, tripValue, dateSolicitation, paymentForm,expiration,status) {
  return {
    id,
    destiny,
    tripValue,
    dateSolicitation,
    paymentForm,
    expiration,
    status,
  };
}
const paymentMethods = [ 
    {
      value: 'PIX/TED',
    },
    {
      value: 'Boleto',
    },
  ];

const rows = [
  createData(4145, 'Despesa', 'R$50,00','28/02/2022 23:30', 'PIX/TED','28/02/2022','Em Pagamento',' ',' '),
  createData(4144, 'Despesa', 'R$50,00','28/02/2022 23:20', 'PIX/TED','28/02/2022','Em Pagamento',' ',' '),

];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'destiny',
    numeric: false,
    disablePadding: false,
    label: 'Destino',
  },
  {
    id: 'tripValue',
    numeric: false,
    disablePadding: false,
    label: 'Valor',
  },
  {
    id: 'dateSolicitation',
    numeric: false,
    disablePadding: false,
    label: 'Solicitação',
  },
  {
    id: 'paymentForm',
    numeric: false,
    disablePadding: false,
    label: 'Forma Pgt.',
  },
  {
    id: 'expiration',
    numeric: false,
    disablePadding: false,
    label: 'Vencimento',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'copy',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
  {
    id: 'qrcode',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell 
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel style={{paddingLeft:'1rem'}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDialogAdvance(false);
    };

    const [paymentType, setPaymentType] = React.useState('');

    const handleChange = (event) => {
        setPaymentType(event.target.value);
    }

    const [dialogAdvance, setDialogAdvance] = React.useState(false);

    const changeModal = () => {
        setDialogAdvance(true);
    }

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Dialog open={open} onClose={handleClose} >

            <DialogTitle>Adicionar Crédito</DialogTitle>

                <DialogContent>
                    <TextField 
                        autoFocus 
                        margin="dense" 
                        id="outlined-select-currency" 
                        label="Método de pagamento" 
                        value={paymentType} 
                        onChange={handleChange} 
                        fullWidth 
                        select 
                        variant="standard">

                        {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                        ))}

                    </TextField>
                </DialogContent>

                <DialogContent>

                    <TextField 
                        autoFocus 
                        margin="dense" 
                        id="paymentValue" 
                        label="Digite o valor" 
                        type="numberformat" 
                        fullWidth 
                        variant="standard" 
                        InputProps={{
                            startAdornment: 
                            <InputAdornment position="start">
                                $
                            </InputAdornment>}
                        }/>

                </DialogContent >
        
                <DialogActions>
                    <Button onClick={handleClose}  style={{color:'#FF7E2E'}}>Voltar</Button>
                    <Button variant='contained' onClick={changeModal}  style={{background:'#FF7E2E'}}>Gerar QRCODE</Button>
                </DialogActions>

            </Dialog>

            <Dialog open={dialogAdvance} onClose={handleClose}>
            <DialogContent style={{display: 'flex', justifyContent: 'center'}}>
                <img src={PixCode} />
            </DialogContent>
            <DialogContent>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', background: '#EEEEEE', padding: '1rem'}}>
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. 
                        Tristique potenti bibendum Lorem ipsum dolor
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: '1rem',  background: '#FF7E2E'}}>
                        <IconButton style={{color: 'white'}} aria-label="Copy">
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={handleClose} style={{color:'#FF7E2E'}}>Fechar</Button>
            </DialogActions>
        </Dialog>

        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <div style={{display:'flex', alignItems:'center',justifyContent:'center', gap:'3rem', padding: '1rem' , flexDirection: 'row'}}>
                    <Input id="allSearch" type="text" placeholder="Pesquisar Data" variant="filled" endAdornment={ <InputAdornment position="end"> <SearchIcon /> </InputAdornment> } />       
                    <Input id="searchDate" type="date" placeholder="Pesquisar Data" variant="standard" endAdornment={ <InputAdornment position="end"> <CalendarMonthIcon /> </InputAdornment> }/>
                    <Button style={{background:'#FF7E2E'}} variant="contained" onClick={handleClickOpen}> Adicionar Saldo </Button>
                </div>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}>
                        
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}>

                </EnhancedTableHead>
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow>
                            <TableCell style={{paddingLeft:'1rem'}}
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none">
                            {row.id}
                            </TableCell>
                            <TableCell align="left">{row.destiny}</TableCell>
                            <TableCell align="left">{row.tripValue}</TableCell>
                            <TableCell align="left">{row.dateSolicitation}</TableCell>
                            <TableCell align="left">{row.paymentForm}</TableCell>
                            <TableCell align="left">{row.expiration}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.copy}</TableCell>
                            <TableCell align="left">{row.qrcode}</TableCell>
                            
                        </TableRow>
                    );
                    })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{height: (dense ? 33 : 53) * emptyRows,}}>
                            <TableCell colSpan={6} />
                        </TableRow>
                        )}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
    );
}
