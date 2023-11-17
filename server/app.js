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

app.get('/getUserData', (req, res) => {
    res.status(200).json(UserData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
