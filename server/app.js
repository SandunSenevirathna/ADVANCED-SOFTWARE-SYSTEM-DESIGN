// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8085;

// Assuming UserData is an array for storing multiple user data
const UserData = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

// Endpoint to handle user data from the frontend
app.post('/insertUserData', (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (username && password) {
        // Create a new user object and add it to UserData array
        const newUser = { username, password };
        UserData.push(newUser);

        console.log('User data saved:', newUser);
        res.status(200).json({ message: 'User data saved successfully' });
    } else {
        res.status(400).json({ message: 'Invalid data. Both username and password are required.' });
    }
});

app.put('/updateUserData/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;

    // Find the user with the specified username
    const user = UserData.find(u => u.username === username);

    // Check if the user with the specified username exists
    if (user) {
        // Update the password
        user.password = password;

        res.status(200).json({ message: 'User data updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/deleteUserData/:username', (req, res) => {
    const { username } = req.params;

    // Find the user index with the specified username
    const userIndex = UserData.findIndex(u => u.username === username);

    // Check if the user with the specified username exists
    if (userIndex !== -1) {
        // Remove the user from the UserData array
        UserData.splice(userIndex, 1);

        res.status(200).json({ message: 'User data deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.get('/getUserData', (req, res) => {
    res.status(200).json(UserData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
