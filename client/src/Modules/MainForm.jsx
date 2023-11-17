import React, { useState } from 'react';
import { Avatar, Box, Button, Paper, TextField } from '@mui/material';

import Person2Icon from '@mui/icons-material/Person2';
const MainForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"  // This ensures the container takes the full height of the viewport
        >
            <Paper elevation={3} style={{ width: '300px', minHeight: '200px', height: 'auto', borderRadius: '15px' }}>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                    alignItems="center">
                    <Box mt={2}>
                        <Avatar sx={{ width: 56, height: 56 }}>
                            <Person2Icon sx={{ fontSize: 40 }} />
                        </Avatar>
                    </Box>
                    <Box mt={2}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" />
                    </Box>
                    <Box mt={1} >
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
                    </Box>
                    <Box mt={2} mb={3}>
                        <Button variant="contained">Insert</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default MainForm;
