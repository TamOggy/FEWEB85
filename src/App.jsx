import React, { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import TeacherTable from './components/TeacherTable';
import WorkTable from './components/WorkTable'; // Import WorkTable

function App() {
    const [activeContent, setActiveContent] = useState('Giáo viên'); // Initially show TeacherTable

    const handleMenuItemClick = (item) => {
        setActiveContent(item);
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Toolbar onMenuItemClick={handleMenuItemClick} />
        <div style={{ flex: 1, overflow: 'auto' }}>
            {activeContent === 'Vị trí công tác' ? <WorkTable /> : <TeacherTable />}
        </div>
      </div>
    </div>
  );
}

export default App;