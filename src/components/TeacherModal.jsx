import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    IconButton,
    Avatar,
    Input,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const TeacherModal = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState([]);
    const [status, setStatus] = useState('');
    const [degrees, setDegrees] = useState([]);
    const [userId, setUserId] = useState(() => uuidv4());
    const [avatar, setAvatar] = useState(null);
    const [newDegree, setNewDegree] = useState({ type: '', school: '', major: '', year: '', isGraduated: 'Tốt nghiệp' });
    const [positions, setPositions] = useState([]);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const apiUrl = 'http://localhost:8080';


    const handleDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleAddDegree = () => {
        const isGraduated = newDegree.isGraduated === 'Tốt nghiệp'
        setDegrees([...degrees, { ...newDegree, isGraduated }]);
        setNewDegree({ type: '', school: '', major: '', year: '', isGraduated: 'Tốt nghiệp' });
    };
    const handleDegreeChange = (event) => {
        const { name, value } = event.target;
        setNewDegree({ ...newDegree, [name]: value });
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handlePositionChange = (event) => {
        const { value } = event.target;
        setPosition(value);
    };
    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/teacher-positions`);
                setPositions(response.data);
            } catch (error) {
                console.error('Error fetching positions:', error);
            } finally {
                setLoadingPositions(false);
            }
        };
        fetchPositions();
    }, []);

    const handleSubmit = async () => {
        console.log("handleSubmit called");
        const formattedDegrees = degrees.map(degree => ({ ...degree, year: parseInt(degree.year) }));
        try {
            // Modified position data preparation
            const positionsToSend = position.map(code => positions.find(p => p.code === code)._id);

            console.log('Data to be submitted:', {
                name,
                email,
                phone,
                status,
                address,
                position: positionsToSend,
                degrees: formattedDegrees,
                startDate,
                userId
            });
            const response = await axios.post(`${apiUrl}/teachers`, {
                name,
                email,
                phone,
                status,
                address,
                position: positionsToSend,
                degrees: formattedDegrees,
                startDate
            });
            console.log('API Response:', response.data);

            setName('');
            setStartDate('');
            setPhone('');
            setEmail('');
            setAddress('');
            setPosition([]);
            setDegrees([]);
            setAvatar(null);
            setStatus('');
            setUserId(uuidv4());
            onClose();

        } catch (error) {
            console.error('Error creating teacher:', error);
            if (error.response) {
                console.error('API Response Error:', error.response.data);
            }
        }
    };



    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    margin: 0,
                    maxWidth: '600px',
                    borderRadius: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                },
                '& .MuiDialogContent-root': {
                    flex: 1,
                    padding: '16px',
                    overflowY: 'auto'
                },
                '& .MuiDialogActions-root': {
                    padding: '16px'
                }
            }}
        >
            <DialogTitle sx={{ padding: '16px' }}>Tạo thông tin giáo viên</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {avatar ?
                            <Avatar src={avatar} sx={{ width: 100, height: 100, marginBottom: '10px' }} /> :
                            <Avatar sx={{ width: 100, height: 100, backgroundColor: '#ddd', color: '#999', marginBottom: '10px' }}>
                                <IconButton component="label" size='large' sx={{ color: '#999', padding: 0, width: '100%', height: '100%', borderRadius: 0 }}>
                                    <Input type="file" accept='image/*' onChange={handleAvatarChange} sx={{ display: 'none' }} />
                                    <AddIcon />
                                </IconButton>
                            </Avatar>
                        }

                        <IconButton component="label" sx={{ color: '#888', fontSize: '12px' }}>
                            <Input type="file" accept='image/*' onChange={handleAvatarChange} sx={{ display: 'none' }} />
                            Upload file
                        </IconButton>
                    </Box>
                    <Box sx={{ flex: 1, padding: '10px' }}>
                        <TextField
                            label="Họ và tên"
                            fullWidth
                            margin="dense"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='outlined'
                            size="small"
                        />
                        <TextField
                            label="Ngày bắt đầu"
                            fullWidth
                            margin="dense"
                            required
                            type="date"
                            value={startDate}
                            onChange={handleDateChange}
                            variant='outlined'
                            size="small"
                        />
                        <TextField
                            label="Số điện thoại"
                            fullWidth
                            margin="dense"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant='outlined'
                            size="small"
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="dense"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant='outlined'
                            size="small"
                        />
                        <TextField
                            label="Địa chỉ"
                            fullWidth
                            margin="dense"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            variant='outlined'
                            size="small"
                        />
                        
                        <TextField
                            label="CCCD"
                            fullWidth
                            margin="dense"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            variant='outlined'
                            size="small"
                        />
                        {loadingPositions ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress size={20} />
                            </Box>

                        ) : (
                            <FormControl fullWidth margin="dense" variant='outlined' size="small">
                                <Select
                                    label="Vị trí công tác"
                                    multiple
                                    value={position}
                                    onChange={handlePositionChange}
                                    renderValue={(selected) => selected.map(pos => positions.find(p => p.code === pos)?.name).join(', ')}
                                >
                                    {positions.map((pos) => (
                                        <MenuItem key={pos.code} value={pos.code}>
                                            {pos.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        )}

                    </Box>
                </Box>

                <Box sx={{ marginTop: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Học vị</Box>
                        <Button variant='outlined' size="small" onClick={handleAddDegree}>Thêm</Button>
                    </Box>
                    <TableContainer component={Paper} sx={{ border: '1px solid #eee' }}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '20%', color: '#888' }}>Bậc</TableCell>
                                    <TableCell align="center" sx={{ width: '30%', color: '#888' }}>Trường</TableCell>
                                    <TableCell align="center" sx={{ width: '30%', color: '#888' }}>Chuyên ngành</TableCell>
                                    <TableCell align="center" sx={{ width: '20%', color: '#888' }}>Năm</TableCell>
                                    <TableCell align="center" sx={{ width: '20%', color: '#888' }}>Tốt nghiệp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {degrees.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.type}
                                        </TableCell>
                                        <TableCell align="center">{row.school}</TableCell>
                                        <TableCell align="center">{row.major}</TableCell>
                                        <TableCell align="center">{row.year}</TableCell>
                                        <TableCell align="center">{row.isGraduated ? 'Tốt nghiệp' : 'Đang học'}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="center"  >
                                        <FormControl fullWidth variant="outlined" size="small">
                                            <Select
                                                labelId="bac-select-label"
                                                id="bac-select"
                                                name="type"
                                                value={newDegree.type}
                                                onChange={handleDegreeChange}
                                            >
                                                <MenuItem value="Thạc sĩ">Thạc sĩ</MenuItem>
                                                <MenuItem value="Cử nhân">Cử nhân</MenuItem>
                                                <MenuItem value="Tiến sĩ">Tiến sĩ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="school"
                                            value={newDegree.school}
                                            onChange={handleDegreeChange}
                                            variant='outlined'
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="major"
                                            value={newDegree.major}
                                            onChange={handleDegreeChange}
                                            variant='outlined'
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="year"
                                            type="number"
                                            value={newDegree.year}
                                            onChange={handleDegreeChange}
                                            variant='outlined'
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControl fullWidth variant="outlined" size="small">
                                            <Select
                                                labelId="trangThai-select-label"
                                                id="trangThai-select"
                                                name="isGraduated"
                                                value={newDegree.isGraduated}
                                                onChange={handleDegreeChange}
                                            >
                                                <MenuItem value="Tốt nghiệp">Tốt nghiệp</MenuItem>
                                                <MenuItem value="Đang học">Đang học</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                {degrees.length === 0 && (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5} sx={{ color: '#999' }}>Trống</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '16px' }}>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#673AB7' }}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TeacherModal;