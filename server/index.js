const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routers/user');

dotenv.config();

// console.log(process.env.MONGO_URI);

require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/', (request, response) => {
    response.send('<h2>This is from server-side index.js file</h2>');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
