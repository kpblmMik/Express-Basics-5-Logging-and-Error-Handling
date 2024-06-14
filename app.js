const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/data', (req, res) => {
    res.send('GET request to /data');
});

app.post('/data', (req, res) => {
    res.send('POST request to /data');
});

app.put('/data', (req, res) => {
    res.send('PUT request to /data');
});

app.delete('/data', (req, res) => {
    res.send('DELETE request to /data');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
