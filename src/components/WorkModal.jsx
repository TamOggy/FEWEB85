import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    FormControlLabel,
    Switch
} from '@mui/material';

const WorkModal = ({ open, onClose, onSubmit }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
     const [isActive, setIsActive] = useState(true);
     const [isDeleted, setIsDeleted] = useState(false);

     const handleSubmit = () => {
          onSubmit({ code, name, des, isActive, isDeleted });
          setCode('');
          setName('');
          setDes('');
          setIsActive(true);
          setIsDeleted(false);
          onClose();
     };

    const handleStatusChange = (e) => {
        setIsActive(e.target.checked);
    };
      const handleDeleteChange = (e) => {
        setIsDeleted(e.target.checked);
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
                maxWidth: '300px',
                borderRadius: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              },
              '& .MuiDialogContent-root': {
                  flex: 1,
                  padding: '16px'
              },
               '& .MuiDialogActions-root': {
                padding: '16px'
               }
            }}
        >
            <DialogTitle>Vị trí công tác</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Mã"
                    fullWidth
                    variant="outlined"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                 <TextField
                    margin="dense"
                    label="Tên"
                    fullWidth
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Mô tả"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                />
              <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px'}}>
                  <FormControlLabel
                        control={<Switch checked={isActive} onChange={handleStatusChange} />}
                      label={isActive ? 'Hoạt động' : 'Ngừng'}
                  />
                    <FormControlLabel
                        control={<Switch checked={isDeleted} onChange={handleDeleteChange} />}
                      label={isDeleted ? 'Đã Xóa' : 'Chưa Xóa'}
                    />
              </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkModal;