import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Header = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.12)',
          width: '100%',
          padding: '10px',
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        Dashboard
        <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <Button variant='outlined' color='error' onClick={logoutHandler}>
            Log out
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Header;
