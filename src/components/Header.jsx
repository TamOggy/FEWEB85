import React, { useState, useEffect } from 'react';
import {  Button } from '@mui/material'; // Import Dialog components
import axios from 'axios';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loggedInUser, setLoggedInUser] = useState(null); // User data when logged in
  const apiUrl = 'http://localhost:8080';
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

      useEffect(() => {
        const checkAdminLogin = async () => {
             try {
                  const storedUser = localStorage.getItem('adminUser');
                  if (storedUser) {
                       const user = JSON.parse(storedUser);
                        const response = await axios.get(`${apiUrl}/users`);
                        const foundUser = response.data.find(u => u.email === user.email && u.role === 'ADMIN');
                         if (foundUser){
                            setLoggedInUser(foundUser);
                         } else {
                             localStorage.removeItem('adminUser');
                        }

                 }
             } catch (error) {
                 console.error("Error when checking if the user is an admin: ", error)
                localStorage.removeItem('adminUser');
             }
         };

         checkAdminLogin();
     }, []);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };


    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('adminUser')
    };
  return (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="https://placehold.co/25x25/1e86ef/ffffff?text=🏫"
                    alt="School Logo"
                    style={{ marginRight: '10px' }}
                />
                <h3 style={{ margin: 0, color: '#1e86ef' }}>School System</h3>
                <span style={{ marginLeft: '10px', fontSize: '0.8em', color: '#666' }}>{formatDate(currentTime)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
             {loggedInUser ? (
                <>
                   <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderRadius: '5px',
                       backgroundColor: '#f2f2f2',
                       padding: '5px'
                   }}>
                       <div style={{ backgroundColor: 'gray', borderRadius: '50%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                       </div>
                       <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{loggedInUser.name}</span>
                   </div>
                    <button style={{
                     marginLeft: '10px',
                     backgroundColor: '#ff5722',
                     color: 'white',
                     border: 'none',
                      padding: '5px 10px',
                    borderRadius: '5px',
                     cursor: 'pointer',
                    }}
                       onClick={handleLogout}
                  >
                      Logout
                   </button>
                  </>
              ) : (
               <div style={{
                   display: 'flex',
                  alignItems: 'center',
                   justifyContent: 'center',
                   borderRadius: '5px',
                    backgroundColor: '#f2f2f2',
                   padding: '5px'
               }}>
                    <div style={{ backgroundColor: 'gray', borderRadius: '50%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>

                     <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Admin</span>
                </div>
              )}
         </div>
        </header>
    );
};


export default Header;