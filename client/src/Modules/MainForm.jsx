import React, { useState } from 'react';
import { Avatar, Box, Button, Paper, TextField } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';

const MainForm = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInsert = async () => {
        try {
            // Send a POST request to the backend endpoint with the user data
            const response = await axios.post('http://localhost:8085/insertUserData', {
                username,
                password,
            });

            console.log(response.data);

            const userDataResponse = await axios.get('http://localhost:8085/getUserData');
            console.log('Updated UserData:', userDataResponse.data);

        } catch (error) {
            console.error('Error while inserting user data:', error);
        }
    };

    const handleUpdate = () => {
        // Implement logic for update operation
        console.log('Update button clicked');
    };

    const handleDelete = () => {
        // Implement logic for delete operation
        console.log('Delete button clicked');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Paper elevation={3} style={{ minWidth: '300px', width: 'auto', minHeight: '200px', height: 'auto', borderRadius: '15px' }}>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box mt={2}>
                        <Avatar sx={{ width: 56, height: 56 }}>
                            <Person2Icon sx={{ fontSize: 40 }} />
                        </Avatar>
                    </Box>
                    <Box mt={2}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} mt={2} mb={3}>
                        {isAvailable ? (
                            <>
                                <Box ml={0.5} mr={0.5}>
                                    <Button variant="contained" color="warning" onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </Box>
                                <Box ml={0.5} mr={0.5}>
                                    <Button variant="contained" color="error" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Box ml={0.5} mr={0.5}>
                                <Button variant="contained" color="success" onClick={handleInsert}>
                                    Insert
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default MainForm;
