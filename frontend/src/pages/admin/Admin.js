import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';
import Dropdown from '../../components/Forms/Dropdown';
import './Admin.css';
import axios from 'axios';

// Styled TableCell component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#608A33',
    color: theme.palette.common.white,
    fontSize: 16,
    fontFamily: 'Poppins, sans-serif',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#F8F1EB',
    fontSize: 14,
    fontFamily: 'Poppins, sans-serif',
  },
}));

// Pagination Actions Component
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
  const [resources, setResources] = useState([]); // Updated state to store resources
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data to verify admin role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error verifying admin role:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch resources from the database
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/resources');
        setResources(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <p>Access denied. Admins only.</p>;

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - resources.length) : 0;

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
        {/* Add new resource modal */}
        <div className="modal-container">
          <Button
            label="Add New Resource"
            onClick={handleOpen}
            variant="primary"
            style={{ fontSize: '20px', width: '250px', fontWeight: '200' }}
          />

          <div
            className={`overlay ${isModalOpen ? 'open' : ''}`}
            onClick={handleClose}
          ></div>

          <div className={`modal ${isModalOpen ? 'open' : ''}`}>
            <div className="modal-content">
              <div className="close-button">
                <Button
                  label="x"
                  onClick={handleClose}
                  variant="primary"
                  style={{
                    fontSize: '20px',
                    width: '20px',
                    height: '40px',
                    fontWeight: '200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0',
                  }}
                />
              </div>

              <div className="resource-input">
                <p style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px' }}>
                  Add New Resource
                </p>
                <form className="form-group" onSubmit={handleClose}>
                  <TextInput label="Name" name="name" onChange={handleChange} />
                  <TextInput label="Description" name="description" onChange={handleChange} />
                  <Dropdown
                    label="Eco-Friendly"
                    name="eco-friendly"
                    options={['Yes', 'No']}
                    onChange={handleChange}
                  />
                  <Dropdown
                    label="Category"
                    name="category"
                    options={[
                      'Grocery Store',
                      'Clothes Market',
                      'Bike/Walk Trail',
                      'Biking Trail',
                      'Public Transportation',
                    ]}
                    onChange={handleChange}
                  />
                  <TextInput label="Address" name="address" onChange={handleChange} />
                  <TextInput label="Website" name="website" onChange={handleChange} />
                  <TextInput label="Hours of Operation" name="hours of operation" onChange={handleChange} />
                  <TextInput label="Image Link" name="image link" onChange={handleChange} />
                  <Button label="Submit" onClick={handleClose} variant="primary" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Resource database table */}
        <TableContainer
          component={Paper}
          style={{ width: '80%', margin: 'auto', marginBottom: '36px' }}
        >
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
                ? resources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : resources
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.description}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.eco_friendly}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.category}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.address}</TableCell>
                  <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.website}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>{row.hours_of_operation}</TableCell>
                  <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.image_url}
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
                  count={resources.length}
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
};

export default Admin;
