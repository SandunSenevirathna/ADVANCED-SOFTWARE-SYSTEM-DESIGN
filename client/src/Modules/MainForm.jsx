import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Box, Button, Paper, TextField } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';

const MainForm = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    useEffect(() => {
        showAlert();
    }, []);

    useEffect(() => {

        fetchUserData();
        usernameInputRef.current.focus();
    }, [username]);


    const showAlert = () => {
        alert(`
            This ReactJS application, designed for advanced software system design assignments, 
            focuses on streamlining user management through a RESTful CRUD API. The application 
            prioritizes functionality over security considerations and outputs certain results to 
            the browser console. This lightweight application serves as a practical tool for understanding 
            and implementing fundamental principles of system design, particularly in the context of software 
            development assignments.

            --- Sandun Senevirathna ( ITT-1819-079 | 1036 ) ---
        `);
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8085/getUserData');
            const userData = response.data;


            const isUserAvailable = userData.some((user) => user.username === username);

            setIsAvailable(isUserAvailable);

            if (isUserAvailable) {
                const user = userData.find((user) => user.username === username);
                setPassword(user.password || '');
                passwordInputRef.current.focus();

                console.log('Username : ', username);
                console.log('Password : ', user.password);
            } else {

                setPassword('');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleInsert = async () => {
        try {

            const response = await axios.post('http://localhost:8085/insertUserData', {
                username,
                password,
            });
            console.log('User Data Insert Successfully');

            handleClear();

        } catch (error) {
            console.error('Error while inserting user data:', error);
        }
    };


    const handleUpdate = async () => {
        try {

            const response = await axios.put(`http://localhost:8085/updateUserData/${username}`, {
                username,
                password,
            });


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
        usernameInputRef.current.focus();
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
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={handleUsernameChange}
                            inputRef={usernameInputRef}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            inputRef={passwordInputRef}
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
