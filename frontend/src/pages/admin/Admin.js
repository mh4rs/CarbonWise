import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses, Paper, TableFooter, TablePagination, IconButton } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';
import Dropdown from '../../components/Forms/Dropdown';
import './Admin.css';

function createData(name, description, eco_friendly, category, address, website, hours_of_operation, image,
) {
    return { name, description, eco_friendly, category, address, website, hours_of_operation, image }
}

const rows = [
    createData('Westborn', 'Westborn Market is a highly-rated grocery store in Dearborn that emphasizes sustainability and local produce', 'Yes', 
        'Grocery Store', '21755 Michigan Ave, Dearborn, MI 48124', 'https://westbornmarket.com/', 'Monday-Saturday: 8 AM - 9 PM Sunday: 8 AM - 7 PM', 
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwestbornmarket.com%2Flocations&psig=AOvVaw2y5rUgHE9leIChu-1KaK14&ust=1733413573706000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD1-fa6jooDFQAAAAAdAAAAABAE'),
    createData('Westborn', 'Westborn Market is a highly-rated grocery store in Dearborn that emphasizes sustainability and local produce', 'Yes', 
        'Grocery Store', '21755 Michigan Ave, Dearborn, MI 48124', 'https://westbornmarket.com/', 'Monday-Saturday: 8 AM - 9 PM Sunday: 8 AM - 7 PM', 
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwestbornmarket.com%2Flocations&psig=AOvVaw2y5rUgHE9leIChu-1KaK14&ust=1733413573706000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD1-fa6jooDFQAAAAAdAAAAABAE'),
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#608A33',
      color: theme.palette.common.white,
      fontSize: 16,
      fontFamily: 'Poppins, sans-serif'
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: '#F8F1EB',
      fontSize: 14,
      fontFamily: 'Poppins, sans-serif',
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const Admin = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answers, setAnswers] = useState({});

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnswers((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <h1>Resource Dashboard</h1>

            <div className="table-container">
                {/* add new resource modal */}
                <div className="modal-container">
                    {/* open modal on button click */}
                    <Button
                        label="Add New Resource"
                        onClick={handleOpen}
                        variant="primary"
                        style={{ fontSize: '20px', width: '250px', fontWeight: '200' }}
                    />

                    {/* modal overlay */}
                    <div className={`overlay ${isModalOpen ? 'open' : ''}`} onClick={handleClose}></div>
                    
                    {/* modal content */}
                    <div className={`modal ${isModalOpen ? 'open' : ''}`}>
                        <div className="modal-content">
                            <div className="close-button">
                                <Button
                                    label="x"
                                    onClick={handleClose}
                                    variant="primary"
                                    style={{ fontSize: '20px', width: '20px', height: '40px', fontWeight: '200', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0' }}
                                />
                            </div>
                            
                            <div className="resource-input">
                                <p style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px' }}>Add New Resource</p>
                                <TextInput label="Name" name="name" onChange={handleChange}/>
                                <TextInput label="Description" name="description" onChange={handleChange}/>
                                <Dropdown
                                label="Eco-Friendly"
                                name="eco-friendly"
                                options= {['Yes', 'No']}
                                onChange={handleChange}
                                />
                                <Dropdown
                                label="Category"
                                name="category"
                                options= {['Grocery Store', 'Clothes Market', 'Bike/Walk Trail', 'Biking Trail', 'Public Transportation']}
                                onChange={handleChange}
                                />
                                <TextInput label="Address" name="address" onChange={handleChange}/>
                                <TextInput label="Website" name="website" onChange={handleChange}/>
                                <TextInput label="Hours of Operation" name="hours of operation" onChange={handleChange}/>
                                <TextInput label="Image Link" name="image link" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* resource database */}
                <TableContainer component={Paper} style={{width: '80%', margin: 'auto', marginBottom: '36px' }}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Eco-Friendly</StyledTableCell>
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Website</StyledTableCell>
                                <StyledTableCell>Hours of Operation</StyledTableCell>
                                <StyledTableCell>Image</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.description}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.eco_friendly}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.category}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.address}
                            </TableCell>
                            <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {row.website}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.hours_of_operation}
                            </TableCell>
                            <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {row.image}
                            </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={8} />
                            </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </TableContainer>
            </div>
        </div>
    );
}

export default Admin;