import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, InputAdornment } from '@mui/material';
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
import api from './services/api';


const paymentMethods = [ 
    {
      value: 'PIX/TED',
    },
    {
      value: 'Boleto',
    },
  ];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

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
};

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
    id: 'value',
    numeric: false,
    disablePadding: false,
    label: 'Valor',
  },
  {
    id: 'requestDate',
    numeric: false,
    disablePadding: false,
    label: 'Solicitação',
  },
  {
    id: 'paymentMethod',
    numeric: false,
    disablePadding: false,
    label: 'Forma Pgt.',
  },
  {
    id: 'dueDate',
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
  const { order, orderBy, onRequestSort } =
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {
  return
};

export default function EnhancedTable() {
  const [post, setPost] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [paymentType, setPaymentType] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogAdvance, setDialogAdvance] = React.useState(false);
  
  React.useEffect( () => {
    const fetchPosts = async () => {
      try {
        const response = await api.get();
        setPost(response.data);
        
      }
      catch(err) {
        if(err.response){
          console.log(err.response.data.message);
          console.log(err.response.status);
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts();
  },[]);
  
  const handleChangeStatus = (status) => {
    if (status == 'status 1'){
      return 'success'
    }
    if(status == 'status 2'){
      return 'secondary'
    }
    if(status == 'status 3'){
      return 'error'
    }
  }

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - post.length) : 0;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setDialogAdvance(false);
  };

  const handleChange = (event) => {
    setPaymentType(event.target.value);
  }

  const changeModal = () => {
    setDialogAdvance(true);
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    return (
        <Box sx={{ width: '100%' }}>
            <Dialog open={open} onClose={handleClose} >

            <DialogTitle>Adicionar Crédito</DialogTitle>

                <DialogContent>
                    <TextField 
                        autoFocus 
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
                <img src={PixCode} alt="Pix QRCode" />
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
            <EnhancedTableToolbar />
            <TableContainer>
                <div style={{display:'flex', alignItems:'center',justifyContent:'center', gap:'8rem', padding: '1rem' , flexDirection: 'row'}}>
                  <div style={{display: 'flex', alignItems:'center',justifyContent:'flex-start',flexDirection:'row', width:"100vw", gap:'2rem'}}>
                    <Input id="allSearch" type="text" placeholder="Pesquisar Data" variant="filled" endAdornment={ <InputAdornment position="end"> <SearchIcon /> </InputAdornment> } />       
                    <Input id="searchDate" type="date" placeholder="Pesquisar Data" variant="standard" endAdornment={ <InputAdornment position="end"> <CalendarMonthIcon /> </InputAdornment> }/>
                  </div>
                    <div style={{display: 'flex', alignItems:'center',justifyContent:'flex-end',flexDirection:'row', width:"100vw"}}>
                      <Button style={{background:'#FF7E2E'}} variant="contained" onClick={handleClickOpen}> Adicionar Saldo </Button>
                    </div>
                </div>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle">
                        
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={post.length}>

                </EnhancedTableHead>
                <TableBody>
                    {stableSort( post , getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post) => {
                    return (
                        <TableRow key={post.id}>
                            <TableCell style={{paddingLeft:'1rem'}}
                            component="th"
                            scope="row"
                            padding="none"
                            >
                            {post.id}
                            </TableCell>
                            <TableCell align="left">{post.destiny}</TableCell>
                            <TableCell align="left">{post.value}</TableCell>
                            <TableCell align="left">{post.requestDate}</TableCell>
                            <TableCell align="left">{post.paymentMethod}</TableCell>
                            <TableCell align="left">{post.dueDate}</TableCell>
                            <TableCell align="left"><Chip label={post.status} color={handleChangeStatus(post.status)}></Chip></TableCell>
                            <TableCell align="left"><IconButton><QrCodeIcon/></IconButton></TableCell>
                            <TableCell align="left"><IconButton><ContentCopyIcon/></IconButton></TableCell>
                        </TableRow>
                    );
                    })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{height: (53) * emptyRows,}}>
                            <TableCell colSpan={6} />
                        </TableRow>
                        )}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={post.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
    );
}
