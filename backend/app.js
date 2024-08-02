const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routers/task-routes');
const sequelize = require('./config/db');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Express App
const app = express();

CLIENT_PORT = 3000;
const corsOptions = {
  origin: [`http://127.0.0.1:${CLIENT_PORT}`, `http://localhost:${CLIENT_PORT}`]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, (error) => {
  if (!error) { console.log("Server is running, listening on port " + PORT) }
  else { console.log("Error occurred, server can't start", error) }
}
);

// Sync database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
