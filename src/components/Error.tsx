import { Container, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import React from 'react';

export default React.memo(() => {

    return (
        <>
            <WarningIcon fontSize="large" style={{ marginTop: '100px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }} />
            <Container fixed style={{ marginTop: '50px' }}>
                <Typography variant="h3">Sorry, the page you were looking for couldn't be found</Typography>
            </Container>
        </>

    );
});