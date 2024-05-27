const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'your_secret_key'; // Use the same secret key or public key

app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, forbidden

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
});

app.get('/api/resource', (req, res) => {
    res.json({ message: `Hello, ${req.user.userId}!` });
});

app.listen(3000, () => {
    console.log('Service running on port 3000');
});


// Example using fetch API
fetch('https://other-microservice/api/resource', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

