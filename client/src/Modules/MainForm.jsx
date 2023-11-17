import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Paper, TextField } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';

const MainForm = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Fetch UserData from the backend when the component mounts
        fetchUserData();
    }, [username]);



    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8085/getUserData');
            const userData = response.data;

            // Check if the entered username is in UserData
            const isUserAvailable = userData.some((user) => user.username === username);

            setIsAvailable(isUserAvailable);

            // If the user is available, set the password field
            if (isUserAvailable) {
                const user = userData.find((user) => user.username === username);
                setPassword(user.password || ''); // Ensure to handle the case where password is null or undefined

                console.log('Username : ', username);
                console.log('Password : ', user.password);
            } else {
                // Clear the password field if the user is not available
                setPassword('');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleInsert = async () => {
        try {
            // Send a POST request to the backend endpoint with the user data
            const response = await axios.post('http://localhost:8085/insertUserData', {
                username,
                password,
            });
            handleClear();

        } catch (error) {
            console.error('Error while inserting user data:', error);
        }
    };


    const handleUpdate = async () => {
        try {
            // Send a PUT request to the backend endpoint with the updated user data
            const response = await axios.put(`http://localhost:8085/updateUserData/${username}`, {
                username,
                password,
            });

            // Check if the update was successful
            if (response.status === 200) {
                console.log('User Data Updated Successfully');

                handleClear();
                fetchUserData();
            } else {
                console.error('Error updating user data:', response.data);
            }

        } catch (error) {
            console.error('Error while updating user data:', error);
        }
    };


    const handleDelete = async () => {
        try {
            // Send a DELETE request to the backend endpoint with the username
            await axios.delete(`http://localhost:8085/deleteUserData/${username}`);
            console.log(`${username} User Data Deleted Successfully`);

            handleClear();

        } catch (error) {
            console.error('Error while deleting user data:', error);
        }
    };


    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    }
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleClear = () => {
        setUsername('');
        setPassword('');
        setIsAvailable(false);
    }

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
                            onChange={handleUsernameChange}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
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
