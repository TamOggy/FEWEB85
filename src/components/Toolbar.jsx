import React, { useState } from 'react';
import './animations.css';

const Toolbar = ({ onMenuItemClick }) => {
    const [dataOpen, setDataOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const handleDataClick = () => {
      setDataOpen(!dataOpen);
    };

    const handleMenuItemClick = (item) => {
      onMenuItemClick(item);
      setActiveItem(item);
    };

    return (
        <aside style={{ width: '200px', backgroundColor: '#fff', borderRight: '1px solid #eee', padding: '10px 0' }}>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li
                    className={`menu-item ${activeItem === 'Thống kê' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('Thống kê')}
                >
                  <img
                      src="https://placehold.co/16x16/40454e/ffffff?text=📊"
                      alt="Thong ke icon"
                      style={{ marginRight: '10px' }}
                    />
                    <span>Thống kê</span>
                </li>
                <li
                    className={`menu-item ${activeItem === 'Lớp học' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('Lớp học')}
                >
                    <img
                      src="https://placehold.co/16x16/40454e/ffffff?text=🖼️"
                      alt="Lop hoc icon"
                      style={{ marginRight: '10px' }}
                    />
                    <span>Lớp học</span>
                    <span style={{ marginLeft: 'auto', fontSize: '1em' }}>▾</span>
                </li>
                <li
                    className={`menu-item ${activeItem === 'Học sinh' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('Học sinh')}
                >
                  <img
                      src="https://placehold.co/16x16/40454e/ffffff?text=🧑‍🎓"
                      alt="Hoc sinh icon"
                      style={{ marginRight: '10px' }}
                    />
                    <span>Học sinh</span>
                    <span style={{ marginLeft: 'auto', fontSize: '1em' }}>▾</span>
                </li>
                <li
                    className={`menu-item ${activeItem === 'Giáo viên' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('Giáo viên')}
                >
                  <img
                      src="https://placehold.co/16x16/40454e/ffffff?text=🧑‍🏫"
                      alt="Giao vien icon"
                      style={{ marginRight: '10px' }}
                    />
                    <span>Giáo viên</span>
                </li>
                 <li className="menu-item" onClick={handleDataClick}>
                <img
                      src="https://placehold.co/16x16/ff7800/ffffff?text=🗄️"
                      alt="Du lieu icon"
                      style={{ marginRight: '10px' }}
                    />
                    <span>Dữ liệu</span>
                    <span style={{ marginLeft: 'auto', fontSize: '1em' }}>{dataOpen ? '^' : '▾'}</span>
                 </li>
                 {dataOpen && (
                    <li
                        className={`sub-menu-item ${dataOpen ? 'open' : ''}`}
                        onClick={() => onMenuItemClick('Vị trí công tác')}
                    >
                        <span>Vị trí công tác</span>
                    </li>
                 )}
            </ul>
        </aside>
    );
};

export default Toolbar;