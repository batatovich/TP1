const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routers/task-routes');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Express App
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/tasks', routes);

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
