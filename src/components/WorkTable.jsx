import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkModal from './WorkModal'; // Import WorkModal
import axios from 'axios';

const WorkTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:8080'; // Replace with your API URL

    useEffect(() => {
        const fetchPositions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/teacher-positions`);
                 setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };
        fetchPositions();
    }, []);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


    const handleCreateWork = async (newWork) => {
        try{
            await axios.post(`${apiUrl}/teacher-positions`, newWork);
             const response = await axios.get(`${apiUrl}/teacher-positions`);
             setData(response.data);
            handleCloseModal()
        } catch (error){
            setError(error.response.data.message)
        }
    }
 if (loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error}</div>
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
        <h3 style={{ margin: 0 }}>Dữ liệu / Vị trí công tác</h3>
        <div>
          <Button
            startIcon={<AddIcon />}
            style={{ marginRight: '10px' }}
            variant="outlined"
            size="small"
            onClick={handleOpenModal}
          >
            Tạo
          </Button>
          <Button startIcon={<RefreshIcon />} variant="outlined" size="small">
            Làm mới
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: '#e0f7f0',
                      color: '#008000',
                      borderRadius: '5px',
                      padding: '3px 6px',
                    }}
                  >
                    {row.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </TableCell>
                <TableCell>{row.des}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <WorkModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleCreateWork}/>
    </div>
  );
};

export default WorkTable;