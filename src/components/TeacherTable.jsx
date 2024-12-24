import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    Menu,
    MenuItem,
    Select,
    Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import moment from 'moment';
import TeacherModal from './TeacherModal';

const TeacherTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]); // All data from API
    const [filteredData, setFilteredData] = useState([]); // Filtered data for display
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const open = Boolean(anchorEl);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState('');
     const [refresh, setRefresh] = useState(false)
    const apiUrl = 'http://localhost:8080';

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/teachers?page=${page}&limit=${rowsPerPage}`); // fetch all data
                setData(response.data.teachers);
                setTotal(response.data.total)
            } catch (error) {
                console.error('API Fetch Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, [refresh, rowsPerPage, page]); // Fetch all data only once

    // useEffect(() => {
    //     // Filter data on search term change
    //     const searchTerm = search.toLowerCase().trim();

    //     const filtered = data.filter(row => {
    //         const name = row.userId?.name?.toLowerCase() || '';
    //         const email = row.userId?.email?.toLowerCase() || '';
    //         const phoneNumber = row.userId?.phoneNumber?.toLowerCase() || '';
    //         const address = row.userId?.address?.toLowerCase() || '';
    //         const positions = row.teacherPositionsId?.map(pos => pos.name.toLowerCase()).join(',') || '';

    //         return (
    //             name.includes(searchTerm) ||
    //             email.includes(searchTerm) ||
    //             phoneNumber.includes(searchTerm) ||
    //             address.includes(searchTerm) ||
    //             positions.includes(searchTerm)
    //         );
    //     });
    //     setFilteredData(filtered);
    // }, [search]);


    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // const handleClick = (event) => {
    //     if (!open) {
    //         setAnchorEl(event.currentTarget);
    //         setIsMenuOpen(true);
    //     } else {
    //         handleClose();
    //     }
    // };

    const handleClose = () => {
        setAnchorEl(null);
        setIsMenuOpen(false);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        handleClose();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(total / rowsPerPage);
    // const visibleData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    //Modal handlers
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
         setRefresh(!refresh) // refresh data when modal closed
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <h3 style={{ margin: 0 }}>Giáo viên</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm thông tin"
                        value={search}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        style={{ marginRight: '10px' }}
                    />
                    <Button
                        startIcon={<DownloadIcon />}
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                        size="small"
                    >
                        Tải lại
                    </Button>
                    <Button
                        startIcon={<AddIcon />}
                        variant="outlined"
                        size="small"
                        onClick={handleOpenModal}
                    >
                        Tạo mới
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã</TableCell>
                            <TableCell>Giáo viên</TableCell>
                            <TableCell>Trình độ (cao nhất)</TableCell>
                            <TableCell>Bộ môn</TableCell>
                            <TableCell>TT Công tác</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.code}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.code}
                                </TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="https://placehold.co/40x40/1e86ef/ffffff?text=👩‍🏫"
                                            alt="Teacher Avatar"
                                            style={{ borderRadius: '50%', marginRight: '5px' }}
                                        />
                                        <div>
                                            <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>
                                                {row.userId.name}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.8em' }}>
                                                {row.userId.email}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.8em' }}>
                                                {row.userId.phoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ whiteSpace: 'pre-line' }}>
                                    {row.degrees && Array.isArray(row.degrees) && row.degrees.length > 0 ? (
                                        `${row.degrees[0].type}
                                      Chuyên ngành: ${row.degrees[0].major}`
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>
                                <TableCell>N/A</TableCell>
                                <TableCell>
                                    {row.teacherPositionsId && row.teacherPositionsId.length > 0 &&
                                        row.teacherPositionsId.map((pos) => pos.name).join(',')}
                                </TableCell>
                                <TableCell>{row.userId.address}</TableCell>
                                <TableCell>
                                      <span style={{
                                        backgroundColor: row.isActive ? '#e0f7f0' : '#fce0e0',
                                        color: row.isActive ? '#008000' : '#FF0000',
                                         borderRadius: '5px',
                                         padding: '3px 6px'
                                        }}>
                                        {row.isActive ? 'Đang công tác' : 'Không công tác'}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <span>Tổng: {total}</span>
                    <span style={{ marginLeft: '10px'}}>
                        <Select
                            size="small"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            renderValue={() => `${rowsPerPage} / trang`}
                        >
                            <MenuItem value={10}>10 / trang</MenuItem>
                            <MenuItem value={20}>20 / trang</MenuItem>
                            <MenuItem value={50}>50 / trang</MenuItem>
                            <MenuItem value={100}>100 / trang</MenuItem>
                        </Select>
                    </span>
                </div>
                 <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary"/>
            </div>
            <TeacherModal open={openModal} onClose={handleCloseModal} />
        </div>
    );
};

export default TeacherTable;